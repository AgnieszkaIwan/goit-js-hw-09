import Notiflix from 'notiflix';

const formEl = document.getElementById('form');

formEl.addEventListener('submit', ev => {
  ev.preventDefault();

  const formData = new FormData(ev.target);
  const firstDelay = parseInt(formData.get('delay'), 10);
  const step = parseInt(formData.get('step'), 10);
  const amount = parseInt(formData.get('amount'), 10);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, firstDelay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success('✅ Fulfilled promise!');
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);

        Notiflix.Notify.failure('❌ Rejected promise!');
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
