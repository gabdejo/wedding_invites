import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import OurStorySection from "@/components/OurStorySection";
import EventInfoSection from "@/components/EventInfoSection";
import DressCodeSection from "@/components/DressCodeSection";
import RegistrySection from "@/components/RegistrySection";
import RsvpSection from "@/components/RsvpSection";
import ContactSection from "@/components/ContactSection";
import es from "@/content/es";

export default function Home() {
  return (
    <main>
      <HeroSection content={es.hero} />
      <CountdownSection content={es.countdown} />
      <OurStorySection content={es.ourStory} />
      <EventInfoSection content={es.eventInfo} />
      <DressCodeSection content={es.dressCode} />
      <RegistrySection content={es.registry} />
      <RsvpSection content={es.rsvp} />
      <ContactSection content={es.contact} />
    </main>
  );
}
