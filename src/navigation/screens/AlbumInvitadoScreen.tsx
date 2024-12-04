import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { MotiScrollView, MotiView } from "moti";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Avatar, Icon, IconButton, Text } from "react-native-paper";
import { db } from "../../database/firebase";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation.types";

export const AlbumInvitadoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      },
      (error) => {
        console.error("Error al escuchar cambios en el álbum:", error);
      }
    );

    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.Content title="Álbum Fotográfico" />
        <Appbar.Action
          icon="camera-outline"
          onPress={() => navigation.navigate("CameraScreen")}
        />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
        {images.map((item, index) => {
          return (
            <MotiView
              from={{ opacity: 0, translateY: 100 }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                type: "timing",
                duration: 500,
                delay: index * 500,
              }}
              key={index}
              style={{ marginBottom: 24 }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <Avatar.Image
                  source={require("../../../assets/illustrations/profile.jpg")}
                  size={42}
                />

                <Text variant="bodySmall" style={{ marginTop: 8 }}>
                  {item.userName}
                </Text>
              </View>

              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 12,
                  marginTop: 8,
                }}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <IconButton icon="heart-outline" onPress={() => {}} />

                  <IconButton icon="comment-outline" onPress={() => {}} />
                </View>

                <IconButton
                  icon="share-variant-outline"
                  style={{ marginLeft: "auto" }}
                  onPress={() => {}}
                />
              </View>
            </MotiView>
          );
        })}
      </ScrollView>
    </>
  );
};
