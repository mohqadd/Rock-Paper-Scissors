const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const ComputerScoreSpan = document.querySelector('[data-Computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const selections = document.querySelector('.selections');
const button1 = document.querySelector('#button1');
const result = document.querySelector('.results');
button1.addEventListener('click', function (e) {
window.location.reload()
})

const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors',
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock',
  },
  {
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper',
  },
];

SELECTIONS.forEach((btn) => {
  const button = document.createElement('button');
  button.innerText = btn.emoji;
  button.classList.add('selection');
  button.setAttribute('data-selection', btn.name);
  button.addEventListener('click', (e) => {
    const selectionName = e.target.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
  selections.appendChild(button);
});

function makeSelection(selection) {
  const computerSelection = randomSelection(SELECTIONS);
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(ComputerScoreSpan);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection(SELECTIONS) {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}