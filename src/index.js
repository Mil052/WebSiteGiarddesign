import "./style.css";
import { setGallery } from "./gallery";
import { setImgViewer } from "./imageViewer";
import { setNavigation } from "./navigation";
import { setMobileMenu} from "./mobileMenu";
import { setCarousel, adjustCarouselItemsToScreenSize } from "./carousel/carousel";


window.onload = () => {
  // #header
  setNavigation();

  // #intro
  const introCarousel = setCarousel('intro-carousel', 'carousel-item', 'intro_carousel_next', 'intro_carousel_previous', 7000);
  adjustCarouselItemsToScreenSize(introCarousel, 'carousel-item', 1024);

  // #realizacje
  setGallery('gallery-container', 'masonry-grid', 'roller-courtain', 'roller-btn');
  // open Viewer window when 'click' on gallery element:
  const openViewer = setImgViewer('viewer', 'viewer-container', 'masonry-grid', 'viewer-close', 'viewer-previous', 'viewer-next');

  document.getElementById('masonry-grid').querySelectorAll('div').forEach((element) => {
    const elementIndex = element.dataset.index;
    element.addEventListener('click', () => openViewer(elementIndex));
  });

  // #mobile menu
  setMobileMenu('mobile_navigation_container', 'mobile_navigation', 'hamburger-button');

}