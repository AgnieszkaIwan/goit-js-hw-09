import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const flatpickrInstance = flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const now = new Date();
  const timeRemaining = selectedDate - now;
  if (timeRemaining < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    // startBtn.disabled = true;
  }
  const countdown = setInterval(() => {
    const timeRemaining = selectedDate - new Date();
    if (timeRemaining < 0) {
      clearInterval(countdown);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    document.querySelector('[data-days]').textContent = days
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-hours]').textContent = hours
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-minutes]').textContent = minutes
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = seconds
      .toString()
      .padStart(2, '0');
  }, 1000);
});
