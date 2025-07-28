# Golf Skins Tracker 🏌️‍♂️

A modern, responsive web application for tracking golf skins games with real-time scoring, rollover calculations, and debt tracking.

## 🚀 Live Demo

[View the live application](https://ryan-scurfield.github.io/skins-tracker)

## ✨ Features

- **Real-time Scoring**: Track scores for up to 4 players across 18 holes
- **Rollover System**: Automatic skin rollover when holes are tied
- **Debt Tracking**: Calculate how much each player owes or is owed
- **Dynamic Skin Values**: Change skin value during the game with real-time updates
- **Visual Indicators**: 
  - Green bars show when skins are won
  - Yellow bars show when skins roll over
  - Winner notifications with skin count and value
- **Game Management**:
  - Restart game (keeps players and skin value)
  - Reset individual holes
  - Export game results
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Persistence**: Saves game state locally

## 🎮 How to Play

1. **Setup**: Enter player names and set the skin value
2. **Start Game**: Click "Start Game" to begin
3. **Enter Scores**: Input scores for each hole as you play
4. **Track Progress**: Watch real-time updates of:
   - Pot value (skins won)
   - Rollover value (skins in play)
   - Individual player skins won
   - Debts owed between players
5. **Finish**: Export results or start a new game

## 🏆 Skins Rules

- **Winning**: Lowest score on a hole wins the skin
- **Ties**: Skin rolls over to the next hole
- **Rollover**: Multiple ties accumulate skins and value
- **Winner Takes All**: When a skin is won, the winner receives all accumulated value

## 💰 Debt Calculation

- **Fair Share**: Total pot divided equally among all players
- **Individual Debt**: Difference between skins won and fair share
- **Positive Values**: Player is owed money
- **Negative Values**: Player owes money

## 🛠️ Technology

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Storage**: LocalStorage for game persistence
- **Deployment**: GitHub Pages ready

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

### GitHub Pages

1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Click "Save"

### Manual Deployment

1. Clone the repository
2. Serve the files using any static web server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
skins-tracker/
├── index.html          # Main application page
├── styles.css          # Application styling
├── script.js           # Core game logic
├── package.json        # Project metadata
└── README.md          # This file
```

## 🎯 Game Features

### Real-time Updates
- Scores update immediately as entered
- Rollover calculations happen automatically
- Debt and pot values recalculate instantly

### Visual Feedback
- Winner notifications with skin count
- Color-coded debt amounts (green for positive, red for negative)
- Rollover indicators on hole cards

### Data Management
- Automatic save to localStorage
- Export game results as JSON
- Reset individual holes or entire game

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own golf games!

## 🏌️‍♂️ Enjoy Your Game!

This application makes tracking golf skins games easy and fun. No more manual calculations or paper scorecards needed! 