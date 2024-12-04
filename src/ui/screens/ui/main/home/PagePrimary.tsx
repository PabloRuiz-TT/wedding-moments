import React from 'react';
import { Card, Title, Button, Avatar } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Image,
	FlatList,
	ListRenderItem,
} from 'react-native';

// Define el tipo de datos para las imágenes
type ImageItem = {
	id: string;
	uri: string;
	width?: number;
	height?: number;
};

// Array de imágenes para la galería
const galleryImages: ImageItem[] = [
	{ id: '1', uri: 'https://example.com/photo1.jpg', width: 150, height: 200 },
	{ id: '2', uri: 'https://example.com/photo2.jpg', width: 200, height: 150 },
	{ id: '3', uri: 'https://example.com/photo3.jpg', width: 150, height: 150 },
	{ id: '4', uri: 'https://example.com/photo4.jpg', width: 200, height: 200 },
	{ id: '5', uri: 'https://example.com/photo5.jpg', width: 150, height: 200 },
	{ id: '6', uri: 'https://example.com/photo6.jpg', width: 200, height: 150 },
];

const images: ImageItem[] = [
	{ id: '1', uri: 'https://example.com/photo1.jpg' },
	{ id: '2', uri: 'https://example.com/photo2.jpg' },
	{ id: '3', uri: 'https://example.com/photo3.jpg' },
	{ id: '4', uri: 'https://example.com/photo4.jpg' },
];

const HomeScreen = () => {
	// Renderizado de imágenes en la galería
	const renderGalleryItem: ListRenderItem<ImageItem> = ({ item }) => (
		<View
			style={[styles.galleryItem, { width: item.width, height: item.height }]}>
			<Image
				source={{ uri: item.uri }}
				style={styles.galleryImage}
			/>
		</View>
	);

	return (
		<ScrollView style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Image
					source={{ uri: 'https://example.com/forest.jpg' }}
					style={styles.headerImage}
				/>
				<Text style={styles.headerText}>The Wedding of</Text>
				<Text style={styles.headerCouple}>Asep & Putri</Text>
				<Text style={styles.headerDate}>02 February 2022</Text>
			</View>

			{/* Couple Section */}
			<View style={styles.coupleSection}>
				<Title style={styles.sectionTitle}>Meet The Happy Couple</Title>
				<View style={styles.coupleContainer}>
					<View style={styles.coupleCard}>
						<Avatar.Image
							size={80}
							source={{ uri: 'https://example.com/groom.jpg' }}
						/>
						<Text style={styles.coupleName}>Asep Tesarum</Text>
						<Text>Son of Mr. Lorem & Mrs. Ipsum</Text>
					</View>
					<View style={styles.coupleCard}>
						<Avatar.Image
							size={80}
							source={{ uri: 'https://example.com/bride.jpg' }}
						/>
						<Text style={styles.coupleName}>Putri Sriwahyu</Text>
						<Text>Daughter of Mr. Dolor & Mrs. Amet</Text>
					</View>
				</View>
				<Button
					mode="contained"
					style={styles.storyButton}>
					Our Story
				</Button>
			</View>

			{/* Countdown Section */}
			<View style={styles.countdownSection}>
				<Title style={styles.sectionTitle}>We're Getting Married</Title>
				<Text style={styles.dateText}>02 February 2022</Text>
				<View style={styles.countdownContainer}>
					<View style={styles.countdownItem}>
						<Text style={styles.countdownNumber}>21</Text>
						<Text>Days</Text>
					</View>
					<View style={styles.countdownItem}>
						<Text style={styles.countdownNumber}>6</Text>
						<Text>Hours</Text>
					</View>
					<View style={styles.countdownItem}>
						<Text style={styles.countdownNumber}>50</Text>
						<Text>Minutes</Text>
					</View>
					<View style={styles.countdownItem}>
						<Text style={styles.countdownNumber}>28</Text>
						<Text>Seconds</Text>
					</View>
				</View>
			</View>

			{/* Map Section */}
			<View style={styles.mapSection}>
				<Title style={styles.sectionTitle}>Wedding Location</Title>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: -6.2,
						longitude: 106.816666,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}>
					<Marker coordinate={{ latitude: -6.2, longitude: 106.816666 }} />
				</MapView>
			</View>

			{/* Our Story Section */}
			<View style={styles.storySection}>
				<Title style={styles.sectionTitle}>Our Story</Title>
				<View style={styles.storyContainer}>
					<View style={styles.storyCard}>
						<Image
							source={{ uri: 'https://example.com/groom_story.jpg' }}
							style={styles.storyImage}
						/>
						<Text style={styles.storyText}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
							faucibus, mauris ac efficitur dapibus, nunc purus sollicitudin
							mauris.
						</Text>
					</View>
					<View style={styles.storyCard}>
						<Image
							source={{ uri: 'https://example.com/bride_story.jpg' }}
							style={styles.storyImage}
						/>
						<Text style={styles.storyText}>
							Pellentesque eget quam eu tortor ultrices scelerisque. Donec eget
							quam non lectus aliquam ultricies.
						</Text>
					</View>
				</View>
			</View>

			{/* Gallery Section */}
			<View style={styles.gallerySection}>
				<Title style={styles.sectionTitle}>Gallery</Title>
				<View style={styles.galleryContainer}>
					<FlatList
						data={galleryImages}
						renderItem={renderGalleryItem}
						keyExtractor={(item) => item.id}
						numColumns={2} // Ajusta las columnas según el diseño
					/>
				</View>
			</View>

			{/* Give a Gift Section */}
			<View style={styles.giftSection}>
				<Title style={styles.sectionTitle}>Give a Gift</Title>
				<Text style={styles.giftText}>
					Send wedding flowers or a gift to help us celebrate our special day.
				</Text>
				<Button
					mode="contained"
					style={styles.giftButton}>
					Send a Gift
				</Button>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	header: { alignItems: 'center', padding: 20, backgroundColor: '#eee' },
	headerImage: { width: '100%', height: 200 },
	headerText: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
	headerCouple: { fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
	headerDate: { fontSize: 16, color: '#888' },
	coupleSection: { padding: 20 },
	sectionTitle: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
	coupleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	coupleCard: { alignItems: 'center' },
	coupleName: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
	storyButton: { marginTop: 20 },
	countdownSection: { padding: 20, alignItems: 'center' },
	dateText: { fontSize: 16, marginVertical: 10 },
	countdownContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 20,
	},
	countdownItem: { alignItems: 'center' },
	countdownNumber: { fontSize: 32, fontWeight: 'bold' },
	mapSection: { padding: 20 },
	map: { width: '100%', height: 200 },
	storySection: { padding: 20 },
	storyContainer: { flexDirection: 'row', justifyContent: 'space-between' },
	storyCard: { width: '48%', alignItems: 'center' },
	storyImage: {
		width: '100%',
		height: 150,
		borderRadius: 10,
		marginBottom: 10,
	},
	storyText: { fontSize: 14, textAlign: 'justify' },
	gallerySection: { padding: 20 },
	galleryContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	galleryItem: { margin: 5, borderRadius: 10, overflow: 'hidden' },
	galleryImage: { width: '100%', height: '100%' },
	giftSection: { padding: 20, alignItems: 'center' },
	giftText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
	giftButton: { marginTop: 20 },
});

export default HomeScreen;
