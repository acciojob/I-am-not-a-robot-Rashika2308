document.addEventListener('DOMContentLoaded', function() {
    const imageOptions = ['img1', 'img2', 'img3', 'img4', 'img5'];
    
    const imageContainer = document.getElementById('imageContainer');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const messagePara = document.getElementById('para');
    const heading = document.getElementById('h');
    
    let selectedTiles = [];
    let tiles = [];
    
    initGame();
    
    function initGame() {
        imageContainer.innerHTML = '';
        selectedTiles = [];
        messagePara.textContent = '';
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        heading.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
        
        const randomIndex = Math.floor(Math.random() * imageOptions.length);
        const duplicateImage = imageOptions[randomIndex];
        
        tiles = [...imageOptions];
        tiles.push(duplicateImage);
        
        shuffleArray(tiles);
        
        tiles.forEach((img, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.index = index;
            tile.dataset.img = img;
            tile.textContent = img;
            tile.style.backgroundColor = getRandomColor();
            
            tile.addEventListener('click', handleTileClick);
            imageContainer.appendChild(tile);
        });
    }
    
    function handleTileClick(event) {
        const tile = event.target;
        const index = parseInt(tile.dataset.index);
        
        if (selectedTiles.includes(index)) return;
        
        if (selectedTiles.length >= 2) return;
        
        selectedTiles.push(index);
        tile.classList.add('selected');

        if (selectedTiles.length > 0) {
            resetBtn.style.display = 'inline-block';
        }
        
        if (selectedTiles.length === 2) {
            verifyBtn.style.display = 'inline-block';
        }
    }
    
    resetBtn.addEventListener('click', function() {
        // Deselect all tiles
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('selected');
        });
        
        selectedTiles = [];
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        messagePara.textContent = '';
    });
    
    verifyBtn.addEventListener('click', function() {
        verifyBtn.style.display = 'none';
        
        const tile1 = document.querySelector(`.tile[data-index="${selectedTiles[0]}"]`);
        const tile2 = document.querySelector(`.tile[data-index="${selectedTiles[1]}"]`);
        
        if (tile1.dataset.img === tile2.dataset.img) {
            messagePara.textContent = 'You are a human. Congratulations!';
        } else {
            messagePara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
    });
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});