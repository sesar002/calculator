const numBtn = document.querySelectorAll('.num');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const mathBtn = document.querySelectorAll('.math-operation');
const leftBracket = document.getElementById('left');
const rightBracket = document.getElementById('right');

const expression = document.querySelector('.expression');
const result = document.querySelector('.result');

let apiExpression = '';



const btnEnable = () => {
  mathBtn.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('disabled');
  });
  equalBtn.disabled = false;
  equalBtn.classList.remove('disabled');
};

const btnDisable = () => {
  mathBtn.forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');
  });
  equalBtn.disabled = true;
  equalBtn.classList.add('disabled');
}

numBtn.forEach(btn => {
  const btnValue = btn.getAttribute('value');
  const btnText = btn.innerHTML;
  btn.addEventListener('click', () => {
    apiExpression += btnValue;
    expression.value += btnText;
    btnEnable();
  });
});

mathBtn.forEach(btn => {
  const btnValue = btn.getAttribute('value');
  const btnText = btn.innerHTML;
  btn.addEventListener('click', () => {
    apiExpression += btnValue;
    expression.value += btnText;
    btnDisable();
  });
});

clearBtn.addEventListener('click', () => {
  expression.value = ''; 
  result.value = '';
  apiExpression = '';
  btnEnable();
});

equalBtn.addEventListener('click', () => {
  const ex = apiExpression;
  const url = 'https://api.mathjs.org/v4/' + '?expr=' + ex ;
  const xhr = new XMLHttpRequest
  xhr.open('GET', url, true);
  xhr.onload = () => {
    if(xhr.status === 200) {
      result.value = xhr.response;
    }else {
      result.value = 'ERROR';
    }
  }
  xhr.send();
})