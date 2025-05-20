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

  // Audio context for Morse code sounds
  let audioContext;
  
  // Initialize Web Audio API
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  // Play a Morse code sound
  function playMorseCode(code) {
    initAudio();
    
    const dot = 80; // Duration of a dot in ms
    const dash = dot * 3; // Duration of a dash
    const symbolSpace = dot; // Space between symbols (dots/dashes)
    const frequency = 700; // Frequency of the tone in Hz
    
    let time = audioContext.currentTime;
    
    // Loop through each character in the code
    for (let i = 0; i < code.length; i++) {
      const symbol = code[i];
      const duration = symbol === '.' ? dot : dash;
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Schedule the beep
      oscillator.start(time);
      oscillator.stop(time + duration / 1000);
      
      // Move time pointer forward
      time += duration / 1000;
      
      // Add space between symbols if not the last one
      if (i < code.length - 1) {
        time += symbolSpace / 1000;
      }
    }
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
  
  // Play current Morse code
  function playCurrentMorseCode() {
    const code = morseCodeMap[characters[current]];
    playMorseCode(code);
  }
  
  // Render the UI
  function render() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Morse Code Practice</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Translate this Morse code:</span>
          <div class="hb-morse-container">
            <span class="hb-word">${morseCodeMap[characters[current]]}</span>
            <button class="hb-audio-btn" onclick="playSound()" aria-label="Play Morse code sound">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 9C14.5 9 16 10.5 16 12C16 13.5 14.5 15 14.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18 6C18 6 21 8 21 12C21 16 18 18 18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 10.5V13.5C3 14.6046 3.5 15 4.5 15H7.5L12.5 19V5L7.5 9H4.5C3.5 9 3 9.5 3 10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
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
        .hb-label { font-weight: 600; margin-right: 8px; display: block; margin-bottom: 6px; }
        .hb-morse-container { display: flex; align-items: center; gap: 12px; }
        .hb-word { font-size: 1.1rem; font-weight: 600; letter-spacing: 2px; }
        .hb-audio-btn { background: #4F8EF7; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 0; }
        .hb-audio-btn:hover { background: #4080e3; }
        .hb-audio-btn:active { background: #3a6fd8; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; text-align: center; text-transform: uppercase; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
    document.getElementById("input").focus();
    
    // Play the morse code sound after a slight delay
    setTimeout(() => {
      playCurrentMorseCode();
    }, 300);
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
  
  // Play sound function available globally
  window.playSound = () => {
    playCurrentMorseCode();
  };

  // Initial render
  render();
});