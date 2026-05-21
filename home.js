// SAT Prep — Home Dashboard Page

import { appState, saveState } from '../main.js';
import { mathModules, rwModules, getTotalStats } from '../data/modules.js';

export function render() {
  const mathStats = getTotalStats(mathModules);
  const rwStats = getTotalStats(rwModules);
  
  const totalAttempted = mathStats.totalAttempted + rwStats.totalAttempted + (appState.practiceHistory?.length || 0);
  const totalCorrect = mathStats.totalCorrect + rwStats.totalCorrect + (appState.practiceHistory?.filter(x => x.correct)?.length || 0);
  
  // Calculate dynamic estimated score
  let estimatedScore = 400;
  if (totalAttempted > 0) {
    const accuracy = totalCorrect / totalAttempted;
    estimatedScore = Math.min(1600, 400 + Math.round(accuracy * 1200));
  } else {
    estimatedScore = 1050; // default starting point
  }

  // Ensure appState matches this score
  appState.currentScore = estimatedScore;
  saveState();

  // Daily goal calculation
  const dailyCompleted = appState.dailyGoal.completed;
  const dailyTarget = appState.dailyGoal.target;
  const goalPercentage = Math.min(100, (dailyCompleted / dailyTarget) * 100);
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (goalPercentage / 100) * circumference;

  // Mistakes count
  const mistakesCount = appState.mistakes?.length || 0;

  // Generate calendar days
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  
  // Get days from previous month to fill grid
  const prevDaysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevMonthDays.push({ day: prevDaysInMonth - i, isCurrentMonth: false });
  }

  // Current month days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({ day: i, isCurrentMonth: true, isToday: i === now.getDate() });
  }

  // Next month days to pad to a multiple of 7
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthPadding = (7 - (totalCells % 7)) % 7;
  const nextMonthDays = [];
  for (let i = 1; i <= nextMonthPadding; i++) {
    nextMonthDays.push({ day: i, isCurrentMonth: false });
  }

  const allCalendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // Dummy scheduled tasks for days of the month to make it interactive and rich
  const studySchedule = {
    [now.getDate()]: 'Linear Eqs in 1 Var',
    [now.getDate() + 1]: 'Equivalent Expressions',
    [now.getDate() + 2]: 'Words in Context',
    [now.getDate() + 5]: 'Transitions',
    [now.getDate() + 7]: 'Area and Volume',
  };

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Welcome back, Alan!</h1>
      <p class="text-muted">Here is your customized study plan for today.</p>
    </div>

    <!-- Top Widgets Row -->
    <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5); margin-bottom: var(--space-6);">
      
      <!-- Daily Goal Card -->
      <div class="card flex justify-between items-center" style="position: relative;">
        <div>
          <h3 class="card-title mb-2">Daily Goal</h3>
          <p class="text-muted text-sm mb-4">Complete practice questions</p>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" id="edit-goal-btn">Edit Goal</button>
            <button class="btn btn-primary btn-sm" id="log-question-btn">+ Add 5 Qs</button>
          </div>
        </div>
        <div class="progress-ring-container">
          <svg class="progress-ring" width="90" height="90">
            <circle class="progress-ring-bg" cx="45" cy="45" r="${r}" />
            <circle class="progress-ring-fill" cx="45" cy="45" r="${r}" 
              stroke-dasharray="${circumference}" 
              stroke-dashoffset="${strokeDashoffset}" 
              style="--ring-circumference: ${circumference};" />
          </svg>
          <div class="progress-ring-text">
            <span class="progress-ring-value">${dailyCompleted}/${dailyTarget}</span>
            <span class="progress-ring-label">Completed</span>
          </div>
        </div>
      </div>

      <!-- Mistakes Card -->
      <div class="card flex justify-between items-center">
        <div>
          <h3 class="card-title mb-2">Mistake Log</h3>
          <p class="text-muted text-sm mb-4">You have <strong>${mistakesCount}</strong> questions in your review bucket.</p>
          <a href="#review" class="btn btn-blue btn-sm">Review Mistakes</a>
        </div>
        <div style="background: rgba(239, 68, 68, 0.1); width: 64px; height: 64px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: var(--color-error);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
          </svg>
        </div>
      </div>

      <!-- Score Target Card -->
      <div class="card flex justify-between items-center">
        <div>
          <h3 class="card-title mb-2">Score Target</h3>
          <p class="text-muted text-sm mb-2">Goal: <strong>1600</strong></p>
          <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--color-text-primary);">${estimatedScore} <span style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: 400;">est. SAT Score</span></div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); width: 64px; height: 64px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: var(--color-primary);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </div>
      
    </div>

    <!-- Main Section: Calendar and Quick Start -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-5); align-items: start;">
      
      <!-- Calendar Column -->
      <div class="card">
        <div class="calendar-header mb-4">
          <h3 class="card-title">${monthNames[month]} ${year}</h3>
          <div class="calendar-nav">
            <button id="prev-month" aria-label="Previous month" disabled>&lt;</button>
            <button id="next-month" aria-label="Next month" disabled>&gt;</button>
          </div>
        </div>
        <div class="calendar-grid">
          <div class="calendar-day-header">SUN</div>
          <div class="calendar-day-header">MON</div>
          <div class="calendar-day-header">TUE</div>
          <div class="calendar-day-header">WED</div>
          <div class="calendar-day-header">THU</div>
          <div class="calendar-day-header">FRI</div>
          <div class="calendar-day-header">SAT</div>

          ${allCalendarDays.map(cell => {
            let classes = 'calendar-day';
            if (!cell.isCurrentMonth) classes += ' other-month';
            if (cell.isToday) classes += ' today';
            const hasTask = cell.isCurrentMonth && studySchedule[cell.day];
            if (hasTask) classes += ' has-tasks';
            
            return `
              <div class="${classes}" data-day="${cell.day}" data-current="${cell.isCurrentMonth}">
                ${cell.day}
              </div>
            `;
          }).join('')}
        </div>
        
        <!-- Interactive calendar task list -->
        <div class="mt-6 p-4" style="background: var(--color-border-light); border-radius: var(--radius-sm);" id="calendar-day-info">
          <h4 style="font-weight: 700;" class="mb-2">Today's Study Task</h4>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="badge badge-primary">Math</span>
              <span style="font-weight: 600;">${studySchedule[now.getDate()] || 'Practice 15 questions'}</span>
            </div>
            <a href="#practice/linear-eq-1var" class="btn btn-primary btn-sm">Start Task</a>
          </div>
        </div>
      </div>

      <!-- Quick Practice Card -->
      <div class="card flex flex-col gap-4" style="background: linear-gradient(135deg, var(--color-dark-card), #243346); color: var(--color-text-white);">
        <h3 class="card-title" style="color: var(--color-text-white); margin-bottom: 0;">Quick Practice</h3>
        <p class="text-sm" style="color: rgba(255,255,255,0.7); line-height: 1.6;">Launch a rapid 5-question test across randomly selected Math or Reading and Writing topics to test your knowledge.</p>
        
        <div style="background: rgba(255,255,255,0.05); padding: var(--space-3); border-radius: var(--radius-sm); font-size: var(--font-size-xs);">
          <div class="flex justify-between mb-2">
            <span style="color: rgba(255,255,255,0.6);">Questions:</span>
            <span style="font-weight: 600;">5 Items</span>
          </div>
          <div class="flex justify-between mb-2">
            <span style="color: rgba(255,255,255,0.6);">Time limit:</span>
            <span style="font-weight: 600;">No limit</span>
          </div>
          <div class="flex justify-between">
            <span style="color: rgba(255,255,255,0.6);">Difficulty:</span>
            <span style="font-weight: 600; color: var(--color-primary);">Adaptive</span>
          </div>
        </div>
        
        <button class="btn btn-primary w-full" id="quick-practice-btn">Start Practice</button>
      </div>

    </div>
  `;
}

export function init() {
  // Edit Goal Button
  const editGoalBtn = document.getElementById('edit-goal-btn');
  if (editGoalBtn) {
    editGoalBtn.addEventListener('click', () => {
      const current = appState.dailyGoal.target;
      const targetStr = prompt('Enter your new daily question goal:', current);
      const val = parseInt(targetStr, 10);
      if (!isNaN(val) && val > 0) {
        appState.dailyGoal.target = val;
        saveState();
        // Re-render
        window.location.hash = '#home-reload';
        setTimeout(() => { window.location.hash = '#home'; }, 10);
      }
    });
  }

  // Log Questions Helper
  const logBtn = document.getElementById('log-question-btn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 5;
      saveState();
      // Re-render
      window.location.hash = '#home-reload';
      setTimeout(() => { window.location.hash = '#home'; }, 10);
    });
  }

  // Quick Practice Button
  const quickPracticeBtn = document.getElementById('quick-practice-btn');
  if (quickPracticeBtn) {
    quickPracticeBtn.addEventListener('click', () => {
      const practiceModules = [
        'linear-eq-1var',
        'linear-eq-2var',
        'linear-functions',
        'equiv-expressions',
        'words-context',
        'transitions',
        'boundaries'
      ];
      const randomModule = practiceModules[Math.floor(Math.random() * practiceModules.length)];
      window.location.hash = `#practice/${randomModule}`;
    });
  }

  // Calendar click handlers
  const days = document.querySelectorAll('.calendar-day[data-current="true"]');
  days.forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const day = dayEl.dataset.day;
      const dayInfo = document.getElementById('calendar-day-info');
      if (dayInfo) {
        const schedule = {
          1: { topic: 'Central Ideas and Details', section: 'Reading', id: 'central-ideas' },
          2: { topic: 'Linear Eqs in 1 Var', section: 'Math', id: 'linear-eq-1var' },
          3: { topic: 'Equivalent Expressions', section: 'Math', id: 'equiv-expressions' },
          4: { topic: 'Words in Context', section: 'Reading', id: 'words-context' },
          5: { topic: 'Linear Eqs in 2 Vars', section: 'Math', id: 'linear-eq-2var' },
          6: { topic: 'Transitions', section: 'Reading', id: 'transitions' },
          7: { topic: 'Boundaries', section: 'Writing', id: 'boundaries' },
          8: { topic: 'Linear Functions', section: 'Math', id: 'linear-functions' },
          9: { topic: 'Nonlinear Eqs in 1/2 Vars', section: 'Math', id: 'nonlinear-eq' },
          10: { topic: 'Inferences', section: 'Reading', id: 'inferences' },
          11: { topic: 'Command of Evidence', section: 'Reading', id: 'command-evidence' },
          12: { topic: 'Form, Structure, and Sense', section: 'Writing', id: 'form-structure' }
        };
        const taskNum = (parseInt(day, 10) % 12) + 1;
        const task = schedule[taskNum];
        
        dayInfo.innerHTML = `
          <h4 style="font-weight: 700;" class="mb-2">Scheduled Task for Day ${day}</h4>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="badge ${task.section === 'Math' ? 'badge-primary' : 'badge-blue'}">${task.section}</span>
              <span style="font-weight: 600;">${task.topic}</span>
            </div>
            <a href="#practice/${task.id}" class="btn btn-primary btn-sm">Start Task</a>
          </div>
        `;
      }
    });
  });
}
