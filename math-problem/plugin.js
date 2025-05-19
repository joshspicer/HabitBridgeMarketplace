app.init(() => {
  // Generate random math problems
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function makeProblem() {
    const ops = ["+", "-", "×", "÷"];
    const op = ops[randomInt(0, ops.length - 1)];
    let a, b, answer;
    if (op === "+") { a = randomInt(10, 99); b = randomInt(10, 99); answer = a + b; }
    if (op === "-") { a = randomInt(20, 99); b = randomInt(10, a); answer = a - b; }
    if (op === "×") { a = randomInt(2, 12); b = randomInt(2, 12); answer = a * b; }
    if (op === "÷") { b = randomInt(2, 12); answer = randomInt(2, 12); a = b * answer; }
    return { q: `${a} ${op} ${b}`, a: op === "÷" ? answer : answer };
  }
  const quiz = Array.from({length: 5}, makeProblem);
  let current = 0;
  let correct = 0;

  function render() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Math Problem Challenge</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Problem:</span>
          <span class="hb-word">${quiz[current].q}</span>
        </div>
        <input id="input" class="hb-input" placeholder="Enter your answer..." autocomplete="off" inputmode="numeric" />
        <button class="hb-btn" onclick="check()">Submit</button>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${current + 1} / 5</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-label { font-weight: 600; margin-right: 8px; }
        .hb-word { font-size: 1.1rem; font-weight: 600; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
    document.getElementById("input").focus();
  }

  window.check = () => {
    const input = document.getElementById("input");
    const status = document.getElementById("hb-status");
    if (!input.value.trim()) {
      status.textContent = "Please enter an answer.";
      return;
    }
    let user = input.value.trim();
    let answer = quiz[current].a;
    if (user === answer.toString()) {
      correct++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      setTimeout(() => {
        current++;
        if (current < 5) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Challenge Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of 5 correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 600);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = `❌ Incorrect. Correct answer: ${answer}`;
      setTimeout(() => {
        current++;
        if (current < 5) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Challenge Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of 5 correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 1200);
    }
  };

  render();
});
