class GolfSkinsTracker {
    constructor() {
        this.gameState = {
            players: [],
            skinValue: 5,
            holes: [],
            currentHole: 1,
            totalHoles: 18
        };
        
        // Castle Eden Golf Club Handicap Conversion Data (Men's, 69.5/131, Par 70)
        this.castleEdenHandicapRanges = [
            { min: 5.0, max: 4.4, courseHandicap: 6 },
            { min: 4.3, max: 3.5, courseHandicap: 5 },
            { min: 3.4, max: 2.6, courseHandicap: 4 },
            { min: 2.5, max: 1.8, courseHandicap: 3 },
            { min: 1.7, max: 0.9, courseHandicap: 2 },
            { min: 0.8, max: 0.1, courseHandicap: 1 },
            { min: 0.0, max: 0.8, courseHandicap: 0 },
            { min: 0.9, max: 1.7, courseHandicap: 1 },
            { min: 1.8, max: 2.5, courseHandicap: 2 },
            { min: 2.6, max: 3.4, courseHandicap: 3 },
            { min: 3.5, max: 4.3, courseHandicap: 4 },
            { min: 4.4, max: 5.1, courseHandicap: 5 },
            { min: 5.2, max: 6.0, courseHandicap: 6 },
            { min: 6.1, max: 6.9, courseHandicap: 7 },
            { min: 7.0, max: 7.7, courseHandicap: 8 },
            { min: 7.8, max: 8.6, courseHandicap: 9 },
            { min: 8.7, max: 9.4, courseHandicap: 10 },
            { min: 9.5, max: 10.3, courseHandicap: 11 },
            { min: 10.4, max: 11.2, courseHandicap: 12 },
            { min: 11.3, max: 12.0, courseHandicap: 13 },
            { min: 12.1, max: 12.9, courseHandicap: 14 },
            { min: 13.0, max: 13.8, courseHandicap: 15 },
            { min: 13.9, max: 14.6, courseHandicap: 16 },
            { min: 14.7, max: 15.5, courseHandicap: 17 },
            { min: 15.6, max: 16.3, courseHandicap: 18 },
            { min: 16.4, max: 17.2, courseHandicap: 19 },
            { min: 17.3, max: 18.1, courseHandicap: 20 },
            { min: 18.2, max: 18.9, courseHandicap: 21 },
            { min: 19.0, max: 19.8, courseHandicap: 22 },
            { min: 19.9, max: 20.7, courseHandicap: 23 },
            { min: 20.8, max: 21.5, courseHandicap: 24 },
            { min: 21.6, max: 22.4, courseHandicap: 25 },
            { min: 22.5, max: 23.2, courseHandicap: 26 },
            { min: 23.3, max: 24.1, courseHandicap: 27 },
            { min: 24.2, max: 25.0, courseHandicap: 28 },
            { min: 25.1, max: 25.8, courseHandicap: 29 },
            { min: 25.9, max: 26.7, courseHandicap: 30 },
            { min: 26.8, max: 27.6, courseHandicap: 31 },
            { min: 27.7, max: 28.4, courseHandicap: 32 },
            { min: 28.5, max: 29.3, courseHandicap: 33 },
            { min: 29.4, max: 30.1, courseHandicap: 34 },
            { min: 30.2, max: 31.0, courseHandicap: 35 },
            { min: 31.1, max: 31.9, courseHandicap: 36 },
            { min: 32.0, max: 32.7, courseHandicap: 37 },
            { min: 32.8, max: 33.6, courseHandicap: 38 },
            { min: 33.7, max: 34.5, courseHandicap: 39 },
            { min: 34.6, max: 35.3, courseHandicap: 40 },
            { min: 35.4, max: 36.2, courseHandicap: 41 },
            { min: 36.3, max: 37.0, courseHandicap: 42 },
            { min: 37.1, max: 37.9, courseHandicap: 43 },
            { min: 38.0, max: 38.8, courseHandicap: 44 },
            { min: 38.9, max: 39.6, courseHandicap: 45 },
            { min: 39.7, max: 40.5, courseHandicap: 46 },
            { min: 40.6, max: 41.4, courseHandicap: 47 },
            { min: 41.5, max: 42.2, courseHandicap: 48 },
            { min: 42.3, max: 43.1, courseHandicap: 49 },
            { min: 43.2, max: 43.9, courseHandicap: 50 },
            { min: 44.0, max: 44.8, courseHandicap: 51 },
            { min: 44.9, max: 45.7, courseHandicap: 52 },
            { min: 45.8, max: 46.5, courseHandicap: 53 },
            { min: 46.6, max: 47.4, courseHandicap: 54 },
            { min: 47.5, max: 48.3, courseHandicap: 55 },
            { min: 48.4, max: 49.1, courseHandicap: 56 },
            { min: 49.2, max: 50.0, courseHandicap: 57 },
            { min: 50.1, max: 50.8, courseHandicap: 58 },
            { min: 50.9, max: 51.7, courseHandicap: 59 },
            { min: 51.8, max: 52.6, courseHandicap: 60 },
            { min: 52.7, max: 53.4, courseHandicap: 61 },
            { min: 53.5, max: 54.0, courseHandicap: 62 }
        ];
        
        this.initializeEventListeners();
        this.loadGameState();
    }

