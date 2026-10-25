(() => {
'use strict';
const $=id=>document.getElementById(id);
let quantity=1;
const copyLines=()=>{
 const name=$('customer').value.trim();
 const when=document.querySelector('[name=when]:checked')?.value||'Consultar disponibilidade';
 const lines=['Olá! Gostaria de consultar a Lasanha+ (Casa + Sabor).','Nome: '+name,'Produto: Lasanha de 1 kg','Quantidade: '+quantity+' '+(quantity===1?'unidade':'unidades'),'Preferência: '+when,'Preço de referência informado: R$ 23–25 por unidade; favor confirmar valor final e sabores.'];
 if($('obs').value.trim())lines.push('Observações: '+$('obs').value.trim());
 lines.push('Aguardo confirmação de disponibilidade, entrega/retirada e preparo.');return lines.join('\n');
};
function validate(){if($('customer').value.trim().length<2){$('feedback').textContent='Informe seu nome para montar a solicitação.';$('customer').focus();return false;}return true;}
function render(){$('qty').textContent=String(quantity);$('estimate').textContent=quantity+' '+(quantity===1?'unidade':'unidades')+' · referência R$ '+(quantity*23)+'–'+(quantity*25)+' (a confirmar)';$('minus').disabled=quantity===1;$('plus').disabled=quantity===12;}
document.addEventListener('DOMContentLoaded',()=>{
 $('minus').addEventListener('click',()=>{quantity=Math.max(1,quantity-1);render()});
 $('plus').addEventListener('click',()=>{quantity=Math.min(12,quantity+1);render()});
 document.querySelectorAll('[data-photo]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-photo]').forEach(el=>el.setAttribute('aria-pressed',String(el===btn)));
  $('hero-photo').src=btn.dataset.photo;
  $('hero-photo').alt=btn.getAttribute('aria-label').replace('Mostrar foto','Foto')+' — imagem ilustrativa';
 }));
 $('send').addEventListener('click',()=>{if(!validate())return;window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(copyLines()),'_blank','noopener,noreferrer');$('feedback').textContent='Solicitação preparada. Selecione o contato da Lasanha+ no WhatsApp.';});
 $('copy').addEventListener('click',async()=>{
  if(!validate())return;
  try{await navigator.clipboard.writeText(copyLines());$('feedback').textContent='Solicitação copiada. Envie ao contato da Lasanha+.';}
  catch{$('feedback').textContent='Não foi possível copiar automaticamente. Use o botão do WhatsApp.';}
 });
 render();
});
})();
