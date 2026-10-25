"use strict";document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{const f=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));document.querySelectorAll("[data-category]").forEach(x=>{x.hidden=f!=="todos"&&!x.dataset.category.split(" ").includes(f)});const status=document.getElementById("filter-status");if(status){const count=[...document.querySelectorAll("[data-category]")].filter(x=>!x.hidden).length;status.textContent=count+(count===1?" item exibido":" itens exibidos")}}));
(function(){
  const header=document.querySelector(".site-header");
  const toggle=header?.querySelector(".mobile-menu-toggle");
  const nav=header?.querySelector("#site-navigation");
  if(!toggle||!nav) return;
  function setOpen(open){
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
    header.classList.toggle("menu-open",open);
  }
  toggle.addEventListener("click",()=>setOpen(toggle.getAttribute("aria-expanded")!=="true"));
  nav.addEventListener("click",e=>{
    if(e.target.closest("a"))setOpen(false);
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&header.classList.contains("menu-open")){setOpen(false);toggle.focus()}});
  document.addEventListener("click",e=>{if(header.classList.contains("menu-open")&&!header.contains(e.target))setOpen(false)});
  window.matchMedia("(min-width: 801px)").addEventListener("change",e=>{if(e.matches)setOpen(false)});
})();
