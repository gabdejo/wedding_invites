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
import en from "@/content/en";

export default function EnglishHome() {
  return (
    <main>
      <HeroSection content={en.hero} />
      <CountdownSection content={en.countdown} />
      <OurStorySection content={en.ourStory} />
      <PhotoCarouselSection content={en.photoCarousel2} id="photo-carousel-2" />
      <ItinerarySection content={en.itinerary} />
      <EventInfoSection content={en.eventInfo} />
      <PhotoCarouselSection content={en.photoCarousel} paddingClassName="pt-2 pb-6" />
      <DressCodeSection content={en.dressCode} />
      <RegistrySection content={en.registry} />
      <RsvpSection content={en.rsvp} />
      <FaqSection content={en.faq} />
      <ContactSection content={en.contact} />
    </main>
  );
}
