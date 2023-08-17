import "./style.css";
import { Carousel, initTE } from "tw-elements";
import Masonry from 'masonry-layout';

initTE({ Carousel });
const masonry = new Masonry();

console.log('main.js executed');

// https://webpack.js.org/guides/asset-modules/