# Task 2: AI Recommendation Tool

A professional AI-powered recommendation system that suggests relevant content based on user preferences. The system uses content-based filtering to analyze user inputs and provide personalized recommendations with match percentages.

## 🎯 Features

- **Interactive Dashboard**: View key metrics including total users, items, and recommendations
- **AI Recommendation Engine**: Content-based filtering with weighted scoring algorithm
- **Match Percentage**: Shows how well each recommendation matches user preferences
- **Insights & Analytics**: Visual charts for category distribution and accuracy trends
- **Dynamic UI**: Modern sidebar navigation and card-based layout
- **Real-time Processing**: Instant recommendations based on user input

## 🛠 Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Visualization**: Chart.js
- **Data Storage**: JSON-based mock database
- **Styling**: Custom CSS with modern design patterns

## 🏗 Project Structure

```
task-2-ai-recommendation-tool/
├── server.js           # Express backend server
├── data.json           # Mock database with resources
├── public/
│   ├── index.html      # Dashboard layout
│   ├── style.css       # Custom styling
│   └── script.js       # Frontend logic and Chart.js integration
└── package.json        # Dependencies
```

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   node server.js
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:3000`

## 🎯 How It Works

### 1. Data Source
Uses a mock dataset (`data.json`) containing various resources including courses, tips, and strategies.

### 2. Matching Logic
The recommendation engine uses a weighted scoring system:
- **Category Match**: 40% weight
- **Level Match**: 30% weight
- **Goal Match**: 30% weight
- **AI Variance**: Slight randomization to simulate confidence scores

### 3. Recommendation Process
1. User selects preferences (Category, Level, Goal)
2. System analyzes all available items
3. Calculates match percentage for each item
4. Returns top recommendations sorted by relevance

### 4. Insights Dashboard
- Aggregates data to show category popularity
- Displays recommendation accuracy trends
- Provides visual analytics with Chart.js

## 📊 Features Breakdown

### Content-Based Filtering
- Analyzes item attributes (category, level, goal)
- Compares against user preferences
- Generates similarity scores

### Weighted Scoring
- Prioritizes category matching (40%)
- Considers skill level compatibility (30%)
- Aligns with user goals (30%)

### Dynamic Dashboard
- Real-time metric updates
- Interactive charts and visualizations
- Responsive card-based layout

## 🎨 User Interface

- **Clean Design**: Modern, professional dashboard aesthetic
- **Intuitive Navigation**: Easy-to-use sidebar menu
- **Visual Feedback**: Loading states and animations
- **Responsive Layout**: Works on all screen sizes

---

**Author**: Vinit Haridas Dharmraj  
**Task**: CODSOFT AI Internship - Task 2
