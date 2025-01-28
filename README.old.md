# Dungeon Explorer Game

A simple **Dungeon Explorer** game built using **React.js**, playable entirely in the browser without any backend.

---

## **Overview**
Dungeon Explorer is a 2D grid-based game where players navigate through a dungeon to collect treasures, avoid traps, and reach the exit to win. The game is fully frontend-based and designed to be lightweight and engaging.

---

## **Features**

1. **Dungeon Layout:**
   - A 2D grid-based dungeon with walls, pathways, traps, treasures, and an exit.
   - The dungeon layout is generated using a utility function in the `src/utils/generateDungeon.js` file.

2. **Player Movement:**
   - Move the player character using arrow keys or on-screen controls.
   - Movement is restricted to valid paths.
   - The `handleKeyDown` function handles specific keyboard events (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) to control player movement.
   - The `movePlayer` function checks the player's intended new position before updating it, preventing movement through walls (`#`).

3. **Treasure Collection:**
   - Players collect treasures to increase their score.

4. **Traps:**
   - Stepping on traps reduces the player's health.

5. **Win/Lose Conditions:**
   - Win: Collect all treasures and reach the exit.
   - Lose: Health reaches zero.

6. **HUD:**
   - Displays player stats such as health, score, and remaining treasures.

7. **Restart Option:**
   - Restart the game at any time using the restart button.

---

## **Technologies Used**

- **React.js** for the frontend.
- **CSS** or **TailwindCSS** for styling.
- Fully functional with no backend required.

---

## **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/dungeon-explorer.git
   ```

2. Navigate to the project folder:
   ```bash
   cd dungeon-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the game in your browser:
   ```
   http://localhost:3000
   ```

---

## **How to Play**

1. Use arrow keys or on-screen controls to move the player character.
2. Collect treasures scattered across the dungeon.
3. Avoid traps to maintain your health.
4. Reach the exit after collecting all treasures to win the game.
5. If your health reaches zero, the game ends.

---

## **File Structure**

```
src/
├── components/
│   ├── GameBoard.jsx       # Renders the dungeon grid
│   ├── Player.jsx          # Manages player movement
│   ├── HUD.jsx             # Displays player stats
│   ├── Controls.jsx        # Optional on-screen controls
│   └── GameOver.jsx        # Win/Lose screen
├── utils/
│   ├── generateDungeon.js  # Generates the dungeon layout
│   ├── gameLogic.js        # Core game logic
├── App.jsx                 # Main application file
├── index.js                # Entry point
├── styles.css              # Styling for the application
```

---

## **Game State Management**

The game state includes:
```javascript
const initialState = {
  player: { x: 0, y: 0 }, // Starting position
  health: 100,
  score: 0,
  treasures: 3, // Total treasures in the dungeon
  dungeon: [
    ['P', '.', 'T', '.', 'X'], // 'P' = Player, '.' = Path, 'T' = Treasure, 'X' = Exit
    ['#', '#', '#', '.', '#'], // '#' = Wall
    ['.', '.', 'T', '.', '.'],
    ['.', '#', '.', 'T', 'X']
  ],
  gameStatus: 'running' // Can be 'running', 'won', or 'lost'
};
```

---

## **Deployment**

1. Build the project for production:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to a hosting platform like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

---

## **Future Enhancements**

- Add moving traps for additional challenges.
- Implement different levels with increasing difficulty.
- Introduce power-ups or special abilities for the player.

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add feature description"
   git push origin feature-name
   ```
4. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- Inspired by classic dungeon exploration games.
- Built with love using React.js.
