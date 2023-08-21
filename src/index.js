import "./style.css";
import { Carousel, initTE } from "tw-elements";
import { connectGallery } from "./gallery";
import { connectNavigation } from "./navigation";

window.onload = () => {
  // #header
  connectNavigation();

  // #intro
  initTE({ Carousel });

  // #realizacje
  connectGallery();
}