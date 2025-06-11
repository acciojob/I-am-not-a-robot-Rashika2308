document.addEventListener('DOMContentLoaded', function() {
    // Image options (replace these with actual image paths in production)
    const imageOptions = [
        'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        'https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg',
        'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        'https://images.pexels.com/photos/2523934/pexels-photo-2523934.jpeg'
    ];
    
    // DOM elements
    const imageContainer = document.getElementById('imageContainer');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const messagePara = document.getElementById('para');
    const heading = document.getElementById('h');
    
    // State variables
    let selectedTiles = [];
    let tiles = [];
    
    // Initialize the game
    initGame();
    
    // Initialize the game state
    function initGame() {
        // Clear previous state
        imageContainer.innerHTML = '';
        selectedTiles = [];
        messagePara.textContent = '';
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        heading.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
        
        // Create the tiles array with one duplicate
        const randomIndex = Math.floor(Math.random() * imageOptions.length);
        const duplicateImage = imageOptions[randomIndex];
        
        // Create 5 unique images + 1 duplicate
        tiles = [...imageOptions];
        tiles.push(duplicateImage);
        
        // Shuffle the tiles
        shuffleArray(tiles);
        
        // Create tile elements
        tiles.forEach((imgSrc, index) => {
            const tile = document.createElement('img');
            tile.className = 'tile';
            tile.dataset.index = index;
            tile.dataset.img = imgSrc;
            tile.src = imgSrc;
            tile.alt = `Verification image ${index + 1}`;
            
            tile.addEventListener('click', handleTileClick);
            imageContainer.appendChild(tile);
        });
    }
    
    // Handle tile click
    function handleTileClick(event) {
        const tile = event.target;
        const index = parseInt(tile.dataset.index);
        
        // If tile is already selected, do nothing
        if (selectedTiles.includes(index)) return;
        
        // If already 2 tiles selected, do nothing
        if (selectedTiles.length >= 2) return;
        
        // Select the tile
        selectedTiles.push(index);
        tile.classList.add('selected');
        
        // Show reset button if at least one tile is selected
        if (selectedTiles.length > 0) {
            resetBtn.style.display = 'inline-block';
        }
        
        // Show verify button if exactly two tiles are selected
        if (selectedTiles.length === 2) {
            verifyBtn.style.display = 'inline-block';
        }
    }
    
    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        // Deselect all tiles
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('selected');
        });
        
        // Reset state
        selectedTiles = [];
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        messagePara.textContent = '';
    });
    
    // Verify button click handler
    verifyBtn.addEventListener('click', function() {
        // Hide verify button
        verifyBtn.style.display = 'none';
        
        // Get the two selected tiles
        const tile1 = document.querySelector(`.tile[data-index="${selectedTiles[0]}"]`);
        const tile2 = document.querySelector(`.tile[data-index="${selectedTiles[1]}"]`);
        
        // Check if they match
        if (tile1.dataset.img === tile2.dataset.img) {
            messagePara.textContent = 'You are a human. Congratulations!';
        } else {
            messagePara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
    });
    
    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});