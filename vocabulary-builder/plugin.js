app.init(() => {
  // Collection of vocabulary words with definitions
  const vocabulary = [
    {
      word: "Ephemeral",
      definition: "Lasting for a very short time"
    },
    {
      word: "Ubiquitous",
      definition: "Present, appearing, or found everywhere"
    },
    {
      word: "Serendipity",
      definition: "The occurrence of events by chance in a happy or beneficial way"
    },
    {
      word: "Eloquent",
      definition: "Fluent or persuasive in speaking or writing"
    },
    {
      word: "Perplexed",
      definition: "Completely baffled or confused"
    },
    {
      word: "Resilient",
      definition: "Able to withstand or recover quickly from difficult conditions"
    },
    {
      word: "Tenacious",
      definition: "Tending to keep a firm hold of something; persistent"
    },
    {
      word: "Pragmatic",
      definition: "Dealing with things sensibly and realistically"
    },
    {
      word: "Insidious",
      definition: "Proceeding in a gradual, subtle way, but with harmful effects"
    },
    {
      word: "Ambivalent",
      definition: "Having mixed or contradictory feelings about something"
    },
    {
      word: "Meticulous",
      definition: "Showing great attention to detail; very careful and precise"
    },
    {
      word: "Benevolent",
      definition: "Well meaning and kindly"
    },
    {
      word: "Skeptical",
      definition: "Not easily convinced; having doubts or reservations"
    },
    {
      word: "Capricious",
      definition: "Given to sudden and unaccountable changes of mood or behavior"
    },
    {
      word: "Diligent",
      definition: "Having or showing care and conscientiousness in one's work"
    }
  ];
  
  // Game state
  let quizWords = [];
  let currentIndex = 0;
  let score = 0;
  let total = 5; // Number of words to complete
  
  // Initialize quiz
  function initQuiz() {
    // Shuffle and take 5 random vocabulary items
    const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
    quizWords = shuffled.slice(0, total);
    currentIndex = 0;
    score = 0;
  }
  
  // Generate multiple choice options including the correct answer
  function generateOptions(correctDefinition) {
    // Get 3 random incorrect definitions
    const otherDefinitions = vocabulary
      .filter(item => item.definition !== correctDefinition)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(item => item.definition);
    
    // Add correct definition and shuffle
    const options = [...otherDefinitions, correctDefinition];
    return options.sort(() => 0.5 - Math.random());
  }
  
  // Render the current question
  function renderQuestion() {
    const currentWord = quizWords[currentIndex];
    const options = generateOptions(currentWord.definition);
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Vocabulary Builder</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Word:</span>
          <span class="hb-word">${currentWord.word}</span>
        </div>
        <div class="hb-instruction">Select the correct definition:</div>
        <div class="hb-options">
          ${options.map((option, i) => `
            <button class="hb-option" onclick="selectDefinition('${encodeURIComponent(option)}')">${option}</button>
          `).join('')}
        </div>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${currentIndex + 1} / ${total}</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-label { font-weight: 600; margin-right: 8px; }
        .hb-word { font-size: 1.3rem; font-weight: 600; }
        .hb-instruction { margin-bottom: -10px; color: #555; }
        .hb-options { display: flex; flex-direction: column; gap: 10px; }
        .hb-option { background: white; color: #333; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .hb-option:hover { background: #f5faff; border-color: #4F8EF7; }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
  }
  
  // Handle option selection
  window.selectDefinition = (selectedDefinition) => {
    selectedDefinition = decodeURIComponent(selectedDefinition);
    const currentWord = quizWords[currentIndex];
    const status = document.getElementById("hb-status");
    
    // Disable clicking on options while processing
    document.querySelectorAll('.hb-option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    
    if (selectedDefinition === currentWord.definition) {
      // Correct answer
      score++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
    } else {
      // Incorrect answer
      status.style.color = '#e74c3c';
      status.textContent = `❌ Incorrect. "${currentWord.word}" means: ${currentWord.definition}`;
    }
    
    // Move to next question after delay
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < total) {
        renderQuestion();
      } else {
        // Quiz completed
        app.renderHTML(`
          <div class="hb-header">
            <span class="hb-title">Vocabulary Builder</span>
          </div>
          <div class="hb-content">
            <div class="hb-status" style="color:#27ae60; font-size: 1.1rem; margin: 10px 0;">
              You got ${score} out of ${total} correct!
            </div>
            <div class="hb-message">
              <p>Great job expanding your vocabulary!</p>
              <p>Regular practice will help you build a richer vocabulary over time.</p>
            </div>
          </div>
          <style>
            .hb-header { text-align: center; margin-bottom: 18px; }
            .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
            .hb-content { display: flex; flex-direction: column; gap: 18px; align-items: center; }
            .hb-message { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; width: 100%; box-sizing: border-box; }
          </style>
        `);
        setTimeout(() => app.complete(), 2000);
      }
    }, 1500);
  };
  
  // Initialize and start the quiz
  initQuiz();
  renderQuestion();
});