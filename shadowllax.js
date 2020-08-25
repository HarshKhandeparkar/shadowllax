// Parallax
const depthFactor = 5; // Depth of the image wrt to the 0 z-index. Infinity being at the same distance as the rest of the content and 1 being as far away as possible.

const resizeParallax = () => {
  document.querySelectorAll('.parallax').forEach(parallax => {
    let height = 0; // To take into account absolute elements;

    parallax.querySelectorAll('.parallax-layer').forEach(layer => {
      const changeHeight = () => {
        height = Math.max(height, layer.clientHeight);

        if(height > parallax.clientHeight) parallax.style.height = `${height}px`; // The largest element's height
      }

      if (layer.clientHeight == 0 && layer.tagName == 'IMG') layer.addEventListener('load', changeHeight); // Images need to load first, then their size becomes determined.
      else changeHeight();
    })
  })
}
window.addEventListener('DOMContentLoaded', resizeParallax)
window.addEventListener('resize', resizeParallax)

const reposition = () => {
  const movedBy = window.scrollY;
  document.querySelectorAll('.parallax').forEach(parallax => {
    parallax.querySelectorAll('.parallax-layer').forEach(layer => {
      const depth = Number(layer.getAttribute('data-depth-factor')) || depthFactor; // Dynamically get depthFactor

      if (document.documentElement.clientHeight >= layer.getBoundingClientRect().top) { // Don't move offscreen elements.
        layer.style.transform = `translateY(+${movedBy / depth}px)`; // Move differently than the rest of the window
      }
    })
  })

  window.requestAnimationFrame(reposition);
}

window.requestAnimationFrame(reposition);
// /Parallax