app.init(() => {
  // Italian verbs with conjugations
  // Format: { 
  //   infinitive: "verb", 
  //   translation: "english",
  //   presente: { io: "form", tu: "form", lui: "form", noi: "form", voi: "form", loro: "form" },
  //   passato: { io: "form", tu: "form", lui: "form", noi: "form", voi: "form", loro: "form" }
  // }
  const verbs = [
    {
      infinitive: "essere",
      translation: "to be",
      presente: { io: "sono", tu: "sei", lui: "è", noi: "siamo", voi: "siete", loro: "sono" },
      passato: { io: "sono stato", tu: "sei stato", lui: "è stato", noi: "siamo stati", voi: "siete stati", loro: "sono stati" }
    },
    {
      infinitive: "avere",
      translation: "to have",
      presente: { io: "ho", tu: "hai", lui: "ha", noi: "abbiamo", voi: "avete", loro: "hanno" },
      passato: { io: "ho avuto", tu: "hai avuto", lui: "ha avuto", noi: "abbiamo avuto", voi: "avete avuto", loro: "hanno avuto" }
    },
    {
      infinitive: "fare",
      translation: "to do/make",
      presente: { io: "faccio", tu: "fai", lui: "fa", noi: "facciamo", voi: "fate", loro: "fanno" },
      passato: { io: "ho fatto", tu: "hai fatto", lui: "ha fatto", noi: "abbiamo fatto", voi: "avete fatto", loro: "hanno fatto" }
    },
    {
      infinitive: "andare",
      translation: "to go",
      presente: { io: "vado", tu: "vai", lui: "va", noi: "andiamo", voi: "andate", loro: "vanno" },
      passato: { io: "sono andato", tu: "sei andato", lui: "è andato", noi: "siamo andati", voi: "siete andati", loro: "sono andati" }
    },
    {
      infinitive: "venire",
      translation: "to come",
      presente: { io: "vengo", tu: "vieni", lui: "viene", noi: "veniamo", voi: "venite", loro: "vengono" },
      passato: { io: "sono venuto", tu: "sei venuto", lui: "è venuto", noi: "siamo venuti", voi: "siete venuti", loro: "sono venuti" }
    },
    {
      infinitive: "parlare",
      translation: "to speak",
      presente: { io: "parlo", tu: "parli", lui: "parla", noi: "parliamo", voi: "parlate", loro: "parlano" },
      passato: { io: "ho parlato", tu: "hai parlato", lui: "ha parlato", noi: "abbiamo parlato", voi: "avete parlato", loro: "hanno parlato" }
    },
    {
      infinitive: "mangiare",
      translation: "to eat",
      presente: { io: "mangio", tu: "mangi", lui: "mangia", noi: "mangiamo", voi: "mangiate", loro: "mangiano" },
      passato: { io: "ho mangiato", tu: "hai mangiato", lui: "ha mangiato", noi: "abbiamo mangiato", voi: "avete mangiato", loro: "hanno mangiato" }
    },
    {
      infinitive: "bere",
      translation: "to drink",
      presente: { io: "bevo", tu: "bevi", lui: "beve", noi: "beviamo", voi: "bevete", loro: "bevono" },
      passato: { io: "ho bevuto", tu: "hai bevuto", lui: "ha bevuto", noi: "abbiamo bevuto", voi: "avete bevuto", loro: "hanno bevuto" }
    },
    {
      infinitive: "vedere",
      translation: "to see",
      presente: { io: "vedo", tu: "vedi", lui: "vede", noi: "vediamo", voi: "vedete", loro: "vedono" },
      passato: { io: "ho visto", tu: "hai visto", lui: "ha visto", noi: "abbiamo visto", voi: "avete visto", loro: "hanno visto" }
    },
    {
      infinitive: "dormire",
      translation: "to sleep",
      presente: { io: "dormo", tu: "dormi", lui: "dorme", noi: "dormiamo", voi: "dormite", loro: "dormono" },
      passato: { io: "ho dormito", tu: "hai dormito", lui: "ha dormito", noi: "abbiamo dormito", voi: "avete dormito", loro: "hanno dormito" }
    },
    {
      infinitive: "leggere",
      translation: "to read",
      presente: { io: "leggo", tu: "leggi", lui: "legge", noi: "leggiamo", voi: "leggete", loro: "leggono" },
      passato: { io: "ho letto", tu: "hai letto", lui: "ha letto", noi: "abbiamo letto", voi: "avete letto", loro: "hanno letto" }
    },
    {
      infinitive: "scrivere",
      translation: "to write",
      presente: { io: "scrivo", tu: "scrivi", lui: "scrive", noi: "scriviamo", voi: "scrivete", loro: "scrivono" },
      passato: { io: "ho scritto", tu: "hai scritto", lui: "ha scritto", noi: "abbiamo scritto", voi: "avete scritto", loro: "hanno scritto" }
    },
    {
      infinitive: "dire",
      translation: "to say",
      presente: { io: "dico", tu: "dici", lui: "dice", noi: "diciamo", voi: "dite", loro: "dicono" },
      passato: { io: "ho detto", tu: "hai detto", lui: "ha detto", noi: "abbiamo detto", voi: "avete detto", loro: "hanno detto" }
    },
    {
      infinitive: "comprare",
      translation: "to buy",
      presente: { io: "compro", tu: "compri", lui: "compra", noi: "compriamo", voi: "comprate", loro: "comprano" },
      passato: { io: "ho comprato", tu: "hai comprato", lui: "ha comprato", noi: "abbiamo comprato", voi: "avete comprato", loro: "hanno comprato" }
    },
    {
      infinitive: "vendere",
      translation: "to sell",
      presente: { io: "vendo", tu: "vendi", lui: "vende", noi: "vendiamo", voi: "vendete", loro: "vendono" },
      passato: { io: "ho venduto", tu: "hai venduto", lui: "ha venduto", noi: "abbiamo venduto", voi: "avete venduto", loro: "hanno venduto" }
    },
    {
      infinitive: "correre",
      translation: "to run",
      presente: { io: "corro", tu: "corri", lui: "corre", noi: "corriamo", voi: "correte", loro: "corrono" },
      passato: { io: "ho corso", tu: "hai corso", lui: "ha corso", noi: "abbiamo corso", voi: "avete corso", loro: "hanno corso" }
    },
    {
      infinitive: "partire",
      translation: "to leave",
      presente: { io: "parto", tu: "parti", lui: "parte", noi: "partiamo", voi: "partite", loro: "partono" },
      passato: { io: "sono partito", tu: "sei partito", lui: "è partito", noi: "siamo partiti", voi: "siete partiti", loro: "sono partiti" }
    },
    {
      infinitive: "arrivare",
      translation: "to arrive",
      presente: { io: "arrivo", tu: "arrivi", lui: "arriva", noi: "arriviamo", voi: "arrivate", loro: "arrivano" },
      passato: { io: "sono arrivato", tu: "sei arrivato", lui: "è arrivato", noi: "siamo arrivati", voi: "siete arrivati", loro: "sono arrivati" }
    },
    {
      infinitive: "entrare",
      translation: "to enter",
      presente: { io: "entro", tu: "entri", lui: "entra", noi: "entriamo", voi: "entrate", loro: "entrano" },
      passato: { io: "sono entrato", tu: "sei entrato", lui: "è entrato", noi: "siamo entrati", voi: "siete entrati", loro: "sono entrati" }
    },
    {
      infinitive: "uscire",
      translation: "to go out",
      presente: { io: "esco", tu: "esci", lui: "esce", noi: "usciamo", voi: "uscite", loro: "escono" },
      passato: { io: "sono uscito", tu: "sei uscito", lui: "è uscito", noi: "siamo usciti", voi: "siete usciti", loro: "sono usciti" }
    },
    {
      infinitive: "sapere",
      translation: "to know",
      presente: { io: "so", tu: "sai", lui: "sa", noi: "sappiamo", voi: "sapete", loro: "sanno" },
      passato: { io: "ho saputo", tu: "hai saputo", lui: "ha saputo", noi: "abbiamo saputo", voi: "avete saputo", loro: "hanno saputo" }
    },
    {
      infinitive: "volere",
      translation: "to want",
      presente: { io: "voglio", tu: "vuoi", lui: "vuole", noi: "vogliamo", voi: "volete", loro: "vogliono" },
      passato: { io: "ho voluto", tu: "hai voluto", lui: "ha voluto", noi: "abbiamo voluto", voi: "avete voluto", loro: "hanno voluto" }
    },
    {
      infinitive: "dovere",
      translation: "must/to have to",
      presente: { io: "devo", tu: "devi", lui: "deve", noi: "dobbiamo", voi: "dovete", loro: "devono" },
      passato: { io: "ho dovuto", tu: "hai dovuto", lui: "ha dovuto", noi: "abbiamo dovuto", voi: "avete dovuto", loro: "hanno dovuto" }
    },
    {
      infinitive: "potere",
      translation: "can/to be able to",
      presente: { io: "posso", tu: "puoi", lui: "può", noi: "possiamo", voi: "potete", loro: "possono" },
      passato: { io: "ho potuto", tu: "hai potuto", lui: "ha potuto", noi: "abbiamo potuto", voi: "avete potuto", loro: "hanno potuto" }
    },
    {
      infinitive: "aprire",
      translation: "to open",
      presente: { io: "apro", tu: "apri", lui: "apre", noi: "apriamo", voi: "aprite", loro: "aprono" },
      passato: { io: "ho aperto", tu: "hai aperto", lui: "ha aperto", noi: "abbiamo aperto", voi: "avete aperto", loro: "hanno aperto" }
    },
    {
      infinitive: "chiudere",
      translation: "to close",
      presente: { io: "chiudo", tu: "chiudi", lui: "chiude", noi: "chiudiamo", voi: "chiudete", loro: "chiudono" },
      passato: { io: "ho chiuso", tu: "hai chiuso", lui: "ha chiuso", noi: "abbiamo chiuso", voi: "avete chiuso", loro: "hanno chiuso" }
    }
  ];
  
  // Add more verbs here to reach ~1000 verbs...
  
  // Game state variables
  let currentVerb = null;
  let currentPhase = 'translation'; // 'translation' or 'conjugation'
  let conjugationPerson = null; // 'io', 'tu', etc.
  let conjugationTense = null; // 'presente' or 'passato'
  let points = 0;
  let translationOptions = [];
  
  // Helper functions
  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function getRandomVerb() {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }
  
  function isFuzzyMatch(userAnswer, correctAnswer) {
    // Normalize strings (lowercase, remove "to " prefix, trim)
    const normalize = str => str.toLowerCase().replace(/^to\s+/, '').trim();
    const normalizedUser = normalize(userAnswer);
    
    // Handle multiple translations separated by '/' or ','
    const possibleTranslations = correctAnswer.split(/[\/,]/).map(t => normalize(t));
    
    // Check if user's answer matches any of the possible translations
    for (const translation of possibleTranslations) {
      // Check for exact match after normalization
      if (normalizedUser === translation) return true;
      
      // Check if one string contains the other
      if (normalizedUser.includes(translation) || translation.includes(normalizedUser)) return true;
    }
    
    return false;
  }
  
  function getRandomPerson() {
    const persons = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];
    return persons[Math.floor(Math.random() * persons.length)];
  }
  
  function getRandomTense() {
    return Math.random() < 0.5 ? 'presente' : 'passato';
  }
  
  function getThreeTranslationOptions(correctVerb) {
    // Get the correct translation
    const correctTranslation = correctVerb.translation;
    
    // Get two random incorrect translations
    let incorrectOptions = [];
    while (incorrectOptions.length < 2) {
      const randomVerb = getRandomVerb();
      if (randomVerb.infinitive !== correctVerb.infinitive && 
          !incorrectOptions.includes(randomVerb.translation)) {
        incorrectOptions.push(randomVerb.translation);
      }
    }
    
    // Combine and shuffle
    return shuffle([correctTranslation, ...incorrectOptions]);
  }
  
  function setupTranslationPhase() {
    currentPhase = 'translation';
    currentVerb = getRandomVerb();
    translationOptions = getThreeTranslationOptions(currentVerb);
    renderTranslationUI();
  }
  
  function setupConjugationPhase() {
    currentPhase = 'conjugation';
    conjugationPerson = getRandomPerson();
    conjugationTense = getRandomTense();
    renderConjugationUI();
  }
  
  function renderTranslationUI() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Italian Conjugation Challenge</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Choose the correct translation:</span>
          <span class="hb-word">${currentVerb.infinitive}</span>
        </div>
        <div class="hb-options">
          <button class="hb-option" onclick="checkTranslation('${translationOptions[0]}')">${translationOptions[0]}</button>
          <button class="hb-option" onclick="checkTranslation('${translationOptions[1]}')">${translationOptions[1]}</button>
          <button class="hb-option" onclick="checkTranslation('${translationOptions[2]}')">${translationOptions[2]}</button>
        </div>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">Points: ${points}/5</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; display: flex; flex-direction: column; }
        .hb-label { font-weight: 600; margin-bottom: 5px; }
        .hb-word { font-size: 1.3rem; font-weight: 600; }
        .hb-options { display: flex; flex-direction: column; gap: 10px; }
        .hb-option { background: white; color: #333; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .hb-option:hover { background: #f5faff; border-color: #4F8EF7; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
        .hb-tense { font-style: italic; color: #666; margin-top: 5px; }
        .correct-answer { margin-top: 8px; padding: 8px; background: #ffeaea; border-radius: 6px; font-size: 1.05rem; }
      </style>
    `);
  }
  
  function renderConjugationUI() {
    const tenseLabel = conjugationTense === 'presente' ? 'presente' : 'passato prossimo';
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Italian Conjugation Challenge</span>
      </div>
      <div class="hb-content">
        <div class="hb-question">
          <span class="hb-label">Conjugate this verb:</span>
          <span class="hb-word">${currentVerb.infinitive}</span>
          <span class="hb-tense">(${conjugationPerson}, ${tenseLabel})</span>
        </div>
        <input id="input" class="hb-input" placeholder="Type the conjugated form..." autocomplete="off" />
        <button class="hb-btn" onclick="checkConjugation()">Submit</button>
        <div id="hb-status" class="hb-status"></div>
        <div class="hb-progress">Points: ${points}/5</div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-question { font-size: 1.1rem; color: #4F8EF7; background: #eaf2ff; border-left: 4px solid #4F8EF7; padding: 10px 16px; border-radius: 8px; margin: 0 0 8px 0; display: flex; flex-direction: column; }
        .hb-label { font-weight: 600; margin-bottom: 5px; }
        .hb-word { font-size: 1.3rem; font-weight: 600; }
        .hb-options { display: flex; flex-direction: column; gap: 10px; }
        .hb-option { background: white; color: #333; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 12px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .hb-option:hover { background: #f5faff; border-color: #4F8EF7; }
        .hb-input { width: 100%; font-size: 1rem; border: 1.5px solid #b6c6e3; border-radius: 8px; padding: 10px 12px; outline: none; transition: border 0.2s; background: #fff; color: #2a3550; box-sizing: border-box; }
        .hb-input:focus { border-color: #4F8EF7; background: #f5faff; }
        .hb-btn { background: linear-gradient(90deg, #4F8EF7 0%, #6C63FF 100%); color: #fff; font-weight: 600; font-size: 1rem; border: none; border-radius: 8px; padding: 12px 0; margin-top: 6px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(80,120,200,0.08); transition: background 0.2s, box-shadow 0.2s; }
        .hb-btn:active { background: linear-gradient(90deg, #3a6fd8 0%, #4F8EF7 100%); box-shadow: 0 1px 4px 0 rgba(80,120,200,0.10); }
        .hb-status { min-height: 20px; font-size: 0.98rem; color: #e74c3c; text-align: center; margin-top: 4px; }
        .hb-progress { text-align: right; font-size: 0.95rem; color: #888; margin-top: 8px; }
        .hb-tense { font-style: italic; color: #666; margin-top: 5px; }
        .correct-answer { margin-top: 8px; padding: 8px; background: #ffeaea; border-radius: 6px; font-size: 1.05rem; }
      </style>
    `);
    document.getElementById("input").focus();
  }
  
  function renderCompletionUI() {
    app.renderHTML(`
      <div class="hb-header">
        <span class="hb-title">Challenge Complete!</span>
      </div>
      <div class="hb-content">
        <div class="hb-status" style="color:#27ae60;">
          Bravo! You scored all 5 points!
        </div>
      </div>
      <style>
        .hb-header { text-align: center; margin-bottom: 18px; }
        .hb-title { font-size: 1.3rem; font-weight: 700; color: #3a4a6b; letter-spacing: 0.01em; }
        .hb-content { display: flex; flex-direction: column; gap: 18px; }
        .hb-status { font-size: 1.1rem; text-align: center; margin-top: 20px; }
      </style>
    `);
    setTimeout(() => app.complete(), 1200);
  }
  
  // Global event handlers
  window.checkTranslation = (selectedTranslation) => {
    const status = document.getElementById("hb-status");
    
    // Check if the selected option is correct
    if (selectedTranslation === currentVerb.translation || isFuzzyMatch(selectedTranslation, currentVerb.translation)) {
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct! Now try conjugating this verb.";
      
      // Move to conjugation phase
      setTimeout(() => {
        setupConjugationPhase();
      }, 1000);
    } else {
      status.style.color = '#e74c3c';
      status.innerHTML = `❌ Incorrect.<br><div class="correct-answer">Correct answer: <strong>"${currentVerb.translation}"</strong></div>`;
      
      // Move to next question after delay
      setTimeout(() => {
        setupTranslationPhase();
      }, 2000);
    }
  };
  
  window.checkConjugation = () => {
    const input = document.getElementById("input");
    const status = document.getElementById("hb-status");
    
    if (!input.value.trim()) {
      status.textContent = "Please enter a conjugation.";
      return;
    }
    
    // Check the conjugation
    const correctConjugation = currentVerb[conjugationTense][conjugationPerson];
    const userAnswer = input.value.trim().toLowerCase();
    
    // Normalize strings for comparison (remove accents, special characters)
    const normalize = (str) => str.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");
    
    const normalizedCorrect = normalize(correctConjugation);
    const normalizedUser = normalize(userAnswer);
    
    if (normalizedUser === normalizedCorrect || userAnswer === correctConjugation) {
      points++;
      status.style.color = '#27ae60';
      status.textContent = "✅ Correct!";
      
      setTimeout(() => {
        if (points >= 5) {
          renderCompletionUI();
        } else {
          setupTranslationPhase();
        }
      }, 1000);
    } else {
      status.style.color = '#e74c3c';
      status.innerHTML = `❌ Incorrect.<br><div class="correct-answer">Correct answer: <strong>"${correctConjugation}"</strong></div>`;
      
      setTimeout(() => {
        setupTranslationPhase();
      }, 2000);
    }
  };
  
  // Start the game
  setupTranslationPhase();
});