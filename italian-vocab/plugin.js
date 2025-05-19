app.init(() => {
  // Italian verbs (short list for demo, can be expanded)
  const verbs = [
    { ita: "essere", eng: "to be" },
    { ita: "avere", eng: "to have" },
    { ita: "dire", eng: "to say" },
    { ita: "potere", eng: "can" },
    { ita: "volere", eng: "want" },
    { ita: "sapere", eng: "to know" },
    { ita: "stare", eng: "to stay" },
    { ita: "dovere", eng: "must" },
    { ita: "vedere", eng: "to see" },
    { ita: "andare", eng: "to go" },
    { ita: "venire", eng: "to come" },
    { ita: "dare", eng: "to give" },
    { ita: "parlare", eng: "to speak" },
    { ita: "trovare", eng: "to find" },
    { ita: "sentire", eng: "to feel, to hear" },
    { ita: "lasciare", eng: "to leave" },
    { ita: "prendere", eng: "to take" },
    { ita: "guardare", eng: "to look" },
    { ita: "mettere", eng: "to put" },
    { ita: "pensare", eng: "to think" }
  ];
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  const quiz = shuffle(verbs).slice(0, 10);
  let current = 0;
  let correct = 0;

  function render() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Italian Vocabulary Quiz</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Italian:</span>
          <span class="hb-word">${quiz[current].ita}</span>
        </div>
        <input id="input" class="hb-input" placeholder="Type the English meaning..." autocomplete="off" />
        <button class="hb-btn" onclick="check()">Submit</button>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${current + 1} / 10</div>
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
      status.textContent = "Please enter a translation.";
      return;
    }
    const answer = quiz[current].eng.toLowerCase().replace(/[^a-z ]/g, "");
    const user = input.value.trim().toLowerCase().replace(/[^a-z ]/g, "");
    if (user === answer) {
      correct++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      setTimeout(() => {
        current++;
        if (current < 10) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Quiz Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of 10 correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 600);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = `❌ Incorrect. Correct answer: ${quiz[current].eng}`;
      setTimeout(() => {
        current++;
        if (current < 10) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Quiz Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of 10 correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 1200);
    }
  };

  render();
});
