import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import OurStorySection from "@/components/OurStorySection";
import EventInfoSection from "@/components/EventInfoSection";
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
      <OurStorySection content={en.ourStory} />
      <EventInfoSection content={en.eventInfo} />
      <DressCodeSection content={en.dressCode} />
      <RegistrySection content={en.registry} />
      <RsvpSection content={en.rsvp} />
      <ContactSection content={en.contact} />
    </main>
  );
}
