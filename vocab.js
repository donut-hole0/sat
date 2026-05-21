// SAT Prep — Vocabulary Page

import { appState, saveState } from '../main.js';
import { vocabWords, wordParts, transitions } from '../data/vocab.js';

let activeTab = 'vocab'; // 'vocab', 'parts', 'transitions'
let searchQuery = '';
let selectedPos = 'all'; // 'all', 'noun', 'verb', 'adj', 'adv'
let selectedLevel = 'all'; // 'all', '1', '2', '3'
let selectedWord = null; // Currently clicked word for detail view

// Flashcard / Practice state
let isPracticing = false;
let practiceSet = [];
let practiceIndex = 0;
let practiceFlipped = false;

// Quiz state
let isQuizActive = false;
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let selectedQuizAnswer = null;
let isAnswerSubmitted = false;

export function render() {
  if (activeTab === 'parts') {
    return renderWordParts();
  }
  if (activeTab === 'transitions') {
    return renderTransitions();
  }

  // Active tab is 'vocab'
  return renderVocab();
}

function renderVocab() {
  // Track flagged words in appState
  if (!appState.flaggedWords) appState.flaggedWords = {};

  // Filter vocabulary words
  const filteredWords = vocabWords.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPos = selectedPos === 'all' || item.pos === selectedPos;
    const matchesLevel = selectedLevel === 'all' || item.level.toString() === selectedLevel;
    return matchesSearch && matchesPos && matchesLevel;
  });

  // Daily Vocab Goal details
  const dailyCompleted = appState.dailyGoal.completed || 0;
  const dailyTarget = appState.dailyGoal.target || 15;
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (Math.min(100, (dailyCompleted / dailyTarget) * 100) / 100) * circumference;

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">SAT Vocabulary</h1>
      <p class="text-muted">Master high-yield words, roots, and transitional terms to dominate the Reading & Writing section.</p>
    </div>

    <!-- Tab Bar -->
    <div class="tab-bar">
      <button class="tab-item ${activeTab === 'vocab' ? 'active' : ''}" id="tab-vocab">Vocabulary List</button>
      <button class="tab-item ${activeTab === 'parts' ? 'active' : ''}" id="tab-parts">Roots & Word Parts</button>
      <button class="tab-item ${activeTab === 'transitions' ? 'active' : ''}" id="tab-transitions">Transitions Matrix</button>
    </div>

    <!-- Main Container -->
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: var(--space-6); align-items: start;">
      
      <!-- Left Panel: Vocab List with Search & Filters -->
      <div class="card" style="min-height: 500px;">
        <div style="display:flex; justify-content: space-between; align-items: center;" class="mb-4">
          <h3 class="card-title">Vocab Directory (${filteredWords.length} words found)</h3>
        </div>

        <!-- Search and Filters row -->
        <div class="flex flex-col gap-3 mb-5">
          <div class="search-input">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="vocab-search" placeholder="Search words or definitions..." value="${searchQuery}">
          </div>

          <div class="filter-bar" style="margin-bottom:0;">
            <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted);">PART OF SPEECH:</span>
            <span class="filter-pill ${selectedPos === 'all' ? 'active' : ''}" data-pos="all">All</span>
            <span class="filter-pill ${selectedPos === 'noun' ? 'active' : ''}" data-pos="noun">Nouns</span>
            <span class="filter-pill ${selectedPos === 'verb' ? 'active' : ''}" data-pos="verb">Verbs</span>
            <span class="filter-pill ${selectedPos === 'adj' ? 'active' : ''}" data-pos="adj">Adjectives</span>
            <span class="filter-pill ${selectedPos === 'adv' ? 'active' : ''}" data-pos="adv">Adverbs</span>
          </div>

          <div class="filter-bar" style="margin-bottom:0;">
            <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted);">DIFFICULTY LEVEL:</span>
            <span class="filter-pill ${selectedLevel === 'all' ? 'active' : ''}" data-level="all">All Levels</span>
            <span class="filter-pill ${selectedLevel === '1' ? 'active' : ''}" data-level="1">Basic (L1)</span>
            <span class="filter-pill ${selectedLevel === '2' ? 'active' : ''}" data-level="2">Intermediate (L2)</span>
            <span class="filter-pill ${selectedLevel === '3' ? 'active' : ''}" data-level="3">Advanced (L3)</span>
          </div>
        </div>

        <!-- Word Grid -->
        <div class="word-grid">
          ${filteredWords.slice(0, 75).map(item => {
            const isFlagged = !!appState.flaggedWords[item.word];
            return `
              <div class="word-card ${isFlagged ? 'flagged' : ''}" data-word="${item.word}">
                <div style="display:flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: var(--font-size-md);">${item.word}</span>
                  <span class="badge badge-gray" style="font-size: 0.65rem; text-transform: uppercase;">${item.pos}</span>
                </div>
              </div>
            `;
          }).join('')}
          ${filteredWords.length > 75 ? `
            <div style="grid-column: span 3; text-align: center; color: var(--color-text-muted); font-size: var(--font-size-sm); padding: var(--space-4);">
              Showing first 75 words. Refine search to see more.
            </div>
          ` : ''}
          ${filteredWords.length === 0 ? `
            <div style="grid-column: span 3; text-align: center; color: var(--color-text-muted); padding: var(--space-8);">
              No vocabulary words match your search criteria.
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Right Panel: Practice Workspace / Detail Sidebar -->
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        
        <!-- Detailed Word Viewer Card -->
        <div class="card" id="word-detail-container" style="${selectedWord ? '' : 'display:none;'} background: linear-gradient(135deg, var(--color-blue-light), white);">
          ${selectedWord ? `
            <div style="display:flex; justify-content: space-between; align-items: flex-start;" class="mb-4">
              <div>
                <h2 style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-blue-dark); text-transform: capitalize; margin: 0;">${selectedWord.word}</h2>
                <div style="display: flex; gap: var(--space-2); margin-top: var(--space-1);">
                  <span class="badge badge-blue" style="text-transform: uppercase;">${selectedWord.pos}</span>
                  <span class="badge badge-primary">Level ${selectedWord.level}</span>
                </div>
              </div>
              <button class="btn btn-secondary btn-icon" id="flag-word-btn" style="color: ${appState.flaggedWords[selectedWord.word] ? 'var(--color-warning)' : 'var(--color-text-muted)'}; background: transparent; border: none;" title="Flag this word">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="${appState.flaggedWords[selectedWord.word] ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            </div>
            <div class="mb-4">
              <h4 style="font-weight:700; color: var(--color-text-primary); font-size: var(--font-size-sm);">DEFINITION</h4>
              <p style="font-size: var(--font-size-base); color: var(--color-text-secondary); line-height: 1.6;">${selectedWord.definition}</p>
            </div>
            <div class="mb-4">
              <h4 style="font-weight:700; color: var(--color-text-primary); font-size: var(--font-size-sm);">SENTENCE IN CONTEXT</h4>
              <p style="font-size: var(--font-size-base); color: var(--color-text-secondary); font-style: italic; border-left: 3px solid var(--color-blue); padding-left: var(--space-3); line-height:1.6;">"${selectedWord.example}"</p>
            </div>
          ` : ''}
        </div>

        <!-- Daily Goal Tracker Widget -->
        <div class="card flex justify-between items-center">
          <div>
            <h4 class="card-title mb-1">Vocab Goal</h4>
            <p class="text-muted text-xs mb-3">Goal: <strong>${dailyTarget}</strong> words studied</p>
            <button class="btn btn-primary btn-sm" id="log-vocab-btn">+ Mark 1 Learned</button>
          </div>
          <div class="progress-ring-container">
            <svg class="progress-ring" width="60" height="60">
              <circle class="progress-ring-bg" cx="30" cy="30" r="${r}" stroke-width="4" />
              <circle class="progress-ring-fill" cx="30" cy="30" r="${r}" stroke-width="4"
                stroke-dasharray="${circumference}" 
                stroke-dashoffset="${strokeDashoffset}" />
            </svg>
            <div class="progress-ring-text">
              <span class="progress-ring-value" style="font-size: var(--font-size-sm);">${dailyCompleted}</span>
            </div>
          </div>
        </div>

        <!-- Practice / Flashcards Workspace Widget -->
        <div class="card" style="background: linear-gradient(135deg, var(--color-dark-card), #243346); color: white;">
          ${renderPracticeWorkspace()}
        </div>

        <!-- Quiz Workspace Widget -->
        <div class="card">
          ${renderQuizWorkspace()}
        </div>

      </div>

    </div>
  `;
}

