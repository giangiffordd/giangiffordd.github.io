document.addEventListener('DOMContentLoaded', function() {

  const display = document.getElementById('display-value');
  
  let currentInput = '0';
  let previousInput = '';
  let currentOperation = '';
  let shouldResetDisplay = false;
  
  function updateDisplay() {
      display.textContent = currentInput;
  }
  
  function addNumber(number) {
      if (shouldResetDisplay) {
          currentInput = number;
          shouldResetDisplay = false;
      } else {
          currentInput = currentInput === '0' ? number : currentInput + number;
      }
      updateDisplay();
  }
  
  function addDecimal() {
      if (!currentInput.includes('.')) {
          currentInput += '.';
      }
      updateDisplay();
  }
  
  function handleOperation(operation) {
      if (currentOperation !== '') {
          calculateResult();
      }
      
      previousInput = currentInput;
      currentOperation = operation;
      shouldResetDisplay = true;
  }
  
  function calculateResult() {
      let result = 0;
      const firstNum = parseFloat(previousInput);
      const secondNum = parseFloat(currentInput);
      
      switch (currentOperation) {
          case '+':
              result = firstNum + secondNum;
              break;
          case '-':
              result = firstNum - secondNum;
              break;
          case 'x':
              result = firstNum * secondNum;
              break;
          case '/':
              result = firstNum / secondNum;
              break;
          default:
              return;
      }
      
      currentInput = result.toString();
      currentOperation = '';
      updateDisplay();
  }
  

  function clearCalculator() {
      currentInput = '0';
      previousInput = '';
      currentOperation = '';
      shouldResetDisplay = false;
      updateDisplay();
  }
  
  document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function() {

          this.classList.add('active');
          setTimeout(() => this.classList.remove('active'), 100);
          
          if (this.classList.contains('hidden')) return;
          
          if (this.classList.contains('number')) {
              addNumber(this.textContent);
          } else if (this.id === 'decimal') {
              addDecimal();
          } else if (this.id === 'clear') {
              clearCalculator();
          } else if (this.id === 'equals') {
              calculateResult();
          } else if (this.classList.contains('operator')) {
              handleOperation(this.textContent);
          }
      });
  });
  
  updateDisplay();
});