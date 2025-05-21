app.init(() => {
  // Configuration
  const durations = [
    { label: "2 minutes", value: 120 },
    { label: "3 minutes", value: 180 },
    { label: "5 minutes", value: 300 }
  ];
  
  let selectedDuration = durations[0].value; // Default to 2 minutes
  let timerRunning = false;
  let secondsRemaining = 0;
  let breathPhase = ""; // inhale, hold, exhale
  let breathCount = 0;
  let timerInterval = null;
  
  // Render the initial selection UI
  function renderSelectionUI() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Meditation Timer</span>
      </div>
      <div class="hb-content">
        <div class="hb-instruction">
          <p>Take a moment to practice mindful breathing. Select a duration and find a comfortable position.</p>
        </div>
        <div class="hb-duration-selection">
          ${durations.map(duration => `
            <button class="hb-duration-btn ${duration.value === selectedDuration ? 'active' : ''}" 
                    onclick="selectDuration(${duration.value})">
              ${duration.label}
            </button>
          `).join('')}
        </div>
        <button class="hb-btn" id="start-btn" onclick="startMeditation()">Begin Meditation</button>
        <div id="hb-status" class="hb-status"></div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-instruction { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-duration-selection { display: flex; justify-content: center; gap: 12px; margin: 10px 0; }
        .hb-duration-btn { background: #f5f7fa; color: #3a4a6b; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 16px; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
        .hb-duration-btn:hover { border-color: #4F8EF7; background: #f5faff; }
        .hb-duration-btn.active { background: #4F8EF7; color: white; border-color: #4F8EF7; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
      </style>
    `);
  }
  
  // Render the meditation timer UI
  function renderMeditationUI() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const timeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Meditation in Progress</span>
      </div>
      <div class="hb-content">
        <div class="hb-timer">
          <div class="hb-time">${timeDisplay}</div>
          <div class="hb-breath-circle ${breathPhase}"></div>
          <div class="hb-breath-instruction">${getBreathInstruction()}</div>
        </div>
        <button class="hb-btn hb-stop-btn" onclick="stopMeditation()">End Early</button>
        <div id="hb-status" class="hb-status"></div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; align-items: center; }
        .hb-timer { display: flex; flex-direction: column; align-items: center; }
        .hb-time { font-size: 3rem; font-weight: 700; color: #3a4a6b; }
        .hb-breath-circle { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #4F8EF7; margin: 20px 0; transition: transform 4s, background-color 4s; }
        .hb-breath-circle.inhale { transform: scale(1.2); background-color: rgba(79, 142, 247, 0.1); }
        .hb-breath-circle.hold { transform: scale(1.2); background-color: rgba(79, 142, 247, 0.2); }
        .hb-breath-circle.exhale { transform: scale(1); background-color: rgba(79, 142, 247, 0); }
        .hb-breath-instruction { font-size: 1.2rem; font-weight: 500; color: #4F8EF7; margin-bottom: 20px; text-align: center; min-height: 30px; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 20px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-stop-btn { background: #f5f7fa; color: #3a4a6b; border: 1.5px solid #b6c6e3; }
        .hb-stop-btn:hover { border-color: #e74c3c; color: #e74c3c; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
      </style>
    `);
  }
  
  // Get the breath instruction based on current phase
  function getBreathInstruction() {
    switch(breathPhase) {
      case "inhale": return "Breathe In...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe Out...";
      default: return "";
    }
  }
  
  // Update the breath state
  function updateBreath() {
    breathCount = (breathCount + 1) % 12; // 12 states for a complete breath cycle
    
    if (breathCount < 4) {
      breathPhase = "inhale";
    } else if (breathCount < 6) {
      breathPhase = "hold";
    } else if (breathCount < 10) {
      breathPhase = "exhale";
    } else {
      breathPhase = "hold";
    }
  }
  
  // Timer function
  function updateTimer() {
    secondsRemaining--;
    
    // Update breath phase every 1 second
    updateBreath();
    
    if (secondsRemaining <= 0) {
      completeMeditation();
    } else {
      renderMeditationUI();
    }
  }
  
  // Complete the meditation
  function completeMeditation() {
    clearInterval(timerInterval);
    timerRunning = false;
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Meditation Complete</span>
      </div>
      <div class="hb-content">
        <div class="hb-completion-message">
          <p>Great job! You've completed your meditation practice.</p>
          <p>Take a moment to notice how you feel right now.</p>
        </div>
        <div class="hb-status" style="color:#27ae60;">Practice completed successfully!</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-completion-message { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-status { font-size: 1.1rem; color: #27ae60; text-align: center; margin-top: 20px; }
      </style>
    `);
    
    setTimeout(() => app.complete(), 3000);
  }
  
  // Handle duration selection
  window.selectDuration = (duration) => {
    selectedDuration = duration;
    renderSelectionUI();
  };
  
  // Start the meditation
  window.startMeditation = () => {
    secondsRemaining = selectedDuration;
    timerRunning = true;
    breathPhase = "inhale";
    breathCount = 0;
    
    renderMeditationUI();
    
    timerInterval = setInterval(() => {
      updateTimer();
    }, 1000);
  };
  
  // Stop the meditation early
  window.stopMeditation = () => {
    clearInterval(timerInterval);
    timerRunning = false;
    
    const elapsedTime = selectedDuration - secondsRemaining;
    
    if (elapsedTime >= 60) { // Allow completion if at least 1 minute has passed
      completeMeditation();
    } else {
      renderSelectionUI();
      document.getElementById('hb-status').textContent = "Meditation paused. Please try again when you're ready.";
    }
  };
  
  // Initial render
  renderSelectionUI();
});