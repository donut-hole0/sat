// SAT Prep — Modules Page

import { appState, saveState } from '../main.js';
import { mathModules, rwModules, getTotalStats, getSectionStats } from '../data/modules.js';
import { questions } from '../data/questions.js';

let activeTab = 'math'; // 'math' or 'rw'

export function render() {
  const currentModules = activeTab === 'math' ? mathModules : rwModules;
  
  // Calculate aggregate stats for badges row
  let totalQsInTab = 0;
  let totalAttemptedInTab = 0;
  let totalCorrectInTab = 0;

  currentModules.forEach(section => {
    section.modules.forEach(mod => {
      // Get real questions count in dataset
      const datasetQs = questions[mod.id] || [];
      const totalQCount = datasetQs.length || mod.questions;
      totalQsInTab += totalQCount;
      
      // Calculate how many of these have been attempted
      let attemptedCount = 0;
      let correctCount = 0;
      datasetQs.forEach(q => {
        if (appState.completedQuestions && appState.completedQuestions[q.id]) {
          attemptedCount++;
          if (appState.completedQuestions[q.id].correct) {
            correctCount++;
          }
        }
      });
      
      totalAttemptedInTab += attemptedCount;
      totalCorrectInTab += correctCount;
    });
  });

  const overallAccuracy = totalAttemptedInTab > 0 
    ? Math.round((totalCorrectInTab / totalAttemptedInTab) * 100) 
    : 0;

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Learning Modules</h1>
      <p class="text-muted">Master all SAT topics across Math and Reading & Writing. Completely unlocked.</p>
    </div>

    <!-- Tab Bar -->
    <div class="tab-bar">
      <button class="tab-item ${activeTab === 'math' ? 'active' : ''}" id="tab-math">Math</button>
      <button class="tab-item ${activeTab === 'rw' ? 'active' : ''}" id="tab-rw">Reading & Writing</button>
    </div>

    <!-- Badges Row -->
    <div class="badges-row mb-6">
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-primary);"></span>
        <span>${totalAttemptedInTab} / ${totalQsInTab} Questions Attempted</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-blue);"></span>
        <span>Accuracy: ${overallAccuracy}%</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-warning);"></span>
        <span>Status: All Unlocked</span>
      </div>
    </div>

    <!-- Sections & Modules List -->
    <div class="sections-container" style="display: flex; flex-direction: column; gap: var(--space-8);">
      ${currentModules.map(section => {
        const sectStats = getSectionStats(section);
        
        // Count actual completed vs total questions in this section
        let sectionQsCount = 0;
        let sectionAttemptedCount = 0;
        
        section.modules.forEach(mod => {
          const datasetQs = questions[mod.id] || [];
          sectionQsCount += datasetQs.length || mod.questions;
          datasetQs.forEach(q => {
            if (appState.completedQuestions && appState.completedQuestions[q.id]) {
              sectionAttemptedCount++;
            }
          });
        });

        return `
          <div class="section-block">
            <div class="section-header">
              <h2 class="section-title">${section.section}</h2>
              <div class="section-stats">
                <span>${sectionAttemptedCount} / ${sectionQsCount} completed</span>
              </div>
            </div>
            
            <div class="module-grid">
              ${section.modules.map(mod => {
                const datasetQs = questions[mod.id] || [];
                const totalQCount = datasetQs.length || mod.questions;
                
                let attempted = 0;
                let correct = 0;
                datasetQs.forEach(q => {
                  if (appState.completedQuestions && appState.completedQuestions[q.id]) {
                    attempted++;
                    if (appState.completedQuestions[q.id].correct) {
                      correct++;
                    }
                  }
                });

                const completionPercentage = totalQCount > 0 ? Math.round((attempted / totalQCount) * 100) : 0;
                const accuracyPercentage = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

                return `
                  <div class="module-card">
                    <div class="module-card-body">
                      <div class="module-card-title">${mod.title}</div>
                      <div class="module-card-meta">
                        <span>${totalQCount} questions</span>
                        <span>•</span>
                        <span>${mod.subtopics} subtopics</span>
                        <span>•</span>
                        <span>${mod.timeEstimate}</span>
                      </div>
                      
                      <div class="module-card-stats">
                        <div>
                          <div class="stat-label">Accuracy</div>
                          <div class="stat-value" style="color: ${accuracyPercentage >= 80 ? 'var(--color-primary)' : 'var(--color-text-white)'};">
                            ${attempted > 0 ? accuracyPercentage + '%' : '—'}
                          </div>
                        </div>
                        <div>
                          <div class="stat-label">Completed</div>
                          <div class="stat-value">${attempted} / ${totalQCount}</div>
                        </div>
                      </div>

                      <div class="module-card-progress">
                        <div class="module-card-progress-bar" style="width: ${completionPercentage}%"></div>
                      </div>

                      <div class="module-card-actions">
                        <a href="#practice/${mod.id}/diagnostic" class="btn btn-secondary btn-sm flex-1">Diagnostic</a>
                        <a href="#practice/${mod.id}" class="btn btn-primary btn-sm flex-1">Practice</a>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

export function init() {
  const tabMath = document.getElementById('tab-math');
  const tabRw = document.getElementById('tab-rw');

  if (tabMath && tabRw) {
    tabMath.addEventListener('click', () => {
      if (activeTab !== 'math') {
        activeTab = 'math';
        reloadPage();
      }
    });

    tabRw.addEventListener('click', () => {
      if (activeTab !== 'rw') {
        activeTab = 'rw';
        reloadPage();
      }
    });
  }
}

function reloadPage() {
  // Simple router page reload trigger
  window.location.hash = '#modules-reload';
  setTimeout(() => {
    window.location.hash = '#modules';
  }, 10);
}
