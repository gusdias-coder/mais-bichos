'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
const desktopMedia = window.matchMedia('(min-width: 851px)');
desktopMedia.addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const subject = link.dataset.subject;
  const message = subject
    ? `Olá, Mais Bichos! Gostaria de informações sobre ${subject} e disponibilidade de atendimento.`
    : 'Olá, Mais Bichos! Gostaria de informações sobre atendimento para meu pet e horários disponíveis.';
  link.href = `https://wa.me/5551991885679?text=${encodeURIComponent(message)}`;
});

const dialog = document.querySelector('#photo-dialog');
const dialogPhoto = document.querySelector('#dialog-photo');
const caption = document.querySelector('#photo-caption');
let lastPhotoButton = null;
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    lastPhotoButton = button;
    dialogPhoto.src = button.dataset.photo;
    dialogPhoto.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (lastPhotoButton) lastPhotoButton.focus();
  dialogPhoto.removeAttribute('src');
});
document.querySelector('#year').textContent = new Date().getFullYear();

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
filters.forEach(button => button.addEventListener("click", () => {
 filters.forEach(item => { const selected = item === button; item.setAttribute("aria-pressed", String(selected)); item.classList.toggle("active", selected); });
 let count = 0; cards.forEach(card => { card.hidden = button.dataset.filter !== "todos" && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
 document.querySelector("#filter-status").textContent = count + " serviços exibidos";
}));
