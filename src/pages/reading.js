// SAT Prep — Reading Passages Page

import { appState, saveState } from '../main.js';

// Hardcoded high-yield SAT-style reading passages with multiple questions
const passagesData = [
  {
    id: 'lit-1',
    title: 'Literature: The House of Mirth (Excerpt)',
    author: 'Edith Wharton (1905)',
    passage: `Selden paused in surprise. In the afternoon rush of the Grand Central Station his eyes had been refreshed by the sight of Miss Lily Bart.<br><br>
[5] It was a week in Monday, and Selden, who had been detained in town by business, had the feeling of having been left behind by all the world. Lily, too, had the air of being left behind; but in her case it was accompanied by a look of expectant alertness which showed she was not passive under the situation.<br><br>
[10] He stood directly in her path, and she caught sight of him with a smile that showed she was glad of the distraction. "How nice of you to be here!" she cried. "I was just wondering what I should do next."<br><br>
[15] "Is there anything you can't do?" he returned. "You look as if you were ready to conquer a new continent."<br><br>
"I feel as if I were," she said, looking about her. "But at present I am only trying to find my train. It seems to have gone without me."<br><br>
[20] "Where were you going?"<br><br>
"To the Van Alstynes' at Bellomont. I missed the three-forty, and the next train doesn't leave until five. What is one to do in the interval?"`,
    questions: [
      {
        id: 'lit1q1',
        text: 'Which choice best describes the meeting between Selden and Lily Bart?',
        choices: [
          'A) It is an unplanned encounter that provides welcome relief to both characters.',
          'B) It is a scheduled rendezvous that has been delayed by business.',
          'C) It is a hostile confrontation resulting from a past misunderstanding.',
          'D) It is an awkward reunion that both characters attempt to avoid.'
        ],
        answer: 0,
        explanation: 'Selden is described as pausing "in surprise" and his eyes are "refreshed" by seeing Lily, while Lily greets him with a smile that shows she was "glad of the distraction" from being stranded. This confirms it is unplanned and welcome.'
      },
      {
        id: 'lit1q2',
        text: 'As used in line 8, the word "air" most nearly means:',
        choices: [
          'A) atmosphere',
          'B) breeze',
          'C) appearance',
          'D) tune'
        ],
        answer: 2,
        explanation: 'In this context, Lily "had the air of being left behind" means she had the appearance or demeanor of being left behind.'
      }
    ]
  },
  {
    id: 'sci-1',
    title: 'Science: Kepler-186f and Exoplanetary Habitability',
    author: 'NASA Astrobiology Journal (2014)',
    passage: `The discovery of Kepler-186f, the first validated Earth-size planet orbiting a distant star in the habitable zone, represents a significant milestone in the search for life elsewhere in the cosmos.<br><br>
[5] Kepler-186f orbits an M-dwarf star, which is smaller, cooler, and redder than our Sun. These stars are incredibly common, making up about 70 percent of all stars in the Milky Way. Consequently, understanding the conditions on worlds orbiting M-dwarfs is crucial.<br><br>
[10] While Kepler-186f is Earth-size, its composition is not yet known. Scientists estimate its mass based on terrestrial models, but cannot confirm if it possesses liquid water or a protective atmosphere. The habitable zone is defined as the orbital range where liquid water could theoretically exist on a planet's surface under appropriate atmospheric pressure, yet it does not guarantee habitability.`,
    questions: [
      {
        id: 'sci1q1',
        text: 'The author implies that the discovery of Kepler-186f is exceptionally important because:',
        choices: [
          'A) It is the closest exoplanet to Earth ever discovered.',
          'B) It orbits a star type that is representative of the vast majority of stars in our galaxy.',
          'C) It is the first exoplanet confirmed to possess deep liquid water oceans.',
          'D) It proves that M-dwarf stars are warmer and brighter than previously modeled.'
        ],
        answer: 1,
        explanation: 'The passage notes that Kepler-186f orbits an M-dwarf, and that M-dwarfs "make up about 70 percent of all stars in the Milky Way." This makes Kepler-186f highly representative of potential habitable planets across the galaxy.'
      },
      {
        id: 'sci1q2',
        text: 'According to the passage, which of the following is true about the "habitable zone"?',
        choices: [
          'A) It guarantees that any planet inside it holds microbial life.',
          'B) It requires a planet to have a mass identical to Earth.',
          'C) It refers to the orbital region where liquid surface water is physically possible.',
          'D) It is an obsolete model replaced by planetary density calculations.'
        ],
        answer: 2,
        explanation: 'The text defines the habitable zone as the "orbital range where liquid water could theoretically exist on a planet\'s surface."'
      }
    ]
  }
];

