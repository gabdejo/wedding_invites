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
  photoCarousel: {
    heading: "Nuestros Momentos",
    photos: [
      { imagePath: "/images/carru1.jpg", alt: "Foto de Sol y Gabriel 1", orientation: "landscape" },
      { imagePath: "/images/carru2.jpg", alt: "Foto de Sol y Gabriel 2", orientation: "landscape" },
      { imagePath: "/images/carru3.jpg", alt: "Foto de Sol y Gabriel 3", orientation: "landscape" },
      { imagePath: "/images/carru4.jpg", alt: "Foto de Sol y Gabriel 4", orientation: "landscape" },
      { imagePath: "/images/carru5b.jpg", alt: "Foto de Sol y Gabriel 5", orientation: "landscape" },
      { imagePath: "/images/carru6b.jpg", alt: "Foto de Sol y Gabriel 6", orientation: "landscape" },
    ],
  },
  eventInfo: {
    heading: "Locaciones",
    flipLabel: "Ver más",
    openInMaps: "Abrir en Maps",
    events: [
      {
        name: "Iglesia",
        imagePath: "/images/fatima_fondo.png",
        time: "12:00 M",
        address: "Parroquia Nuestra Señora de Fátima · Av. Armendariz 350, Miraflores",
        mapsUrl: "https://maps.app.goo.gl/UqyHfwYS5m7971fz5",
      },
      {
        name: "Hacienda",
        imagePath: "/images/lilas_medio_rosado.png",
        time: "3:30 PM",
        address: "Hacienda Las Lilas · Pachacamac",
        mapsUrl: "https://maps.app.goo.gl/HqxFEcde4zyGsXae6"
      },
    ],
  },
  ourStory: {
    heading: "Nuestra Historia",
    body: "Antes de ser novios, primero empezamos siendo muy buenos amigos. Coincidimos en el primer ciclo de la universidad, y aunque nos distanciábamos por las clases y la falta de tiempo, siempre nos encontrábamos para hablarnos sobre nuestras vidas, las mismas que ahora buscamos entrelazar para hoy y siempre. El cariño genuino que nos teníamos el uno al otro creció y evolucionó hasta que dejamos de ser solo amigos.",
  },
  photoCollage: {
    photos: [
      { imagePath: "", alt: "Foto de Sol y Gabriel 1", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 2", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 3", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 4", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 5", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 6", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 7", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 8", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 9", orientation: "portrait" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 10", orientation: "landscape" },
    ],
  },
  itinerary: {
    heading: "Itinerario",
    items: [
      { time: "12:00 M", name: "Misa", imagePath: "" },
      { time: "3:00 PM", name: "Recepción", imagePath: "" },
      { time: "5:30 PM", name: "Cena", imagePath: "" },
      { time: "6:30 PM", name: "Fiesta", imagePath: "" },
    ],
  },
  photoCarousel2: {
    heading: "Nuestros Momentos",
    photos: [
      { imagePath: "", alt: "Foto de Sol y Gabriel 1", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 2", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 3", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 4", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 5", orientation: "landscape" },
      { imagePath: "", alt: "Foto de Sol y Gabriel 6", orientation: "landscape" },
    ],
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
  faq: {
    heading: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Hasta cuándo puedo confirmar mi asistencia?",
        answer: "Agradecemos que confirmes antes del 31 de mayo de 2026 a través del formulario de RSVP.",
      },
      {
        question: "¿Puedo llevar acompañante?",
        answer: "Solo podrán asistir las personas incluidas en la invitación. Si tienes dudas, escríbenos por WhatsApp.",
      },
      {
        question: "¿Es un evento solo para adultos?",
        answer: "Sí, con mucho cariño pedimos que sea una celebración solo para adultos.",
      },
      {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Black Tie. Caballeros de esmoquin o traje oscuro, damas de vestido largo o cóctel elegante.",
      },
      {
        question: "¿Habrá estacionamiento?",
        answer: "Sí, ambas locaciones cuentan con estacionamiento disponible para los invitados.",
      },
    ],
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
