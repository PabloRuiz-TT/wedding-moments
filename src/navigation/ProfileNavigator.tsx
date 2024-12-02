import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation.types";
import ProfileScreen from "../screens/profile/Profile";
import { Appbar } from "react-native-paper";
import ProfileEditScreen from "../screens/profile/ProfileEdit";
import ProfileInfoScreen from "../screens/profile/ProfileInfo";
import ProfileQuestionsScreen from "../screens/profile/ProfileQuestions";

const Profile = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
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
              <Appbar.BackAction onPress={() => {}} />
              <Appbar.Content title="Perfil" />
            </Appbar.Header>
          );
        },
      }}
      initialRouteName="Profile"
    >
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Group screenOptions={{ presentation: "modal" }}>
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
