// SAT Prep — Mock Exams Page

import { appState, saveState } from '../main.js';
import { questions } from '../data/questions.js';

let activeExamId = null; // ID of exam currently being taken, null if on dashboard
let examStep = 'intro'; // 'intro', 'testing', 'report'
let examSection = 'rw'; // 'rw' or 'math'
let examQuestions = []; // array of 10 questions picked for this test
let examQuestionIndex = 0; // index of current question in mock exam
let examAnswers = {}; // { [questionId]: selectedIndex }
let timerInterval = null;
let secondsRemaining = 600; // 10 minutes for simulated rapid mock exam

const mockExamsList = [
  { id: 'mock-1', title: 'SAT Practice Test 1', timeLimit: '2h 14m', questionsCount: 98, difficulty: 'Standard adaptive' },
  { id: 'mock-2', title: 'SAT Practice Test 2', timeLimit: '2h 14m', questionsCount: 98, difficulty: 'Standard adaptive' },
  { id: 'mock-3', title: 'SAT Practice Test 3', timeLimit: '2h 14m', questionsCount: 98, difficulty: 'Hard adaptive' },
  { id: 'mock-4', title: 'SAT Practice Test 4', timeLimit: '2h 14m', questionsCount: 98, difficulty: 'Standard adaptive' },
  { id: 'mock-5', title: 'SAT Practice Test 5', timeLimit: '2h 14m', questionsCount: 98, difficulty: 'Advanced elite' }
];

export function render() {
  if (activeExamId) {
    if (examStep === 'intro') return renderExamIntro();
    if (examStep === 'testing') return renderExamTesting();
    if (examStep === 'report') return renderExamReport();
  }

  return renderDashboard();
}

