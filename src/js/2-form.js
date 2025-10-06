const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об’єкт для збереження даних
let formData = {
  email: '',
  message: '',
};

// === 1. Завантажуємо дані з localStorage, якщо вони є ===
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

// === 2. Слухач події input ===
form.addEventListener('input', evt => {
  const { name, value } = evt.target;
  formData[name] = value.trim(); // обрізаємо пробіли
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// === 3. Слухач події submit ===
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData);

  // очищення після сабміту
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
