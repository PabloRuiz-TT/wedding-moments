import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Image, ScrollView, View, TextInput, Keyboard } from "react-native";
import { Appbar, Avatar, IconButton, Text, Surface } from "react-native-paper";
import { db } from "../../database/firebase";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation.types";

// Interfaz extendida para incluir comentarios

interface Comment {
  id: string;
  text: string;
  userName: string;
  createdAt: string;
}

export const AlbumInvitadoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [images, setImages] = useState<any[]>([]);
  const [userReactions, setUserReactions] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  const [activeCommentSection, setActiveCommentSection] = useState<
    string | null
  >(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});

  const handleReaction = async (imageId: string) => {
    try {
      const imageRef = doc(db, "album", imageId);
      const currentImage = images.find((img) => img.id === imageId);

      if (!currentImage) return;

      const hasReacted = userReactions[imageId];
      const newReactionCount = hasReacted
        ? currentImage.reactions - 1
        : currentImage.reactions + 1;

      await updateDoc(imageRef, {
        reactions: newReactionCount,
      });

      setUserReactions((prev) => ({
        ...prev,
        [imageId]: !hasReacted,
      }));
    } catch (error) {
      console.error("Error al actualizar la reacción:", error);
    }
  };

  const toggleComments = (imageId: string) => {
    setActiveCommentSection((prev) => (prev === imageId ? null : imageId));
    setNewComment("");
  };

  const handleAddComment = (imageId: string) => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      text: newComment,
      userName: "Usuario",
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [imageId]: [...(prev[imageId] || []), newCommentObj],
    }));

    setNewComment("");
    Keyboard.dismiss();
  };

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
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const renderCommentSection = (imageId: string) => {
    const imageComments = comments[imageId] || [];
    const isActive = activeCommentSection === imageId;

    return (
      <MotiView
        from={{ height: 0, opacity: 0 }}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          type: "timing",
          duration: 300,
        }}
        style={{
          overflow: "hidden",
        }}
      >
        <Surface
          mode="flat"
          style={{ padding: 16, marginTop: 8, borderRadius: 12 }}
        >
          {imageComments.map((comment) => (
            <View
              key={comment.id}
              style={{
                flexDirection: "row",
                marginBottom: 12,
                gap: 8,
              }}
            >
              <Avatar.Image
                source={require("../../../assets/illustrations/profile.jpg")}
                size={32}
              />
              <View style={{ flex: 1 }}>
                <Text variant="bodySmall" style={{ fontWeight: "bold" }}>
                  {comment.userName}
                </Text>
                <Text variant="bodyMedium">{comment.text}</Text>
              </View>
            </View>
          ))}

          <View style={{ flexDirection: "row", marginTop: 8, gap: 8 }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              placeholder="Añade un comentario..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <IconButton
              icon="send"
              onPress={() => handleAddComment(imageId)}
              disabled={!newComment.trim()}
            />
          </View>
        </Surface>
      </MotiView>
    );
  };

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
          const hasReacted = userReactions[item.id] || false;

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
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    icon={hasReacted ? "heart" : "heart-outline"}
                    onPress={() => handleReaction(item.id)}
                    iconColor={hasReacted ? "#FF4081" : undefined}
                  />
                  <Text style={{ marginLeft: -8 }}>{item.reactions || 0}</Text>
                  <IconButton
                    icon={
                      activeCommentSection === item.id
                        ? "comment"
                        : "comment-outline"
                    }
                    onPress={() => toggleComments(item.id)}
                    iconColor={
                      activeCommentSection === item.id ? "#2196F3" : undefined
                    }
                  />
                  <Text style={{ marginLeft: -8 }}>
                    {(comments[item.id] || []).length}
                  </Text>
                </View>
                <IconButton
                  icon="share-variant-outline"
                  style={{ marginLeft: "auto" }}
                  onPress={() => {}}
                />
              </View>
              {renderCommentSection(item.id)}
            </MotiView>
          );
        })}
      </ScrollView>
    </>
  );
};