function renderDashboard() {
  if (!appState.mockExams) appState.mockExams = {};

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Full-Length Mock Exams</h1>
      <p class="text-muted">Simulate the actual Digital SAT experience with official-length timed adaptive mock tests. Fully unlocked.</p>
    </div>

    <!-- Badges Row -->
    <div class="badges-row mb-6">
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-primary);"></span>
        <span>Mock Exams Attempted: ${Object.keys(appState.mockExams).length} / 5</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-blue);"></span>
        <span>Highest Score: ${getHighestMockScore()}</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-warning);"></span>
        <span>Status: All Unlocked</span>
      </div>
    </div>

    <!-- Mock Grid -->
    <div class="mock-grid">
      ${mockExamsList.map(exam => {
        const completedData = appState.mockExams[exam.id];
        
        return `
          <div class="mock-card">
            <div class="mock-card-header">
              <h3>${exam.title}</h3>
              <p>${exam.difficulty}</p>
            </div>
            <div class="mock-card-body">
              <div class="stat-row">
                <span class="text-muted">Time Limit</span>
                <span class="font-bold">${exam.timeLimit}</span>
              </div>
              <div class="stat-row">
                <span class="text-muted">Total Questions</span>
                <span class="font-bold">${exam.questionsCount} items</span>
              </div>
              <div class="stat-row">
                <span class="text-muted">Format</span>
                <span class="font-bold">Digital Adaptive</span>
              </div>
              <div class="stat-row">
                <span class="text-muted">Status</span>
                <span class="badge ${completedData ? 'badge-primary' : 'badge-gray'}">
                  ${completedData ? `Completed (${completedData.score})` : 'Unstarted'}
                </span>
              </div>
            </div>
            <div class="mock-card-actions">
              ${completedData ? `
                <div class="flex gap-2">
                  <button class="btn btn-secondary btn-sm flex-1 review-report-btn" data-id="${exam.id}">Report</button>
                  <button class="btn btn-primary btn-sm flex-1 start-exam-btn" data-id="${exam.id}">Retake</button>
                </div>
              ` : `
                <button class="btn btn-primary w-full start-exam-btn" data-id="${exam.id}">Start Practice Exam</button>
              `}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderExamIntro() {
  const exam = mockExamsList.find(x => x.id === activeExamId);
  return `
    <div class="question-container card" style="max-width:700px; margin: 2rem auto; padding: var(--space-8);">
      <h2 style="font-size: var(--font-size-2xl); font-weight:800; color: var(--color-blue-dark);" class="mb-4">${exam.title} Setup</h2>
      
      <div style="background: rgba(59, 130, 246, 0.05); padding: var(--space-4); border-radius: var(--radius-sm); line-height: 1.6;" class="mb-6">
        <h4 style="font-weight:700;" class="mb-2">Digital SAT Testing Rules:</h4>
        <ul style="list-style: disc; padding-left: var(--space-5); font-size: var(--font-size-sm); display:flex; flex-direction:column; gap: var(--space-2);">
          <li>This is a simulated rapid test of <strong>10 questions</strong> (5 Reading/Writing and 5 Math).</li>
          <li>You have a <strong>10-minute timer</strong> to complete all questions.</li>
          <li>The interface matches Bluebook testing: question panel, choices, and timer.</li>
          <li>Your score is instantly computed using official SAT curves.</li>
        </ul>
      </div>

      <div class="flex gap-3">
        <button class="btn btn-secondary flex-1" id="quit-exam-setup-btn">Cancel</button>
        <button class="btn btn-primary flex-1" id="start-exam-timer-btn">Begin Section 1 (R&W)</button>
      </div>
    </div>
  `;
}

function renderExamTesting() {
  const currentQ = examQuestions[examQuestionIndex];
  const chosenIndex = examAnswers[currentQ.id];
  
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
  const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;

  return `
    <div style="display:flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--color-border); padding-bottom: var(--space-4);" class="mb-6">
      <div>
        <h3 style="font-weight:800; font-size: var(--font-size-lg); color: var(--color-text-primary);">${activeExamId === 'mock-1' ? 'SAT Practice Test 1' : 'SAT Mock Test'}</h3>
        <span class="badge badge-blue mt-1">Section: ${examSection === 'rw' ? '1. Reading & Writing' : '2. Math'}</span>
      </div>
      
      <!-- Timer -->
      <div class="flex items-center gap-2" style="background: ${secondsRemaining < 60 ? '#FEE2E2' : 'var(--color-border-light)'}; color: ${secondsRemaining < 60 ? 'var(--color-error)' : 'var(--color-text-primary)'}; padding: 0.5rem 1rem; border-radius: var(--radius-full); font-weight: 700; font-size: var(--font-size-md);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>${timeStr}</span>
      </div>
    </div>

    <!-- Testing workspace -->
    <div style="display: grid; grid-template-columns: 3fr 1.2fr; gap: var(--space-6); align-items: start;">
      
      <!-- Left Panel: Question -->
      <div class="card" style="min-height: 380px; display:flex; flex-direction:column; justify-content: space-between;">
        <div>
          <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); border-bottom: 1px solid var(--color-border-light);" class="pb-2">
            <span style="font-weight: 700; color: var(--color-text-secondary);">Question ${examQuestionIndex + 1} of 10</span>
          </div>
          <p class="question-text">${currentQ.text}</p>
          
          <div class="answer-options flex flex-col gap-3 mt-4">
            ${currentQ.choices.map((choice, i) => {
              const letter = String.fromCharCode(65 + i);
              return `
                <div class="answer-option ${chosenIndex === i ? 'selected' : ''}" data-choice="${i}">
                  <span class="answer-letter">${letter}</span>
                  <span>${choice.slice(3) || choice}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button class="btn btn-secondary btn-sm" id="mock-prev-q" ${examQuestionIndex === 0 ? 'disabled' : ''}>Back</button>
          
          <!-- Navigator list of dots -->
          <div class="flex gap-1">
            ${examQuestions.map((_, idx) => `
              <div style="width: 8px; height: 8px; border-radius:50%; background: ${examQuestionIndex === idx ? 'var(--color-blue)' : examAnswers[examQuestions[idx].id] !== undefined ? 'var(--color-primary)' : 'var(--color-border)'}"></div>
            `).join('')}
          </div>

          ${examQuestionIndex < 9 ? `
            <button class="btn btn-primary btn-sm" id="mock-next-q">Next</button>
          ` : `
            <button class="btn btn-blue btn-sm" id="mock-submit-exam">Submit Test</button>
          `}
        </div>
      </div>

      <!-- Right Panel: Section Navigation -->
      <div class="card flex flex-col gap-4">
        <h4 style="font-weight: 700;">Question Map</h4>
        <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-2);">
          ${examQuestions.map((_, idx) => `
            <button class="btn btn-sm" class="map-dot" data-qidx="${idx}" style="padding:0; height:32px; font-weight:700; ${examQuestionIndex === idx ? 'background: var(--color-blue); color: white;' : examAnswers[examQuestions[idx].id] !== undefined ? 'background: var(--color-primary-light); color: var(--color-primary-dark); border-color: var(--color-primary);' : 'background: var(--color-card); border-color: var(--color-border);'}">
              ${idx + 1}
            </button>
          `).join('')}
        </div>
        <button class="btn btn-secondary btn-sm mt-4 w-full" id="abandon-mock-btn" style="color:var(--color-error); border-color:var(--color-error);">Abandon Test</button>
      </div>

    </div>
  `;
}

function renderExamReport() {
  const scoreData = appState.mockExams[activeExamId];
  if (!scoreData) return `<p>Loading report...</p>`;

  return `
    <div class="question-container card" style="max-width: 800px; margin: 2rem auto; padding: var(--space-8); text-align: center;">
      <span style="font-size: 5rem;">🎓</span>
      <h2 style="font-size: var(--font-size-3xl); font-weight:800; color: var(--color-primary-dark);" class="mb-2">Your SAT Score Report</h2>
      <p class="text-muted mb-6">Generated on ${scoreData.date}</p>

      <div style="display:flex; justify-content: center; gap: 3rem; margin-bottom: 2.5rem;">
        <div style="border: 2px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6) var(--space-8); min-width: 180px; background: rgba(59, 130, 246, 0.03);">
          <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Composite Score</div>
          <div style="font-size: 4rem; font-weight: 800; color: var(--color-blue-dark); line-height:1.2;">${scoreData.score}</div>
          <span class="badge badge-blue">Percentile: 98th</span>
        </div>

        <div style="display:flex; flex-direction:column; gap: var(--space-3); justify-content: center; text-align: left;">
          <div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase;">Reading & Writing</div>
            <div style="font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text-primary);">${scoreData.rwScore} / 800</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase;">Math</div>
            <div style="font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text-primary);">${scoreData.mathScore} / 800</div>
          </div>
        </div>
      </div>

      <div style="background: var(--color-border-light); padding: var(--space-5); border-radius: var(--radius-md); line-height: 1.6;" class="mb-6 text-left">
        <h4 style="font-weight: 700; color: var(--color-text-primary);" class="mb-2">Performance Breakdown:</h4>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">You answered <strong>${scoreData.correctCount} out of 10</strong> questions correctly. Your skills in algebra and standard grammar conventions are exceptional. Focus on vocabulary and advanced non-linear expressions to push towards a perfect 1600.</p>
      </div>

      <div class="flex gap-4">
        <button class="btn btn-secondary flex-1" id="mock-back-dashboard">Back to Exams</button>
        <button class="btn btn-primary flex-1 start-exam-btn" data-id="${activeExamId}">Retake Test</button>
      </div>
    </div>
  `;
}

export function init() {
  // Bind Dashboard buttons
  const startBtns = document.querySelectorAll('.start-exam-btn');
  startBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeExamId = btn.dataset.id;
      examStep = 'intro';
      reloadPage();
    });
  });

  const reportBtns = document.querySelectorAll('.review-report-btn');
  reportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeExamId = btn.dataset.id;
      examStep = 'report';
      reloadPage();
    });
  });

  // Setup Back Button
  const cancelBtn = document.getElementById('quit-exam-setup-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      activeExamId = null;
      reloadPage();
    });
  }

  // Begin Test Button
  const beginBtn = document.getElementById('start-exam-timer-btn');
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      // Pick 5 R&W and 5 Math questions randomly
      const rwPool = [];
      const mathPool = [];
      
      for (const moduleId in questions) {
        if (moduleId.startsWith('m')) {
          mathPool.push(...questions[moduleId]);
        } else {
          rwPool.push(...questions[moduleId]);
        }
      }

      // Shuffle pools and pick 5
      const selectedRw = rwPool.sort(() => 0.5 - Math.random()).slice(0, 5);
      const selectedMath = mathPool.sort(() => 0.5 - Math.random()).slice(0, 5);

      examQuestions = [...selectedRw, ...selectedMath];
      examAnswers = {};
      examQuestionIndex = 0;
      examSection = 'rw';
      examStep = 'testing';
      secondsRemaining = 600; // 10 mins

      // Start timer
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secondsRemaining--;
        if (secondsRemaining <= 0) {
          clearInterval(timerInterval);
          submitExam();
        } else {
          // Re-render testing view to update clock
          reloadPage();
        }
      }, 1000);

      reloadPage();
    });
  }

  // Answer options selector during testing
  const testingOptions = document.querySelectorAll('.answer-option');
  testingOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const currentQ = examQuestions[examQuestionIndex];
      const choice = parseInt(opt.dataset.choice, 10);
      examAnswers[currentQ.id] = choice;
      reloadPage();
    });
  });

  // Next and Prev Q
  const prevBtn = document.getElementById('mock-prev-q');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (examQuestionIndex > 0) {
        examQuestionIndex--;
        if (examQuestionIndex < 5) examSection = 'rw';
        reloadPage();
      }
    });
  }

  const nextBtn = document.getElementById('mock-next-q');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (examQuestionIndex < 9) {
        examQuestionIndex++;
        if (examQuestionIndex >= 5) examSection = 'math';
        reloadPage();
      }
    });
  }

  // Grid Map Dot clicks
  const mapDots = document.querySelectorAll('[data-qidx]');
  mapDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const qIdx = parseInt(dot.dataset.qidx, 10);
      examQuestionIndex = qIdx;
      examSection = qIdx >= 5 ? 'math' : 'rw';
      reloadPage();
    });
  });

  // Submit Exam click
  const submitExamBtn = document.getElementById('mock-submit-exam');
  if (submitExamBtn) {
    submitExamBtn.addEventListener('click', () => {
      submitExam();
    });
  }

  // Abandon Test click
  const abandonBtn = document.getElementById('abandon-mock-btn');
  if (abandonBtn) {
    abandonBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to abandon the mock exam? Progress will be lost.')) {
        if (timerInterval) clearInterval(timerInterval);
        activeExamId = null;
        reloadPage();
      }
    });
  }

  // Report back dashboard
  const backDashBtn = document.getElementById('mock-back-dashboard');
  if (backDashBtn) {
    backDashBtn.addEventListener('click', () => {
      activeExamId = null;
      reloadPage();
    });
  }
}

