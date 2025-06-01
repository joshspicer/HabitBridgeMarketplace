app.init(() => {
  // Morse code mapping from existing plugin
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

  // Game state
  let currentLevel = 1;
  let playerPosition = 0;
  let targetLetter = '';
  let currentMorseInput = '';
  let levelWidth = 10;
  let levelCompleted = false;
  let totalLevels = 3;
  
  // Generate random platform layout for procedural generation
  function generateLevel(level) {
    const platforms = [];
    const width = 8 + level * 2; // Increase width with each level
    
    // Generate platforms with some gaps
    for (let i = 0; i < width; i++) {
      // Add more gaps as level increases
      const hasGap = Math.random() < (0.1 + level * 0.05);
      platforms.push(!hasGap);
    }
    
    // Ensure start and end positions always have platforms
    platforms[0] = true;
    platforms[platforms.length - 1] = true;
    
    return platforms;
  }
  
  function getRandomLetter() {
    const letters = Object.keys(morseCodeMap).filter(key => isNaN(key)); // Only letters, not numbers
    return letters[Math.floor(Math.random() * letters.length)];
  }
  
  function startNewLevel() {
    levelCompleted = false;
    playerPosition = 0;
    targetLetter = getRandomLetter();
    currentMorseInput = '';
    levelWidth = generateLevel(currentLevel).length;
    render();
  }
  
  function checkMorseInput() {
    const correctMorse = morseCodeMap[targetLetter];
    
    if (currentMorseInput === correctMorse) {
      // Correct! Move player forward
      playerPosition = Math.min(playerPosition + 2, levelWidth - 1);
      
      // Check if level completed
      if (playerPosition >= levelWidth - 1) {
        levelCompleted = true;
        if (currentLevel >= totalLevels) {
          // Game completed!
          renderCompletion();
          return;
        } else {
          currentLevel++;
          setTimeout(() => {
            startNewLevel();
          }, 1500);
        }
      } else {
        // Get new target letter
        targetLetter = getRandomLetter();
      }
      
      currentMorseInput = '';
    } else if (currentMorseInput.length >= correctMorse.length || 
               !correctMorse.startsWith(currentMorseInput)) {
      // Wrong input - move player backward
      playerPosition = Math.max(playerPosition - 1, 0);
      currentMorseInput = '';
      
      // Get new target letter after wrong answer
      targetLetter = getRandomLetter();
    }
    
    render();
  }
  
  function addDot() {
    currentMorseInput += '.';
    checkMorseInput();
  }
  
  function addDash() {
    currentMorseInput += '-';
    checkMorseInput();
  }
  
  function render() {
    const platforms = generateLevel(currentLevel);
    
    // Create platform visualization
    const platformHTML = platforms.map((hasPlatform, index) => {
      const isPlayer = index === playerPosition;
      const isGoal = index === platforms.length - 1;
      
      return `<div class="platform ${hasPlatform ? 'solid' : 'gap'} ${isPlayer ? 'player' : ''} ${isGoal ? 'goal' : ''}">
        ${isPlayer ? '🧗' : (isGoal ? '🏁' : (hasPlatform ? '▬' : '⋯'))}
      </div>`;
    }).join('');
    
    const statusMessage = levelCompleted 
      ? `🎉 Level ${currentLevel} Complete!` 
      : `Enter morse code for: ${targetLetter}`;
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Morse Code Platformer</span>
      </div>
      <div class="hb-content">
        <div class="hb-message">${statusMessage}</div>
        
        <div class="game-area">
          <div class="platforms">
            ${platformHTML}
          </div>
        </div>
        
        <div class="morse-input">
          <div class="target-info">
            <div class="target-letter">Target: <strong>${targetLetter}</strong></div>
            <div class="morse-code">Morse: <strong>${morseCodeMap[targetLetter]}</strong></div>
            <div class="current-input">Input: <strong>${currentMorseInput || '(none)'}</strong></div>
          </div>
          
          <div class="controls">
            <button class="hb-btn morse-btn" onclick="addDot()">• (Dot)</button>
            <button class="hb-btn morse-btn" onclick="addDash()">— (Dash)</button>
          </div>
        </div>
        
        <div class="hb-progress">Level ${currentLevel} of ${totalLevels} • Position: ${playerPosition + 1}/${levelWidth}</div>
      </div>
      
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-message { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; text-align: center; }
        
        .game-area { background: #f7f9fc; border-radius: 8px; padding: 20px; }
        .platforms { display: flex; gap: 8px; justify-content: center; align-items: flex-end; margin: 10px 0; }
        .platform { 
          width: 30px; 
          height: 30px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border-radius: 4px; 
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        .platform.solid { background: #2c3e50; color: white; }
        .platform.gap { background: transparent; color: #bbb; }
        .platform.player { 
          background: #27ae60 !important; 
          color: white; 
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
        }
        .platform.goal { 
          background: #f39c12 !important; 
          color: white;
        }
        
        .morse-input { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e1e8ed; }
        .target-info { margin-bottom: 16px; text-align: center; }
        .target-letter, .morse-code, .current-input { 
          margin: 4px 0; 
          font-size: 0.95rem; 
          color: #333;
        }
        .target-letter strong { color: #e74c3c; font-size: 1.1rem; }
        .morse-code strong { color: #3498db; font-family: monospace; }
        .current-input strong { color: #27ae60; font-family: monospace; }
        
        .controls { display: flex; gap: 12px; justify-content: center; }
        .morse-btn { 
          flex: 1;
          max-width: 120px;
          background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); 
          color: #fff; 
          font-weight: 600; 
          font-size: 1rem; 
          border: none; 
          border-radius: 8px; 
          padding: 12px 16px; 
          cursor: pointer; 
          box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); 
          transition: background 0.2s, box-shadow 0.2s;
        }
        .morse-btn:active { 
          background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); 
          box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); 
        }
        
        .hb-progress { text-align: center; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
  }
  
  function renderCompletion() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Morse Code Platformer Complete!</span>
      </div>
      <div class="hb-content">
        <div class="hb-status" style="color:#27ae60; text-align: center; font-size: 1.2rem;">
          🎉 Congratulations! You've completed all ${totalLevels} levels!<br>
          <span style="font-size: 1rem; color: #666; margin-top: 8px; display: block;">
            You've successfully learned morse code through platforming!
          </span>
        </div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
      </style>
    `);
    setTimeout(() => app.complete(), 2000);
  }
  
  // Make functions available globally
  window.addDot = addDot;
  window.addDash = addDash;
  
  // Start the game
  startNewLevel();
});