function renderPracticeWorkspace() {
  if (!isPracticing) {
    return `
      <h3 class="card-title" style="color: white; margin-bottom: var(--space-2);">Flashcard Practice</h3>
      <p class="text-sm" style="color: rgba(255,255,255,0.7); line-height:1.5; margin-bottom: var(--space-4);">Review vocabulary words in active recall flashcards. Select a subset size to begin:</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        <button class="btn btn-secondary btn-sm start-practice-btn" data-size="5" style="color:white; border-color: rgba(255,255,255,0.2);">5 Words</button>
        <button class="btn btn-secondary btn-sm start-practice-btn" data-size="10" style="color:white; border-color: rgba(255,255,255,0.2);">10 Words</button>
        <button class="btn btn-secondary btn-sm start-practice-btn" data-size="15" style="color:white; border-color: rgba(255,255,255,0.2);">15 Words</button>
      </div>
    `;
  }

  const currentItem = practiceSet[practiceIndex];
  if (!currentItem) return `<p>Loading...</p>`;

  return `
    <div style="display:flex; justify-content: space-between; align-items: center;" class="mb-4">
      <span class="badge badge-primary">Flashcard ${practiceIndex + 1}/${practiceSet.length}</span>
      <button class="btn btn-sm" id="stop-practice-btn" style="color: white; background: transparent; border: none;">Quit</button>
    </div>

    <!-- Flip Card Container -->
    <div id="flashcard-box" style="height: 160px; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 2px dashed rgba(255,255,255,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: var(--space-4); cursor: pointer; transition: all 0.3s; margin-bottom: var(--space-4);">
      ${!practiceFlipped ? `
        <span style="font-size: var(--font-size-2xl); font-weight: 800; text-transform: capitalize; color: var(--color-primary);">${currentItem.word}</span>
        <span class="text-xs text-muted mt-2">(Click card to reveal definition)</span>
      ` : `
        <span style="font-weight: 700; font-size: var(--font-size-sm); color: var(--color-primary); text-transform: uppercase;">${currentItem.pos}</span>
        <p style="font-size: var(--font-size-sm); color: white; margin-top: var(--space-2); line-height: 1.5;">${currentItem.definition}</p>
        <p style="font-size: var(--font-size-xs); color: rgba(255,255,255,0.5); font-style: italic; margin-top: var(--space-2);">"${currentItem.example}"</p>
      `}
    </div>

    <div class="flex gap-2">
      <button class="btn btn-secondary btn-sm flex-1" id="practice-fail-btn" style="color: white; border-color: rgba(255,255,255,0.2);">Keep Reviewing</button>
      <button class="btn btn-primary btn-sm flex-1" id="practice-pass-btn">Got It! ✓</button>
    </div>
  `;
}

