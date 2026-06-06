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
    heading: string;
    body: string;
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
