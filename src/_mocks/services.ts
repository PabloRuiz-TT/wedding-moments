import { ROUTES } from "../types/navigation.types";

export const servicesImages = [
  {
    text: "Itinerario",
    uri: require("../../assets/illustrations/itinerary.jpeg"),
    path: ROUTES.ROOT.ITINERARIO_SUGGESTION,
  },
  {
    text: "Regalos",
    uri: require("../../assets/illustrations/gitf.jpeg"),
    path: ROUTES.ROOT.REGALOS_SUGGESTION,
  },
  {
    text: "Álbum",
    uri: require("../../assets/illustrations/flowers.jpeg"),
    path: ROUTES.ROOT.ALBUM_SUGGESTION,
  },
];

export const itineraryServices = [
  {
    id: 1,
    title: "Fotografía",
    description: "Puedes configurar una sesión de fotos para tu día especial.",
    icon: "camera",
  },
  {
    id: 2,
    title: "Cerermonia",
    description: "Tus invitados no se perderán ningún detalle de tu ceremonia.",
    icon: "church",
  },
  {
    id: 3,
    title: "Baile",
    description:
      "Elige la música que más te gusta para tu primer baile y disfruta con tus invitados.",
    icon: "music",
  },
];

export const recommendations = [
  {
    id: 1,
    title: "Elige un buen fotógrafo",
    description: "Un buen fotógrafo capturará los mejores momentos de tu boda.",
    icon: "camera",
    image: require("../../assets/images/s1.jpg"),
  },
  {
    id: 2,
    title: "Elige un buen DJ",
    description: "La música es la clave para una boda inolvidable.",
    icon: "music",
    image: require("../../assets/images/s2.jpg"),
  },
  {
    id: 3,
    title: "Elige un buen lugar",
    description: "El lugar es importante para que tu boda sea especial.",
    icon: "location",
    image: require("../../assets/images/s4.jpg"),
  },
  {
    id: 4,
    title: "Elige un buen pastel",
    description: "El pastel es el toque dulce de tu boda.",
    icon: "cake",
    image: require("../../assets/images/s3.jpg"),
  },
];
