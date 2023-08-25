import "./style.css";
import { connectGallery } from "./gallery";
import { connectNavigation } from "./navigation";
import { setCarousel } from "./carousel/carousel";

window.onload = () => {
  // #header
  connectNavigation();

  // #intro
  const introCarousel = setCarousel('intro-carousel','intro_carousel_next', 'intro_carousel_previous', 7000);

  // #realizacje
  connectGallery();
}