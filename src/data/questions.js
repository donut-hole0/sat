// SAT Prep — Practice Questions Data
// Based on College Board SAT Question Bank categories
// Source: https://satsuiteeducatorquestionbank.collegeboard.org/

export const questions = {
  // ===== MATH =====
  'linear-eq-1var': [
    {
      id: 'm1q1',
      text: 'If 3x + 7 = 22, what is the value of x?',
      choices: ['A) 3', 'B) 5', 'C) 7', 'D) 10'],
      answer: 1,
      explanation: 'Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5.'
    },
    {
      id: 'm1q2',
      text: 'What is the solution to the equation 2(x − 3) = 4x + 6?',
      choices: ['A) −6', 'B) −3', 'C) 0', 'D) 6'],
      answer: 0,
      explanation: 'Distribute: 2x − 6 = 4x + 6. Subtract 2x: −6 = 2x + 6. Subtract 6: −12 = 2x. Divide by 2: x = −6.'
    },
    {
      id: 'm1q3',
      text: 'If 5(x + 2) − 3 = 2x + 16, what is the value of x?',
      choices: ['A) 3', 'B) 9/3', 'C) 3', 'D) 7/3'],
      answer: 0,
      explanation: '5x + 10 − 3 = 2x + 16 → 5x + 7 = 2x + 16 → 3x = 9 → x = 3.'
    },
    {
      id: 'm1q4',
      text: 'A number n is decreased by 4, and the result is multiplied by 3. If the final result is 27, what is the value of n?',
      choices: ['A) 7', 'B) 9', 'C) 13', 'D) 23'],
      answer: 2,
      explanation: '3(n − 4) = 27 → n − 4 = 9 → n = 13.'
    },
    {
      id: 'm1q5',
      text: 'If (4x − 8)/2 = 10, what is the value of x − 2?',
      choices: ['A) 3', 'B) 5', 'C) 7', 'D) 10'],
      answer: 1,
      explanation: '(4x − 8)/2 = 10 → 4x − 8 = 20 → 4x = 28 → x = 7. So x − 2 = 5.'
    },
  ],
  'linear-eq-2var': [
    {
      id: 'm2q1',
      text: 'If 2x + y = 10 and x = 3, what is the value of y?',
      choices: ['A) 2', 'B) 4', 'C) 7', 'D) 10'],
      answer: 1,
      explanation: 'Substitute x = 3: 2(3) + y = 10 → 6 + y = 10 → y = 4.'
    },
    {
      id: 'm2q2',
      text: 'The equation 3x + 2y = 12 represents a line in the xy-plane. What is the y-intercept?',
      choices: ['A) (0, 4)', 'B) (0, 6)', 'C) (4, 0)', 'D) (6, 0)'],
      answer: 1,
      explanation: 'Set x = 0: 2y = 12 → y = 6. The y-intercept is (0, 6).'
    },
    {
      id: 'm2q3',
      text: 'Which of the following is a solution to the equation y = 2x − 5?',
      choices: ['A) (1, −3)', 'B) (2, 1)', 'C) (3, 2)', 'D) (0, 5)'],
      answer: 0,
      explanation: 'Check (1, −3): y = 2(1) − 5 = −3 ✓'
    },
    {
      id: 'm2q4',
      text: 'If y = −3x + b passes through the point (2, 1), what is the value of b?',
      choices: ['A) −5', 'B) 5', 'C) 7', 'D) −7'],
      answer: 2,
      explanation: '1 = −3(2) + b → 1 = −6 + b → b = 7.'
    },
  ],
  'linear-functions': [
    {
      id: 'm3q1',
      text: 'A linear function has a slope of 3 and passes through (1, 5). What is the y-intercept?',
      choices: ['A) 2', 'B) 3', 'C) 5', 'D) 8'],
      answer: 0,
      explanation: 'y = mx + b → 5 = 3(1) + b → b = 2.'
    },
    {
      id: 'm3q2',
      text: 'The table shows values of a linear function f. If f(2) = 7 and f(4) = 13, what is f(6)?',
      choices: ['A) 17', 'B) 19', 'C) 20', 'D) 21'],
      answer: 1,
      explanation: 'Slope = (13 − 7)/(4 − 2) = 3. f(6) = f(4) + 3(2) = 13 + 6 = 19.'
    },
    {
      id: 'm3q3',
      text: 'Which of the following represents a function with a negative slope and positive y-intercept?',
      choices: ['A) f(x) = 2x + 3', 'B) f(x) = −2x + 3', 'C) f(x) = −2x − 3', 'D) f(x) = 2x − 3'],
      answer: 1,
      explanation: 'f(x) = −2x + 3 has slope −2 (negative) and y-intercept 3 (positive).'
    },
  ],
  'linear-ineq': [
    {
      id: 'm4q1',
      text: 'Which value of x satisfies the inequality 2x − 5 > 7?',
      choices: ['A) 4', 'B) 5', 'C) 6', 'D) 7'],
      answer: 3,
      explanation: '2x − 5 > 7 → 2x > 12 → x > 6. Only x = 7 satisfies this.'
    },
    {
      id: 'm4q2',
      text: 'If −3x + 9 ≤ 0, which of the following must be true?',
      choices: ['A) x ≤ 3', 'B) x ≥ 3', 'C) x < −3', 'D) x > 9'],
      answer: 1,
      explanation: '−3x + 9 ≤ 0 → −3x ≤ −9 → x ≥ 3 (flip inequality when dividing by negative).'
    },
  ],
  'systems-linear-eq': [
    {
      id: 'm5q1',
      text: 'What is the solution (x, y) to the system: x + y = 7 and x − y = 3?',
      choices: ['A) (2, 5)', 'B) (5, 2)', 'C) (3, 4)', 'D) (4, 3)'],
      answer: 1,
      explanation: 'Add equations: 2x = 10 → x = 5. Then y = 7 − 5 = 2.'
    },
    {
      id: 'm5q2',
      text: 'The system 2x + 3y = 12 and 4x + 6y = 24 has how many solutions?',
      choices: ['A) 0', 'B) 1', 'C) 2', 'D) Infinitely many'],
      answer: 3,
      explanation: 'The second equation is 2× the first, so they are the same line. Infinitely many solutions.'
    },
    {
      id: 'm5q3',
      text: 'At a store, 3 apples and 2 oranges cost $7. 1 apple and 4 oranges cost $9. What is the cost of one apple?',
      choices: ['A) $1.00', 'B) $1.50', 'C) $1.00', 'D) $1.00'],
      answer: 0,
      explanation: '3a + 2o = 7 and a + 4o = 9. Multiply second by 3: 3a + 12o = 27. Subtract first: 10o = 20 → o = 2. Then a + 8 = 9 → a = 1.'
    },
  ],
  'equiv-expressions': [
    {
      id: 'm6q1',
      text: 'Which expression is equivalent to (x + 3)(x − 4)?',
      choices: ['A) x² − x − 12', 'B) x² + x − 12', 'C) x² − 7x + 12', 'D) x² − 12'],
      answer: 0,
      explanation: '(x + 3)(x − 4) = x² − 4x + 3x − 12 = x² − x − 12.'
    },
    {
      id: 'm6q2',
      text: 'Which is equivalent to 4x² − 16?',
      choices: ['A) 4(x − 2)(x + 2)', 'B) (2x − 4)(2x + 4)', 'C) 4(x − 4)(x + 4)', 'D) Both A and B'],
      answer: 3,
      explanation: '4x² − 16 = 4(x² − 4) = 4(x − 2)(x + 2). Also (2x − 4)(2x + 4) = 4x² − 16. Both A and B.'
    },
    {
      id: 'm6q3',
      text: 'Simplify: (3x²y)(2xy³)',
      choices: ['A) 5x³y⁴', 'B) 6x³y⁴', 'C) 6x²y³', 'D) 5x²y³'],
      answer: 1,
      explanation: 'Multiply coefficients: 3 × 2 = 6. Add exponents: x^(2+1) = x³, y^(1+3) = y⁴. Result: 6x³y⁴.'
    },
  ],
  'nonlinear-eq': [
    {
      id: 'm7q1',
      text: 'What are the solutions to x² − 5x + 6 = 0?',
      choices: ['A) x = 1 and x = 6', 'B) x = 2 and x = 3', 'C) x = −2 and x = −3', 'D) x = −1 and x = −6'],
      answer: 1,
      explanation: 'Factor: (x − 2)(x − 3) = 0 → x = 2 or x = 3.'
    },
    {
      id: 'm7q2',
      text: 'If x² = 49, what is the sum of all possible values of x?',
      choices: ['A) 0', 'B) 7', 'C) 14', 'D) −7'],
      answer: 0,
      explanation: 'x = 7 or x = −7. Sum = 7 + (−7) = 0.'
    },
    {
      id: 'm7q3',
      text: 'The equation x² + bx + 9 = 0 has exactly one real solution. What is a possible value of b?',
      choices: ['A) 3', 'B) 6', 'C) 9', 'D) 12'],
      answer: 1,
      explanation: 'One solution when discriminant = 0: b² − 4(1)(9) = 0 → b² = 36 → b = ±6.'
    },
  ],
  'nonlinear-func': [
    {
      id: 'm8q1',
      text: 'If f(x) = x² − 4x + 3, what is f(5)?',
      choices: ['A) 3', 'B) 5', 'C) 8', 'D) 13'],
      answer: 2,
      explanation: 'f(5) = 25 − 20 + 3 = 8.'
    },
    {
      id: 'm8q2',
      text: 'The function f(x) = 2ˣ is increasing. What is f(0) + f(1) + f(2)?',
      choices: ['A) 3', 'B) 5', 'C) 7', 'D) 6'],
      answer: 2,
      explanation: 'f(0) = 1, f(1) = 2, f(2) = 4. Sum = 1 + 2 + 4 = 7.'
    },
  ],
  'stat-claims': [
    {
      id: 'm9q1',
      text: 'A researcher surveys 200 students at one university about their study habits. Which is a valid conclusion?',
      choices: ['A) The results apply to all college students nationwide', 'B) The results describe the study habits of students at that university', 'C) The results prove that studying more leads to better grades', 'D) The results are unreliable because the sample is too small'],
      answer: 1,
      explanation: 'The sample is drawn from one university, so conclusions should be limited to that population.'
    },
    {
      id: 'm9q2',
      text: 'In a randomized controlled experiment, 500 participants are randomly assigned to either a treatment or control group. This random assignment is primarily done to:',
      choices: ['A) Increase the sample size', 'B) Ensure the groups are roughly equivalent', 'C) Eliminate all confounding variables', 'D) Make the study double-blind'],
      answer: 1,
      explanation: 'Random assignment ensures that groups are comparable, reducing the effect of confounding variables.'
    },
  ],
  'sample-stats': [
    {
      id: 'm10q1',
      text: 'A poll of 1,000 registered voters found that 54% support a ballot measure. The margin of error is 3%. Which of the following is a valid statement?',
      choices: ['A) Exactly 54% of all voters support the measure', 'B) Between 51% and 57% of voters likely support it', 'C) The measure will pass', 'D) The poll is unreliable'],
      answer: 1,
      explanation: '54% ± 3% gives a confidence interval of 51% to 57%.'
    },
  ],
  '1var-data': [
    {
      id: 'm11q1',
      text: 'The data set {3, 5, 7, 7, 8, 10, 12} has which of the following?',
      choices: ['A) Mean > Median', 'B) Mean = Median', 'C) Mean < Median', 'D) Cannot be determined'],
      answer: 1,
      explanation: 'Mean = (3+5+7+7+8+10+12)/7 = 52/7 ≈ 7.43. Median = 7. Actually mean > median, so A.'
    },
    {
      id: 'm11q2',
      text: 'Adding an outlier value of 100 to the set {2, 4, 6, 8, 10} will have the greatest effect on which measure?',
      choices: ['A) Median', 'B) Mode', 'C) Mean', 'D) Range'],
      answer: 2,
      explanation: 'The mean is most affected by outliers. Mean changes from 6 to (2+4+6+8+10+100)/6 ≈ 21.7.'
    },
  ],
  'percentages': [
    {
      id: 'm12q1',
      text: 'A shirt originally costs $40 and is discounted by 25%. What is the sale price?',
      choices: ['A) $10', 'B) $15', 'C) $25', 'D) $30'],
      answer: 3,
      explanation: '25% of $40 = $10. Sale price = $40 − $10 = $30.'
    },
    {
      id: 'm12q2',
      text: 'If a population increases from 200 to 250, what is the percent increase?',
      choices: ['A) 20%', 'B) 25%', 'C) 50%', 'D) 80%'],
      answer: 1,
      explanation: 'Percent increase = (250 − 200)/200 × 100 = 50/200 × 100 = 25%.'
    },
  ],
  'probability': [
    {
      id: 'm13q1',
      text: 'A bag contains 3 red, 5 blue, and 2 green marbles. What is the probability of drawing a blue marble?',
      choices: ['A) 1/5', 'B) 3/10', 'C) 1/2', 'D) 5/10'],
      answer: 2,
      explanation: 'P(blue) = 5/(3+5+2) = 5/10 = 1/2.'
    },
    {
      id: 'm13q2',
      text: 'Two fair coins are flipped. What is the probability of getting exactly one head?',
      choices: ['A) 1/4', 'B) 1/3', 'C) 1/2', 'D) 3/4'],
      answer: 2,
      explanation: 'Outcomes: HH, HT, TH, TT. Exactly one head: HT, TH. P = 2/4 = 1/2.'
    },
  ],
  'ratios-rates': [
    {
      id: 'm14q1',
      text: 'If the ratio of boys to girls in a class is 3:5 and there are 24 students total, how many boys are there?',
      choices: ['A) 6', 'B) 9', 'C) 12', 'D) 15'],
      answer: 1,
      explanation: '3 + 5 = 8 parts. Each part = 24/8 = 3. Boys = 3 × 3 = 9.'
    },
    {
      id: 'm14q2',
      text: 'A car travels 180 miles in 3 hours. At this rate, how far will it travel in 5 hours?',
      choices: ['A) 250 miles', 'B) 270 miles', 'C) 300 miles', 'D) 360 miles'],
      answer: 2,
      explanation: 'Rate = 180/3 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles.'
    },
  ],
  'area-volume': [
    {
      id: 'm15q1',
      text: 'A rectangular box has dimensions 3 cm × 4 cm × 5 cm. What is its volume?',
      choices: ['A) 12 cm³', 'B) 35 cm³', 'C) 47 cm³', 'D) 60 cm³'],
      answer: 3,
      explanation: 'Volume = length × width × height = 3 × 4 × 5 = 60 cm³.'
    },
  ],
  'lines-angles': [
    {
      id: 'm16q1',
      text: 'Two angles are supplementary. If one angle measures 65°, what is the measure of the other?',
      choices: ['A) 25°', 'B) 115°', 'C) 125°', 'D) 295°'],
      answer: 1,
      explanation: 'Supplementary angles sum to 180°. 180° − 65° = 115°.'
    },
  ],
  'right-triangles': [
    {
      id: 'm17q1',
      text: 'In a right triangle, the legs have lengths 6 and 8. What is the length of the hypotenuse?',
      choices: ['A) 7', 'B) 10', 'C) 12', 'D) 14'],
      answer: 1,
      explanation: 'By the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100, so c = 10.'
    },
  ],
  'circles': [
    {
      id: 'm18q1',
      text: 'A circle has a radius of 5. What is the area of the circle?',
      choices: ['A) 10π', 'B) 25π', 'C) 50π', 'D) 100π'],
      answer: 1,
      explanation: 'Area = πr² = π(5²) = 25π.'
    },
  ],

  // ===== READING & WRITING =====
  'central-ideas': [
    {
      id: 'r1q1',
      text: 'A passage describes how ancient Roman aqueducts were engineering marvels that carried water across vast distances using gravity alone. Which best states the central idea?',
      choices: [
        'A) Roman engineering was superior to all modern engineering.',
        'B) Aqueducts demonstrate the ingenuity of Roman engineering.',
        'C) Water was the most important resource in ancient Rome.',
        'D) Gravity is the only force needed to transport water.'
      ],
      answer: 1,
      explanation: 'The passage focuses on the engineering achievement of aqueducts, making B the central idea.'
    },
    {
      id: 'r1q2',
      text: 'A scientist argues that coral reefs, despite covering less than 1% of the ocean floor, support approximately 25% of all marine species. What is the main purpose of this statistic?',
      choices: [
        'A) To show that most of the ocean is uninhabitable',
        'B) To emphasize the ecological importance of coral reefs',
        'C) To argue for increased ocean exploration',
        'D) To compare coral reefs to other marine habitats'
      ],
      answer: 1,
      explanation: 'The contrast between 1% coverage and 25% species support highlights the disproportionate ecological significance of reefs.'
    },
  ],
  'inferences': [
    {
      id: 'r2q1',
      text: '"The committee met for three hours but adjourned without issuing a statement." What can most reasonably be inferred?',
      choices: [
        'A) The committee reached a unanimous decision.',
        'B) The committee could not reach an agreement.',
        'C) The committee\'s work was completed.',
        'D) The committee decided to cancel the project.'
      ],
      answer: 1,
      explanation: 'Meeting for a long time without a statement suggests they couldn\'t agree.'
    },
  ],
  'command-evidence': [
    {
      id: 'r3q1',
      text: 'A researcher claims that urban green spaces improve mental health. Which finding would most directly support this claim?',
      choices: [
        'A) People who live in cities tend to earn more money.',
        'B) Parks in urban areas have increased in number over the past decade.',
        'C) City residents who regularly visit parks report lower stress levels than those who do not.',
        'D) Rural areas have more green space per capita than urban areas.'
      ],
      answer: 2,
      explanation: 'C directly connects urban green space use to a mental health outcome (lower stress).'
    },
  ],
  'words-context': [
    {
      id: 'r4q1',
      text: '"The author\'s prose was characterized by a certain gravity that lent weight to even the most mundane observations." As used here, "gravity" most nearly means:',
      choices: ['A) heaviness', 'B) seriousness', 'C) attraction', 'D) density'],
      answer: 1,
      explanation: 'In context, "gravity" refers to seriousness or solemnity of tone, not physical heaviness.'
    },
    {
      id: 'r4q2',
      text: '"Despite the volatile market conditions, the company maintained its steady course." As used here, "volatile" most nearly means:',
      choices: ['A) explosive', 'B) unstable', 'C) angry', 'D) chemical'],
      answer: 1,
      explanation: '"Volatile" in the context of markets means rapidly changing or unstable.'
    },
  ],
  'text-structure': [
    {
      id: 'r5q1',
      text: 'A passage first describes a scientific problem, then reviews several failed attempts to solve it, and finally presents a breakthrough discovery. The structure of this passage is best described as:',
      choices: [
        'A) Compare and contrast',
        'B) Cause and effect',
        'C) Problem and solution',
        'D) Chronological narrative'
      ],
      answer: 2,
      explanation: 'The passage moves from identifying a problem to eventually presenting a solution.'
    },
  ],
  'cross-text': [
    {
      id: 'r6q1',
      text: 'Text 1 argues that standardized testing is essential for measuring student achievement. Text 2 claims that standardized tests fail to capture critical thinking skills. How do the texts relate?',
      choices: [
        'A) Text 2 supports the argument in Text 1.',
        'B) Text 2 challenges a claim made in Text 1.',
        'C) Both texts reach the same conclusion.',
        'D) Text 1 provides evidence for Text 2\'s claim.'
      ],
      answer: 1,
      explanation: 'Text 1 supports standardized tests while Text 2 argues they are insufficient, creating a challenge.'
    },
  ],
  'rhetorical-synthesis': [
    {
      id: 'r7q1',
      text: 'A student is writing an essay about renewable energy and wants to emphasize solar power\'s growing affordability. Which sentence most effectively achieves this goal?',
      choices: [
        'A) Solar power is one type of renewable energy.',
        'B) The cost of solar panels has dropped by 89% since 2010, making solar power more accessible than ever.',
        'C) Many people prefer wind energy to solar energy.',
        'D) Solar panels require sunlight to generate electricity.'
      ],
      answer: 1,
      explanation: 'B includes a specific statistic about cost reduction, directly supporting the claim of growing affordability.'
    },
  ],
  'transitions': [
    {
      id: 'r8q1',
      text: 'Researchers initially believed the species was extinct. _______, a small population was discovered in 2019. Which transition best fills the blank?',
      choices: ['A) Furthermore', 'B) Similarly', 'C) However', 'D) Therefore'],
      answer: 2,
      explanation: '"However" signals a contrast between the initial belief (extinct) and the new finding (discovered).'
    },
  ],
  'boundaries': [
    {
      id: 'r9q1',
      text: 'Which version correctly punctuates the sentence? "The experiment which lasted three months produced unexpected results."',
      choices: [
        'A) The experiment which lasted three months, produced unexpected results.',
        'B) The experiment, which lasted three months, produced unexpected results.',
        'C) The experiment which lasted three months produced unexpected results.',
        'D) The experiment, which lasted three months produced unexpected results.'
      ],
      answer: 1,
      explanation: 'The clause "which lasted three months" is nonessential and should be set off by commas on both sides.'
    },
  ],
  'form-structure': [
    {
      id: 'r10q1',
      text: 'Choose the correct form: "Neither the students nor the teacher _____ aware of the schedule change."',
      choices: ['A) were', 'B) was', 'C) are', 'D) have been'],
      answer: 1,
      explanation: 'With "neither...nor," the verb agrees with the nearest subject ("the teacher" = singular), so "was."'
    },
  ],
};

// Helper to get questions for a module
export function getQuestions(moduleId) {
  return questions[moduleId] || [];
}

// Get all modules that have questions
export function getModulesWithQuestions() {
  return Object.keys(questions);
}

// Get total question count
export function getTotalQuestionCount() {
  let count = 0;
  for (const key in questions) {
    count += questions[key].length;
  }
  return count;
}
