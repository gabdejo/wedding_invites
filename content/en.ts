import type { SiteContent } from "./types";

const en: SiteContent = {
  nav: {
    heading: "Menu",
    items: [
      { id: "hero", label: "Home" },
      { id: "countdown", label: "Countdown" },
      { id: "our-story", label: "Our Story" },
      { id: "itinerary", label: "Itinerary" },
      { id: "info", label: "Locations" },
      { id: "dresscode", label: "Dress Code" },
      { id: "registry", label: "Registry" },
      { id: "rsvp", label: "RSVP" },
      { id: "faq", label: "FAQ" },
    ],
  },
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
  ourStory: {
    eyebrow: "You are cordially invited to this adventure called...",
    heading: "Our Love Story",
    milestones: [
      {
        title: "How we met",
        text: "Before we were a couple, we first became very close friends. We met in our first semester at university, and although we would drift apart between classes and busy schedules, we always found our way back to each other — sharing the same lives we now seek to intertwine forever.",
        photos: [
          { imagePath: "", alt: "Sol and Gabriel in Guyana", orientation: "portrait", caption: "Guyana" },
          { imagePath: "", alt: "Sol and Gabriel when they met", orientation: "portrait" },
          { imagePath: "", alt: "Sol and Gabriel in their early months", orientation: "landscape" },
        ],
      },
      {
        title: "Our 1st New Year together",
        text: "We started feeling things. The genuine affection we had for one another grew and evolved until we were no longer just friends.",
        photos: [
          { imagePath: "", alt: "First New Year together", orientation: "landscape" },
          { imagePath: "", alt: "First New Year together, another moment", orientation: "portrait" },
          { imagePath: "", alt: "First New Year together, celebration", orientation: "portrait" },
        ],
      },
      {
        title: "She asked me to be her boyfriend",
        text: "And so, between laughter and closeness, we stopped being just friends and began this journey together.",
        photos: [
          { imagePath: "", alt: "The day we started dating", orientation: "portrait" },
          { imagePath: "", alt: "Early dates as a couple", orientation: "landscape" },
        ],
      },
      {
        title: "Our life together",
        text: "Dates, the pandemic, university, travels, graduation. Years spent building a life together, one day at a time.",
        photos: [
          { imagePath: "", alt: "Dates", orientation: "portrait" },
          { imagePath: "", alt: "The pandemic together", orientation: "landscape" },
          { imagePath: "", alt: "University", orientation: "portrait" },
          { imagePath: "", alt: "Travels", orientation: "landscape" },
          { imagePath: "", alt: "Graduation", orientation: "portrait" },
        ],
      },
      {
        title: "Engagement",
        text: "In our third year he gave me a promise ring, vowing that in a couple of years he'd trade it for an engagement ring. And after a few more years...",
        highlight: "I said yes!",
        photos: [],
      },
    ],
  },
  photoCollage: {
    photos: [
      { imagePath: "", alt: "Photo of Sol and Gabriel 1", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 2", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 3", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 4", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 5", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 6", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 7", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 8", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 9", orientation: "portrait" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 10", orientation: "landscape" },
    ],
  },
  itinerary: {
    heading: "Itinerary",
    items: [
      { time: "12:00 PM", name: "Ceremony", imagePath: "" },
      { time: "2:00 PM", name: "Reception", imagePath: "" },
      { time: "4:00 PM", name: "Dinner", imagePath: "" },
      { time: "7:00 PM", name: "Party", imagePath: "" },
    ],
  },
  featuredPhoto: {
    photos: [
      { imagePath: "/images/R6EO5921.jpg", alt: "Photo of Sol and Gabriel" },
      { imagePath: "/images/R6EO5966.jpg", alt: "Photo of Sol and Gabriel" },
    ],
  },
  featuredPhoto2: {
    photos: [{ imagePath: "", alt: "Photo of Sol and Gabriel" }],
  },
  featuredPhoto3: {
    photos: [{ imagePath: "", alt: "Photo of Sol and Gabriel" }],
  },
  featuredPhoto4: {
    photos: [{ imagePath: "", alt: "Photo of Sol and Gabriel" }],
  },
  photoCarousel: {
    heading: "Our Moments",
    photos: [
      { imagePath: "", alt: "Photo of Sol and Gabriel 1", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 2", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 3", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 4", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 5", orientation: "landscape" },
      { imagePath: "", alt: "Photo of Sol and Gabriel 6", orientation: "landscape" },
    ],
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
    intro: "Thank you for thinking of a gift for us!",
    lines: [
      "Your presence is the greatest gift of all.",
      "If you wish to give something, we've set up a small registry for our new home.",
    ],
    buyLabel: "Choose gift",
    freeContributionLabel: "Open contribution",
    customAmountPrompt: "Amount in S/",
    showAllLabel: "Show all gifts",
    showLessLabel: "Show less",
    purchaseSuccess: "Thank you! Your gift was processed successfully.",
    purchaseError: "We couldn't process the payment. Please try again or use the bank transfer.",
    addToCartLabel: "Add",
    inCartLabel: "Added ✓",
    checkoutLabel: "Pay for gifts",
    cartSummaryLabel: "gifts selected",
    totalLabel: "Total:",
    cartDrawerHeading: "Cart",
    securePaymentHeading: "Secure payment with Culqi",
    securePaymentNote: "When you continue, a secure Culqi window will open to complete the payment. Your card details are protected and never pass through this site.",
    buyerNamePlaceholder: "Buyer's name",
    buyerEmailPlaceholder: "Email",
    buyerPhonePlaceholder: "Phone",
    dedicationPlaceholder: "Message (optional)",
    goToPayLabel: "Go to payment",
    removeLabel: "Remove",
    products: [
      {
        imagePath: "",
        category: "honeymoon",
        name: "Honeymoon fund",
        description: "An open contribution toward our honeymoon and the first memories of this new chapter.",
        price: null,
      },
      {
        imagePath: "",
        category: "kitchen",
        name: "Wine glass set",
        description: "Wine glasses for our table and future dinners together.",
        price: 200,
      },
      {
        imagePath: "",
        category: "home",
        name: "Decorative frame",
        description: "A decorative set to frame special photos and fill our home with memories.",
        price: 350,
      },
      {
        imagePath: "",
        category: "kitchen",
        name: "Coffee maker",
        description: "A coffee maker to enjoy good coffee together every morning.",
        price: 450,
      },
      {
        imagePath: "",
        category: "experiences",
        name: "Romantic dinner",
        description: "A special dinner to celebrate our first days as a married couple.",
        price: 300,
      },
      {
        imagePath: "",
        category: "home",
        name: "Towel set",
        description: "Soft, stylish towels for our new home.",
        price: 180,
      },
    ],
    bankTransfer: {
      heading: "Prefer a bank transfer?",
      note: [
        "If you'd prefer to send a transfer, you can use the following accounts:",
        "Please include your name in the transfer note so we can identify and thank you for your gift.",
      ],
      accounts: [
        {
          bank: "Interbank",
          accountNumber: "000-0000000000",
          cci: "00300000000000000000",
        },
      ],
    },
    legalLinks: [
      { label: "Merchant details", href: "/datos-del-comercio" },
      { label: "Terms & conditions", href: "/terminos-y-condiciones" },
      { label: "Returns & exchanges", href: "/politica-cambios-devoluciones" },
      { label: "Complaints book", href: "/libro-de-reclamaciones" },
    ],
  },
  rsvp: {
    heading: "Confirm Attendance",
    subtitle: "RSVP",
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
    submitError: "We couldn't submit your RSVP. Please try again.",
    guestNotFound: "We couldn't find your name on the guest list. If you think this is a mistake, please contact us.",
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "By when should I RSVP?",
        answer: "Please confirm your attendance by May 31, 2026 through the RSVP form above.",
      },
      {
        question: "Can I bring a plus one?",
        answer: "Only guests included on the invitation will be able to attend. Reach out on WhatsApp if you have questions.",
      },
      {
        question: "Is this an adults-only event?",
        answer: "Yes, with love we ask that this celebration be adults only.",
      },
      {
        question: "What's the dress code?",
        answer: "Black Tie. Gentlemen in tuxedo or dark formal suit, ladies in floor-length gown or elegant cocktail dress.",
      },
      {
        question: "Will parking be available?",
        answer: "Yes, both venues have parking available for guests.",
      },
    ],
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
  merchant: {
    tradeName: "Sol & Gabriel Gift Registry",
    legalName: "[Legal name pending]",
    taxId: "[Tax ID pending]",
    phone: "+34 600 000 000",
    email: "gabrieldejos@gmail.com",
    address: "[Address pending], Lima, Peru",
  },
};

export default en;
