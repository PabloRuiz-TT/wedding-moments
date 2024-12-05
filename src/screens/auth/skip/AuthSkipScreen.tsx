import React, { useState } from 'react';
import {
	Platform,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView } from 'expo-camera';
import { MotiText, MotiView } from 'moti';
import { RootStackParamList } from '../../../types/navigation.types';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../../database/firebase';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useAuthStore } from '../../../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthSkipScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	// Estados para manejar los campos del formulario
	const [code, setCode] = useState<string>('');
	const [email, setEmail] = useState<string>('anoy@email.com');
	const [fullName, setFullName] = useState<string>('Pablo Anonimo');
	const [password, setPassword] = useState<string>('12345678910');
	const [weddingFound, setWeddingFound] = useState<boolean>(false);
	const { register } = useAuthStore();

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="padding">
			<ScrollView style={{ flex: 1, padding: 20 }}>
				{Platform.OS === 'android' ? (
					<Appbar.Header style={{ backgroundColor: 'white' }}>
						<Appbar.BackAction onPress={() => navigation.goBack()} />
						<Appbar.Content title="" />
					</Appbar.Header>
				) : null}

				{/* El título principal cambia según el estado */}
				<MotiText
					from={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ type: 'timing', duration: 1000 }}
					style={{ marginTop: 48 }}>
					<Text style={{ fontSize: 24, textAlign: 'center' }}>
						{weddingFound ? 'Completa tu registro' : 'Escanear código QR'}
					</Text>
				</MotiText>

				{/* Contenido inicial que desaparece al encontrar una boda */}
				<MotiView
					from={{ opacity: 1 }}
					animate={{
						opacity: weddingFound ? 0 : 1,
						scale: weddingFound ? 0 : 1,
					}}
					transition={{ type: 'timing', duration: 500 }}
					style={{
						marginTop: 24,
						height: weddingFound ? 0 : 'auto',
						overflow: 'hidden',
					}}>
					<>
						<Text style={{ fontSize: 16, textAlign: 'center' }}>
							Escanea el código QR que te proporcionó tu amigo para agregarlo a
							tu lista de amigos.
						</Text>

						<MotiView style={{ marginTop: 24 }}>
							<CameraView
								style={{
									width: '100%',
									height: 300,
									borderRadius: 8,
									overflow: 'hidden',
								}}
								facing="back"
								onBarcodeScanned={({ data }) => {
									console.log(data);
								}}
							/>
						</MotiView>

						<Text style={{ fontSize: 16, textAlign: 'center', marginTop: 24 }}>
							No tienes un código QR? Ingresa el código de tu amigo manualmente.
						</Text>

						<TextInput
							label="Código de amigo"
							value={code}
							onChangeText={(text) => setCode(text)}
							style={{ backgroundColor: 'white', marginTop: 24 }}
							left={<TextInput.Icon icon="qrcode-edit" />}
						/>
					</>
				</MotiView>

				{/* Nuevos campos que aparecen cuando se encuentra una boda */}
				{weddingFound && (
					<MotiView
						from={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ type: 'timing', duration: 800 }}
						style={{ marginTop: 24 }}>
						<>
							<Text
								style={{ fontSize: 16, textAlign: 'center', marginBottom: 24 }}>
								Hemos encontrado la boda. Por favor, completa tus datos para
								continuar.
							</Text>

							<MotiView
								from={{ opacity: 0, translateY: -20 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ type: 'timing', duration: 800 }}
								style={{ marginBottom: 16 }}>
								<TextInput
									label="Email"
									value={email}
									onChangeText={(text) => setEmail(text)}
									style={{ backgroundColor: 'white' }}
									keyboardType="email-address"
									autoCapitalize="none"
									left={<TextInput.Icon icon="email" />}
								/>
							</MotiView>

							<MotiView
								from={{ opacity: 0, translateY: -20 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ type: 'timing', duration: 800, delay: 200 }}
								style={{ marginBottom: 16 }}>
								<TextInput
									label="Nombre completo"
									value={fullName}
									onChangeText={(text) => setFullName(text)}
									style={{ backgroundColor: 'white' }}
									left={<TextInput.Icon icon="account" />}
								/>
							</MotiView>

							<MotiView
								from={{ opacity: 0, translateY: -20 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ type: 'timing', duration: 800, delay: 200 }}>
								<TextInput
									label="Contraseña"
									secureTextEntry
									value={password}
									onChangeText={(text) => setPassword(text)}
									style={{ backgroundColor: 'white' }}
									left={<TextInput.Icon icon="lock" />}
								/>
							</MotiView>
						</>
					</MotiView>
				)}

				<MotiView style={{ marginTop: 24 }}>
					<Button
						disabled={
							!weddingFound
								? code.length === 0
								: email.length === 0 || fullName.length === 0
						}
						mode="text"
						onPress={async () => {
							if (!weddingFound) {
								// Búsqueda inicial de la boda
								const weddingCollection = collection(db, 'bodas');
								const weddingQuery = query(
									weddingCollection,
									where('code', '==', code)
								);
								const querySnapshot = await getDocs(weddingQuery);

								if (querySnapshot.size === 0) {
									Alert.alert(
										'Error',
										'No se encontró la boda con el código proporcionado.'
									);
								} else {
									setWeddingFound(true);
								}
							} else {
								const userAnonymous = {
									nombre: fullName.split(' ')[0],
									apellido: fullName.split(' ')[1] || '',
									email: email,
									telefono: '',
									password: password,
									rol: 'invitado',
								};
								register(userAnonymous,true)
									.then(async () => {
										await AsyncStorage.setItem('code', code);
										const docRef = await addDoc(collection(db, 'invitados'), {
											nombreInvitado: fullName,
											email: email,
											codigoAmigo: code,
										});
									})
									.catch((error) => {
										console.log(error);
										Alert.alert(
											'Error',
											'Hubo un error al registrar tu cuenta'
										);
									});
							}
						}}>
						{weddingFound ? 'Registrarse' : 'Continuar'}
					</Button>
				</MotiView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
