import './carousel.css';

export class Carousel {
    #carouselItems;
    #itemsAmount;
    #currentItemIndex = 0;
    #animationPending = false;
    #autoplayInterval = null;
    #autoplayIntervalDelay = 0;

    constructor (containerId) {
        console.log ('Remember to set position to RELATIVE and overflow to HIDDEN on container element !!!');
        this.#carouselItems = document.querySelectorAll('#' + containerId + ' > .carousel-item');
        this.#itemsAmount = this.#carouselItems.length;
    }

    #slideItemLeft = (newItem, previousItem) => {
        newItem.classList.replace('inactive', 'active');
        // Add animation
        newItem.classList.add('right-to-center');
        previousItem.classList.add('center-to-left');
        this.#animationPending = true;

        setTimeout(() => {
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

        setTimeout(() => {
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
}

export function setCarousel (containerId, nextBtnId, prevBtnId, carouselInterval) {
    const carousel = new Carousel(containerId);
    const nextButton = document.getElementById(nextBtnId);
    const previousButton = document.getElementById(prevBtnId);

    nextButton.addEventListener('click', carousel.manualNextHandler);
    previousButton.addEventListener('click', carousel.manualPreviousHandler);

    if (carouselInterval) {
        carousel.autoplayStart(carouselInterval);
    }

    return carousel;
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