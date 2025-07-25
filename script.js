document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the board state

    const winningConditions = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6]
    ];

    // Function to handle a cell click
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        // If the cell is already filled or game is not active, ignore
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update the game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer); // Add class for styling X or O

        handleResultValidation();
    }

    // Function to check for win or draw
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue; // Not all cells in this condition are filled
            }
            if (a === b && b === c) {
                roundWon = true;
                // Highlight winning cells
                winCondition.forEach(index => {
                    cells[index].classList.add('winning');
                });
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = Player ${currentPlayer} has won!;
            gameActive = false;
            return;
        }

        // Check for a draw (if all cells are filled and no one has won)
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }

        // If no win or draw, switch to the next player
        handlePlayerChange();
    }

    // Function to switch player
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = Player ${currentPlayer}'s Turn;
    }

    // Function to reset the game
    function handleResetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = Player ${currentPlayer}'s Turn;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'winning'); // Remove all player and winning classes
        });
    }

    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);

    // Initial status display
    statusDisplay.textContent = Player ${currentPlayer}'s Turn;
});