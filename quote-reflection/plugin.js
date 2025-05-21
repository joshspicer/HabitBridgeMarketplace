app.init(() => {
  // Collection of inspirational quotes with authors and reflection prompts
  const quotes = [
    {
      text: "The only way out is through.",
      author: "Robert Frost",
      prompts: [
        "How does this quote relate to challenges you're currently facing?",
        "Describe a time when perseverance led to success in your life.",
        "What emotions arise when you think about moving through difficulties instead of avoiding them?"
      ]
    },
    {
      text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
      author: "Rumi",
      prompts: [
        "How has your approach to creating change evolved over time?",
        "What's one thing you'd like to change about yourself, and why?",
        "How might focusing on personal growth lead to broader positive changes?"
      ]
    },
    {
      text: "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
      author: "Joseph Campbell",
      prompts: [
        "Describe a time when an unexpected change led to something positive.",
        "What plans are you holding onto that might be limiting you?",
        "How comfortable are you with uncertainty in your life?"
      ]
    },
    {
      text: "The quieter you become, the more you can hear.",
      author: "Ram Dass",
      prompts: [
        "When was the last time you experienced true silence?",
        "What voices or insights tend to get drowned out in your busy life?",
        "How might you create more space for quiet reflection in your daily routine?"
      ]
    },
    {
      text: "Between stimulus and response there is a space. In that space is our power to choose our response.",
      author: "Viktor Frankl",
      prompts: [
        "Describe a recent situation where you reacted automatically rather than consciously responding.",
        "How might your life be different if you paused more before responding?",
        "What practices help you create space between stimulus and response?"
      ]
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      prompts: [
        "Describe a time when you recovered from a setback or failure.",
        "What helps you persevere through challenges?",
        "How has a past failure ultimately led to growth or learning?"
      ]
    },
    {
      text: "Life is 10% what happens to you and 90% how you react to it.",
      author: "Charles R. Swindoll",
      prompts: [
        "How do you typically respond to unexpected challenges?",
        "Describe a situation where changing your reaction changed the outcome.",
        "What practices help you maintain perspective during difficult times?"
      ]
    }
  ];
  
  // Activity state
  let selectedQuote = null;
  let reflectionText = "";
  let reflectionTimer = null;
  let reflectionTimeRemaining = 0; // in seconds
  let reflectionDuration = 120; // 2 minutes by default
  const minReflectionLength = 50; // minimum characters for reflection
  
  // Select a random quote
  function selectRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    selectedQuote = quotes[randomIndex];
    
    // Select one random prompt from the quote's prompts
    const promptIndex = Math.floor(Math.random() * selectedQuote.prompts.length);
    selectedQuote.selectedPrompt = selectedQuote.prompts[promptIndex];
  }
  
  // Render the quote and prompt
  function renderQuote() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Quote Reflection</span>
      </div>
      <div class="hb-content">
        <div class="hb-quote">
          <div class="hb-quote-text">"${selectedQuote.text}"</div>
          <div class="hb-quote-author">— ${selectedQuote.author}</div>
        </div>
        <div class="hb-instructions">
          <p>Take a moment to reflect on this quote. Read it slowly a few times and consider what it means to you personally.</p>
          <p>When you're ready, click "Begin Reflection" to write your thoughts.</p>
        </div>
        <button class="hb-btn" onclick="startReflection()">Begin Reflection</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-quote { background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-quote-text { font-size: 1.2rem; font-style: italic; color: #3a4a6b; margin-bottom: 10px; line-height: 1.5; }
        .hb-quote-author { font-size: 0.9rem; color: #666; text-align: right; }
        .hb-instructions { font-size: 1rem; color: #555; line-height: 1.5; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
      </style>
    `);
  }
  
  // Render the reflection interface
  function renderReflection() {
    const minutes = Math.floor(reflectionTimeRemaining / 60);
    const seconds = reflectionTimeRemaining % 60;
    const timeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Quote Reflection</span>
      </div>
      <div class="hb-content">
        <div class="hb-quote">
          <div class="hb-quote-text">"${selectedQuote.text}"</div>
          <div class="hb-quote-author">— ${selectedQuote.author}</div>
        </div>
        <div class="hb-reflection-prompt">
          <div class="hb-prompt-text">${selectedQuote.selectedPrompt}</div>
        </div>
        <div class="hb-timer" id="timer">Remaining: ${timeDisplay}</div>
        <textarea id="reflection" class="hb-reflection-input" 
                  placeholder="Write your reflection here...">${reflectionText}</textarea>
        <div id="char-count" class="hb-char-count">0/${minReflectionLength} characters</div>
        <button class="hb-btn" id="submit-btn" onclick="submitReflection()">Submit Reflection</button>
        <div id="hb-status" class="hb-status"></div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-quote { background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-quote-text { font-size: 1.1rem; font-style: italic; color: #3a4a6b; margin-bottom: 10px; line-height: 1.5; }
        .hb-quote-author { font-size: 0.9rem; color: #666; text-align: right; }
        .hb-reflection-prompt { background: #f7f9fc; border: 1px solid #e1e8f5; border-radius: 8px; padding: 12px; }
        .hb-prompt-text { font-size: 0.95rem; color: #555; line-height: 1.5; }
        .hb-timer { color: #4F8EF7; font-size: 1rem; text-align: center; margin: 5px 0; }
        .hb-reflection-input { width: 100%; min-height: 150px; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; resize: vertical; }
        .hb-reflection-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-char-count { text-align: right; font-size: 0.8rem; color: #888; margin-top: 4px; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
      </style>
    `);
    
    // Set up character count
    const textarea = document.getElementById("reflection");
    const charCount = document.getElementById("char-count");
    const submitBtn = document.getElementById("submit-btn");
    
    function updateCharCount() {
      const count = textarea.value.length;
      charCount.textContent = `${count}/${minReflectionLength} characters`;
      
      if (count >= minReflectionLength) {
        charCount.style.color = '#27ae60';
        submitBtn.disabled = false;
      } else {
        charCount.style.color = count > 0 ? '#888' : '#e74c3c';
        submitBtn.disabled = true;
      }
      
      reflectionText = textarea.value;
    }
    
    textarea.addEventListener("input", updateCharCount);
    updateCharCount();
    textarea.focus();
  }
  
  // Render completion screen
  function renderCompletion() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Reflection Complete</span>
      </div>
      <div class="hb-content">
        <div class="hb-quote">
          <div class="hb-quote-text">"${selectedQuote.text}"</div>
          <div class="hb-quote-author">— ${selectedQuote.author}</div>
        </div>
        <div class="hb-completion-message">
          <p>Thank you for taking time to reflect. Regular reflection can help improve self-awareness, reduce stress, and bring clarity to your thoughts.</p>
        </div>
        <div class="hb-reflection-container">
          <h3>Your Reflection</h3>
          <div class="hb-reflection-text">${reflectionText.replace(/\n/g, '<br>')}</div>
        </div>
        <button class="hb-btn" onclick="finishActivity()">Complete</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-quote { background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-quote-text { font-size: 1.1rem; font-style: italic; color: #3a4a6b; margin-bottom: 10px; line-height: 1.5; }
        .hb-quote-author { font-size: 0.9rem; color: #666; text-align: right; }
        .hb-completion-message { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; }
        .hb-reflection-container { background: #f7f9fc; border: 1px solid #e1e8f5; border-radius: 8px; padding: 16px; }
        .hb-reflection-container h3 { margin-top: 0; color: #3a4a6b; font-size: 1rem; margin-bottom: 10px; }
        .hb-reflection-text { font-size: 0.95rem; color: #333; line-height: 1.5; white-space: pre-line; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 30px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; margin: 10px auto 0 auto; display: block; }
      </style>
    `);
  }
  
  // Update the timer
  function updateTimer() {
    reflectionTimeRemaining--;
    
    const minutes = Math.floor(reflectionTimeRemaining / 60);
    const seconds = reflectionTimeRemaining % 60;
    const timeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    document.getElementById('timer').textContent = `Remaining: ${timeDisplay}`;
    
    if (reflectionTimeRemaining <= 0) {
      clearInterval(reflectionTimer);
      document.getElementById('timer').textContent = "Time's up!";
    }
  }
  
  // Start the reflection timer
  window.startReflection = () => {
    reflectionTimeRemaining = reflectionDuration;
    renderReflection();
    reflectionTimer = setInterval(updateTimer, 1000);
  };
  
  // Submit reflection
  window.submitReflection = () => {
    clearInterval(reflectionTimer);
    
    const textarea = document.getElementById("reflection");
    const status = document.getElementById("hb-status");
    
    if (textarea.value.length < minReflectionLength) {
      status.textContent = `Please write at least ${minReflectionLength} characters.`;
      return;
    }
    
    reflectionText = textarea.value;
    renderCompletion();
  };
  
  // Finish the activity
  window.finishActivity = () => {
    app.complete();
  };
  
  // Initialize and start
  selectRandomQuote();
  renderQuote();
});