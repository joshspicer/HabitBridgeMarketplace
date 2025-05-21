app.init(() => {
  // Configuration
  const minCharCount = 20; // Minimum characters per entry
  const promptSuggestions = [
    "Someone who helped you recently",
    "A skill or ability you have",
    "Something beautiful you saw today",
    "A challenge you overcame",
    "A person who makes you smile",
    "A pleasant memory",
    "Something you're looking forward to",
    "A lesson you learned recently",
    "Something that made you laugh",
    "A convenience you often take for granted"
  ];
  
  // Gratitude entries
  let entries = ["", "", ""];
  let currentEntryIndex = 0;
  let promptIndices = getRandomPrompts();
  
  // Get three random prompt suggestions
  function getRandomPrompts() {
    const indices = [];
    while (indices.length < 3) {
      const randomIndex = Math.floor(Math.random() * promptSuggestions.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }
  
  // Render the entry form
  function renderEntryForm() {
    const prompt = promptSuggestions[promptIndices[currentEntryIndex]];
    
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Daily Gratitude Practice</span>
      </div>
      <div class="hb-content">
        <div class="hb-instruction">
          <p>Write about something you're grateful for today. Take a moment to really feel the gratitude as you write.</p>
          <p class="hb-suggestion">Suggestion: ${prompt}</p>
        </div>
        <div class="hb-entry-container">
          <span class="hb-entry-number">${currentEntryIndex + 1} of 3</span>
          <textarea id="gratitude-entry" class="hb-textarea" placeholder="I am grateful for..." rows="5">${entries[currentEntryIndex]}</textarea>
          <div class="hb-char-count" id="char-count">0/${minCharCount} characters</div>
        </div>
        <button class="hb-btn" id="continue-btn" onclick="saveEntry()">Continue</button>
        <div id="hb-status" class="hb-status"></div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-instruction { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-suggestion { font-style: italic; margin-top: 8px; font-size: 0.9rem; }
        .hb-entry-container { position: relative; }
        .hb-entry-number { position: absolute; top: -12px; right: 0; font-size: 0.9rem; color: #888; }
        .hb-textarea { width: 100%; min-height: 120px; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; resize: vertical; }
        .hb-textarea:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-char-count { text-align: right; font-size: 0.8rem; color: #888; margin-top: 4px; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
      </style>
    `);
    
    // Set up character count
    const textarea = document.getElementById("gratitude-entry");
    const charCount = document.getElementById("char-count");
    const continueBtn = document.getElementById("continue-btn");
    
    // Update character count and button state
    function updateCharCount() {
      const count = textarea.value.length;
      charCount.textContent = `${count}/${minCharCount} characters`;
      
      if (count >= minCharCount) {
        charCount.style.color = '#27ae60';
        continueBtn.disabled = false;
      } else {
        charCount.style.color = count > 0 ? '#888' : '#e74c3c';
        continueBtn.disabled = true;
      }
    }
    
    textarea.addEventListener("input", updateCharCount);
    updateCharCount(); // Initial count update
    textarea.focus();
  }
  
  // Save the current entry and move to next or complete
  window.saveEntry = () => {
    const textarea = document.getElementById("gratitude-entry");
    const status = document.getElementById("hb-status");
    
    if (textarea.value.length < minCharCount) {
      status.textContent = `Please write at least ${minCharCount} characters.`;
      return;
    }
    
    // Save entry
    entries[currentEntryIndex] = textarea.value;
    
    // Move to next entry or complete
    currentEntryIndex++;
    if (currentEntryIndex < 3) {
      renderEntryForm();
    } else {
      // All entries complete
      renderCompletion();
    }
  };
  
  // Render completion screen
  function renderCompletion() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Gratitude Practice Complete</span>
      </div>
      <div class="hb-content">
        <div class="hb-message">
          <p>Great job completing your gratitude practice today!</p>
          <p>Taking time to appreciate the good things in your life, both big and small, has been shown to increase happiness and well-being.</p>
        </div>
        <div class="hb-entries">
          <div class="hb-entry">
            <div class="hb-entry-label">1.</div>
            <div class="hb-entry-text">${entries[0]}</div>
          </div>
          <div class="hb-entry">
            <div class="hb-entry-label">2.</div>
            <div class="hb-entry-text">${entries[1]}</div>
          </div>
          <div class="hb-entry">
            <div class="hb-entry-label">3.</div>
            <div class="hb-entry-text">${entries[2]}</div>
          </div>
        </div>
        <button class="hb-complete-btn" onclick="completeActivity()">Complete Practice</button>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-message { font-size: 1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; }
        .hb-entries { display: flex; flex-direction: column; gap: 16px; margin: 10px 0; }
        .hb-entry { background: #f7f9fc; border: 1px solid #e1e8f5; border-radius: 8px; padding: 12px; }
        .hb-entry-label { font-weight: 600; color: #4F8EF7; margin-bottom: 8px; }
        .hb-entry-text { font-size: 0.95rem; color: #333; white-space: pre-wrap; }
        .hb-complete-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 15px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
      </style>
    `);
  }
  
  // Complete the activity
  window.completeActivity = () => {
    app.complete();
  };
  
  // Start with the first entry
  renderEntryForm();
});