import Masonry from 'masonry-layout';
 
export function connectGallery () {
    const galleryContainer = document.getElementById('gallery-container');
    const masonryGrid = document.getElementById('masonry-grid');
    const galleryVievBtn = document.getElementById('gallery-view-btn');
    const galleryCourtain = document.getElementById('gallery-courtain');

    // Init Masonry Grid
    const masonry = new Masonry(masonryGrid, {
        columnWidth: '.masonry-sizer',
        itemSelector: '.masonry-item',
        gutter: 44
    });

    // Roll-up / Roll-out view
    const toggleGalleryVievHandler = () => {
        const masonryGridHeight = masonryGrid.clientHeight;
        const fullHeight = `${masonryGridHeight + 180}px`;
        const rolledUp = galleryContainer.classList.toggle('roll-up');
        if (rolledUp) {
            galleryContainer.style.removeProperty('max-height');
            galleryVievBtn.textContent = "Rozwiń";
        } else {
            galleryContainer.style.setProperty('max-height', fullHeight);
            galleryVievBtn.textContent = "Zwiń";
        }
        galleryCourtain.classList.toggle('hide-background');
    }

    galleryVievBtn.addEventListener('click', toggleGalleryVievHandler);
}