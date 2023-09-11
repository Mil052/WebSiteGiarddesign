import './carousel.css';

export class Carousel {
    #container;
    #itemClassName;
    #carouselItems;
    #itemsAmount;
    #currentItemIndex = 0;
    #animationTimeout;
    #animationPending = false;
    #autoplayInterval = null;
    #autoplayIntervalDelay = 0;

    constructor (containerId, itemClassName) {
        console.log ('Remember to set position to RELATIVE and overflow to HIDDEN on container element !!!');
        this.#container = document.getElementById(containerId);
        this.#carouselItems = this.#container.querySelectorAll('.' + itemClassName);
        this.#itemsAmount = this.#carouselItems.length;
        this.#itemClassName = itemClassName;
    }

    get container () {
        return this.#container;
    }

    #slideItemLeft = (newItem, previousItem) => {
        newItem.classList.replace('inactive', 'active');
        // Add animation
        newItem.classList.add('right-to-center');
        previousItem.classList.add('center-to-left');
        this.#animationPending = true;

        this.#animationTimeout = setTimeout(() => {
            // Remove animation + hide previous item
            previousItem.classList.replace('active', 'inactive');
            newItem.classList.remove('right-to-center');
            previousItem.classList.remove('center-to-left');
            this.#animationPending = false;
        }, 1200);
    }

    #slideItemRight = (newItem, previousItem) => {
        newItem.classList.replace('inactive', 'active');
        // Add animation
        newItem.classList.add('left-to-center');
        previousItem.classList.add('center-to-right');

        this.#animationPending = true;

        this.#animationTimeout = setTimeout(() => {
            // Remove animation + hide previous item
            previousItem.classList.replace('active', 'inactive');
            newItem.classList.remove('left-to-center');
            previousItem.classList.remove('center-to-right');
            this.#animationPending = false;
        }, 1200);
    }

    #nextSlideHandler = () => {
        if (this.#animationPending) {
            return;
        }
        const previousItemIndex = this.#currentItemIndex;
        this.#currentItemIndex = (this.#currentItemIndex + 1) % this.#itemsAmount;
        this.#slideItemLeft(this.#carouselItems[this.#currentItemIndex], this.#carouselItems[previousItemIndex]);
    }

    #previousSlideHandler = () => {
        if (this.#animationPending) {
            return;
        }
        const previousItemIndex = this.#currentItemIndex;
        this.#currentItemIndex = (this.#itemsAmount + this.#currentItemIndex - 1) % this.#itemsAmount;
        this.#slideItemRight(this.#carouselItems[this.#currentItemIndex], this.#carouselItems[previousItemIndex]);
    }

    autoplayStart = (delay) => {
        if (this.#autoplayInterval) {
            return;
        }
        this.#autoplayIntervalDelay = delay;
        this.#autoplayInterval = setInterval(this.#nextSlideHandler, delay);
    }

    autoplayStop = () => {
        clearInterval(this.#autoplayInterval);
        this.#autoplayInterval = null;
    }
    
    // Manual handling Next Slide restarts the autoplay interval if set
    manualNextHandler = () => {
        this.#nextSlideHandler();
        // Reset autoplayInterval
        if (this.#autoplayInterval) {
            clearInterval(this.#autoplayInterval);
            this.#autoplayInterval = setInterval(this.#nextSlideHandler, this.#autoplayIntervalDelay);
        }
    }

    manualPreviousHandler = () => {
        this.#previousSlideHandler();
        // Reset autoplayInterval
        if (this.#autoplayInterval) {
            clearInterval(this.#autoplayInterval);
            this.#autoplayInterval = setInterval(this.#nextSlideHandler, this.#autoplayIntervalDelay);
        }
    }
    
    resetCarousel = () => {
        clearTimeout(this.#animationTimeout);
        this.#animationPending = false;
        // Get new list of carousel items
        this.#carouselItems = this.#container.querySelectorAll('.' + this.#itemClassName);
        this.#itemsAmount = this.#carouselItems.length;
        // Reset all items class names to default values
        this.#carouselItems.forEach(item => {
            item.className = this.#itemClassName + " inactive";
        });
        // Start carousel from index 0
        this.#currentItemIndex = 0;
        this.#carouselItems[0].classList.replace('inactive', 'active');
    }
}

export function setCarousel (containerId, itemClass, nextBtnId, prevBtnId, carouselInterval) {
    const carousel = new Carousel(containerId, itemClass);
    const nextButton = document.getElementById(nextBtnId);
    const previousButton = document.getElementById(prevBtnId);

    nextButton.addEventListener('click', carousel.manualNextHandler);
    previousButton.addEventListener('click', carousel.manualPreviousHandler);

    if (carouselInterval) {
        carousel.autoplayStart(carouselInterval);
    }

    return carousel;
}

export function adjustCarouselItemsToScreenSize (carouselObject, carouselItemClass, breakpoint) {
    //   For small screen items add prefix 'sm-' to carousel item class name in HTML
    const smallScreenCarouselItemClass = 'sm-' + carouselItemClass;
    const smallScreenCarouselItems = carouselObject.container.querySelectorAll('.' + smallScreenCarouselItemClass);
    const queryString = '(min-width: ' + breakpoint + 'px)';
    const mediaQuery = window.matchMedia(queryString);
    
    // Initial check of screen size - adjust carusel items if needed:
    if (window.innerWidth < breakpoint) {
        smallScreenCarouselItems.forEach(item => item.className = carouselItemClass);
        carouselObject.resetCarousel();
    }
    // Set event listener for window changes:
    const toggleSmallScreenCarouselItems = (event) => {
        if (event.matches) {
            smallScreenCarouselItems.forEach(item => item.className = smallScreenCarouselItemClass);
        } else {
            smallScreenCarouselItems.forEach(item => item.className = carouselItemClass);
        }
        carouselObject.resetCarousel();
    }

    mediaQuery.addEventListener('change', toggleSmallScreenCarouselItems);
}


/* 
HTML code:

<div id="intro-carousel" class="relative overflow-hidden w-full h-96">
    <div class="carousel-item active"></div>
    <div class="carousel-item hidden"></div>
    <div class="carousel-item hidden"></div>
</div>
<button id="carousel_next">Next</button>
<button id="carousel_previous">Previous</button>
*/