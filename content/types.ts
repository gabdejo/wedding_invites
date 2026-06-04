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
    details: Array<{ icon: string; title: string; line1: string; line2: string }>;
  };
  location: {
    heading: string;
    venueName: string;
    address: string;
    openInMaps: string;
  };
  dressCode: {
    heading: string;
    style: string;
    lines: string[];
  };
  registry: {
    heading: string;
    lines: string[];
    stores: Array<{ name: string; url: string }>;
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
  contact: {
    heading: string;
    lines: string[];
    whatsappLabel: string;
    whatsappUrl: string;
  };
}
