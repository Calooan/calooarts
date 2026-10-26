'use strict';
const viewer=document.querySelector('.lightbox');
const artworks=[...document.querySelectorAll('[data-zoom]')];
let current=0;
function showArtwork(index){
 current=(index+artworks.length)%artworks.length;
 const source=artworks[current].querySelector('img');
 const enlarged=viewer.querySelector('figure img');
 enlarged.src=artworks[current].dataset.zoom;
 enlarged.alt=source.alt;
 viewer.querySelector('figcaption').textContent=`${current+1} / ${artworks.length}${source.alt?' · '+source.alt:''}`;
}
artworks.forEach((button,index)=>button.addEventListener('click',()=>{showArtwork(index);viewer.showModal();document.body.style.overflow='hidden';}));
if(viewer){
 viewer.querySelector('.lightbox-close').addEventListener('click',()=>viewer.close());
 viewer.querySelector('.lightbox-prev').addEventListener('click',()=>showArtwork(current-1));
 viewer.querySelector('.lightbox-next').addEventListener('click',()=>showArtwork(current+1));
 viewer.addEventListener('close',()=>{document.body.style.overflow='';artworks[current]?.focus();});
 viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showArtwork(current-1);}if(e.key==='ArrowRight'){e.preventDefault();showArtwork(current+1);}});
}
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));

document.querySelectorAll('.read-more').forEach(button=>button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));button.previousElementSibling.classList.toggle('collapsed',expanded);button.textContent=expanded?'Read more':'Read less';}));
