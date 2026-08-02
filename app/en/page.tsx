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
import SectionNav from "@/components/SectionNav";
import en from "@/content/en";

export default function EnglishHome() {
  return (
    <main>
      <SectionNav content={en.nav} />
      <HeroSection content={en.hero} />
      <CountdownSection content={en.countdown} />
      <OurStorySection content={en.ourStory} />
      <PhotoCarouselSection content={en.photoCarousel} />
      <ItinerarySection content={en.itinerary} />
      <FeaturedPhotoSection content={en.featuredPhoto} />
      <EventInfoSection content={en.eventInfo} />
      <DressCodeSection content={en.dressCode} />
      <FeaturedPhotoSection content={en.featuredPhoto2} id="featured-photo-2" />
      <RegistrySection content={en.registry} />
      <RsvpSection content={en.rsvp} />
      <FeaturedPhotoSection content={en.featuredPhoto3} id="featured-photo-3" />
      <FaqSection content={en.faq} />
      <FeaturedPhotoSection content={en.featuredPhoto4} id="featured-photo-4" />
      {/* <ContactSection content={en.contact} /> */}
    </main>
  );
}
