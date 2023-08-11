const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const keys = {
  lsFeedback: 'feedback-form-state',
};
const lastFeedback = JSON.parse(localStorage.getItem(keys.lsFeedback)) ?? {};

updateFeedback();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onSubmit);

function onFormInput(evt) {
  const { email, message } = evt.currentTarget.elements;

  const feedback = {
    lastEmail: `${email.value}`,
    lastMassege: `${message.value}`,
  };

  localStorage.setItem(keys.lsFeedback, JSON.stringify(feedback));
}

function onSubmit(evt) {
  evt.preventDefault();

  const { email, message } = evt.currentTarget.elements;
  console.log(`Email: ${email.value}, Message: ${message.value}`);

  form.reset();
  localStorage.removeItem(keys.lsFeedback);
}

function updateFeedback() {
  form.email.value = lastFeedback.lastEmail || '';
  form.message.textContent = lastFeedback.lastMassege || '';
}
