import type { SiteContent } from "./types";

const es: SiteContent = {
  hero: {
    scroll: "Ver más",
  },
  countdown: {
    heading: "La cuenta regresiva",
    labels: {
      months: "Meses",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
  },
  eventInfo: {
    heading: "La Celebración",
    flipLabel: "Ver más",
    openInMaps: "Abrir en Maps",
    events: [
      {
        name: "Misa",
        imagePath: "/images/misa.png",
        time: "12:00 M",
        address: "Parroquia Nuestra Señora de Fátima · Av. Armendariz 350, Lima, Perú",
        mapsUrl: "https://maps.app.goo.gl/UqyHfwYS5m7971fz5",
      },
      {
        name: "Recepción",
        imagePath: "/images/lilas_rosado.png",
        time: "Por anunciar",
        address: "Por anunciar",
      },
    ],
  },
  location: {
    heading: "Cómo Llegar",
    venueName: "Parroquia Nuestra Señora de Fátima",
    address: "Av. Armendariz 350, Lima, Perú",
    openInMaps: "Abrir en Maps",
  },
  dressCode: {
    heading: "Código de Vestimenta",
    style: "Black Tie",
    lines: [
      "Caballeros: esmoquin o traje oscuro.",
      "Damas: vestido largo o cóctel elegante.",
      "Por favor evitar el blanco y el marfil.",
    ],
  },
  registry: {
    heading: "Mesa de Regalos",
    lines: [
      "Tu presencia es el mejor regalo de todos.",
      "Si deseas obsequiarnos algo, hemos preparado una pequeña lista.",
    ],
    stores: [
      { name: "Amazon", url: "#" },
      { name: "El Corte Inglés", url: "#" },
    ],
  },
  rsvp: {
    heading: "RSVP",
    deadline: "Por favor confirma antes del 31 de mayo de 2026",
    namePlaceholder: "Nombre completo",
    emailPlaceholder: "Correo electrónico",
    willYouAttend: "¿Asistirás?",
    accepts: "Con gusto asistirá",
    declines: "Con pena no podrá",
    numberOfGuests: "Número de acompañantes",
    notesPlaceholder: "Mensaje o restricciones alimenticias (opcional)",
    submit: "Confirmar asistencia",
    thankYou: "¡Gracias!",
    thankYouMessage: "Hemos recibido tu confirmación. ¡No podemos esperar para celebrar juntos!",
  },
  contact: {
    heading: "¿Tienes alguna duda?",
    lines: [
      "Con gusto te ayudamos con cualquier duda sobre el evento.",
      "Escríbenos directamente por WhatsApp.",
    ],
    whatsappLabel: "Escríbenos",
    whatsappUrl: "https://wa.me/34600000000?text=Hola%20Sol%20%26%20Gabriel!",
  },
};

export default es;
