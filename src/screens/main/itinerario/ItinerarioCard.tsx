import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Avatar, useTheme } from "react-native-paper";
import { MotiView } from "moti";
import { Itinerario } from "../../../services/ItinerarioService";

interface ItinerarioProps {
  item: Itinerario;
  index: number;
}

export const ItinerarioCard = ({ item, index }: ItinerarioProps) => {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "spring",
        delay: index * 100,
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text variant="titleLarge" style={styles.title}>
                {item.titulo}
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                {item.description}
              </Text>
            </View>
            <View
              style={[styles.badge, { backgroundColor: colors.primary + "20" }]}
            >
              <Text variant="labelSmall" style={{ color: colors.primary }}>
                High
              </Text>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <Text variant="labelLarge" style={styles.timeText}>
              {`${String(item.horaInicio).padStart(2, "0")}:${String(
                item.minutoInicio
              ).padStart(2, "0")} - ${String(item.horaFin).padStart(
                2,
                "0"
              )}:${String(item.minutoFin).padStart(2, "0")}`}
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={24}
              source={{ uri: "https://i.pravatar.cc/150?img=1" }}
              style={styles.avatar}
            />
            <Avatar.Image
              size={24}
              source={{ uri: "https://i.pravatar.cc/150?img=2" }}
              style={[styles.avatar, styles.avatarOverlap]}
            />
          </View>
        </Card.Content>
      </Card>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    opacity: 0.7,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeContainer: {
    marginTop: 12,
  },
  timeText: {
    opacity: 0.6,
  },
  avatarContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  avatar: {
    backgroundColor: "#fff",
  },
  avatarOverlap: {
    marginLeft: -8,
  },
});
