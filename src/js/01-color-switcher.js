const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  startButton.disabled = false;
});
