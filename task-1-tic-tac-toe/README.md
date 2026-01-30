# Task 1: Tic-Tac-Toe Game with AI

An interactive Tic-Tac-Toe game featuring an intelligent AI opponent powered by the Minimax algorithm. Challenge yourself against different difficulty levels in a modern, responsive interface.

## 🎮 Features

- **Intelligent AI Opponent**: Powered by the Minimax algorithm for optimal gameplay
- **Multiple Difficulty Levels**: Choose from Easy, Medium, and Hard modes
- **Score Tracking**: Keep track of wins, losses, and draws
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Updates**: Instant game state feedback
- **Two-Player Mode**: Play against a friend locally

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks

## 🏗 Project Structure

```
task-1-tic-tac-toe/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # AI logic and utilities
│   └── App.tsx         # Main application
├── public/             # Static assets
├── index.html          # Entry HTML file
└── package.json        # Dependencies
```

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

4. **Build for production** (optional):
   ```bash
   npm run build
   ```

## 🎯 How to Play

1. Select your difficulty level (Easy, Medium, or Hard)
2. Choose to play as X or O
3. Click on any empty cell to make your move
4. The AI will automatically respond
5. Try to get three in a row to win!

## 🧠 AI Implementation

The AI uses the **Minimax algorithm** with alpha-beta pruning for optimal decision-making:
- **Easy Mode**: Random moves with occasional smart plays
- **Medium Mode**: Mix of random and optimal moves
- **Hard Mode**: Always plays optimally using full Minimax

## 📝 Key Features Implementation

- **Minimax Algorithm**: Evaluates all possible game states to find the best move
- **Alpha-Beta Pruning**: Optimizes the search by eliminating unnecessary branches
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Efficient game state handling with React hooks

---

**Author**: Vinit Haridas Dharmraj  
**Task**: CODSOFT AI Internship - Task 1
