import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import OurStorySection from "@/components/OurStorySection";
import ItinerarySection from "@/components/ItinerarySection";
import EventInfoSection from "@/components/EventInfoSection";
import PhotoCarouselSection from "@/components/PhotoCarouselSection";
import DressCodeSection from "@/components/DressCodeSection";
import RegistrySection from "@/components/RegistrySection";
import RsvpSection from "@/components/RsvpSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import es from "@/content/es";

export default function Home() {
  return (
    <main>
      <HeroSection content={es.hero} />
      <CountdownSection content={es.countdown} />
      <OurStorySection content={es.ourStory} />
      <PhotoCarouselSection content={es.photoCarousel} paddingClassName="pt-0 pb-0" />
      <ItinerarySection content={es.itinerary} />
      <EventInfoSection content={es.eventInfo} />
      <PhotoCarouselSection content={es.photoCarousel2} id="photo-carousel-2" />
      <DressCodeSection content={es.dressCode} />
      <RegistrySection content={es.registry} />
      <RsvpSection content={es.rsvp} />
      <FaqSection content={es.faq} />
      <ContactSection content={es.contact} />
    </main>
  );
}
