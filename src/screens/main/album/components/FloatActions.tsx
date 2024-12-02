import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "moti";
import { IconButton, Surface } from "react-native-paper";
import { RootStackParamList } from "../../../../types/navigation.types";

export const FloatActions = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <Surface
        elevation={1}
        style={{
          maxWidth: 150,
          width: 150,
          borderRadius: 150,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton
            icon="camera"
            containerColor="black"
            iconColor="white"
            size={24}
            onPress={() => navigation.navigate("CamaraPermiso")}
          />
          <IconButton
            icon="video"
            containerColor="black"
            iconColor="white"
            size={24}
          />
        </View>
      </Surface>
    </View>
  );
};
