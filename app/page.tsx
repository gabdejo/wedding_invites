import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import OurStorySection from "@/components/OurStorySection";
import ItinerarySection from "@/components/ItinerarySection";
import FeaturedPhotoSection from "@/components/FeaturedPhotoSection";
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
      <FeaturedPhotoSection content={es.featuredPhoto} />
      <EventInfoSection content={es.eventInfo} />
      <DressCodeSection content={es.dressCode} />
      <FeaturedPhotoSection content={es.featuredPhoto2} id="featured-photo-2" />
      <RegistrySection content={es.registry} />
      <RsvpSection content={es.rsvp} />
      <FeaturedPhotoSection content={es.featuredPhoto3} id="featured-photo-3" />
      <FaqSection content={es.faq} />
      <FeaturedPhotoSection content={es.featuredPhoto4} id="featured-photo-4" />
      {/* <ContactSection content={es.contact} /> */}
    </main>
  );
}
