app.init(() => {
  const sentence = "The quick brown fox";
  let startTime = null;

  app.renderHTML(`
    <div class="hb-header">
      <span class="hb-title">Typing Speed Challenge</span>
    </div>
    <div class="hb-content">
      <blockquote class="hb-blockquote">${sentence}</blockquote>
      <textarea id="input" class="hb-input" placeholder="Type the sentence above..."></textarea>
      <button class="hb-btn" onclick="check()">Submit</button>
      <div id="hb-status" class="hb-status"></div>
    </div>
    <style>
      .hb-header {
        text-align: center;
        margin-bottom: 18px;
      }
      .hb-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: #3a4a6b;
        letter-spacing: 0.01em;
      }
      .hb-content {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .hb-blockquote {
        font-size: 1.1rem;
        color: #4F8EF7;
        background: #eaf2ff;
        border-left: 4px solid #4F8EF7;
        padding: 10px 16px;
        border-radius: 8px;
        margin: 0 0 8px 0;
      }
      .hb-input {
        width: 100%;
        min-height: 60px;
        font-size: 1rem;
        border: 1.5px solid #b6c6e3;
        border-radius: 8px;
        padding: 10px 12px;
        outline: none;
        transition: border 0.2s;
        background: #fff;
        color: #2a3550;
        box-sizing: border-box;
        resize: none;
      }
      .hb-input:focus {
        border-color: #4F8EF7;
        background: #f5faff;
      }
      .hb-btn {
        background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%);
        color: #fff;
        font-weight: 600;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        padding: 12px 0;
        margin-top: 6px;
        cursor: pointer;
        box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08);
        transition: background 0.2s, box-shadow 0.2s;
      }
      .hb-btn:active {
        background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%);
        box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10);
      }
      .hb-status {
        min-height: 20px;
        font-size: 0.98rem;
        color: #e74c3c;
        text-align: center;
        margin-top: 4px;
      }
    </style>
  `);

  const input = document.getElementById("input");
  const status = document.getElementById("hb-status");
  input.addEventListener("focus", () => {
    if (!startTime) startTime = Date.now();
    status.textContent = "";
  });

  window.check = () => {
    if (input.value.trim() === sentence) {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      status.style.color = '#27ae60';
      status.textContent = `✅ Success! Time: ${timeTaken}s`;
      setTimeout(() => app.complete(), 800);
    } else {
      status.style.color = '#e74c3c';
      status.textContent = "❌ Try again. Make sure your text matches exactly.";
    }
  };
});