    initializeEventListeners() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('newGame').addEventListener('click', () => this.newGame());
        document.getElementById('restartGame').addEventListener('click', () => this.restartGame());
        document.getElementById('changeSkinValue').addEventListener('click', () => this.showChangeSkinValueDialog());
        document.getElementById('exportResults').addEventListener('click', () => this.exportResults());
        
        // Add handicap index input listeners
        document.querySelectorAll('.player-handicap-index').forEach(input => {
            input.addEventListener('input', (e) => this.calculateCourseHandicap(e.target));
        });
    }

    loadGameState() {
        const savedState = localStorage.getItem('golfSkinsGame');
        if (savedState) {
            this.gameState = JSON.parse(savedState);
            
            // Add stroke index to existing games if missing
            if (this.gameState.holes && this.gameState.holes.length > 0) {
                const castleEdenStrokeIndex = [
                    4, 2, 6, 14, 8, 10, 18, 16, 12,  // Holes 1-9
                    17, 13, 5, 3, 9, 1, 7, 11, 15    // Holes 10-18
                ];
                
                this.gameState.holes.forEach((hole, index) => {
                    if (hole.strokeIndex === undefined) {
                        hole.strokeIndex = castleEdenStrokeIndex[index];
                    }
                });
            }
            
            // Update player structure for existing games
            if (this.gameState.players && this.gameState.players.length > 0) {
                this.gameState.players.forEach(player => {
                    if (player.handicapIndex === undefined) {
                        // Convert old handicap to handicapIndex
                        player.handicapIndex = player.handicap || 0;
                        player.courseHandicap = this.calculateCourseHandicapFromIndex(player.handicapIndex);
                        delete player.handicap; // Remove old property
                    }
                });
                
                // Save the updated state
                this.saveGameState();
            }
            
            if (this.gameState.players.length > 0) {
                this.showGameBoard();
            }
        }
    }

    saveGameState() {
        localStorage.setItem('golfSkinsGame', JSON.stringify(this.gameState));
    }

    calculateCourseHandicap(input) {
        const handicapIndex = parseFloat(input.value) || 0;
        const playerNumber = input.getAttribute('data-player');
        const displayElement = document.querySelector(`.course-handicap-display[data-player="${playerNumber}"]`);
        
        // Find the appropriate course handicap range
        const range = this.castleEdenHandicapRanges.find(r => 
            handicapIndex >= r.min && handicapIndex <= r.max
        );
        
        const courseHandicap = range ? range.courseHandicap : 0;
        displayElement.textContent = `Course: ${courseHandicap}`;
        
        return courseHandicap;
    }

    calculateCourseHandicapFromIndex(handicapIndex) {
        // Find the appropriate course handicap range
        const range = this.castleEdenHandicapRanges.find(r => 
            handicapIndex >= r.min && handicapIndex <= r.max
        );
        
        return range ? range.courseHandicap : 0;
    }

    calculateStrokeAllocation(holeIndex) {
        const hole = this.gameState.holes[holeIndex];
        const strokeIndex = hole.strokeIndex;
        
        // Calculate which players get shots on this hole
        const strokeAllocation = {};
        
        this.gameState.players.forEach(player => {
            const courseHandicap = player.courseHandicap || 0;
            
            // Calculate how many shots this player gets on this hole
            let shotsOnThisHole = 0;
            
            if (courseHandicap > 0) {
                // Calculate shots based on stroke index
                const fullShots = Math.floor(courseHandicap / 18);
                const remainingShots = courseHandicap % 18;
                
                // Player gets a full shot on every hole
                shotsOnThisHole = fullShots;
                
                // Plus an extra shot on the lowest stroke index holes
                if (strokeIndex <= remainingShots) {
                    shotsOnThisHole += 1;
                }
            }
            
            strokeAllocation[player.name] = shotsOnThisHole;
        });
        
        return strokeAllocation;
    }

    calculateNetScore(grossScore, shots) {
        return Math.max(1, grossScore - shots);
    }

    startGame() {
        const skinValue = parseInt(document.getElementById('skinValue').value);
        const playerNames = Array.from(document.querySelectorAll('.player-name')).map(input => input.value.trim());
        const playerHandicapIndexes = Array.from(document.querySelectorAll('.player-handicap-index')).map(input => parseFloat(input.value) || 0);

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
            players: validPlayers.map((name, index) => {
                const handicapIndex = playerHandicapIndexes[index] || 0;
                const courseHandicap = this.calculateCourseHandicapFromIndex(handicapIndex);
                
                return {
                    name: name,
                    handicapIndex: handicapIndex,
                    courseHandicap: courseHandicap,
                    skinsWon: 0,
                    totalScore: 0
                };
            }),
            skinValue: skinValue,
            holes: [],
            currentHole: 1,
            totalHoles: 18
        };

        // Castle Eden Golf Club Stroke Index data
        const castleEdenStrokeIndex = [
            4, 2, 6, 14, 8, 10, 18, 16, 12,  // Holes 1-9
            17, 13, 5, 3, 9, 1, 7, 11, 15    // Holes 10-18
        ];

        // Initialize holes with stroke index
        for (let i = 1; i <= this.gameState.totalHoles; i++) {
            this.gameState.holes.push({
                holeNumber: i,
                strokeIndex: castleEdenStrokeIndex[i - 1],
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
        
        // Update players summary
        this.updatePlayersSummary();
    }

    updatePlayersSummary() {
        const playersSummaryDiv = document.getElementById('playersSummary');
        if (!playersSummaryDiv) return;
        
        playersSummaryDiv.innerHTML = '';
        
        this.gameState.players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-summary-card';
            
            const handicapDisplay = player.handicapIndex !== undefined ? 
                `Index: ${player.handicapIndex}` : 
                `Handicap: ${player.courseHandicap || 0}`;
            
            playerCard.innerHTML = `
                <div class="player-summary-name">${player.name}</div>
                <div class="player-summary-handicap">${handicapDisplay}</div>
                <div class="player-summary-course">Course: ${player.courseHandicap || 0}</div>
            `;
            
            playersSummaryDiv.appendChild(playerCard);
        });
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
                <h3>Hole ${hole.holeNumber} <span class="stroke-index">S.I. ${hole.strokeIndex}</span> <span class="skin-value">(£${hole.skinValue})</span></h3>
                <button class="btn btn-sm btn-outline" data-hole="${index}" onclick="golfTracker.resetHoleScores(${index})">
                    <i class="fas fa-undo"></i> Reset
                </button>
            </div>
            <div class="scores-grid">
                ${this.gameState.players.map((player, playerIndex) => {
                    const strokeAllocation = hole.strokeAllocation || this.calculateStrokeAllocation(index);
                    const netScores = hole.netScores || {};
                    const shots = strokeAllocation[player.name] || 0;
                    const grossScore = hole.scores[player.name] || '';
                    const netScore = netScores[player.name] || '';
                    
                    return `
                        <div class="score-input">
                            <label>${player.name} ${shots > 0 ? `<span class="shot-indicator">🎯</span>` : ''}</label>
                            <div class="score-row">
                                <input type="number" 
                                       min="1" 
                                       max="20" 
                                       value="${grossScore}" 
                                       data-hole="${index}" 
                                       data-player="${player.name}"
                                       placeholder="Score">
                                ${netScore ? `<span class="net-score">Net: ${netScore}</span>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
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
        
        // Calculate stroke allocation for this hole
        const strokeAllocation = this.calculateStrokeAllocation(holeIndex);
        
        // Calculate net scores
        const netScores = {};
        this.gameState.players.forEach(player => {
            const grossScore = scores[player.name];
            const shots = strokeAllocation[player.name] || 0;
            netScores[player.name] = this.calculateNetScore(grossScore, shots);
        });
        
        // Find the lowest net score
        let lowestNetScore = Infinity;
        let winners = [];
        
        this.gameState.players.forEach(player => {
            const netScore = netScores[player.name];
            if (netScore < lowestNetScore) {
                lowestNetScore = netScore;
                winners = [player.name];
            } else if (netScore === lowestNetScore) {
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
        
        // Store stroke allocation and net scores for display
        hole.strokeAllocation = strokeAllocation;
        hole.netScores = netScores;
        
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