let selectedPassageIndex = 0;
let selectedQuestionIndex = 0;
let answeredChoices = {}; // { [questionId]: selectedIndex }
let submittedQuestions = {}; // { [questionId]: true }

export function render() {
  const currentPassage = passagesData[selectedPassageIndex];
  const currentQuestion = currentPassage.questions[selectedQuestionIndex];
  const qId = currentQuestion.id;
  const isSubmitted = !!submittedQuestions[qId];
  const chosenIndex = answeredChoices[qId];

  // Track completed passages in appState
  if (!appState.completedPassages) {
    appState.completedPassages = {};
  }

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">SAT Reading Comprehension</h1>
      <p class="text-muted">Analyze high-yield literature and science passages, and solve contextual multiple-choice questions.</p>
    </div>

    <!-- Passages Navigation Selector -->
    <div style="display:flex; gap: var(--space-3); margin-bottom: var(--space-6);">
      ${passagesData.map((p, idx) => `
        <button class="btn ${selectedPassageIndex === idx ? 'btn-blue' : 'btn-secondary'}" class="passage-nav-btn" data-index="${idx}">
          ${p.title.split(':')[0]} Passage
        </button>
      `).join('')}
    </div>

    <!-- Dual Panel Layout -->
    <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-6); align-items: start;">
      
      <!-- Left Panel: Passage Text -->
      <div class="card" style="padding: var(--space-6); min-height: 480px; display:flex; flex-direction:column;">
        <div style="border-bottom: 2px solid var(--color-border); padding-bottom: var(--space-3);" class="mb-4">
          <h3 class="card-title" style="color: var(--color-blue-dark);">${currentPassage.title}</h3>
          <span class="text-xs text-muted">Author: <strong>${currentPassage.author}</strong></span>
        </div>
        
        <div class="question-text" style="font-family: 'Georgia', serif; font-size: var(--font-size-base); line-height: 1.8; color: var(--color-text-primary); max-height: 380px; overflow-y: auto; padding-right: var(--space-3);">
          ${currentPassage.passage}
        </div>
      </div>

      <!-- Right Panel: Questions Workspace -->
      <div class="card" style="min-height: 480px; display:flex; flex-direction:column; justify-content: space-between;">
        
        <div>
          <!-- Question tabs inside passage -->
          <div style="display:flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border);" class="pb-3 mb-4">
            <span class="badge badge-blue">Question Workspace</span>
            <div style="display:flex; gap: var(--space-2);">
              ${currentPassage.questions.map((_, qIdx) => `
                <button class="btn btn-icon btn-sm" class="q-tab-btn" data-qindex="${qIdx}" style="width: 28px; height: 28px; font-weight: 700; ${selectedQuestionIndex === qIdx ? 'background: var(--color-blue); color: white;' : 'background: var(--color-border-light);'}" aria-label="Question ${qIdx + 1}">
                  ${qIdx + 1}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Question Prompt -->
          <div class="mb-5">
            <p style="font-weight: 700; font-size: var(--font-size-md); line-height:1.5;">${currentQuestion.text}</p>
          </div>

          <!-- Multiple Choices -->
          <div class="answer-options flex flex-col gap-3">
            ${currentQuestion.choices.map((choice, i) => {
              let optionClass = 'answer-option';
              
              if (isSubmitted) {
                if (i === currentQuestion.answer) {
                  optionClass += ' correct';
                } else if (chosenIndex === i) {
                  optionClass += ' incorrect';
                }
              } else if (chosenIndex === i) {
                optionClass += ' selected';
              }

              const letter = String.fromCharCode(65 + i);

              return `
                <div class="${optionClass}" data-choice="${i}" style="cursor: ${isSubmitted ? 'default' : 'pointer'};">
                  <span class="answer-letter">${letter}</span>
                  <span>${choice.slice(3)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Feedback & Explanations -->
        <div class="mt-6">
          ${isSubmitted ? `
            <div class="explanation-box mb-4">
              <h4>${chosenIndex === currentQuestion.answer ? '✓ Correct Answer!' : '✗ Incorrect'}</h4>
              <p>${currentQuestion.explanation}</p>
            </div>
          ` : ''}

          <div class="flex gap-3">
            ${!isSubmitted ? `
              <button class="btn btn-primary w-full" id="submit-reading-btn" ${chosenIndex === undefined ? 'disabled' : ''}>Check Answer</button>
            ` : `
              <button class="btn btn-blue w-full" id="next-reading-q-btn">
                ${selectedQuestionIndex < currentPassage.questions.length - 1 ? 'Next Question' : 'Passage Completed!'}
              </button>
            `}
          </div>
        </div>

      </div>

    </div>
  `;
}

export function init() {
  const currentPassage = passagesData[selectedPassageIndex];
  const currentQuestion = currentPassage.questions[selectedQuestionIndex];
  const qId = currentQuestion.id;

  // Passage navigation clicks
  const passageBtns = document.querySelectorAll('[data-index]');
  passageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      if (idx !== selectedPassageIndex) {
        selectedPassageIndex = idx;
        selectedQuestionIndex = 0;
        reloadPage();
      }
    });
  });

  // Question tab clicks
  const qTabs = document.querySelectorAll('[data-qindex]');
  qTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const qIdx = parseInt(tab.dataset.qindex, 10);
      if (qIdx !== selectedQuestionIndex) {
        selectedQuestionIndex = qIdx;
        reloadPage();
      }
    });
  });

  // Answer options click
  const options = document.querySelectorAll('.answer-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (submittedQuestions[qId]) return; // Already submitted
      const cIdx = parseInt(opt.dataset.choice, 10);
      answeredChoices[qId] = cIdx;
      reloadPage();
    });
  });

  // Submit Answer Button
  const submitBtn = document.getElementById('submit-reading-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (answeredChoices[qId] === undefined) return;
      submittedQuestions[qId] = true;
      
      // Update appState
      if (!appState.completedQuestions) appState.completedQuestions = {};
      const isCorrect = answeredChoices[qId] === currentQuestion.answer;
      appState.completedQuestions[qId] = { correct: isCorrect };
      
      // If correct, add points to score estimation
      appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 1;
      
      if (!isCorrect) {
        if (!appState.mistakes) appState.mistakes = [];
        appState.mistakes.push({
          id: qId,
          text: currentQuestion.text,
          choices: currentQuestion.choices,
          answer: currentQuestion.answer,
          explanation: currentQuestion.explanation,
          passageTitle: currentPassage.title,
          passageExcerpt: currentPassage.passage
        });
      }
      
      saveState();
      reloadPage();
    });
  }

  // Next Question / Finish Passage Button
  const nextBtn = document.getElementById('next-reading-q-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (selectedQuestionIndex < currentPassage.questions.length - 1) {
        selectedQuestionIndex++;
      } else {
        // Mark passage as complete
        if (!appState.completedPassages) appState.completedPassages = {};
        appState.completedPassages[currentPassage.id] = true;
        saveState();
        alert('Passage completed successfully!');
        
        // Go to next passage or reset
        selectedPassageIndex = (selectedPassageIndex + 1) % passagesData.length;
        selectedQuestionIndex = 0;
      }
      reloadPage();
    });
  }
}

function reloadPage() {
  window.location.hash = '#reading-reload';
  setTimeout(() => {
    window.location.hash = '#reading';
  }, 10);
}
