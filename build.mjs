import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const pages=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logo='assets/015647_2101d35818694599838579247af995f4~mv2.webp';
const socials=[['Facebook','https://www.facebook.com/calo.an.7370','assets/0fdef751204647a3bbd7eaa2827ed4f9.webp'],['Instagram','https://www.instagram.com/calooan13/?hl=en','assets/01c3aff52f2a4dffa526d7a9843d46ea.webp'],['LinkedIn','https://www.linkedin.com/in/jialu-an-237a7b201/','assets/11062b_72c275822d4344358ee379f14e7e115f~mv2.webp']];
function image(n,base,zoom=true){const tag=`<img src="${base+esc(n.src)}" alt="${esc(n.alt)}" width="${n.width}" height="${n.height}" loading="lazy" decoding="async">`;return zoom?`<button class="artwork ${n.half?'half':''}" type="button" data-zoom="${base+esc(n.src)}" aria-label="Enlarge ${esc(n.alt||'artwork')}">${tag}</button>`:tag;}
function render(n,base){
 switch(n.type){
 case 'text':return `<div class="text">${n.html.replaceAll('{{BASE}}',base)}</div>`;
 case 'image':return image(n,base);
 case 'video':return `<figure class="film"><video controls playsinline preload="none" ${n.poster?`poster="${base+esc(n.poster)}"`:''} aria-label="${esc(n.title)}"><source src="${base+esc(n.src)}" type="video/mp4">Your browser does not support this video. <a href="${base+esc(n.src)}">Download video</a></video><figcaption>${esc(n.title)}</figcaption></figure>`;
 case 'gallery':return `<div class="gallery">${n.items.map(x=>image(x,base)).join('')}</div>`;
 case 'cards':return `<div class="project-grid">${n.items.map(x=>`<article class="project-card"><div class="card-copy"><h2><a href="${base+x.slug}/">${esc(x.title)}</a></h2><p class="description ${x.description.length>150?'collapsed':''}">${esc(x.description)}</p>${x.description.length>150?'<button class="read-more" type="button" aria-expanded="false">Read more</button>':''}</div><a class="card-image" href="${base+x.slug}/" aria-label="View ${esc(x.title)}">${image(x.image,base,false)}</a></article>`).join('')}</div>`;
 case 'category-cards':return `<div class="category-grid">${n.items.map(x=>`<a class="category-card" href="${base+x.slug}/">${image(x.image,base,false)}<h2><span>${esc(x.title)}</span></h2></a>`).join('')}</div>`;
 default:return `<div class="${n.type}">${(n.items??[]).map(x=>render(x,base)).join('')}</div>`;
 }
}
function shell(slug,title,body){
 const base=slug==='home'?'./':'../';
 const section=['projects','others','about-1'].includes(slug)?slug:(['character-design','experimental-animation','illustration','crafts'].includes(slug)?'others':'projects');
 const nav=[['projects','Projects'],['others','Others'],['about-1','About']].map(([s,t])=>`<a href="${base+s}/" ${section===s&&slug!=='home'?'aria-current="page"':''}>${t}</a>`).join('');
 return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}${slug==='home'?'':' | Calooartist'}</title><meta name="description" content="${esc(slug==='home'?'The animation and illustration portfolio of Calo (Jialu) An.':title+' — animation and illustration by Calo (Jialu) An.')}"><link rel="icon" href="${base+logo}" type="image/webp"><link rel="stylesheet" href="${base}styles.css"><script src="${base}site.js" defer></script><meta property="og:title" content="${esc(title)}"><meta property="og:type" content="website"></head><body class="page-${slug}"><a class="skip" href="#main">Skip to content</a><header class="sidebar"><a class="logo" href="${base}" aria-label="Calooartist home"><img src="${base+logo}" alt="Calo An hand-drawn logo" width="113" height="91"></a><nav aria-label="Main navigation">${nav}</nav></header><main id="main" class="site-main">${body(base)}</main><footer><div class="footer-inner"><h2>CONTACT ME:</h2><div class="socials">${socials.map(([name,url,icon])=>`<a href="${url}" target="_blank" rel="noopener noreferrer"><img src="${base+icon}" width="18" height="18" alt="">${name}</a>`).join('')}</div><p>© 2022 Jialu(Calo) An. All Rights Reserved.</p></div></footer><a class="back-top" href="#main" aria-label="Back to top">⌃</a><dialog class="lightbox" aria-label="Artwork viewer"><button class="lightbox-close" type="button" aria-label="Close artwork viewer">×</button><button class="lightbox-prev" type="button" aria-label="Previous artwork">‹</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><button class="lightbox-next" type="button" aria-label="Next artwork">›</button></dialog></body></html>\n`;
}
for(const [slug,p] of Object.entries(pages)){
 const out=slug==='home'?root:path.join(root,slug);fs.mkdirSync(out,{recursive:true});
 const heading=['character-design','illustration','crafts','experimental-animation'].includes(slug)?`<h1 class="sr-only">${p.title}</h1>`:'';
 const file=shell(slug,p.title,base=>heading+render(p.body,base));fs.writeFileSync(path.join(out,'index.html'),file);
}
fs.writeFileSync(path.join(root,'404.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Calooartist</title><style>body{margin:15vh auto;padding:25px;max-width:600px;color:#333;font:18px/1.7 sans-serif}a{color:#b85e6d}</style><h1>Page not found</h1><p>Please check the address or return to the artwork.</p><p><a href="https://www.calooartist.com/">Calooartist home →</a></p></html>`);
console.log(`Built ${Object.keys(pages).length} pages. No packages or build service required.`);
