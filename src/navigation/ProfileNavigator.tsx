import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation.types";
import ProfileScreen from "../screens/profile/Profile";
import ProfileEditScreen from "../screens/profile/ProfileEdit";
import ProfileInfoScreen from "../screens/profile/ProfileInfo";
import ProfileQuestionsScreen from "../screens/profile/ProfileQuestions";
import { Appbar } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

const Profile = createNativeStackNavigator<ProfileStackParamList>();

type ProfileNavigatorProps = {
  navigation: NavigationProp<ProfileStackParamList, "Profile">;
};

export const ProfileNavigator = ({ navigation }: ProfileNavigatorProps) => {
  return (
    <Profile.Navigator
      screenOptions={{
        header: () => {
          return (
            <Appbar.Header
              style={{
                backgroundColor: "white",
              }}
            >
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title="Perfil" />
            </Appbar.Header>
          );
        },
      }}
    >
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: { backgroundColor: "white", padding: 20 },
        }}
      >
        <Profile.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Profile.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        <Profile.Screen
          name="ProfileQuestions"
          component={ProfileQuestionsScreen}
        />
      </Profile.Group>
    </Profile.Navigator>
  );
};
