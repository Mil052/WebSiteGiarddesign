import "./style.css";
import { Carousel, initTE } from "tw-elements";
import Masonry from 'masonry-layout';

initTE({ Carousel });

const grid = document.getElementById('masonry-grid');
const masonry = new Masonry(grid, {
    columnWidth: '.masonry-sizer',
    itemSelector: '.masonry-item',
    gutter: 40
  });

console.log('main.js executed');

// https://webpack.js.org/guides/asset-modules/