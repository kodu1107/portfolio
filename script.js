(() => {
const header=document.querySelector('body>header'),button=document.querySelector('.menu-button'),nav=document.querySelector('nav'),links=[...nav.querySelectorAll('a')];
const setMenu=open=>{button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open);};
button.addEventListener('click',()=>setMenu(button.getAttribute('aria-expanded')!=='true'));
links.forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){setMenu(false);button.focus();}});
document.addEventListener('click',event=>{if(!header.contains(event.target))setMenu(false);});
window.matchMedia('(max-width:600px)').addEventListener('change',()=>setMenu(false));
const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);let ticking=false;
const update=()=>{document.body.classList.toggle('scrolled',window.scrollY>30);let current=sections[0];sections.forEach(section=>{if(section.getBoundingClientRect().top<=180)current=section;});links.forEach(link=>{const active=link.getAttribute('href')===`#${current.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});ticking=false;};
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});window.addEventListener('resize',update,{passive:true});document.querySelector('#year').textContent=new Date().getFullYear();setMenu(false);update();
})();
