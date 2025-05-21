app.init(() => {
  // Collection of stretches with instructions
  const stretches = [
    {
      name: "Neck Stretch",
      instructions: "1. Gently tilt your head toward your right shoulder\n2. Hold for 15 seconds\n3. Return to center\n4. Repeat on the left side",
      duration: 30, // seconds
      image: "🧘‍♀️"
    },
    {
      name: "Shoulder Rolls",
      instructions: "1. Roll your shoulders forward in circular motions\n2. Do 5 rotations\n3. Then roll backwards 5 times\n4. Repeat once more in each direction",
      duration: 30,
      image: "🙆‍♀️"
    },
    {
      name: "Wrist Stretch",
      instructions: "1. Extend your right arm forward\n2. Use your left hand to gently pull fingers back\n3. Hold for 15 seconds\n4. Repeat on the other wrist",
      duration: 30,
      image: "👐"
    },
    {
      name: "Torso Twist",
      instructions: "1. Sit up straight with feet flat on the floor\n2. Place right hand on left knee\n3. Twist torso to the left\n4. Hold for 15 seconds\n5. Repeat on other side",
      duration: 30,
      image: "🧎‍♀️"
    },
    {
      name: "Seated Forward Bend",
      instructions: "1. Sit with legs extended straight ahead\n2. Reach forward toward your toes\n3. Go only as far as comfortable\n4. Hold for 20 seconds\n5. Slowly return upright",
      duration: 30,
      image: "🙇‍♀️"
    },
    {
      name: "Ankle Circles",
      instructions: "1. Lift right foot slightly off the ground\n2. Rotate your foot in circles 5 times clockwise\n3. Then 5 times counter-clockwise\n4. Repeat with left foot",
      duration: 30,
      image: "🦶"
    }
  ];
  
  // Game state
  let currentStretchIndex = 0;
  let timerInterval = null;
  let secondsLeft = 0;
  let completed = false;
  
  // Render the intro screen
  function renderIntro() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Quick Stretch Routine</span>
      </div>
      <div class="hb-content">
        <div class="hb-instruction">
          <p>This quick stretching routine will help relieve tension and improve flexibility. You'll spend 30 seconds on each stretch for a total of 3 minutes.</p>
          <p>Find a comfortable space where you can move freely. Let's get started!</p>
        </div>
        <button class="hb-btn" onclick="startRoutine()">Begin Stretches</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-instruction { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
      </style>
    `);
  }
  
  // Render a stretch screen
  function renderStretch() {
    const stretch = stretches[currentStretchIndex];
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Quick Stretch Routine</span>
      </div>
      <div class="hb-content">
        <div class="hb-stretch-header">
          <div class="hb-stretch-name">${stretch.name}</div>
          <div class="hb-timer" id="timer">${secondsLeft}</div>
        </div>
        <div class="hb-stretch-container">
          <div class="hb-stretch-image">${stretch.image}</div>
          <div class="hb-stretch-instructions">${stretch.instructions}</div>
        </div>
        <div class="hb-progress-container">
          <div class="hb-progress-text">Stretch ${currentStretchIndex + 1} of ${stretches.length}</div>
          <div class="hb-progress-bar">
            <div class="hb-progress-fill" style="width: ${((currentStretchIndex) / stretches.length) * 100}%"></div>
          </div>
        </div>
        <button class="hb-skip-btn" onclick="skipStretch()">Skip (for injury or discomfort)</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-stretch-header { display: flex; justify-content: space-between; align-items: center; }
        .hb-stretch-name { font-size: 1.2rem; font-weight: 600; color: #4F8EF7; }
        .hb-timer { font-size: 1.5rem; font-weight: 700; color: #3a4a6b; background: #eaf2ff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; }
        .hb-stretch-container { display: flex; background: #f7f9fc; border-radius: 8px; padding: 16px; margin: 10px 0; }
        .hb-stretch-image { font-size: 3rem; margin-right: 20px; display: flex; align-items: center; }
        .hb-stretch-instructions { white-space: pre-wrap; font-size: 0.95rem; line-height: 1.5; }
        .hb-progress-container { margin-top: 10px; }
        .hb-progress-text { font-size: 0.9rem; color: #555; margin-bottom: 5px; }
        .hb-progress-bar { height: 8px; background: #e1e8f5; border-radius: 4px; overflow: hidden; }
        .hb-progress-fill { height: 100%; background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); width: 0; }
        .hb-skip-btn { background: none; border: none; color: #888; font-size: 0.9rem; margin-top: 10px; text-decoration: underline; cursor: pointer; }
      </style>
    `);
  }
  
  // Render the completion screen
  function renderCompletion() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Stretching Complete!</span>
      </div>
      <div class="hb-content">
        <div class="hb-completion-message">
          <p>Great job! You've completed your stretching routine.</p>
          <p>Taking regular stretch breaks can improve your posture, reduce muscle tension, and increase energy levels.</p>
        </div>
        <div class="hb-status" style="color:#27ae60;">All stretches completed!</div>
        <button class="hb-btn" onclick="finishActivity()">Finish</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; align-items: center; }
        .hb-completion-message { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; width: 100%; box-sizing: border-box; }
        .hb-status { font-size: 1.1rem; margin: 10px 0; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 30px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
      </style>
    `);
  }
  
  // Update the timer
  function updateTimer() {
    secondsLeft--;
    document.getElementById('timer').textContent = secondsLeft;
    
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      moveToNextStretch();
    }
  }
  
  // Move to the next stretch or complete the routine
  function moveToNextStretch() {
    currentStretchIndex++;
    
    if (currentStretchIndex < stretches.length) {
      secondsLeft = stretches[currentStretchIndex].duration;
      renderStretch();
      timerInterval = setInterval(updateTimer, 1000);
    } else {
      completed = true;
      renderCompletion();
    }
  }
  
  // Start the stretching routine
  window.startRoutine = () => {
    currentStretchIndex = 0;
    secondsLeft = stretches[currentStretchIndex].duration;
    renderStretch();
    timerInterval = setInterval(updateTimer, 1000);
  };
  
  // Skip the current stretch
  window.skipStretch = () => {
    clearInterval(timerInterval);
    moveToNextStretch();
  };
  
  // Finish the activity
  window.finishActivity = () => {
    app.complete();
  };
  
  // Initial render
  renderIntro();
});