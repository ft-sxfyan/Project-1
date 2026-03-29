 let current = '0';
    let prev = '';
    let operator = '';
    let justCalc = false;

    const mainDisplay = document.getElementById('mainDisplay');
    const exprDisplay = document.getElementById('expr');

    function updateDisplay() {
      mainDisplay.textContent = current;
      mainDisplay.className = 'display-main' + (current.length > 9 ? ' small' : '');
    }

    function inputNum(n) {
      if (justCalc) { current = n; justCalc = false; }
      else current = current === '0' ? n : current + n;
      if (current.length > 14) return;
      updateDisplay();
    }

    function inputDot() {
      if (justCalc) { current = '0.'; justCalc = false; updateDisplay(); return; }
      if (!current.includes('.')) current += '.';
      updateDisplay();
    }

    function inputOp(op) {
      if (operator && !justCalc) calculate(true);
      prev = current;
      operator = op;
      justCalc = true;
      const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+', '%': '%' };
      exprDisplay.textContent = prev + ' ' + (symbols[op] || op);
    }

    function calculate(chain = false) {
      if (!operator || !prev) return;
      let a = parseFloat(prev);
      let b = parseFloat(current);
      let result;
      if (operator === '+') result = a + b;
      else if (operator === '-') result = a - b;
      else if (operator === '*') result = a * b;
      else if (operator === '/') result = b === 0 ? 'ERR' : a / b;
      else if (operator === '%') result = a % b;

      const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+', '%': '%' };
      if (!chain) exprDisplay.textContent = prev + ' ' + (symbols[operator] || operator) + ' ' + current + ' =';

      current = result === 'ERR' ? 'ERR' : String(parseFloat(result.toFixed(10)));
      if (!chain) operator = '';
      justCalc = true;
      updateDisplay();
    }

    function clearAll() {
      current = '0'; prev = ''; operator = ''; justCalc = false;
      exprDisplay.textContent = '';
      updateDisplay();
    }

    function clearEntry() {
      current = current.length > 1 ? current.slice(0, -1) : '0';
      updateDisplay();
    }

    function toggleSign() {
      current = String(parseFloat(current) * -1);
      updateDisplay();
    }

    document.addEventListener('keydown', e => {
      if (e.key >= '0' && e.key <= '9') inputNum(e.key);
      else if (e.key === '.') inputDot();
      else if (e.key === '+') inputOp('+');
      else if (e.key === '-') inputOp('-');
      else if (e.key === '*') inputOp('*');
      else if (e.key === '/') { e.preventDefault(); inputOp('/'); }
      else if (e.key === 'Enter' || e.key === '=') calculate();
      else if (e.key === 'Backspace') clearEntry();
      else if (e.key === 'Escape') clearAll();
    });