app.init(() => {
  // Database of geography questions
  const questions = [
    {
      q: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      a: "Paris"
    },
    {
      q: "Which mountain is the tallest in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      a: "Mount Everest"
    },
    {
      q: "Which country has the largest land area?",
      options: ["Canada", "China", "United States", "Russia"],
      a: "Russia"
    },
    {
      q: "What is the capital of Japan?",
      options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
      a: "Tokyo"
    },
    {
      q: "Which continent is the driest inhabited continent on Earth?",
      options: ["Africa", "Asia", "Australia", "South America"],
      a: "Australia"
    },
    {
      q: "What is the capital of Brazil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      a: "Brasília"
    },
    {
      q: "Which of these countries is NOT in Europe?",
      options: ["Turkey", "Egypt", "Croatia", "Greece"],
      a: "Egypt"
    },
    {
      q: "What is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      a: "Nile River"
    },
    {
      q: "Which country is known as the Land of a Thousand Lakes?",
      options: ["Canada", "Sweden", "Finland", "Norway"],
      a: "Finland"
    },
    {
      q: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      a: "Canberra"
    }
  ];
  
  // Game state
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  
  // Shuffle and select 5 random questions
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  currentQuestions = shuffleArray([...questions]).slice(0, 5);
  
  // Render the current question
  function renderQuestion() {
    const question = currentQuestions[currentIndex];
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Geography Quiz</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-word">${question.q}</span>
        </div>
        <div class="hb-options">
          ${question.options.map((option, idx) => `
            <button class="hb-option" onclick="selectAnswer('${option}')">${option}</button>
          `).join('')}
        </div>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">${currentIndex + 1} / 5</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-word { font-size: 1.1rem; font-weight: 600; }
        .hb-options { display: flex; flex-direction: column; gap: 10px; }
        .hb-option { background: white; color: #333; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .hb-option:hover { background: #f5faff; border-color: #4F8EF7; }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
      </style>
    `);
  }
  
  // Handle answer selection
  window.selectAnswer = (selectedOption) => {
    const correctAnswer = currentQuestions[currentIndex].a;
    const status = document.getElementById("hb-status");
    
    // Disable clicking on options while processing
    document.querySelectorAll('.hb-option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    
    if (selectedOption === correctAnswer) {
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      score++;
    } else {
      status.style.color = '#e74c3c';
      status.textContent = `❌ Incorrect. The correct answer is: ${correctAnswer}`;
    }
    
    // Move to next question after delay
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < currentQuestions.length) {
        renderQuestion();
      } else {
        // Quiz completed
        app.renderHTML(`
          <div class="hb-header">
            <span class="hb-title">Quiz Complete!</span>
          </div>
          <div class="hb-content">
            <div class="hb-status" style="color:#27ae60; font-size: 1.1rem;">
              You scored ${score} out of 5!
            </div>
            ${score >= 3 ? 
              '<div class="hb-message">Great job with your geography knowledge!</div>' : 
              '<div class="hb-message">Keep learning about our world\'s geography!</div>'
            }
          </div>
          <style>
            .hb-header { text-align: center; margin-bottom: 18px; }
            .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
            .hb-content { display: flex; flex-direction: column; gap: 18px; align-items: center; }
            .hb-status { margin: 15px 0; }
            .hb-message { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; }
          </style>
        `);
        setTimeout(() => app.complete(), 2000);
      }
    }, 1500);
  };
  
  // Start the quiz
  renderQuestion();
});