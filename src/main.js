// SAT Prep — Main Entry Point & Router

import { renderSidebar } from './components/sidebar.js';
import './styles/index.css';
import './styles/sidebar.css';

// Lazy page imports — each exports render() and init()
const pages = {
  home: () => import('./pages/home.js'),
  modules: () => import('./pages/modules.js'),
  courses: () => import('./pages/courses.js'),
  vocab: () => import('./pages/vocab.js'),
  reading: () => import('./pages/reading.js'),
  mocks: () => import('./pages/mocks.js'),
  review: () => import('./pages/review.js'),
  stats: () => import('./pages/stats.js'),
  tracker: () => import('./pages/tracker.js'),
  aitutor: () => import('./pages/aitutor.js'),
  practice: () => import('./pages/practice.js'),
};

function getRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  return {
    page: parts[0] || 'home',
    params: parts.slice(1)
  };
}

async function render() {
  const app = document.getElementById('app');
  const { page, params } = getRoute();
  const pageName = pages[page] ? page : 'home';

  // Build layout
  app.innerHTML = `
    <div class="app-layout">
      <aside class="sidebar" id="sidebar">
        ${renderSidebar(pageName)}
      </aside>
      <main class="main-content" id="main-content">
        <div class="page-content" id="page-content">
          <div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--color-text-muted);">Loading...</div>
        </div>
      </main>
    </div>
  `;

  // Setup sidebar toggle
  setupSidebarToggle();

  // Load and render page
  try {
    const pageModule = await pages[pageName]();
    const contentEl = document.getElementById('page-content');
    contentEl.innerHTML = pageModule.render(params);

    // Call page init for event listeners
    if (pageModule.init) {
      pageModule.init(params);
    }
  } catch (err) {
    console.error('Failed to load page:', pageName, err);
    document.getElementById('page-content').innerHTML = `
      <div class="card" style="text-align:center;padding:3rem;">
        <h2>Page not found</h2>
        <p class="text-muted mt-4">The page "${pageName}" could not be loaded.</p>
        <a href="#home" class="btn btn-primary mt-6">Go Home</a>
      </div>
    `;
  }
}

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
    });
  }
}

// App state — shared across pages
export const appState = {
  dailyGoal: { target: 15, completed: 0 },
  mistakeTarget: 10,
  mistakes: [],
  scoreTarget: 1600,
  currentScore: 0,
  completedQuestions: {},
  vocabStudied: [],
  studyStreak: 0,
  practiceHistory: [],
};

// Save/load state from localStorage
export function saveState() {
  try {
    localStorage.setItem('satprep_state', JSON.stringify(appState));
  } catch (e) {
    // Silently fail
  }
}

export function loadState() {
  try {
    const saved = localStorage.getItem('satprep_state');
    if (saved) {
      Object.assign(appState, JSON.parse(saved));
    }
  } catch (e) {
    // Silently fail
  }
}

// Initialize
loadState();
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
