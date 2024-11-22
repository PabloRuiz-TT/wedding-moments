import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

interface DrawerLayoutProps {
  props: any;
}

export const DrawerLayout = ({ props }: DrawerLayoutProps) => {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
