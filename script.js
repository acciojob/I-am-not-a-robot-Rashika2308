const imageSources = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
const container = document.getElementById('images');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const resultPara = document.getElementById('para');
const msg = document.getElementById('h');

let selectedTiles = [];

function shuffleAndDisplayImages() {
  container.innerHTML = '';
  resultPara.textContent = '';
  msg.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  selectedTiles = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';

  // Clone and shuffle
  const images = [...imageSources];
  const duplicateIndex = Math.floor(Math.random() * 5);
  images.push(imageSources[duplicateIndex]);

  const shuffled = images.sort(() => Math.random() - 0.5);

  shuffled.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'tile';
    img.dataset.src = src;
    img.addEventListener('click', () => handleTileClick(img));
    container.appendChild(img);
  });
}

function handleTileClick(tile) {
  if (selectedTiles.length >= 2 || tile.classList.contains('selected')) return;

  tile.classList.add('selected');
  selectedTiles.push(tile);

  if (selectedTiles.length === 1) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedTiles.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

function resetState() {
  selectedTiles.forEach(tile => tile.classList.remove('selected'));
  selectedTiles = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  resultPara.textContent = '';
  msg.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
}

function verifySelection() {
  const [first, second] = selectedTiles;
  verifyBtn.style.display = 'none';

  if (first.dataset.src === second.dataset.src) {
    resultPara.textContent = 'You are a human. Congratulations!';
  } else {
    resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
}

resetBtn.addEventListener('click', resetState);
verifyBtn.addEventListener('click', verifySelection);

window.onload = shuffleAndDisplayImages;
