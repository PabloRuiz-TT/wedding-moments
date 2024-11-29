export type PermisoCamara = {
  title: string;
  description: string;
  icon: string;
};

export const permisosCamara: PermisoCamara[] = [
  {
    icon: "account-edit",
    title: "Foto de Perfil",
    description:
      "Para permitir a los usuarios tomar y actualizar su foto de perfil directamente desde la aplicación",
  },
  {
    icon: "qrcode-scan",
    title: "Escaneo de Códigos",
    description:
      "Para escanear códigos QR, códigos de barras o documentos para funcionalidades específicas de la app",
  },
  {
    icon: "account-group",
    title: "Compartir Fotografías",
    description:
      "Comparte con tus amigos cada experiencia que vives junto a ellos",
  },
];
