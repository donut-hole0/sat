// SAT Prep — Courses Page

import { appState, saveState } from '../main.js';
import { courseSections } from '../data/courses.js';

let activeCategory = 'math'; // 'math', 'english', 'reading', 'desmos'
let activeVideo = null; // null or course object

export function render() {
  const currentSections = courseSections[activeCategory];
  
  // Track completions locally in appState
  if (!appState.completedCourses) {
    appState.completedCourses = {};
  }

  // Count totals
  let totalCourses = 0;
  let completedCourses = 0;
  
  Object.values(courseSections).forEach(sectionsList => {
    sectionsList.forEach(sec => {
      sec.courses.forEach(c => {
        totalCourses++;
        const key = `${activeCategory}_${sec.section}_${c.id}`;
        if (appState.completedCourses[key]) {
          completedCourses++;
        }
      });
    });
  });

  // Section progress stats
  let activeTotal = 0;
  let activeCompleted = 0;
  currentSections.forEach(sec => {
    sec.courses.forEach(c => {
      activeTotal++;
      const key = `${activeCategory}_${sec.section}_${c.id}`;
      if (appState.completedCourses[key]) {
        activeCompleted++;
      }
    });
  });

  return `
    <div class="dashboard-header mb-6">
      <h1 class="section-title" style="font-size: var(--font-size-3xl);">Video Courses</h1>
      <p class="text-muted">Accelerate your score with comprehensive high-yield video courses. Fully unlocked.</p>
    </div>

    <!-- Tab Bar -->
    <div class="tab-bar">
      <button class="tab-item ${activeCategory === 'math' ? 'active' : ''}" id="tab-math">Math Courses</button>
      <button class="tab-item ${activeCategory === 'english' ? 'active' : ''}" id="tab-english">English Courses</button>
      <button class="tab-item ${activeCategory === 'reading' ? 'active' : ''}" id="tab-reading">Reading Courses</button>
      <button class="tab-item ${activeCategory === 'desmos' ? 'active' : ''}" id="tab-desmos">Desmos Calculator Mastery</button>
    </div>

    <!-- Badges Row -->
    <div class="badges-row mb-6">
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-primary);"></span>
        <span>Overall Completed: ${completedCourses} / ${totalCourses} Videos</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-blue);"></span>
        <span>${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Completion: ${Math.round((activeCompleted / activeTotal) * 100) || 0}%</span>
      </div>
      <div class="badge-counter">
        <span class="badge-dot" style="background: var(--color-warning);"></span>
        <span>All Videos: 1080p HD Unlocked</span>
      </div>
    </div>

    <!-- Main Course Section -->
    <div class="sections-container" style="display: flex; flex-direction: column; gap: var(--space-8);">
      ${currentSections.map(sec => {
        let secDone = 0;
        sec.courses.forEach(c => {
          const key = `${activeCategory}_${sec.section}_${c.id}`;
          if (appState.completedCourses[key]) secDone++;
        });

        return `
          <div class="section-block">
            <div class="section-header">
              <h2 class="section-title">${sec.section}</h2>
              <div class="section-stats">
                <span>${secDone} / ${sec.courses.length} Completed</span>
              </div>
            </div>

            <div class="course-grid">
              ${sec.courses.map(c => {
                const key = `${activeCategory}_${sec.section}_${c.id}`;
                const isDone = !!appState.completedCourses[key];
                
                return `
                  <div class="course-item" data-id="${c.id}" data-section="${sec.section}" data-title="${c.title}" style="${isDone ? 'border-color: var(--color-primary); background: rgba(16, 185, 129, 0.03);' : ''}">
                    <div class="course-number" style="${isDone ? 'background: var(--color-primary);' : ''}">
                      ${isDone ? `✓` : c.id}
                    </div>
                    <div style="flex: 1;">
                      <div class="course-name">${c.title}</div>
                      <div class="text-xs text-muted mt-1">12-18 mins HD video lesson</div>
                    </div>
                    <div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted);">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10 8 16 12 10 16 10 8"/>
                      </svg>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Premium Video Modal -->
    <div id="video-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.85); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(8px); padding: var(--space-4);">
      <div class="card" style="width: 100%; max-width: 900px; padding: 0; overflow: hidden; background: var(--color-dark-card); color: white; display: flex; flex-direction: column;">
        <!-- Modal Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-6); background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div>
            <span class="badge badge-primary mb-1" id="modal-badge">Category</span>
            <h3 id="modal-title" style="color: white; font-size: var(--font-size-lg);">Lesson Title</h3>
          </div>
          <button id="close-modal-btn" style="color: white; font-size: var(--font-size-2xl); cursor: pointer;">&times;</button>
        </div>

        <!-- Video Player Body -->
        <div style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center;">
          <!-- Simulated Video Player Controls -->
          <div id="video-poster" style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, #1e293b, #0f172a); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;" id="play-button-overlay">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <polygon points="8 5 19 12 8 19 8 5"/>
              </svg>
            </div>
            <p class="mt-4" style="color: rgba(255,255,255,0.8); font-weight: 500;">Click to watch the full lecture</p>
          </div>

          <!-- Video Playing Screen -->
          <div id="video-playing" style="display: none; width: 100%; height: 100%; position: relative; flex-direction: column; align-items: center; justify-content: center;">
            <div style="position: absolute; top: var(--space-4); left: var(--space-4); background: rgba(0,0,0,0.5); padding: 4px 8px; border-radius: var(--radius-sm); font-size: var(--font-size-xs); color: var(--color-primary);">
              ● LIVE STREAM HD 1080P
            </div>
            <div class="bar-chart" style="width: 60%; height: 120px; align-items: flex-end; gap: var(--space-2); margin-bottom: 2rem;">
              <div class="bar-chart-bar" style="height: 40%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 70%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 50%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 90%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 30%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 80%; background: var(--color-primary); flex: 1;"></div>
              <div class="bar-chart-bar" style="height: 60%; background: var(--color-primary); flex: 1;"></div>
            </div>
            <p style="color: white; font-weight: 500; font-size: var(--font-size-md);">Alan is studying this course lesson...</p>
            
            <!-- Timeline controls -->
            <div style="position: absolute; bottom: 0; left:0; right:0; background: rgba(0,0,0,0.7); padding: var(--space-3) var(--space-4); display: flex; align-items: center; gap: var(--space-3); font-size: var(--font-size-xs);">
              <button style="color: white;" id="pause-btn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/></svg>
              </button>
              <div style="flex:1; height: 4px; background: rgba(255,255,255,0.3); border-radius: var(--radius-full); overflow: hidden; position: relative;">
                <div style="position: absolute; top:0; left:0; bottom:0; width: 45%; background: var(--color-primary);"></div>
              </div>
              <span>08:12 / 18:30</span>
              <button id="fullscreen-btn" style="color: white;">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0,.5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0,.5-.5v-3a.5.5 0 0 1 .5-.5z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Video Lesson Details and Notes -->
        <div style="padding: var(--space-5) var(--space-6); background: #1e293b; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08);">
          <div style="max-width: 70%;">
            <h4 style="font-weight: 700; color: white;">Lesson Resources & Worksheets</h4>
            <p style="color: rgba(255,255,255,0.6); font-size: var(--font-size-xs);" class="mt-1">Download Desmos templates, concept summaries, and cheat sheets for this lesson.</p>
          </div>
          <div>
            <button class="btn btn-primary btn-sm" id="complete-lesson-btn">Mark Completed & Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Setup tabs
  const tabMath = document.getElementById('tab-math');
  const tabEnglish = document.getElementById('tab-english');
  const tabReading = document.getElementById('tab-reading');
  const tabDesmos = document.getElementById('tab-desmos');

  if (tabMath) tabMath.addEventListener('click', () => changeCategory('math'));
  if (tabEnglish) tabEnglish.addEventListener('click', () => changeCategory('english'));
  if (tabReading) tabReading.addEventListener('click', () => changeCategory('reading'));
  if (tabDesmos) tabDesmos.addEventListener('click', () => changeCategory('desmos'));

  // Course items clicks to open modal
  const items = document.querySelectorAll('.course-item');
  items.forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const section = el.dataset.section;
      const title = el.dataset.title;

      activeVideo = { id, section, title };
      
      const modal = document.getElementById('video-modal');
      const mTitle = document.getElementById('modal-title');
      const mBadge = document.getElementById('modal-badge');
      
      if (modal && mTitle && mBadge) {
        mTitle.innerText = title;
        mBadge.innerText = section;
        modal.style.display = 'flex';
        
        // Reset player state
        document.getElementById('video-poster').style.display = 'flex';
        document.getElementById('video-playing').style.display = 'none';
      }
    });
  });

  // Modal events
  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      document.getElementById('video-modal').style.display = 'none';
      activeVideo = null;
    });
  }

  // Play button click overlay
  const playOverlayBtn = document.getElementById('play-button-overlay');
  if (playOverlayBtn) {
    playOverlayBtn.addEventListener('click', () => {
      document.getElementById('video-poster').style.display = 'none';
      document.getElementById('video-playing').style.display = 'flex';
    });
  }

  // Pause button
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      document.getElementById('video-poster').style.display = 'flex';
      document.getElementById('video-playing').style.display = 'none';
    });
  }

  // Complete lesson button
  const completeLessonBtn = document.getElementById('complete-lesson-btn');
  if (completeLessonBtn && activeVideo) {
    // Re-bind to ensure closure is correct
  }
  
  if (completeLessonBtn) {
    completeLessonBtn.addEventListener('click', () => {
      if (activeVideo) {
        if (!appState.completedCourses) {
          appState.completedCourses = {};
        }
        const key = `${activeCategory}_${activeVideo.section}_${activeVideo.id}`;
        appState.completedCourses[key] = true;
        
        // Add to daily goal complete!
        appState.dailyGoal.completed = (appState.dailyGoal.completed || 0) + 1;
        saveState();
      }
      document.getElementById('video-modal').style.display = 'none';
      activeVideo = null;
      reloadPage();
    });
  }
}

function changeCategory(cat) {
  activeCategory = cat;
  reloadPage();
}

function reloadPage() {
  window.location.hash = '#courses-reload';
  setTimeout(() => {
    window.location.hash = `#courses`;
  }, 10);
}
