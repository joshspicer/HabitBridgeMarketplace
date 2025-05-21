app.init(() => {
  // Collection of logic puzzles with answers and hints
  const puzzles = [
    {
      question: "If you have a cube with red, green, and blue balls, and all red balls are large, all large balls are metal, what can you conclude?",
      options: [
        "All red balls are metal",
        "All metal balls are red",
        "All large balls are red",
        "All blue balls are small"
      ],
      answer: "All red balls are metal",
      hint: "Think about the logical chain: if A → B and B → C, then A → C"
    },
    {
      question: "Five people (Alex, Blake, Casey, Dana, and Evan) are standing in a line. Blake is standing next to Dana. Casey is standing next to Evan. Alex is not standing next to either Blake or Evan. Dana is not standing next to Evan. Who is standing in the middle?",
      options: ["Alex", "Blake", "Casey", "Dana", "Evan"],
      answer: "Casey",
      hint: "Draw out all possible arrangements given the constraints"
    },
    {
      question: "There's a patch of lily pads on a lake. Every day, the patch doubles in size. If it takes 24 days to cover the entire lake, how many days would it take for the patch to cover half the lake?",
      options: ["12 days", "23 days", "22 days", "18 days"],
      answer: "23 days",
      hint: "If it doubles in size each day, then the day before being full it would be..."
    },
    {
      question: "Three friends (Frank, Georgina, and Hank) each have a different pet (cat, dog, and bird) and a different favorite color (red, blue, and green). Frank doesn't like green. The person who has a bird likes blue. Georgina has a dog. Who has the cat and what is their favorite color?",
      options: [
        "Frank, red",
        "Frank, blue",
        "Hank, green",
        "Hank, red"
      ],
      answer: "Hank, green",
      hint: "Make a grid to track the possibilities"
    },
    {
      question: "At a family dinner, there are 2 fathers, 2 mothers, 2 daughters, 1 grandfather, 1 grandmother, 2 fathers-in-law, 2 mothers-in-law, and 1 daughter-in-law. What is the minimum number of people that could be at this dinner?",
      options: ["7 people", "8 people", "10 people", "13 people"],
      answer: "7 people",
      hint: "Each person can have multiple roles"
    },
    {
      question: "Four people need to cross a bridge at night. They have only one flashlight, and the bridge can only hold two people at once. Person A can cross in 1 minute, Person B in 2 minutes, Person C in 5 minutes, and Person D in 10 minutes. When two people cross together, they move at the speed of the slower person. What's the fastest time they can all get across?",
      options: ["17 minutes", "18 minutes", "19 minutes", "21 minutes"],
      answer: "17 minutes",
      hint: "The fastest should accompany the slowest, then return"
    }
  ];
  
  // Game state
  let currentLevel = 0;
  let currentPuzzle = null;
  let showingHint = false;
  let totalPuzzlesToSolve = 3;
  let solvedPuzzles = 0;
  let selectedPuzzles = [];
  
  // Initialize game
  function initGame() {
    // Shuffle and select 3 puzzles
    const shuffled = [...puzzles].sort(() => 0.5 - Math.random());
    selectedPuzzles = shuffled.slice(0, totalPuzzlesToSolve);
    currentPuzzle = selectedPuzzles[currentLevel];
    solvedPuzzles = 0;
  }
  
  // Render the current puzzle
  function renderPuzzle() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Logic Puzzle ${currentLevel + 1}</span>
      </div>
      <div class="hb-content">
        <div class="hb-puzzle">
          <div class="hb-question">${currentPuzzle.question}</div>
          <div class="hb-options">
            ${currentPuzzle.options.map((option, index) => `
              <button class="hb-option" onclick="selectOption('${encodeURIComponent(option)}')">${option}</button>
            `).join('')}
          </div>
          <button class="hb-hint-btn ${showingHint ? 'active' : ''}" onclick="toggleHint()">${showingHint ? 'Hide Hint' : 'Show Hint'}</button>
          <div class="hb-hint ${showingHint ? 'visible' : ''}" id="hint">${currentPuzzle.hint}</div>
        </div>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">Puzzle ${currentLevel + 1} of ${totalPuzzlesToSolve}</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-puzzle { background: #f7f9fc; border-radius: 8px; padding: 16px; margin-bottom: 10px; }
        .hb-question { font-size: 1rem; color: #333; line-height: 1.5; margin-bottom: 18px; }
        .hb-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
        .hb-option { background: white; color: #333; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .hb-option:hover { background: #f5faff; border-color: #4F8EF7; }
        .hb-hint-btn { background: none; border: none; color: #4F8EF7; text-decoration: underline; cursor: pointer; padding: 5px 0; margin: 5px 0; font-size: 0.9rem; text-align: left; }
        .hb-hint-btn.active { color: #3a6fd8; }
        .hb-hint { display: none; background: #eaf2ff; padding: 10px; border-radius: 6px; color: #3a4a6b; font-size: 0.9rem; margin-top: 5px; }
        .hb-hint.visible { display: block; }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
  }
  
  // Toggle hint visibility
  window.toggleHint = () => {
    showingHint = !showingHint;
    renderPuzzle();
  };
  
  // Handle option selection
  window.selectOption = (selectedAnswer) => {
    selectedAnswer = decodeURIComponent(selectedAnswer);
    const status = document.getElementById("hb-status");
    
    // Disable all options while processing
    document.querySelectorAll('.hb-option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    
    if (selectedAnswer === currentPuzzle.answer) {
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      solvedPuzzles++;
      
      setTimeout(() => {
        currentLevel++;
        if (currentLevel < totalPuzzlesToSolve) {
          currentPuzzle = selectedPuzzles[currentLevel];
          showingHint = false;
          renderPuzzle();
        } else {
          renderCompletion();
        }
      }, 1500);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = "❌ Incorrect. Try again or use the hint.";
      
      setTimeout(() => {
        document.querySelectorAll('.hb-option').forEach(option => {
          option.style.pointerEvents = 'auto';
        });
      }, 1000);
    }
  };
  
  // Render completion screen
  function renderCompletion() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Well Done!</span>
      </div>
      <div class="hb-content">
        <div class="hb-completion-message">
          <p>You've successfully solved all ${solvedPuzzles} logic puzzles!</p>
          <p>Regular practice with logic puzzles can improve critical thinking, problem-solving skills, and cognitive flexibility.</p>
        </div>
        <button class="hb-btn" onclick="finishActivity()">Complete</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; align-items: center; }
        .hb-completion-message { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; width: 100%; box-sizing: border-box; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 30px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
      </style>
    `);
  }
  
  // Complete the activity
  window.finishActivity = () => {
    app.complete();
  };
  
  // Initialize and start the game
  initGame();
  renderPuzzle();
});