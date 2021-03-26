const numBtn = document.querySelectorAll('.num');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const mathBtn = document.querySelectorAll('.math-operation');
const rightBracket = document.getElementById('left');

const expression = document.querySelector('.expression');
const result = document.querySelector('.result');

let apiExpression = '';

numBtn.forEach(btn => {
  const btnValue = btn.getAttribute('value');
  const btnText = btn.innerHTML;
  btn.addEventListener('click', () => {
    apiExpression = apiExpression + btnValue;
    expression.value += btnText;
    mathBtn.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('disabled');
    });
  });
});

mathBtn.forEach(btn => {
  const btnValue = btn.getAttribute('value');
  const btnText = btn.innerHTML;
  btn.addEventListener('click', () => {
    apiExpression += btnValue;
    expression.value += btnText;
    mathBtn.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('disabled');
    });
  });
});
clearBtn.addEventListener('click', () => {
  expression.value = ''; 
  result.value = '';
  apiExpression = '';
  mathBtn.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('disabled');
  });
});

equalBtn.addEventListener('click', () => {
  const ex = apiExpression;
  const url = 'https://api.mathjs.org/v4/' + '?expr=' + ex ;
  const xhr = new XMLHttpRequest
  xhr.open('GET', url, true);
  xhr.onload = () => {
    result.value = xhr.response;
  }
  xhr.send();
})