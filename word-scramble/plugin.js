app.init(() => {
  // Word database with categories for hints
  const wordDatabase = [
    { word: "APPLE", category: "Fruit" },
    { word: "PIANO", category: "Musical Instrument" },
    { word: "BEACH", category: "Place" },
    { word: "TIGER", category: "Animal" },
    { word: "CLOUD", category: "Weather" },
    { word: "DANCE", category: "Activity" },
    { word: "LEMON", category: "Fruit" },
    { word: "PHONE", category: "Device" },
    { word: "FLUTE", category: "Musical Instrument" },
    { word: "OCEAN", category: "Nature" },
    { word: "EARTH", category: "Planet" },
    { word: "MUSIC", category: "Art" },
    { word: "GRAPE", category: "Fruit" },
    { word: "DREAM", category: "Abstract" },
    { word: "FROST", category: "Weather" },
    { word: "WHALE", category: "Animal" },
    { word: "HOUSE", category: "Building" },
    { word: "RIVER", category: "Nature" },
    { word: "EAGLE", category: "Bird" },
    { word: "KNIFE", category: "Tool" }
  ];
  
  // Game state
  let gameWords = [];
  let currentIndex = 0;
  let correct = 0;
  
  // Shuffle letters in a word
  function scrambleWord(word) {
    const letters = word.split('');
    
    // Keep shuffling until word is different from original
    let scrambled;
    do {
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      scrambled = letters.join('');
    } while (scrambled === word);
    
    return scrambled;
  }
  
  // Select random words from database
  function selectRandomWords(count) {
    const shuffled = [...wordDatabase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Initialize game
  function initGame() {
    const selectedWords = selectRandomWords(5);
    gameWords = selectedWords.map(item => ({
      original: item.word,
      scrambled: scrambleWord(item.word),
      category: item.category
    }));
    currentIndex = 0;
    correct = 0;
  }
  
  // Render current word scramble
  function renderScramble() {
    const current = gameWords[currentIndex];
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Word Scramble</span>
      </div>
      <div class="hb-content">
        <div class="hb-scramble">
          <div class="hb-scrambled-word">${current.scrambled}</div>
          <div class="hb-category">Category: ${current.category}</div>
        </div>
        <input id="input" class="hb-input" placeholder="Enter the unscrambled word..." autocomplete="off" />
        <button class="hb-btn" onclick="checkWord()">Submit</button>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${currentIndex + 1} / 5</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-scramble { background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 16px; border-radius: 8px; margin: 0 0 8px 0; text-align: center; }
        .hb-scrambled-word { font-size: 1.8rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.2em; margin-bottom: 8px; }
        .hb-category { font-size: 0.9rem; color: #666; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; text-transform: uppercase; text-align: center; letter-spacing: 0.1em; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
    document.getElementById("input").focus();
  }
  
  // Check user's answer
  window.checkWord = () => {
    const input = document.getElementById("input");
    const status = document.getElementById("hb-status");
    
    if (!input.value.trim()) {
      status.textContent = "Please enter a word.";
      return;
    }
    
    const userAnswer = input.value.trim().toUpperCase();
    const correctAnswer = gameWords[currentIndex].original;
    
    if (userAnswer === correctAnswer) {
      correct++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      
      setTimeout(() => {
        currentIndex++;
        if (currentIndex < gameWords.length) {
          renderScramble();
        } else {
          // Game completed
          app.renderHTML(`
            <div class="hb-header">
              <span class="hb-title">Challenge Complete!</span>
            </div>
            <div class="hb-content">
              <div class="hb-status" style="color:#27ae60; font-size: 1.1rem; margin: 20px 0;">
                You solved ${correct} out of 5 word scrambles!
              </div>
            </div>
          `);
          setTimeout(() => app.complete(), 1500);
        }
      }, 800);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = "❌ Incorrect. Try again!";
      input.value = "";
      input.focus();
    }
  };
  
  // Initialize and start game
  initGame();
  renderScramble();
});