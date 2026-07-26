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
    eyebrow: "Estás cordialmente invitado a esta aventura llamada...",
    heading: "Nuestra historia de Amor",
    milestones: [
      {
        title: "Cómo nos conocimos",
        text: "Antes de ser novios, primero empezamos siendo muy buenos amigos. Coincidimos en el primer ciclo de la universidad, y aunque nos distanciábamos por las clases y la falta de tiempo, siempre nos encontrábamos para hablarnos sobre nuestras vidas, las mismas que ahora buscamos entrelazar para hoy y siempre.",
        photos: [
          { imagePath: "", alt: "Sol y Gabriel en Guyana", orientation: "portrait", caption: "Guyana" },
          { imagePath: "", alt: "Sol y Gabriel al conocerse", orientation: "portrait" },
          { imagePath: "", alt: "Sol y Gabriel en sus primeros meses", orientation: "landscape" },
        ],
      },
      {
        title: "1er Año Nuevo juntos",
        text: "Sentimos cositas. El cariño genuino que nos teníamos el uno al otro creció y evolucionó hasta que dejamos de ser solo amigos.",
        photos: [
          { imagePath: "", alt: "Primer Año Nuevo juntos", orientation: "landscape" },
          { imagePath: "", alt: "Primer Año Nuevo juntos, otro momento", orientation: "portrait" },
          { imagePath: "", alt: "Primer Año Nuevo juntos, celebración", orientation: "portrait" },
        ],
      },
      {
        title: "Me pidió ser su enamorada",
        text: "Y así, entre risas y complicidad, dejamos de ser solo amigos para empezar esta historia de a dos.",
        photos: [
          { imagePath: "", alt: "El día que empezamos a salir", orientation: "portrait" },
          { imagePath: "", alt: "Primeras salidas como enamorados", orientation: "landscape" },
        ],
      },
      {
        title: "Nuestra vida juntos",
        text: "Citas, pandemia, universidad, viajes, graduación. Años construyendo una vida juntos, un día a la vez.",
        photos: [
          { imagePath: "", alt: "Citas", orientation: "portrait" },
          { imagePath: "", alt: "Pandemia juntos", orientation: "landscape" },
          { imagePath: "", alt: "Universidad", orientation: "portrait" },
          { imagePath: "", alt: "Viajes", orientation: "landscape" },
          { imagePath: "", alt: "Graduación", orientation: "portrait" },
        ],
      },
      {
        title: "Compromiso",
        text: "Al tercer año me dio el anillo de promesa, prometiendo que en un par de años lo cambiaría por el de compromiso. Y después de unos años más...",
        highlight: "¡Me dijo que sí!",
        photos: [],
      },
    ],
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
      { imagePath: "/images/carruB1.jpg", alt: "Foto de Sol y Gabriel 1", orientation: "landscape" },
      { imagePath: "/images/carruB2.jpg", alt: "Foto de Sol y Gabriel 2", orientation: "landscape" },
      { imagePath: "/images/carruB3.jpg", alt: "Foto de Sol y Gabriel 3", orientation: "landscape" },
      { imagePath: "/images/carruB4.jpg", alt: "Foto de Sol y Gabriel 4", orientation: "landscape" },
      { imagePath: "/images/carruB5.jpg", alt: "Foto de Sol y Gabriel 5", orientation: "landscape" },
      { imagePath: "/images/carruB6.jpg", alt: "Foto de Sol y Gabriel 6", orientation: "landscape" },
      { imagePath: "/images/carruB7.jpg", alt: "Foto de Sol y Gabriel 7", orientation: "landscape" },
      { imagePath: "/images/carruB8.jpg", alt: "Foto de Sol y Gabriel 8", orientation: "landscape" },
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
    intro: "¡Gracias por pensar en un detalle para nosotros!",
    lines: [
      "Tu presencia es el mejor regalo de todos.",
      "Si deseas obsequiarnos algo, hemos preparado una pequeña lista de detalles para nuestro nuevo hogar.",
    ],
    buyLabel: "Elegir regalo",
    freeContributionLabel: "Aporte libre",
    showAllLabel: "Ver todos los regalos",
    showLessLabel: "Ver menos",
    products: [
      {
        imagePath: "",
        category: "luna de miel",
        name: "Aporte libre - luna de miel",
        description: "Un aporte libre para nuestra luna de miel y los primeros recuerdos de esta nueva etapa.",
        price: null,
      },
      {
        imagePath: "",
        category: "cocina",
        name: "Set de copas de vino",
        description: "Copas de vino para nuestra mesa y futuras cenas juntos.",
        price: 200,
      },
      {
        imagePath: "",
        category: "hogar",
        name: "Cuadro decorativo",
        description: "Set decorativo para enmarcar fotos especiales y llenar nuestro hogar de recuerdos.",
        price: 350,
      },
      {
        imagePath: "",
        category: "cocina",
        name: "Cafetera",
        description: "Cafetera para disfrutar un buen café en nuestras mañanas juntos.",
        price: 450,
      },
      {
        imagePath: "",
        category: "experiencias",
        name: "Cena romántica",
        description: "Cena especial para celebrar nuestros primeros días como esposos.",
        price: 300,
      },
      {
        imagePath: "",
        category: "hogar",
        name: "Set de toallas",
        description: "Toallas para nuestro nuevo hogar, suaves y con estilo.",
        price: 180,
      },
    ],
    bankTransfer: {
      heading: "¿Prefieres hacerlo por transferencia?",
      note: "Por favor coloca tu nombre en el concepto para poder identificarte y agradecerte por tu detalle.",
      bank: "Interbank",
      accountHolder: "Sol y Gabriel",
      accountNumber: "000-0000000000",
      cci: "00300000000000000000",
    },
    legalLinks: [
      { label: "Datos del comercio", href: "/datos-del-comercio" },
      { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
      { label: "Cambios y devoluciones", href: "/politica-cambios-devoluciones" },
      { label: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
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
  merchant: {
    tradeName: "Mesa de Regalos Sol y Gabriel",
    legalName: "[Razón social pendiente]",
    taxId: "[RUC pendiente]",
    phone: "+34 600 000 000",
    email: "gabrieldejos@gmail.com",
    address: "[Dirección pendiente], Lima, Perú",
  },
};

export default es;
