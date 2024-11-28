// import { View } from "react-native";
// import { Text } from "react-native-paper";

// export const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Button, Paragraph, Title, Caption } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; // Para la cuenta regresiva
import MapView, { Marker } from 'react-native-maps'; // Para el mapa

const WeddingEventScreen = () => {
	const eventDate = new Date('2024-02-02T00:00:00'); // Fecha del evento

	return (
		<View style={styles.container}>
			{/* Título */}
			<Text style={styles.header}>We're Getting Married</Text>

			{/* Contador regresivo
			<CountdownCircleTimer
				isPlaying
				duration={eventDate.getTime() / 1000 - Date.now() / 1000}
				colors={['#004777', '#F7B801', '#A30000']}
				onComplete={() => console.log('Event Started')}>
				{({ remainingTime }) => (
					<Text style={styles.countdown}>{remainingTime}</Text>
				)}
			</CountdownCircleTimer> */}

			{/* Detalles del evento */}
			<View style={styles.events}>
				<Card style={styles.card}>
					<Card.Content>
						<Title>Wedding Ceremony</Title>
						<Paragraph>Raffles Hotel, 5:00 PM - 6:00 PM</Paragraph>
						<Button
							icon="map"
							mode="contained"
							onPress={() => console.log('Open Map')}>
							Open Map
						</Button>
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<Title>Wedding Party</Title>
						<Paragraph>Bride's House, 7:00 PM - 9:00 PM</Paragraph>
						<Button
							icon="map"
							mode="contained"
							onPress={() => console.log('Open Map')}>
							Open Map
						</Button>
					</Card.Content>
				</Card>
			</View>

			{/* Mapa */}
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					title="Wedding Location"
				/>
			</MapView>

			{/* Nuestra Historia */}
			<View style={styles.story}>
				<Title>Our Story</Title>
				<Text style={styles.paragraph}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere
					euismod ligula, et sollicitudin elit.
				</Text>
			</View>

			{/* Galería de imágenes */}
			<View style={styles.gallery}>
				<Text style={styles.galleryTitle}>Gallery</Text>
				<View style={styles.galleryImages}>
					<Image
						source={{ uri: 'https://via.placeholder.com/150' }}
						style={styles.image}
					/>
					<Image
						source={{ uri: 'https://via.placeholder.com/150' }}
						style={styles.image}
					/>
					<Image
						source={{ uri: 'https://via.placeholder.com/150' }}
						style={styles.image}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#8e44ad',
		textAlign: 'center',
		marginBottom: 20,
	},
	countdown: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#8e44ad',
		textAlign: 'center',
	},
	events: {
		marginBottom: 20,
	},
	card: {
		marginBottom: 10,
	},
	map: {
		height: 200,
		marginVertical: 20,
	},
	story: {
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 14,
		color: '#666',
	},
	gallery: {
		marginTop: 20,
	},
	galleryTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	galleryImages: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
});

export default WeddingEventScreen;
