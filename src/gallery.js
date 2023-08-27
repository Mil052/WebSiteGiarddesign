import Masonry from 'masonry-layout';

// Roll-up / Roll-out Container Viev
function rollContainerViev (container, content, courtain, button) {
    //Full height is content height + 180px of #gallery_roller
    const contentHeight = `${content.clientHeight + 180}px`;

    const rolledUp = container.classList.toggle('roll-up');
    if (rolledUp) {
        container.style.removeProperty('max-height');
        button.textContent = "Rozwiń";
    } else {
        container.style.setProperty('max-height', contentHeight);
        button.textContent = "Zwiń";
    }
    courtain.classList.toggle('hide-background');
}

export function setGallery (containerId, masonryGridId, courtainId, toggleVievBtnId) {
    const container = document.getElementById(containerId);
    const masonryGrid = document.getElementById(masonryGridId);
    const toggleVievBtn = document.getElementById(toggleVievBtnId);
    const courtain = document.getElementById(courtainId);

    // Init Masonry Grid
    const masonry = new Masonry(masonryGrid, {
        columnWidth: '.masonry-sizer',
        itemSelector: '.masonry-item',
        gutter: 44
    });

    toggleVievBtn.addEventListener('click', () => rollContainerViev (container, masonryGrid, courtain, toggleVievBtn));
}