import { MotiText, MotiView } from "moti";
import { IconButton } from "react-native-paper";

type SubmitComponentProps = {
  handleSignIn: () => void;
  submitEnabled: boolean;
  loading: boolean;
  mainText: string;
  secondaryText: string;
};

export const SubmitComponent = ({
  handleSignIn,
  loading,
  submitEnabled,
  mainText,
  secondaryText,
}: SubmitComponentProps) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 1000, delay: 200 }}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 20,
      }}
    >
      <IconButton
        icon="arrow-right"
        mode="contained"
        disabled={!submitEnabled}
        onPress={handleSignIn}
        loading={loading}
      />
      <MotiText>{loading ? secondaryText : mainText}</MotiText>
    </MotiView>
  );
};
