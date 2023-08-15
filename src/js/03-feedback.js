import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const keys = {
  lsFeedback: 'feedback-form-state',
};
let lastFeedback = JSON.parse(localStorage.getItem(keys.lsFeedback)) || {};

function updateFeedback() {
  const { email, message } = form.elements;
  email.value = lastFeedback.email || '';
  message.value = lastFeedback.message || '';
}

const throttledUpdate = throttle(updateFeedback, 500);

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onSubmit);

function onFormInput(evt) {
  const { email, message } = evt.currentTarget.elements;
  lastFeedback = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(keys.lsFeedback, JSON.stringify(lastFeedback));
  throttledUpdate();
}
function onSubmit(evt) {
  evt.preventDefault();
  console.log(lastFeedback);
  form.reset();
  localStorage.removeItem(keys.lsFeedback);
  lastFeedback = {};
  updateFeedback();
}
updateFeedback();
