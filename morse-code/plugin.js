app.init(() => {
  // Morse code mapping
  const morseCodeMap = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.'
  };

  // Create a reverse map for testing purposes
  const reverseMorseCodeMap = {};
  for (const [key, value] of Object.entries(morseCodeMap)) {
    reverseMorseCodeMap[value] = key;
  }

  // Game state
  let current = 0;
  let correct = 0;
  const total = 10;
  
  // Generate quiz items - 10 random characters
  function getRandomKeys(obj, count) {
    const keys = Object.keys(obj);
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      result.push(keys[randomIndex]);
    }
    return result;
  }
  
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  
  const characters = shuffle(getRandomKeys(morseCodeMap, total));
  
  // Render the UI
  function render() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Morse Code Practice</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Translate this Morse code:</span>
          <span class="hb-word">${morseCodeMap[characters[current]]}</span>
        </div>
        <input id="input" class="hb-input" placeholder="Type the letter or number..." autocomplete="off" maxlength="1" />
        <button class="hb-btn" onclick="check()">Submit</button>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${current + 1} / ${total}</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-label { font-weight: 600; margin-right: 8px; }
        .hb-word { font-size: 1.1rem; font-weight: 600; letter-spacing: 2px; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; text-align: center; text-transform: uppercase; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
    document.getElementById("input").focus();
  }

  // Check answer
  window.check = () => {
    const input = document.getElementById("input");
    const status = document.getElementById("hb-status");
    
    if (!input.value.trim()) {
      status.textContent = "Please enter a letter or number.";
      return;
    }
    
    const userAnswer = input.value.trim().toUpperCase();
    const correctAnswer = characters[current];
    
    if (userAnswer === correctAnswer) {
      correct++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      setTimeout(() => {
        current++;
        if (current < total) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Practice Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of ${total} correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 600);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = `❌ Incorrect. Correct answer: ${correctAnswer}`;
      setTimeout(() => {
        current++;
        if (current < total) {
          render();
        } else {
          app.renderHTML(`<div class='hb-header'><span class='hb-title'>Practice Complete!</span></div><div class='hb-content'><div class='hb-status' style='color:#27ae60;'>You got ${correct} out of ${total} correct!</div></div>`);
          setTimeout(() => app.complete(), 1200);
        }
      }, 1200);
    }
  };

  // Initial render
  render();
});