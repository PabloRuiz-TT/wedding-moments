import {
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraType,
  CameraView,
  FlashMode,
} from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Appbar } from "react-native-paper";
import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Platform, TouchableOpacity } from "react-native";
import { weddingAPI } from "../config/axiosInstances";
import { db } from "../database/firebase";
import { RootStackParamList } from "../types/navigation.types";

export const CameraScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");

  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>();

  const cameraRef = useRef<CameraView>(null);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);

  const tomarFoto = async () => {
    const options: CameraPictureOptions = {
      base64: true,
      imageType: "jpg",
      quality: 0.5,
    };

    const foto = await cameraRef.current?.takePictureAsync(options);

    if (foto) {
      setCapturedImage(foto);
    }
  };

  const subirFoto = async () => {
    const formData = new FormData();
    setLoading(true);

    formData.append("picture", {
      uri: capturedImage?.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    const { data } = await weddingAPI.post("/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      timeout: 10000,
      transformRequest: (data) => {
        return data;
      },
    });

    const imageUrl: string = data as string;

    try {
      const data: AlbumType = {
        userName: user.nombre,
        createdAt: new Date().toLocaleDateString(),
        imageUrl,
        reactions: 0,
      };

      await addDoc(collection(db, "album"), data);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Imagen compartida",
          body: "Hemos notificado a tus invitados sobre la nueva imagen.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      const t = collection(db, "users");
      const q = await getDocs(t);
      q.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userId) {
          setUser(data);
        }
      });
    })();
  }, [userId]);

  return (
    <>
      {capturedImage ? (
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: capturedImage.uri }}
        >
          <Appbar.Header style={{ backgroundColor: "transparent" }}>
            <Appbar.Action
              icon="close"
              iconColor="white"
              onPress={() => setCapturedImage(null)}
            />
            <Appbar.Content title="Compartir foto" color="white" />
            <Appbar.Action
              icon="check"
              iconColor="white"
              onPress={subirFoto}
              loading={loading}
            />
          </Appbar.Header>
        </ImageBackground>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          facing={facing}
          flash={flash}
        >
          <Appbar.Header style={{ backgroundColor: "transparent" }}>
            <Appbar.BackAction
              iconColor="white"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="Tomar foto" color="white" />
            <Appbar.Action
              icon="flash"
              iconColor="white"
              onPress={() => {
                setFlash((prev) => (prev === "on" ? "off" : "on"));
              }}
            />

            <Appbar.Action
              icon="autorenew"
              iconColor="white"
              onPress={() => {
                setFacing((prev) => (prev === "back" ? "front" : "back"));
              }}
            />
          </Appbar.Header>

          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "white",
              position: "absolute",
              bottom: Platform.OS == "android" ? 20 : 70,
              left: "50%",
              marginLeft: -35,
            }}
            onPress={tomarFoto}
          />
        </CameraView>
      )}
    </>
  );
};

export type AlbumType = {
  imageUrl: string;
  userName: string;
  createdAt: string;
  reactions?: number;
};
