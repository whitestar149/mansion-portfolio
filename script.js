const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const toast = document.querySelector('.toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', opened);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const plans = {
  A: ['A TYPE', '3LDK / 72.48㎡', '家族が集まるLDKを中心に、生活動線をシンプルにまとめた3LDKプランです。'],
  B: ['B TYPE', '4LDK / 81.32㎡', '個室を4室確保し、子どもの成長や在宅ワークにも対応できる4LDKプランです。'],
  C: ['C TYPE', '3LDK / 75.10㎡', 'リビングとバルコニーのつながりを重視した、開放感のある3LDKプランです.']
};

document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', () => {
    const data = plans[card.dataset.plan];
    modalTitle.textContent = data[0] + ' / ' + data[1];
    modalText.textContent = data[2];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.querySelector('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.reset();
  toast.textContent = '送信デモ：お問い合わせを受け付けました。';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});
