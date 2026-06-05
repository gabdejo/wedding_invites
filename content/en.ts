import type { SiteContent } from "./types";

const en: SiteContent = {
  hero: {
    scroll: "Scroll",
  },
  countdown: {
    heading: "Counting down to the big day",
    labels: {
      months: "Months",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
  },
  eventInfo: {
    heading: "The Celebration",
    flipLabel: "See more",
    openInMaps: "Open in Maps",
    events: [
      {
        name: "Ceremony",
        imagePath: "/images/misa.png",
        time: "12:00 PM",
        address: "Parroquia Nuestra Señora de Fátima · Av. Armendariz 350, Lima, Perú",
        mapsUrl: "https://maps.app.goo.gl/UqyHfwYS5m7971fz5",
      },
      {
        name: "Reception",
        imagePath: "",
        time: "To be announced",
        address: "To be announced",
      },
    ],
  },
  location: {
    heading: "How to Get There",
    venueName: "Parroquia Nuestra Señora de Fátima",
    address: "Av. Armendariz 350, Lima, Perú",
    openInMaps: "Open in Maps",
  },
  dressCode: {
    heading: "Dress Code",
    style: "Black Tie",
    lines: [
      "Gentlemen: tuxedo or dark formal suit.",
      "Ladies: floor-length gown or elegant cocktail dress.",
      "Please avoid white and ivory.",
    ],
  },
  registry: {
    heading: "Gifts & Registry",
    lines: [
      "Your presence is the greatest gift of all.",
      "If you wish to give something, we've set up a small registry.",
    ],
    stores: [
      { name: "Amazon", url: "#" },
      { name: "El Corte Inglés", url: "#" },
    ],
  },
  rsvp: {
    heading: "RSVP",
    deadline: "Kindly respond by May 31, 2026",
    namePlaceholder: "Full name",
    emailPlaceholder: "Email address",
    willYouAttend: "Will you attend?",
    accepts: "Joyfully accepts",
    declines: "Regretfully declines",
    numberOfGuests: "Number of guests",
    notesPlaceholder: "Message or dietary restrictions (optional)",
    submit: "Send RSVP",
    thankYou: "Thank you!",
    thankYouMessage: "We've received your RSVP. We can't wait to celebrate with you.",
  },
  contact: {
    heading: "Any questions?",
    lines: [
      "We're happy to help with anything about the event.",
      "Reach us directly on WhatsApp.",
    ],
    whatsappLabel: "WhatsApp Us",
    whatsappUrl: "https://wa.me/34600000000?text=Hi%20Sol%20%26%20Gabriel!",
  },
};

export default en;
