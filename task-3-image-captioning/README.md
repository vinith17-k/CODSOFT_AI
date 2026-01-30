# Task 3: AI Image Captioning Tool

An AI-powered image captioning application that generates descriptive captions for uploaded images. The tool provides an intuitive interface for image upload and displays AI-generated descriptions with a modern, responsive design.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive interface for selecting and uploading images
- **Instant Preview**: View your uploaded image before generating captions
- **Smart Captioning**: Simulates AI analysis to generate context-aware descriptions
- **Copy to Clipboard**: Easily copy generated captions
- **Regenerate Option**: Generate alternative captions for the same image
- **Modern UI**: Clean, responsive design with smooth animations
- **Multiple Format Support**: Accepts JPG, PNG, and WebP images

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with gradient-based design system
- **Fonts**: Google Fonts (Outfit)
- **Icons**: Font Awesome 6
- **Logic**: Client-side image processing and caption generation

## 🏗 Project Structure

```
task-3-image-captioning/
├── index.html          # Main HTML file
├── src/
│   ├── style.css       # Custom styling
│   └── script.js       # Frontend logic
└── README.md           # Documentation
```

## 🚀 How to Run

1. **Navigate to the folder**:
   ```bash
   cd task-3-image-captioning
   ```

2. **Open in browser**:
   - Simply open `index.html` in any modern web browser
   - Or use a live server for development:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Access the application**:
   - Direct file: `file:///path/to/index.html`
   - Live server: `http://localhost:8000`

## 📝 How to Use

1. **Upload Image**:
   - Click **Browse Image** button, or
   - Drag and drop an image into the drop zone

2. **Generate Caption**:
   - Click **Generate Caption** button
   - Wait for AI processing animation

3. **View Results**:
   - Read the generated caption
   - Click **Copy** to copy to clipboard

4. **Additional Actions**:
   - **Regenerate**: Generate a new caption for the same image
   - **Upload New Image**: Start over with a different image

## � Design Features

- **Gradient-Based Theme**: Modern color palette with smooth gradients
- **Glassmorphism Effects**: Frosted glass UI elements
- **Smooth Animations**: Loading states and transitions
- **Responsive Layout**: Works seamlessly on all devices
- **Consistent Branding**: Matches design system of other tasks

## 🧠 Implementation Details

### Image Processing
- Client-side image validation
- Preview generation with proper aspect ratio
- File type checking (JPG, PNG, WebP)

### Caption Generation
- Simulated AI processing with realistic timing
- Context-aware caption templates
- Variety in generated descriptions

### User Experience
- Clear visual feedback for all actions
- Loading states during processing
- Error handling for invalid inputs
- Smooth state transitions

## 📂 Project Integration

This project was successfully integrated from the original `image-insight-main` codebase into a lightweight vanilla implementation to ensure:

1. **Local Compatibility**: Runs without complex build steps or API keys
2. **Performance**: Zero external dependencies for core functionality
3. **Consistency**: Matches the file structure and design of Task 1 and Task 2
4. **Simplicity**: Easy to understand and modify

## 🔮 Future Enhancements

*Note: This is a demo version. Actual AI inference would require:*
- Backend server with ML model integration
- GPU resources for image processing
- API integration with services like OpenAI CLIP or Google Vision AI
- Database for storing captions and user data

---

**Author**: Vinit Haridas Dharmraj  
**Task**: CODSOFT AI Internship - Task 3
