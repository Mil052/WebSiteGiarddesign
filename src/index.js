import "./style.css";
import { setGallery } from "./gallery";
import { setNavigation } from "./navigation";
import { setCarousel } from "./carousel/carousel";


window.onload = () => {
  // #header
  setNavigation();

  // #intro
  const introCarousel = setCarousel('intro-carousel','intro_carousel_next', 'intro_carousel_previous', 7000);

  // #realizacje
  setGallery('gallery-container', 'masonry-grid', 'roller-courtain', 'roller-btn');
}