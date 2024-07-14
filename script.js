// Get all images with a data-lightbox attribute
const images = document.querySelectorAll('img[data-lightbox]');

// Create an array of image URLs and descriptions
const imageData = Array.from(images).map((image) => ({
  url: image.src,
  description: image.alt,
}));

// Add an event listener to each image
images.forEach((image, index) => {
  image.addEventListener('click', (event) => {
    // Create the lightbox container
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-content';

    // Create the lightbox image
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&#10006;';

    // Create the next and previous arrows
    const nextArrow = document.createElement('span');
    nextArrow.className = 'lightbox-next';
    nextArrow.innerHTML = '&#8594;';

    const prevArrow = document.createElement('span');
    prevArrow.className = 'lightbox-prev';
    prevArrow.innerHTML = '&#8592;';

    // Add the lightbox image, close button, and navigation arrows to the container
    lightboxContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(closeButton);
    lightboxContainer.appendChild(nextArrow);
    lightboxContainer.appendChild(prevArrow);

    // Add the lightbox container to the body
    document.body.appendChild(lightboxContainer);

    // Add event listeners to the close button, next arrow, and previous arrow
    closeButton.addEventListener('click', () => {
      lightboxContainer.remove();
    });

    nextArrow.addEventListener('click', () => {
      const currentIndex = imageData.findIndex((imageData) => imageData.url === lightboxImage.src);
      const nextIndex = (currentIndex + 1) % imageData.length;
      lightboxImage.src = imageData[nextIndex].url;
      lightboxImage.alt = imageData[nextIndex].description;
    });

    prevArrow.addEventListener('click', () => {
      const currentIndex = imageData.findIndex((imageData) => imageData.url === lightboxImage.src);
      const prevIndex = (currentIndex - 1 + imageData.length) % imageData.length;
      lightboxImage.src = imageData[prevIndex].url;
      lightboxImage.alt = imageData[prevIndex].description;
    });

    // Add an event listener to close the lightbox when clicked outside
    lightboxContainer.addEventListener('click', (event) => {
      if (event.target === lightboxContainer) {
        lightboxContainer.remove();
      }
    });
  });
});