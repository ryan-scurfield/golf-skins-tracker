# Golf Skins Tracker

A modern web application for tracking golf skins games and calculating player debts. Perfect for your next golf outing!

## Features

- **Easy Setup**: Configure skin value and add up to 4 players
- **Real-time Scoring**: Enter scores hole by hole with automatic skin calculation
- **Live Updates**: See skins won and debts owed in real-time
- **Responsive Design**: Works great on desktop, tablet, and mobile
- **Data Persistence**: Game state is automatically saved to your browser
- **Export Results**: Download game results as JSON file
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## How to Use

### 1. Start the Application

```bash
# Navigate to the project directory
cd skins-tracker

# Start the local server
python3 -m http.server 8000

# Open your browser and go to:
# http://localhost:8000
```

### 2. Game Setup

1. **Set Skin Value**: Enter the pound amount each skin is worth (default: £5)
2. **Add Players**: Enter names for up to 4 players (minimum 2 required)
3. **Optional Handicaps**: Add player handicaps if desired
4. **Start Game**: Click "Start Game" to begin tracking

### 3. Scoring

- **Enter Scores**: For each hole, enter the score for each player
- **Automatic Calculation**: The app automatically determines who wins each skin
- **Tie Handling**: If players tie for lowest score, no skin is awarded
- **Real-time Updates**: See skins won and debts update as you enter scores

### 4. Results & Debts

The app calculates:
- **Skins Won**: How many skins each player has won
- **Total Pot**: Total value of all skins in play
- **Debts Owed**: How much each player owes or is owed

### 5. Game Management

- **New Game**: Start a fresh game (clears all data)
- **Export Results**: Download game data as JSON file
- **Auto-save**: Game progress is automatically saved to your browser

## How Skins Work

1. **Each hole is worth one skin** (or the value you set)
2. **Lowest score wins the skin** for that hole
3. **Ties result in no skin awarded** (carries over to next hole)
4. **Final settlement**: Players who won more than their fair share owe money to those who won less

## Example Scenario

- **Skin Value**: £5
- **Players**: 4 players
- **Total Skins Won**: 10 skins
- **Total Pot**: £50
- **Fair Share**: £12.50 per player

If Player A won 3 skins (£15), they owe £2.50 to the pot.
If Player B won 1 skin (£5), they are owed £7.50.

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies**: Pure vanilla JavaScript
- **Local Storage**: Game state persists in browser
- **Responsive**: Mobile-first design
- **Cross-platform**: Works on any modern browser

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
skins-tracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Project metadata
└── README.md          # This file
```

## Tips for Best Experience

1. **Use on Mobile**: Perfect for on-course scoring
2. **Save Progress**: Game automatically saves as you play
3. **Export Results**: Download results for record keeping
4. **Clear Browser Data**: If you want to start completely fresh

## Troubleshooting

- **Game not loading**: Clear browser cache and reload
- **Scores not saving**: Check if JavaScript is enabled
- **Export not working**: Try a different browser

Enjoy your golf game! 🏌️‍♂️ 