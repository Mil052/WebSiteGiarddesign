class ImgViewer {
    viewerElement;
    contentItems;
    itemsAmount;
    currentIndex = null;

    constructor (viewerElement, contentItems) {
        this.viewerElement = viewerElement;
        this.contentItems = contentItems;
        this.itemsAmount = contentItems.length;
    }

    open = (index) => {
        this.viewerElement.classList.replace('hidden', 'block');
        this.currentIndex = index;
        this.contentItems[this.currentIndex].classList.replace('hidden', 'block');
    }

    close = () => {
        this.contentItems[this.currentIndex].classList.replace('block', 'hidden');
        this.viewerElement.classList.replace('block', 'hidden');
        this.currentIndex = null;
    }

    previous = () => {
        this.contentItems[this.currentIndex].classList.replace('block', 'hidden');
        this.currentIndex = (this.itemsAmount + this.currentIndex - 1) % this.itemsAmount;
        this.contentItems[this.currentIndex].classList.replace('hidden', 'block');
    }
    
    next = () => {
        this.contentItems[this.currentIndex].classList.replace('block', 'hidden');
        this.currentIndex = (this.currentIndex + 1) % this.itemsAmount;
        this.contentItems[this.currentIndex].classList.replace('hidden', 'block');
    }
}

function setViewerContentFromExistingElement (container, contentElementId) {
    const contentItems = document.getElementById(contentElementId).cloneNode(true).querySelectorAll('div');
    contentItems.forEach((item) => {
        item.className = "viewer-item hidden";
        item.removeAttribute('style');
    });
    container.append(...contentItems);
    return contentItems;
}

export function setImgViewer (viewerElementId, containerId, contentElementId, closeBtnId, previousBtnId, nextBtnId) {
    const viewerElement = document.getElementById(viewerElementId);
    const container = document.getElementById(containerId);
    const closeBtn = document.getElementById(closeBtnId);
    const previusBtn = document.getElementById(previousBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
        // Copy items from gallery into viewer container
    const contentItems = setViewerContentFromExistingElement(container, contentElementId);

    const viewer = new ImgViewer(viewerElement, contentItems);
    console.log(viewer.viewerElement.classList);

    closeBtn.addEventListener('click', viewer.close);
    previusBtn.addEventListener('click', viewer.previous);
    nextBtn.addEventListener('click', viewer.next);

    return viewer.open;
}