function renderQuizWorkspace() {
  if (!isQuizActive) {
    return `
      <h3 class="card-title mb-2">Vocab Definition Quiz</h3>
      <p class="text-muted text-sm mb-4">Challenge yourself with a rapid 5-question test on active vocabulary.</p>
      <button class="btn btn-blue w-full" id="start-quiz-btn">Start 5-Word Quiz</button>
    `;
  }

  const currentQ = quizQuestions[quizIndex];
  if (!currentQ) return `<p>Generating...</p>`;

  return `
    <div style="display:flex; justify-content: space-between; align-items: center;" class="mb-4">
      <span class="badge badge-blue">Question ${quizIndex + 1}/5</span>
      <span class="badge badge-gray">Score: ${quizScore}/${quizIndex}</span>
    </div>

    <div class="mb-4">
      <h4 style="font-weight: 700;" class="mb-2">What is the correct definition of:</h4>
      <div style="font-size: var(--font-size-xl); font-weight: 800; color: var(--color-blue-dark); text-transform: capitalize;" class="mb-3">${currentQ.word}</div>
    </div>

    <div class="answer-options flex flex-col gap-2 mb-4">
      ${currentQ.choices.map((choice, i) => {
        let optionClass = 'answer-option';
        let checkSymbol = String.fromCharCode(65 + i); // A, B, C, D
        
        if (isAnswerSubmitted) {
          if (i === currentQ.correctAnswer) {
            optionClass += ' correct';
          } else if (selectedQuizAnswer === i) {
            optionClass += ' incorrect';
          }
        } else if (selectedQuizAnswer === i) {
          optionClass += ' selected';
        }

        return `
          <div class="${optionClass}" data-index="${i}" style="padding: var(--space-3); font-size: var(--font-size-sm);">
            <span class="answer-letter" style="width:24px; height:24px; font-size: var(--font-size-xs);">${checkSymbol}</span>
            <span>${choice}</span>
          </div>
        `;
      }).join('')}
    </div>

    ${!isAnswerSubmitted ? `
      <button class="btn btn-primary w-full" id="submit-vocab-quiz-btn" ${selectedQuizAnswer === null ? 'disabled' : ''}>Check Answer</button>
    ` : `
      <button class="btn btn-blue w-full" id="next-vocab-quiz-btn">${quizIndex === 4 ? 'Finish Quiz' : 'Next Question'}</button>
    `}
  `;
}

