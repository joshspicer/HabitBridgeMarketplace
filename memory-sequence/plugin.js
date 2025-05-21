app.init(() => {
  // Configuration
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
  const totalRounds = 3;
  let currentRound = 0;
  let sequenceLength = 3; // Start with 3, increase each round
  let currentSequence = [];
  let userSequence = [];
  let isShowingSequence = false;
  let userTurn = false;
  
  // Create the initial sequence
  function generateSequence() {
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      sequence.push({
        color: colors[colorIndex],
        shape: shapes[shapeIndex],
        index: i
      });
    }
    return sequence;
  }
  
  // Render the game UI
  function renderGame() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Memory Sequence</span>
      </div>
      <div class="hb-content">
        <div class="hb-message" id="message">Round ${currentRound + 1}: Watch the sequence carefully!</div>
        <div class="hb-shapes-container">
          ${shapes.map((shape, index) => `
            <div class="hb-shape" id="shape-${index}" data-index="${index}" onclick="selectShape(${index})">
              <div class="shape ${shape}" style="background-color: ${colors[index]}"></div>
            </div>
          `).join('')}
        </div>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">Round: ${currentRound + 1}/${totalRounds} • Length: ${sequenceLength}</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-message { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; text-align: center; }
        .hb-shapes-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 10px 0; }
        .hb-shape { width: 60px; height: 60px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: transform 0.2s; }
        .hb-shape:hover { transform: scale(1.05); }
        .shape { width: 50px; height: 50px; }
        .circle { border-radius: 50%; }
        .square { border-radius: 4px; }
        .triangle { width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid transparent; border-bottom: 43px solid currentColor; background-color: transparent !important; }
        .diamond { transform: rotate(45deg); border-radius: 4px; }
        .star { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
        .highlight { transform: scale(1.1); box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
  }
  
  // Show the sequence to the user
  function showSequence() {
    isShowingSequence = true;
    const message = document.getElementById("message");
    message.textContent = "Watch carefully!";
    
    // Disable clicking during sequence display
    document.querySelectorAll('.hb-shape').forEach(shape => {
      shape.style.pointerEvents = 'none';
    });
    
    let i = 0;
    const interval = setInterval(() => {
      if (i > 0) {
        document.getElementById(`shape-${currentSequence[i-1].index}`).classList.remove('highlight');
      }
      
      if (i < currentSequence.length) {
        document.getElementById(`shape-${currentSequence[i].index}`).classList.add('highlight');
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          document.querySelectorAll('.hb-shape').forEach(shape => {
            shape.classList.remove('highlight');
            shape.style.pointerEvents = 'auto';
          });
          startUserTurn();
        }, 500);
      }
    }, 1000);
  }
  
  // Let the user input their sequence
  function startUserTurn() {
    userTurn = true;
    userSequence = [];
    const message = document.getElementById("message");
    message.textContent = "Your turn! Repeat the sequence.";
  }
  
  // Check if the user's sequence is correct
  function checkSequence() {
    userTurn = false;
    const status = document.getElementById("hb-status");
    
    let correct = true;
    for (let i = 0; i < currentSequence.length; i++) {
      if (userSequence[i] !== currentSequence[i].index) {
        correct = false;
        break;
      }
    }
    
    if (correct) {
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct sequence!";
      
      setTimeout(() => {
        currentRound++;
        if (currentRound < totalRounds) {
          sequenceLength++; // Increase difficulty
          currentSequence = generateSequence();
          renderGame();
          setTimeout(() => showSequence(), 1000);
        } else {
          // Game completed
          app.renderHTML(`
            <div class="hb-header">
              <span class="hb-title">Memory Challenge Complete!</span>
            </div>
            <div class="hb-content">
              <div class="hb-status" style="color:#27ae60;">
                Great job! You completed all ${totalRounds} memory rounds!
              </div>
            </div>
          `);
          setTimeout(() => app.complete(), 1200);
        }
      }, 1000);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = "❌ Incorrect sequence! Try again.";
      
      setTimeout(() => {
        renderGame();
        setTimeout(() => showSequence(), 1000);
      }, 1500);
    }
  }
  
  // Handle shape selection by the user
  window.selectShape = (index) => {
    if (!userTurn) return;
    
    userSequence.push(index);
    document.getElementById(`shape-${index}`).classList.add('highlight');
    setTimeout(() => {
      document.getElementById(`shape-${index}`).classList.remove('highlight');
    }, 300);
    
    if (userSequence.length === currentSequence.length) {
      setTimeout(() => checkSequence(), 500);
    }
  };
  
  // Initialize the game
  currentSequence = generateSequence();
  renderGame();
  setTimeout(() => showSequence(), 1000);
});