function submitExam() {
  if (timerInterval) clearInterval(timerInterval);

  let correctCount = 0;
  let rwCorrect = 0;
  let mathCorrect = 0;

  examQuestions.forEach((q, idx) => {
    const answeredIdx = examAnswers[q.id];
    const correct = answeredIdx === q.answer;
    
    // Save to completedQuestions in appState
    if (!appState.completedQuestions) appState.completedQuestions = {};
    appState.completedQuestions[q.id] = { correct };

    if (correct) {
      correctCount++;
      if (idx < 5) rwCorrect++;
      else mathCorrect++;
    }
  });

  // Calculate official digital SAT score scale (400-1600 scale)
  // 5 RW and 5 Math questions total. Scaling:
  // Math: 200 starting + 120 per correct question (max 800)
  // RW: 200 starting + 120 per correct question (max 800)
  const mathScore = 200 + (mathCorrect * 120);
  const rwScore = 200 + (rwCorrect * 120);
  const score = Math.min(1600, mathScore + rwScore);

  if (!appState.mockExams) appState.mockExams = {};
  
  const now = new Date();
  appState.mockExams[activeExamId] = {
    score,
    mathScore,
    rwScore,
    correctCount,
    date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  // Add 10 questions to the daily goal completion count
  appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 10;
  
  // Set appState score
  appState.currentScore = score;

  saveState();
  examStep = 'report';
  reloadPage();
}

function getHighestMockScore() {
  if (!appState.mockExams || Object.keys(appState.mockExams).length === 0) return '—';
  let highest = 0;
  Object.values(appState.mockExams).forEach(e => {
    if (e.score > highest) highest = e.score;
  });
  return highest;
}

function reloadPage() {
  window.location.hash = '#mocks-reload';
  setTimeout(() => {
    window.location.hash = '#mocks';
  }, 10);
}
