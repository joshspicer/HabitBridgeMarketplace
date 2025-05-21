app.init(() => {
  // Collection of riddles with answers
  const riddles = [
    {
      q: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
      a: "candle"
    },
    {
      q: "What has keys but no locks, space but no room, and you can enter but not go in?",
      a: "keyboard"
    },
    {
      q: "What has a head, a tail, is brown, and has no legs?",
      a: "penny"
    },
    {
      q: "What gets wet while drying?",
      a: "towel"
    },
    {
      q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      a: "map"
    },
    {
      q: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      a: "m"
    },
    {
      q: "What has many keys but can't open a single lock?",
      a: "piano"
    },
    {
      q: "What has a neck but no head?",
      a: "bottle"
    }
  ];
  
  // Shuffle and pick 5 riddles
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const quiz = shuffle([...riddles]).slice(0, 5);
  let current = 0;
  let correct = 0;

  function render() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Riddles Challenge</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Riddle:</span>
          <span class="hb-word">${quiz[current].q}</span>
        </div>
        <input id="input" class="hb-input" placeholder="Enter your answer..." autocomplete="off" />
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
    
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = quiz[current].a.toLowerCase();
    
    if (userAnswer === correctAnswer) {
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
      status.textContent = `❌ Incorrect. The answer is: ${quiz[current].a}`;
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