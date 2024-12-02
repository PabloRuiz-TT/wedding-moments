import { ScrollView } from "react-native";
import { FloatActions } from "./components/FloatActions";

export const AlbumScreen = () => {
  return (
    <>
      <ScrollView style={{ flex: 1, padding: 16 }}></ScrollView>

      <FloatActions />
    </>
  );
};
