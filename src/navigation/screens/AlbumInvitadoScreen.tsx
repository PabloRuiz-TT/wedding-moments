import { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Appbar, Avatar, Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { MotiView } from "moti";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Boda, BodaService } from "../../services/BodaService";
import { RootStackParamList } from "../../types/navigation.types";
import { db } from "../../database/firebase";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { Skeleton } from "moti/skeleton";

const LikeButton = ({ reactions, onLike, isLiked }: any) => {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
      transition={{ type: "spring", damping: 10 }}
    >
      <TouchableOpacity
        onPress={onLike}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          padding: 8,
        }}
      >
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={24}
          color={isLiked ? colors.error : colors.onSurfaceVariant}
        />
        <Text style={{ color: colors.onSurfaceVariant }}>{reactions || 0}</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

const ImageCard = ({ item, colors, onLike, likedImages }: any) => {
  const isLiked = likedImages.includes(item.id);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
      style={{
        width: "100%",
        marginBottom: 48,
        padding: 4,
        backgroundColor: colors.surface,
        borderRadius: 16,
        elevation: 3,
      }}
    >
      <View style={{ gap: 8, marginLeft: 8, padding: 8 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Avatar.Text
            size={40}
            label={item.userName.charAt(0)}
            style={{ backgroundColor: colors.primary }}
          />
          <Text
            variant="labelSmall"
            style={{ fontSize: 16, fontWeight: "500" }}
          >
            {item.userName}
          </Text>
        </View>

        <Text style={{ fontSize: 12, color: colors.onSurfaceVariant }}>
          {item.createdAt}
        </Text>
      </View>

      <MotiView
        from={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: "100%",
            height: 450,
            marginTop: 12,
            borderRadius: 12,
            overflow: "hidden",
          }}
          contentFit="cover"
          transition={1000}
        />
      </MotiView>

      <View style={{ padding: 12 }}>
        <LikeButton
          reactions={item.reactions}
          onLike={() => onLike(item.id, item.reactions || 0, isLiked)}
          isLiked={isLiked}
        />
      </View>
    </MotiView>
  );
};

export const AlbumInvitadoScreen = () => {
  const [boda, setBoda] = useState<Boda | null>({} as Boda);
  const [user] = useState(getAuth().currentUser);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLike = async (
    imageId: string,
    currentReactions: number,
    isLiked: boolean
  ) => {
    try {
      const imageRef = doc(db, "album", imageId);
      const newReactions = isLiked
        ? currentReactions - 1
        : currentReactions + 1;

      await updateDoc(imageRef, {
        reactions: newReactions,
      });

      setLikedImages((prev) =>
        isLiked ? prev.filter((id) => id !== imageId) : [...prev, imageId]
      );
    } catch (error) {
      console.error("Error al actualizar las reacciones:", error);
    }
  };

  useEffect(() => {
    const loadBodaData = async () => {
      try {
        const result = await BodaService.getInstance().obtenerBodaPorCode(
          "VicenteKatherine"
        );
        setBoda(result || null);
      } catch (error) {
        console.error("Error al cargar la boda:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBodaData();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoadingImages(true);

    const albumRef = collection(db, "album");
    const q = query(albumRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedImages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setImages(updatedImages);
        setLoadingImages(false);
      },
      (error) => {
        console.error("Error al escuchar cambios en el álbum:", error);
        setLoadingImages(false);
      }
    );

    const loadLikedImages = async () => {
      try {
        setLikedImages([]);
      } catch (error) {
        console.error("Error al cargar likes guardados:", error);
      }
    };

    loadLikedImages();
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <Appbar.Content title="" />
        <Appbar.Action
          icon="video"
          containerColor={colors.inversePrimary}
          color={colors.onPrimary}
          onPress={() => {}}
        />
        <Appbar.Action
          icon="camera"
          containerColor={colors.inversePrimary}
          color={colors.onPrimary}
          onPress={() => navigation.navigate("CameraScreen")}
        />
      </Appbar.Header>

      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15 }}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Avatar.Image
          size={75}
          source={require("../../../assets/illustrations/profile.jpg")}
        />
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "600",
              color: colors.primary,
            }}
          >
            {boda?.novio} & {boda?.novia}
          </Text>
        </View>
      </MotiView>

      <View style={{ padding: 20, marginTop: 24 }}>
        {loadingImages ? (
          <Skeleton />
        ) : images.length > 0 ? (
          images.map((item) => (
            <ImageCard
              key={item.id}
              item={item}
              colors={colors}
              onLike={handleLike}
              likedImages={likedImages}
            />
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: colors.onSurfaceVariant,
              fontSize: 16,
            }}
          >
            No hay fotos en el álbum aún. ¡Sé el primero en compartir un momento
            especial!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
