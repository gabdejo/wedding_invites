export interface SiteContent {
  hero: {
    scroll: string;
  };
  countdown: {
    heading: string;
    labels: {
      months: string;
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  };
  eventInfo: {
    heading: string;
    flipLabel: string;
    openInMaps: string;
    events: Array<{
      name: string;
      imagePath: string;
      time?: string;
      address: string;
      mapsUrl?: string;
    }>;
  };
  ourStory: {
    eyebrow: string;
    heading: string;
    milestones: Array<{
      title: string;
      text: string;
      highlight?: string;
      photos: Array<{
        imagePath: string;
        alt: string;
        orientation: "portrait" | "landscape";
        caption?: string;
      }>;
    }>;
  };
  photoCollage: {
    photos: Array<{
      imagePath: string;
      alt: string;
      orientation: "portrait" | "landscape";
      caption?: string;
    }>;
  };
  itinerary: {
    heading: string;
    items: Array<{
      time: string;
      name: string;
      imagePath: string;
    }>;
  };
  photoCarousel: {
    heading: string;
    photos: Array<{
      imagePath: string;
      alt: string;
      orientation: "portrait" | "landscape";
    }>;
  };
  photoCarousel2: {
    heading: string;
    photos: Array<{
      imagePath: string;
      alt: string;
      orientation: "portrait" | "landscape";
    }>;
  };
  dressCode: {
    heading: string;
    style: string;
    lines: string[];
  };
  registry: {
    heading: string;
    intro: string;
    lines: string[];
    buyLabel: string;
    freeContributionLabel: string;
    showAllLabel: string;
    showLessLabel: string;
    products: Array<{
      imagePath: string;
      category: string;
      name: string;
      description: string;
      price: number | null;
    }>;
    bankTransfer: {
      heading: string;
      note: string;
      bank: string;
      accountHolder: string;
      accountNumber: string;
      cci: string;
    };
    legalLinks: Array<{ label: string; href: string }>;
  };
  rsvp: {
    heading: string;
    deadline: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    willYouAttend: string;
    accepts: string;
    declines: string;
    numberOfGuests: string;
    notesPlaceholder: string;
    submit: string;
    thankYou: string;
    thankYouMessage: string;
  };
  faq: {
    heading: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    heading: string;
    lines: string[];
    whatsappLabel: string;
    whatsappUrl: string;
  };
  merchant: {
    tradeName: string;
    legalName: string;
    taxId: string;
    phone: string;
    email: string;
    address: string;
  };
}
