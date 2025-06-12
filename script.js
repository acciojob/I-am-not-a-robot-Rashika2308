document.addEventListener('DOMContentLoaded', function() {
    // Image options - using classes img1 through img5 as per test requirements
    const imageOptions = ['img1', 'img2', 'img3', 'img4', 'img5'];
    
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
        tiles.forEach((imgClass, index) => {
            const tile = document.createElement('div');
            tile.className = `tile ${imgClass}`;
            tile.dataset.index = index;
            tile.dataset.img = imgClass;
            
            // For demo purposes, we'll show the image class as text
            tile.textContent = imgClass;
            tile.style.backgroundColor = getRandomColor();
            tile.style.display = 'flex';
            tile.style.alignItems = 'center';
            tile.style.justifyContent = 'center';
            tile.style.color = 'white';
            tile.style.fontWeight = 'bold';
            
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
    
    // Helper function to generate random color for demo purposes
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});