function renderWordParts() {
  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Roots & Word Parts</h1>
      <p class="text-muted">Cracking prefix and suffix roots helps decipher complex words you've never seen before on the SAT.</p>
    </div>

    <div class="tab-bar">
      <button class="tab-item" id="tab-vocab">Vocabulary List</button>
      <button class="tab-item active" id="tab-parts">Roots & Word Parts</button>
      <button class="tab-item" id="tab-transitions">Transitions Matrix</button>
    </div>

    <div class="card">
      <h3 class="card-title mb-4">SAT Prefixes, Suffixes & Roots</h3>
      <div class="course-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        ${wordParts.map(part => `
          <div class="card flex flex-col gap-2" style="border: 1px solid var(--color-border); box-shadow: none;">
            <div style="display:flex; justify-content: space-between; align-items: center;">
              <span style="font-size: var(--font-size-lg); font-weight:800; color: var(--color-primary);">${part.part}</span>
              <span class="badge badge-primary">Meaning: ${part.meaning}</span>
            </div>
            <div class="mt-2">
              <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted);">EXAMPLES:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                ${part.examples.map(ex => `<span class="badge badge-gray" style="text-transform:capitalize;">${ex}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTransitions() {
  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Transitions Matrix</h1>
      <p class="text-muted">Understand the precise relationships between sentences to master SAT transition questions.</p>
    </div>

    <div class="tab-bar">
      <button class="tab-item" id="tab-vocab">Vocabulary List</button>
      <button class="tab-item" id="tab-parts">Roots & Word Parts</button>
      <button class="tab-item active" id="tab-transitions">Transitions Matrix</button>
    </div>

    <div class="card">
      <h3 class="card-title mb-4">SAT Transition Categorization</h3>
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-5);">
        ${transitions.map(tran => `
          <div class="card flex flex-col gap-3" style="border: 1.5px solid var(--color-border); box-shadow: none; background: rgba(59, 130, 246, 0.02);">
            <div style="display:flex; justify-content: space-between; align-items: center;">
              <h4 style="font-weight: 800; color: var(--color-blue-dark);">${tran.category}</h4>
              <span class="badge badge-blue">${tran.words.length} terms</span>
            </div>
            <p class="text-xs text-muted" style="line-height:1.5;">Signals logical connection: ${getTransitionExplanation(tran.category)}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              ${tran.words.map(w => `<span class="badge badge-gray" style="font-weight:600; color: var(--color-text-primary); border: 1px solid var(--color-border);">${w}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getTransitionExplanation(cat) {
  switch (cat) {
    case 'Addition': return 'Adding support, supplementary information, or parallel points.';
    case 'Contrast': return 'Introducing counter-arguments, discrepancies, or differences.';
    case 'Cause & Effect': return 'One statement directly causes, follows, or concludes from another.';
    case 'Example': return 'Fleshing out a broad assertion with concrete details/instances.';
    case 'Emphasis': return 'Highlighting a critical point or introducing an undeniable fact.';
    case 'Sequence': return 'Organizing chronological steps or ordering claims.';
    case 'Conclusion': return 'Summing up overall arguments or stating ultimate findings.';
    case 'Concession': return 'Acknowledging a limitation before reinforcing the main thesis.';
    default: return 'Defining connections between claims.';
  }
}

export function init() {
  // Tab Event Listeners
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach(tabEl => {
    tabEl.addEventListener('click', () => {
      const id = tabEl.id;
      if (id === 'tab-vocab') activeTab = 'vocab';
      if (id === 'tab-parts') activeTab = 'parts';
      if (id === 'tab-transitions') activeTab = 'transitions';
      selectedWord = null;
      reloadPage();
    });
  });

  if (activeTab !== 'vocab') return;

  // Search input listener
  const searchInput = document.getElementById('vocab-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      // Re-render list section dynamically
      reloadPageDelayed();
    });
  }

  // Filter Pills POS click
  const posPills = document.querySelectorAll('.filter-pill[data-pos]');
  posPills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectedPos = pill.dataset.pos;
      reloadPage();
    });
  });

  // Filter Pills Level click
  const levelPills = document.querySelectorAll('.filter-pill[data-level]');
  levelPills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectedLevel = pill.dataset.level;
      reloadPage();
    });
  });

  // Word card detail trigger
  const wordCards = document.querySelectorAll('.word-card[data-word]');
  wordCards.forEach(card => {
    card.addEventListener('click', () => {
      const w = card.dataset.word;
      selectedWord = vocabWords.find(x => x.word === w);
      reloadPage();
    });
  });

  // Flag Word Button
  const flagWordBtn = document.getElementById('flag-word-btn');
  if (flagWordBtn && selectedWord) {
    flagWordBtn.addEventListener('click', () => {
      if (!appState.flaggedWords) appState.flaggedWords = {};
      const w = selectedWord.word;
      if (appState.flaggedWords[w]) {
        delete appState.flaggedWords[w];
      } else {
        appState.flaggedWords[w] = true;
      }
      saveState();
      reloadPage();
    });
  }

  // Goal add btn
  const logVocabBtn = document.getElementById('log-vocab-btn');
  if (logVocabBtn) {
    logVocabBtn.addEventListener('click', () => {
      appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 1;
      saveState();
      reloadPage();
    });
  }

  // Start Practice buttons
  const startPracticeBtns = document.querySelectorAll('.start-practice-btn');
  startPracticeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = parseInt(btn.dataset.size, 10);
      
      // Shuffle vocabWords and pick size
      const shuffled = [...vocabWords].sort(() => 0.5 - Math.random());
      practiceSet = shuffled.slice(0, size);
      practiceIndex = 0;
      practiceFlipped = false;
      isPracticing = true;
      
      reloadPage();
    });
  });

  // Stop Practice button
  const stopPracticeBtn = document.getElementById('stop-practice-btn');
  if (stopPracticeBtn) {
    stopPracticeBtn.addEventListener('click', () => {
      isPracticing = false;
      reloadPage();
    });
  }

  // Flashcard flip trigger
  const flashcardBox = document.getElementById('flashcard-box');
  if (flashcardBox) {
    flashcardBox.addEventListener('click', () => {
      practiceFlipped = !practiceFlipped;
      reloadPage();
    });
  }

  // Flashcard fail/pass buttons
  const failBtn = document.getElementById('practice-fail-btn');
  if (failBtn) {
    failBtn.addEventListener('click', () => {
      nextPracticeCard();
    });
  }

  const passBtn = document.getElementById('practice-pass-btn');
  if (passBtn) {
    passBtn.addEventListener('click', () => {
      // Mark learned
      appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 1;
      saveState();
      nextPracticeCard();
    });
  }

  // Start Quiz Button
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      // Pick 5 random words
      const shuffled = [...vocabWords].sort(() => 0.5 - Math.random());
      const selectedWords = shuffled.slice(0, 5);
      
      quizQuestions = selectedWords.map(wordObj => {
        // Find 3 other random definitions as wrong answers
        const wrongDefs = vocabWords
          .filter(x => x.word !== wordObj.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(x => x.definition);
        
        const choices = [wordObj.definition, ...wrongDefs].sort(() => 0.5 - Math.random());
        const correctAnswer = choices.indexOf(wordObj.definition);

        return {
          word: wordObj.word,
          choices,
          correctAnswer
        };
      });

      quizIndex = 0;
      quizScore = 0;
      selectedQuizAnswer = null;
      isAnswerSubmitted = false;
      isQuizActive = true;
      reloadPage();
    });
  }

  // Quiz Answer options selector
  const quizOptions = document.querySelectorAll('.answer-option[data-index]');
  quizOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      if (isAnswerSubmitted) return;
      selectedQuizAnswer = parseInt(opt.dataset.index, 10);
      reloadPage();
    });
  });

  // Submit Quiz Button
  const submitQuizBtn = document.getElementById('submit-vocab-quiz-btn');
  if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', () => {
      if (selectedQuizAnswer === null) return;
      isAnswerSubmitted = true;
      const currentQ = quizQuestions[quizIndex];
      if (selectedQuizAnswer === currentQ.correctAnswer) {
        quizScore++;
        // Completing quiz questions builds daily goal completed count
        appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 1;
        saveState();
      }
      reloadPage();
    });
  }

  // Next Quiz Button
  const nextQuizBtn = document.getElementById('next-vocab-quiz-btn');
  if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
      if (quizIndex < 4) {
        quizIndex++;
        selectedQuizAnswer = null;
        isAnswerSubmitted = false;
      } else {
        // Quiz completed
        isQuizActive = false;
        alert(`Quiz finished! You scored ${quizScore}/5.`);
      }
      reloadPage();
    });
  }
}

function nextPracticeCard() {
  if (practiceIndex < practiceSet.length - 1) {
    practiceIndex++;
    practiceFlipped = false;
  } else {
    isPracticing = false;
    alert('Flashcard review set complete!');
  }
  reloadPage();
}

let timeoutId = null;
function reloadPageDelayed() {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    reloadPage();
  }, 300); // Debounce search
}

function reloadPage() {
  window.location.hash = '#vocab-reload';
  setTimeout(() => {
    window.location.hash = '#vocab';
  }, 10);
}
