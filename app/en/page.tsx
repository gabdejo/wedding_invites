import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import EventInfoSection from "@/components/EventInfoSection";
import LocationSection from "@/components/LocationSection";
import DressCodeSection from "@/components/DressCodeSection";
import RegistrySection from "@/components/RegistrySection";
import RsvpSection from "@/components/RsvpSection";
import ContactSection from "@/components/ContactSection";
import en from "@/content/en";

export default function EnglishHome() {
  return (
    <main>
      <HeroSection content={en.hero} />
      <CountdownSection content={en.countdown} />
      <EventInfoSection content={en.eventInfo} />
      <LocationSection content={en.location} />
      <DressCodeSection content={en.dressCode} />
      <RegistrySection content={en.registry} />
      <RsvpSection content={en.rsvp} />
      <ContactSection content={en.contact} />
    </main>
  );
}
