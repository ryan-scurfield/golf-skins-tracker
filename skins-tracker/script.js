class GolfSkinsTracker {
    constructor() {
        this.gameState = {
            players: [],
            skinValue: 5,
            holes: [],
            currentHole: 1,
            totalHoles: 18
        };
        
        this.initializeEventListeners();
        this.loadGameState();
    }

    initializeEventListeners() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('newGame').addEventListener('click', () => this.newGame());
        document.getElementById('restartGame').addEventListener('click', () => this.restartGame());
        document.getElementById('changeSkinValue').addEventListener('click', () => this.showChangeSkinValueDialog());
        document.getElementById('exportResults').addEventListener('click', () => this.exportResults());
    }

    loadGameState() {
        const savedState = localStorage.getItem('golfSkinsGame');
        if (savedState) {
            this.gameState = JSON.parse(savedState);
            if (this.gameState.players.length > 0) {
                this.showGameBoard();
            }
        }
    }

    saveGameState() {
        localStorage.setItem('golfSkinsGame', JSON.stringify(this.gameState));
    }

    startGame() {
        const skinValue = parseInt(document.getElementById('skinValue').value);
        const playerNames = Array.from(document.querySelectorAll('.player-name')).map(input => input.value.trim());
        const playerHandicaps = Array.from(document.querySelectorAll('.player-handicap')).map(input => parseInt(input.value) || 0);

        // Validate inputs
        if (skinValue <= 0) {
            alert('Please enter a valid skin value.');
            return;
        }

        const validPlayers = playerNames.filter((name, index) => name !== '');
        if (validPlayers.length < 2) {
            alert('Please enter at least 2 player names.');
            return;
        }

        // Initialize game state
        this.gameState = {
            players: validPlayers.map((name, index) => ({
                name: name,
                handicap: playerHandicaps[index] || 0,
                skinsWon: 0,
                totalScore: 0
            })),
            skinValue: skinValue,
            holes: [],
            currentHole: 1,
            totalHoles: 18
        };

        // Initialize holes
        for (let i = 1; i <= this.gameState.totalHoles; i++) {
            this.gameState.holes.push({
                holeNumber: i,
                scores: {},
                winner: null,
                skinValue: this.gameState.skinValue,
                skinsRolledOver: 0
            });
        }

        this.saveGameState();
        this.showGameBoard();
    }

    showGameBoard() {
        document.getElementById('gameSetup').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        
        this.updateGameInfo();
        this.renderHoles();
        this.updateResults();
    }

    updateGameInfo() {
        document.getElementById('currentSkinValue').textContent = `£${this.gameState.skinValue}`;
        
        const totalSkins = this.gameState.players.reduce((total, player) => total + player.skinsWon, 0);
        document.getElementById('totalSkins').textContent = totalSkins;
        
        // Calculate total pot value by summing only won skins
        let totalPotValue = 0;
        
        // Calculate value of skins won
        this.gameState.holes.forEach(hole => {
            if (hole.winner) {
                totalPotValue += hole.skinValue;
            }
        });
        
        // Calculate current rollover value (skins currently in play)
        let currentRolloverValue = 0;
        
        // Find the current rollover by looking at the last hole without a winner
        for (let i = this.gameState.holes.length - 1; i >= 0; i--) {
            const hole = this.gameState.holes[i];
            
            if (!hole.winner && hole.skinValue > this.gameState.skinValue) {
                // This hole has rollover, calculate how many skins are in play
                const skinsInPlay = hole.skinsRolledOver + 1;
                currentRolloverValue = skinsInPlay * this.gameState.skinValue;
                break;
            } else if (hole.winner) {
                // Found a winner, no current rollover
                currentRolloverValue = 0;
                break;
            }
        }
        
        document.getElementById('potValue').textContent = `£${totalPotValue}`;
        document.getElementById('rolloverValue').textContent = `£${currentRolloverValue}`;
    }

    renderHoles() {
        const holesGrid = document.getElementById('holesGrid');
        holesGrid.innerHTML = '';

        this.gameState.holes.forEach((hole, index) => {
            const holeCard = this.createHoleCard(hole, index);
            holesGrid.appendChild(holeCard);
        });
    }

    createHoleCard(hole, index) {
        const holeCard = document.createElement('div');
        holeCard.className = 'hole-card';
        holeCard.innerHTML = `
            <div class="hole-header">
                <h3>Hole ${hole.holeNumber} <span class="skin-value">(£${hole.skinValue})</span></h3>
                <button class="btn btn-sm btn-outline" data-hole="${index}" onclick="golfTracker.resetHoleScores(${index})">
                    <i class="fas fa-undo"></i> Reset
                </button>
            </div>
            <div class="scores-grid">
                ${this.gameState.players.map((player, playerIndex) => `
                    <div class="score-input">
                        <label>${player.name}</label>
                        <input type="number" 
                               min="1" 
                               max="20" 
                               value="${hole.scores[player.name] || ''}" 
                               data-hole="${index}" 
                               data-player="${player.name}"
                               placeholder="Score">
                    </div>
                `).join('')}
            </div>
            ${hole.winner ? `<div class="hole-winner">🏆 ${hole.winner} wins the skin!</div>` : ''}
            ${!hole.winner && Object.keys(hole.scores).length > 0 ? `<div class="hole-rollover">🔄 ${hole.skinsRolledOver + 1} skin${hole.skinsRolledOver > 0 ? 's' : ''} rolled over to next hole</div>` : ''}
        `;

        // Add event listeners for score inputs
        const scoreInputs = holeCard.querySelectorAll('input[type="number"]');
        scoreInputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleScoreInput(e, index));
        });

        return holeCard;
    }

    handleScoreInput(event, holeIndex) {
        const playerName = event.target.dataset.player;
        const score = parseInt(event.target.value) || 0;
        
        if (score > 0) {
            this.gameState.holes[holeIndex].scores[playerName] = score;
            this.calculateHoleWinner(holeIndex);
            this.updateGameInfo();
            this.saveGameState();
        }
    }

    calculateHoleWinner(holeIndex) {
        const hole = this.gameState.holes[holeIndex];
        const scores = hole.scores;
        
        // Check if all players have scores for this hole
        const allPlayersScored = this.gameState.players.every(player => 
            scores[player.name] && scores[player.name] > 0
        );
        
        if (!allPlayersScored) {
            hole.winner = null;
            return;
        }
        
        // Find the lowest score
        let lowestScore = Infinity;
        let winners = [];
        
        this.gameState.players.forEach(player => {
            const score = scores[player.name];
            if (score < lowestScore) {
                lowestScore = score;
                winners = [player.name];
            } else if (score === lowestScore) {
                winners.push(player.name);
            }
        });
        
        // If there's a tie, rollover the skin to next hole
        if (winners.length === 1) {
            hole.winner = winners[0];
            // Award the skin
            const winnerPlayer = this.gameState.players.find(p => p.name === winners[0]);
            if (winnerPlayer) {
                winnerPlayer.skinsWon++;
                // Show winner notification
                this.showWinnerNotification(winners[0], hole.skinValue, hole.skinsRolledOver + 1);
            }
            // Reset rollover for next hole
            this.updateRolloverForNextHole(holeIndex, 0);
        } else {
            hole.winner = null; // Tie - skin rolls over
            // Add current skin value to next hole's rollover
            this.updateRolloverForNextHole(holeIndex, hole.skinValue);
        }
        
        // Update all displays in real-time
        this.renderHoles();
        this.updateGameInfo();
        this.updateResults();
    }

    updateRolloverForNextHole(currentHoleIndex, rolloverAmount) {
        // Recalculate all holes from the beginning to properly track accumulated skins
        this.recalculateRollovers();
    }

    showWinnerNotification(winnerName, skinValue, skinsWon) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'winner-notification';
        notification.innerHTML = `
            <div class="winner-content">
                <h3>🏆 ${winnerName} wins!</h3>
                <p>${skinsWon} skin${skinsWon > 1 ? 's' : ''} worth £${skinValue}</p>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    updateResults() {
        this.updateSkinsWon();
        this.updateDebts();
    }

    updateSkinsWon() {
        const skinsWonDiv = document.getElementById('skinsWon');
        skinsWonDiv.innerHTML = '';
        
        this.gameState.players.forEach(player => {
            let playerValue = 0;
            let totalSkinsWon = 0;
            
            // Sum up the actual value and count of skins this player won
            this.gameState.holes.forEach(hole => {
                if (hole.winner === player.name) {
                    playerValue += hole.skinValue;
                    // Calculate how many skins this represents based on rollover
                    const skinsInThisHole = hole.skinsRolledOver + 1;
                    totalSkinsWon += skinsInThisHole;
                }
            });
            
            const playerResult = document.createElement('div');
            playerResult.className = 'player-result';
            playerResult.innerHTML = `
                <span class="player-name">${player.name}</span>
                <span class="player-skins">${totalSkinsWon} skins (£${playerValue})</span>
            `;
            skinsWonDiv.appendChild(playerResult);
        });
    }

    updateDebts() {
        const debtsDiv = document.getElementById('debts');
        debtsDiv.innerHTML = '';
        
        // Calculate total pot value by summing only won skins (not rollovers)
        let totalPotValue = 0;
        
        // Calculate value of skins won only
        this.gameState.holes.forEach(hole => {
            if (hole.winner) {
                totalPotValue += hole.skinValue;
            }
        });
        
        const skinsPerPlayer = totalPotValue / this.gameState.players.length;
        
        // Calculate each player's actual value won
        this.gameState.players.forEach(player => {
            let playerValue = 0;
            
            // Sum up the actual value of skins this player won
            this.gameState.holes.forEach(hole => {
                if (hole.winner === player.name) {
                    playerValue += hole.skinValue;
                }
            });
            
            const debt = playerValue - skinsPerPlayer;
            
            const debtItem = document.createElement('div');
            debtItem.className = 'debt-item';
            debtItem.innerHTML = `
                <span class="player-name">${player.name}</span>
                <span class="debt-amount ${debt >= 0 ? 'positive' : 'negative'}">
                    ${debt >= 0 ? '+' : ''}£${debt.toFixed(2)}
                </span>
            `;
            debtsDiv.appendChild(debtItem);
        });
    }

    newGame() {
        if (confirm('Are you sure you want to start a new game? This will clear all current data.')) {
            localStorage.removeItem('golfSkinsGame');
            location.reload();
        }
    }

    restartGame() {
        if (confirm('Are you sure you want to restart the current game? This will reset all scores but keep the same players and skin value.')) {
            // Reset all hole scores and winners
            this.gameState.holes.forEach(hole => {
                hole.scores = {};
                hole.winner = null;
                hole.skinValue = this.gameState.skinValue; // Reset to base skin value
            });
            
            // Reset player skins won
            this.gameState.players.forEach(player => {
                player.skinsWon = 0;
            });
            
            this.saveGameState();
            this.renderHoles();
            this.updateGameInfo();
            this.updateResults();
        }
    }

    resetHoleScores(holeIndex) {
        if (confirm(`Are you sure you want to reset Hole ${holeIndex + 1} scores?`)) {
            const hole = this.gameState.holes[holeIndex];
            
            // If this hole had a winner, remove their skin
            if (hole.winner) {
                const winnerPlayer = this.gameState.players.find(p => p.name === hole.winner);
                if (winnerPlayer) {
                    winnerPlayer.skinsWon--;
                }
            }
            
            // Reset the hole
            hole.scores = {};
            hole.winner = null;
            
            // Recalculate rollovers for subsequent holes
            this.recalculateRollovers();
            
            this.saveGameState();
            this.renderHoles();
            this.updateGameInfo();
            this.updateResults();
        }
    }

    recalculateRollovers() {
        // Reset all holes to base skin value
        this.gameState.holes.forEach(hole => {
            hole.skinValue = this.gameState.skinValue;
            hole.skinsRolledOver = 0;
        });
        
        // Recalculate rollovers based on current winners
        let accumulatedRollover = 0;
        let accumulatedSkins = 0;
        
        for (let i = 0; i < this.gameState.holes.length; i++) {
            const hole = this.gameState.holes[i];
            
            if (!hole.winner) {
                // This hole has no winner, add accumulated rollover
                hole.skinValue = this.gameState.skinValue + accumulatedRollover;
                hole.skinsRolledOver = accumulatedSkins;
                accumulatedRollover = hole.skinValue; // This becomes the rollover for next hole
                accumulatedSkins += 1; // Add one more skin to the rollover
            } else {
                // This hole has a winner, reset the rollover chain
                hole.skinValue = this.gameState.skinValue + accumulatedRollover;
                hole.skinsRolledOver = accumulatedSkins;
                accumulatedRollover = 0; // Reset for next hole
                accumulatedSkins = 0;
            }
        }
    }

    showChangeSkinValueDialog() {
        const newValue = prompt(`Enter new skin value (current: £${this.gameState.skinValue}):`, this.gameState.skinValue);
        
        if (newValue !== null && newValue !== '') {
            const newSkinValue = parseInt(newValue);
            if (newSkinValue > 0) {
                const oldSkinValue = this.gameState.skinValue;
                this.gameState.skinValue = newSkinValue;
                
                // Recalculate all hole values based on new skin value
                this.recalculateHoleValues(oldSkinValue, newSkinValue);
                
                this.saveGameState();
                this.renderHoles();
                this.updateGameInfo();
                this.updateResults();
            } else {
                alert('Please enter a valid positive number.');
            }
        }
    }

    recalculateHoleValues(oldValue, newValue) {
        // Reset all holes to base skin value
        this.gameState.holes.forEach(hole => {
            hole.skinValue = this.gameState.skinValue;
            hole.skinsRolledOver = 0;
        });
        
        // Recalculate rollovers based on current winners
        let accumulatedRollover = 0;
        let accumulatedSkins = 0;
        
        for (let i = 0; i < this.gameState.holes.length; i++) {
            const hole = this.gameState.holes[i];
            
            if (!hole.winner) {
                // This hole has no winner, add accumulated rollover
                hole.skinValue = this.gameState.skinValue + accumulatedRollover;
                hole.skinsRolledOver = accumulatedSkins;
                accumulatedRollover = hole.skinValue; // This becomes the rollover for next hole
                accumulatedSkins += 1; // Add one more skin to the rollover
            } else {
                // This hole has a winner, reset the rollover chain
                hole.skinValue = this.gameState.skinValue + accumulatedRollover;
                hole.skinsRolledOver = accumulatedSkins;
                accumulatedRollover = 0; // Reset for next hole
                accumulatedSkins = 0;
            }
        }
    }

    exportResults() {
        const gameData = {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            skinValue: this.gameState.skinValue,
            players: this.gameState.players,
            holes: this.gameState.holes,
            summary: this.generateSummary()
        };
        
        const dataStr = JSON.stringify(gameData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `golf-skins-game-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    generateSummary() {
        const totalSkins = this.gameState.players.reduce((total, player) => total + player.skinsWon, 0);
        const potValue = totalSkins * this.gameState.skinValue;
        const skinsPerPlayer = potValue / this.gameState.players.length;
        
        return {
            totalSkins,
            potValue,
            skinsPerPlayer,
            debts: this.gameState.players.map(player => {
                const playerValue = player.skinsWon * this.gameState.skinValue;
                return {
                    name: player.name,
                    skinsWon: player.skinsWon,
                    value: playerValue,
                    debt: playerValue - skinsPerPlayer
                };
            })
        };
    }
}

// Initialize the app when the page loads
let golfTracker;
document.addEventListener('DOMContentLoaded', () => {
    golfTracker = new GolfSkinsTracker();
}); 