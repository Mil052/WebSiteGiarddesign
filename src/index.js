import "./style.css";
import { Carousel, initTE } from "tw-elements";
import { connectGallery } from "./gallery";



window.onload = () => {
  // #intro
  initTE({ Carousel });

  // #realizacje
  connectGallery();
  
  console.log('main.js executed');
}

// https://webpack.js.org/guides/asset-modules/