import { RootStackParamList } from "../../types/navigation.types";

declare global {
  namespace ReacNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
