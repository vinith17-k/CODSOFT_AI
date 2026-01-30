// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const previewArea = document.getElementById('preview-area');
const imagePreview = document.getElementById('image-preview');
const clearBtn = document.getElementById('clear-btn');
const actionArea = document.getElementById('action-area');
const generateBtn = document.getElementById('generate-btn');
const loadingArea = document.getElementById('loading-area');
const resultArea = document.getElementById('result-area');
const captionText = document.getElementById('caption-text');
const copyBtn = document.getElementById('copy-btn');
const regenerateArea = document.getElementById('regenerate-area');
const newImageBtn = document.getElementById('new-image-btn');
const regenerateBtn = document.getElementById('regenerate-btn');

// State
let currentFile = null;

// Mock Captions for Demo
const mockCaptions = [
    "A stunning view of nature with vibrant colors and serene atmosphere.",
    "A close-up shot revealing intricate details and textures.",
    "A person captured in a moment of joy, surrounded by soft lighting.",
    "urban street scene bustling with activity during golden hour.",
    "A minimalist composition with strong geometric shapes and shadows."
];

// --- Event Listeners ---

// 1. File Selection
browseBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Drag & Drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// 2. Image Handling
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert("Please upload a valid image file.");
        return;
    }

    currentFile = file;
    const reader = new FileReader();

    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        showPreviewState();
    };

    reader.readAsDataURL(file);
}

function showPreviewState() {
    dropZone.classList.add('hidden');
    previewArea.classList.remove('hidden');
    actionArea.classList.remove('hidden');

    // Reset results if any
    resultArea.classList.add('hidden');
    regenerateArea.classList.add('hidden');
}

// 3. Clear Image
clearBtn.addEventListener('click', () => {
    currentFile = null;
    fileInput.value = '';
    previewArea.classList.add('hidden');
    dropZone.classList.remove('hidden');
    actionArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    regenerateArea.classList.add('hidden');
});

newImageBtn.addEventListener('click', () => {
    clearBtn.click();
});

// 4. Generate Caption
generateBtn.addEventListener('click', generateCaption);
regenerateBtn.addEventListener('click', generateCaption);

function generateCaption() {
    if (!currentFile) return;

    // UI Updates
    actionArea.classList.add('hidden');
    regenerateArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    loadingArea.classList.remove('hidden');

    // Simulate Network Request
    setTimeout(() => {
        // Select random mock caption or generate based on basic file attributes?
        // Since we can't run real ML locally easily without heavy libraries, we mock.
        // We can make it slightly 'smart' by checking file size or name length to pick index,
        // so it looks deterministic for the same file.

        const pseudoRandomIndex = (currentFile.name.length + currentFile.size) % mockCaptions.length;
        const caption = mockCaptions[pseudoRandomIndex];

        // Show Result
        loadingArea.classList.add('hidden');
        resultArea.classList.remove('hidden');
        regenerateArea.classList.remove('hidden');
        captionText.textContent = caption;

    }, 2500); // 2.5s delay to simulate authentic processing
}

// 5. Copy to Clipboard
copyBtn.addEventListener('click', () => {
    const text = captionText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.classList.add('text-green-600');

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('text-green-600');
        }, 2000);
    });
});
