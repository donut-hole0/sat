// SAT Prep — Review Page (Mistake Log)

import { appState, saveState } from '../main.js';

let activeCategory = 'all'; // 'all', 'math', 'rw'

export function render() {
  const mistakes = appState.mistakes || [];
  
  // Filter mistakes
  const filteredMistakes = mistakes.filter(m => {
    if (activeCategory === 'all') return true;
    
    // Simple heuristic: if it has passageTitle, it's R&W. Or if id starts with 'm', it's math.
    // In our questions.js, math IDs start with 'm', reading start with 'r'.
    if (activeCategory === 'math') return m.id.startsWith('m');
    if (activeCategory === 'rw') return m.id.startsWith('r');
    return true;
  });

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Mistake Log</h1>
      <p class="text-muted">Review your missed questions to identify weaknesses and stop repeating the same errors.</p>
    </div>

    <!-- Tab Bar for Filtering -->
    <div class="tab-bar">
      <button class="tab-item ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">All Mistakes (${mistakes.length})</button>
      <button class="tab-item ${activeCategory === 'math' ? 'active' : ''}" data-cat="math">Math (${mistakes.filter(m => m.id.startsWith('m')).length})</button>
      <button class="tab-item ${activeCategory === 'rw' ? 'active' : ''}" data-cat="rw">Reading & Writing (${mistakes.filter(m => m.id.startsWith('r')).length})</button>
    </div>

    ${filteredMistakes.length === 0 ? `
      <div class="card" style="text-align: center; padding: var(--space-10); border: 2px dashed var(--color-border); box-shadow: none;">
        <div style="font-size: 3rem; margin-bottom: var(--space-4);">🎉</div>
        <h3 class="card-title mb-2">No Mistakes Found!</h3>
        <p class="text-muted">You haven't made any mistakes in this category yet. Keep up the great work!</p>
      </div>
    ` : `
      <div class="flex flex-col gap-5">
        ${filteredMistakes.map((m, idx) => `
          <div class="card" style="border-left: 4px solid var(--color-error);">
            <div style="display:flex; justify-content: space-between; align-items:flex-start;" class="mb-4">
              <div>
                <span class="badge ${m.id.startsWith('m') ? 'badge-primary' : 'badge-blue'} mb-2">
                  ${m.id.startsWith('m') ? 'Math' : 'Reading & Writing'}
                </span>
                <p style="font-weight: 700; font-size: var(--font-size-md); line-height: 1.6;">${m.text}</p>
              </div>
              <button class="btn btn-secondary btn-sm remove-mistake-btn" data-index="${mistakes.indexOf(m)}">Remove</button>
            </div>
            
            ${m.passageTitle ? `
              <div style="background: var(--color-bg); padding: var(--space-3); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm); max-height: 150px; overflow-y: auto;">
                <strong>${m.passageTitle}</strong><br/>
                ${m.passageExcerpt}
              </div>
            ` : ''}

            <div class="answer-options flex flex-col gap-2 mb-4">
              ${m.choices.map((choice, i) => {
                let optionClass = 'answer-option';
                // Highlight the correct answer. The user got it wrong, so we just show them the correct one.
                if (i === m.answer) {
                  optionClass += ' correct';
                }
                const letter = String.fromCharCode(65 + i);
                return `
                  <div class="${optionClass}" style="padding: var(--space-2) var(--space-3); cursor: default;">
                    <span class="answer-letter" style="width:20px; height:20px; font-size: 0.65rem;">${letter}</span>
                    <span style="font-size: var(--font-size-sm);">${choice.startsWith(letter + ')') ? choice.substring(3) : choice}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="explanation-box" style="margin-top: 0;">
              <h4>Explanation</h4>
              <p>${m.explanation}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

export function init() {
  const tabs = document.querySelectorAll('.tab-item[data-cat]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.cat;
      reloadPage();
    });
  });

  const removeBtns = document.querySelectorAll('.remove-mistake-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const globalIndex = parseInt(btn.dataset.index, 10);
      if (appState.mistakes) {
        appState.mistakes.splice(globalIndex, 1);
        saveState();
        reloadPage();
      }
    });
  });
}

function reloadPage() {
  window.location.hash = '#review-reload';
  setTimeout(() => {
    window.location.hash = '#review';
  }, 10);
}
