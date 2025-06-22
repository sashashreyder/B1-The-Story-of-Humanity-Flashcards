const data = [
  { word: 'Cohesion', prompt: 'Social ___ helps communities thrive.', answer: 'Cohesion', hint: 'Unity within a group/society.' },
  { word: 'Democracy', prompt: '___ allows citizens to choose leaders.', answer: 'Democracy', hint: 'Rule by the people through voting.' },
  { word: 'Hierarchy', prompt: 'Feudal ___ placed kings above peasants.', answer: 'Hierarchy', hint: 'A system with ranked social groups.' },
  { word: 'To emancipate', prompt: 'Lincoln ___ enslaved people in the U.S.', answer: 'To emancipate', hint: 'To free from oppression.' },
  { word: 'To institutionalize', prompt: 'Education was ___ in modern states.', answer: 'To institutionalize', hint: 'To make part of a system.' },
  { word: 'To preserve', prompt: 'Museums ___ ancient artifacts.', answer: 'To preserve', hint: 'To protect from loss.' },
  { word: 'Barbaric', prompt: '___ punishments were used in medieval times.', answer: 'Barbaric', hint: 'Extremely cruel/uncivilized.' },
  { word: 'Progressive', prompt: '___ laws support gender equality.', answer: 'Progressive', hint: 'Favoring social reform.' },
  { word: 'Cultural appropriation', prompt: 'Using sacred symbols as fashion is ___.', answer: 'Cultural appropriation', hint: 'Adopting elements of a culture unfairly.' },
  { word: 'To shape the course of history', prompt: 'Wars ___ the course of history.', answer: 'To shape the course of history', hint: 'To influence major events.' }
];


let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp) return;

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  if (user === correct) {
    fb.textContent = '✓ Correct!';
    fb.className   = 'feedback correct';
    score++;
  } else {
    fb.textContent = `✗ ${correct}`;
    fb.className   = 'feedback incorrect';
  }

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);











