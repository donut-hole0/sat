// SAT Prep — Course Data

export const courseSections = {
  math: [
    {
      section: 'Algebra',
      courses: [
        { id: 1, title: 'Prerequisites', completed: false },
        { id: 2, title: 'Systems of Linear Equations', completed: false },
        { id: 3, title: 'Linear Inequalities', completed: false },
        { id: 4, title: 'Linear Functions & Graphs', completed: false },
      ]
    },
    {
      section: 'Advanced Math',
      courses: [
        { id: 1, title: 'Polynomials & Factoring', completed: false },
        { id: 2, title: 'Quadratic Equations', completed: false },
        { id: 3, title: 'Exponential Functions', completed: false },
        { id: 4, title: 'Rational Expressions', completed: false },
        { id: 5, title: 'Radical & Absolute Value Eqs', completed: false },
        { id: 6, title: 'Function Notation & Composition', completed: false },
        { id: 7, title: 'Polynomial & Rational Functions', completed: false },
      ]
    },
    {
      section: 'Problem-Solving and Data Analysis',
      courses: [
        { id: 1, title: 'Ratios, Rates & Proportions', completed: false },
        { id: 2, title: 'Percentages & Growth', completed: false },
        { id: 3, title: 'Units & Unit Conversion', completed: false },
        { id: 4, title: 'Scatterplots & Line of Best Fit', completed: false },
        { id: 5, title: 'Data Interpretation (Tables & Graphs)', completed: false },
        { id: 6, title: 'Statistical Measures', completed: false },
        { id: 7, title: 'Probability Fundamentals', completed: false },
      ]
    },
    {
      section: 'Geometry and Trigonometry',
      courses: [
        { id: 1, title: 'Area, Perimeter & Volume', completed: false },
        { id: 2, title: 'Angles, Lines & Triangles', completed: false },
        { id: 3, title: 'Right Triangle Trigonometry', completed: false },
        { id: 4, title: 'Circles (Equations & Properties)', completed: false },
        { id: 5, title: 'Coordinate Geometry', completed: false },
      ]
    }
  ],
  english: [
    {
      section: 'Grammar Fundamentals',
      courses: [
        { id: 1, title: 'Subject-Verb Agreement', completed: false },
        { id: 2, title: 'Pronoun Agreement & Clarity', completed: false },
        { id: 3, title: 'Verb Tense & Mood', completed: false },
        { id: 4, title: 'Punctuation Rules', completed: false },
        { id: 5, title: 'Sentence Structure', completed: false },
      ]
    },
    {
      section: 'Expression of Ideas',
      courses: [
        { id: 1, title: 'Transitions & Flow', completed: false },
        { id: 2, title: 'Conciseness & Precision', completed: false },
        { id: 3, title: 'Rhetorical Synthesis', completed: false },
      ]
    }
  ],
  reading: [
    {
      section: 'Reading Comprehension',
      courses: [
        { id: 1, title: 'Central Ideas & Themes', completed: false },
        { id: 2, title: 'Supporting Evidence', completed: false },
        { id: 3, title: 'Inference & Implication', completed: false },
        { id: 4, title: 'Vocabulary in Context', completed: false },
        { id: 5, title: 'Text Structure & Purpose', completed: false },
        { id: 6, title: 'Dual Passages & Cross-Text', completed: false },
      ]
    },
    {
      section: 'Data & Evidence',
      courses: [
        { id: 1, title: 'Quantitative Evidence', completed: false },
        { id: 2, title: 'Evaluating Arguments', completed: false },
      ]
    }
  ],
  desmos: [
    {
      section: 'Desmos Calculator Mastery',
      courses: [
        { id: 1, title: 'Desmos Basics & Interface', completed: false },
        { id: 2, title: 'Graphing Equations', completed: false },
        { id: 3, title: 'Systems of Equations on Desmos', completed: false },
        { id: 4, title: 'Finding Intersections & Zeros', completed: false },
        { id: 5, title: 'Regression & Data Fitting', completed: false },
        { id: 6, title: 'Desmos Tips & SAT Shortcuts', completed: false },
      ]
    }
  ]
};

export function getCompletedCount(sections) {
  let total = 0, completed = 0;
  for (const section of sections) {
    for (const course of section.courses) {
      total++;
      if (course.completed) completed++;
    }
  }
  return { total, completed };
}
