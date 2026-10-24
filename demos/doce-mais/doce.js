(() => {
'use strict';
const $=id=>document.getElementById(id);
const flavors={
 morango:{label:'Morango',description:'Morango — cremosidade com sabor de fruta.',img:'assets/doce/morango.webp'},
 chocolate:{label:'Chocolate',description:'Chocolate — pausa com cacau e muito sabor.',img:'assets/doce/chocolate.webp'},
 ninho:{label:'Leite Ninho',description:'Leite Ninho — o favorito de quem ama cremosidade.',img:'assets/doce/ninho.webp'},
 maracuja:{label:'Maracujá',description:'Maracujá — o contraste da fruta com a cremosidade.',img:'assets/doce/maracuja.webp'}
};
const toppings={nenhum:{label:'Sem recheio',cents:0},geleia:{label:'Geleia',cents:200},'avelã':{label:'Ganache de avelã',cents:300}};
const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n/100);
let flavor='morango',quantity=1,bag=[];
const topping=()=>document.querySelector('[name=topping]:checked')?.value||'nenhum';
function display(){
 const p=flavors[flavor];document.documentElement.dataset.flavor=flavor;
 $('bottle').src=p.img;$('bottle').alt='Garrafa de Sheikito sabor '+p.label;
 $('selected-description').textContent=p.description;$('stage-name').textContent=p.label.toLocaleUpperCase('pt-BR');
 document.querySelectorAll('[data-flavor]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.flavor===flavor)));
 $('qty').textContent=String(quantity);$('minus').disabled=quantity===1;$('plus').disabled=quantity===12;
 $('item-total').textContent=money((2000+toppings[topping()].cents)*quantity);
}
function add(){
 bag.push({flavor,topping:topping(),quantity,cents:(2000+toppings[topping()].cents)*quantity});
 quantity=1;display();renderBag();$('feedback').textContent='Sheikito adicionado à sacola.';
}
function renderBag(){
 const el=$('items');el.replaceChildren();let total=0;let count=0;
 bag.forEach((row,i)=>{
  total+=row.cents;count+=row.quantity;
  const wrap=document.createElement('div');wrap.className='receipt-row';
  const left=document.createElement('div');const title=document.createElement('strong');title.textContent=row.quantity+'x Sheikito '+flavors[row.flavor].label;
  const detail=document.createElement('small');detail.textContent=toppings[row.topping].label+' · '+money(row.cents);
  left.append(title,detail);
  const remove=document.createElement('button');remove.type='button';remove.textContent='Retirar';remove.setAttribute('aria-label','Remover Sheikito '+flavors[row.flavor].label);remove.addEventListener('click',()=>{bag.splice(i,1);renderBag()});
  wrap.append(left,remove);el.append(wrap);
 });
 if(!bag.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='Experimente montar seu primeiro Sheikito acima.';el.append(empty);}
 $('receipt-count').textContent=count+' '+(count===1?'ITEM':'ITENS');$('bag-indicator').textContent=String(count);
 $('total').textContent=money(total);$('send').disabled=bag.length===0;$('copy').disabled=bag.length===0;
}
function message(){
 const lines=['Olá! Gostaria de consultar este pedido da Doce+ / Casa + Sabor.','Nome: '+$('customer').value.trim(),''];
 bag.forEach(p=>lines.push(p.quantity+'x Sheikito '+flavors[p.flavor].label+' 500 ml, '+toppings[p.topping].label+' — '+money(p.cents)));
 lines.push('','Total estimado dos produtos: '+money(bag.reduce((sum,p)=>sum+p.cents,0)));
 if($('observations').value.trim())lines.push('Observações: '+$('observations').value.trim());
 lines.push('Favor confirmar disponibilidade, taxa de entrega e valor final.');return lines.join('\n');
}
function validate(){
 if(!bag.length){$('feedback').textContent='Adicione um Sheikito antes de continuar.';return false;}
 if($('customer').value.trim().length<2){$('feedback').textContent='Informe seu nome.';$('customer').focus();return false;}
 return true;
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-flavor]').forEach(b=>b.addEventListener('click',()=>{flavor=b.dataset.flavor;display()}));
 document.querySelectorAll('[name=topping]').forEach(b=>b.addEventListener('change',display));
 $('minus').addEventListener('click',()=>{quantity=Math.max(1,quantity-1);display()});
 $('plus').addEventListener('click',()=>{quantity=Math.min(12,quantity+1);display()});
 $('add').addEventListener('click',add);
 $('send').addEventListener('click',()=>{if(!validate())return;window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(message()),'_blank','noopener,noreferrer');$('feedback').textContent='Mensagem pronta: escolha o contato da Doce+ no WhatsApp.';});
 $('copy').addEventListener('click',async()=>{if(!validate())return;try{await navigator.clipboard.writeText(message());$('feedback').textContent='Mensagem copiada para enviar à Doce+.';}catch{$('feedback').textContent='Cópia automática indisponível neste navegador. Use o botão do WhatsApp.';}});
 display();renderBag();
});
})();
