document.addEventListener('DOMContentLoaded', () => {
    const barAlphabet = document.querySelector('#bar-content-alphabet');
    const barNumbers = document.querySelector('#bar-content-numbers');
    const tableAlphabet = document.querySelector('bar-table-alphabet');
    const tableNumbers = document.querySelector('bar-table-numbers');
    const contentAlphabet = document.getElementById('content-alphabet');
    const contentNumbers = document.getElementById('content-numbers');
    const selectedImageAlphabet = document.getElementById('selected-image-alphabet');
    const videoLinkAlphabet = document.getElementById('video-link-alphabet');
    const selectedImageNumbers = document.getElementById('selected-image-numbers');
    const videoLinkNumbers = document.getElementById('video-link-numbers');

    // Hide image from start
    contentAlphabet.style.display = 'none';
    contentNumbers.style.display = 'none';

    // Toggle bar visibility
    document.querySelector('#bar-alphabet').addEventListener('click', () => {
        toggleBar(barAlphabet, contentAlphabet);
    });
    document.querySelector('#bar-numbers').addEventListener('click', () => {
        toggleBar(barNumbers, contentNumbers);
    });

    // Button click event for alphabet bar
    barAlphabet.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const letter = event.target.getAttribute('data-letter');
            updateContent(letter, null, 'alphabet');
        }
    });
    // For number bar
    barNumbers.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const number = event.target.getAttribute('data-number');
            updateContent(null, number, 'numbers');
        }
    });

    // Hide image and video when bar is collapsed
    function toggleBar(bar, content) {
        const isVisible = bar.style.display === 'block';
        bar.style.display = isVisible ? 'none' : 'block';
        content.style.display = 'none';        
    }
    
    function updateContent(letter, number, type) {
        if (type === 'alphabet') {
            const imageUrl = `images/${letter}.jpg`;
            const videoUrl = `images/Auslan.mp4`;
            
            selectedImageAlphabet.src = imageUrl;
            selectedImageAlphabet.style.display = 'block';
            videoLinkAlphabet.innerHTML = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            contentAlphabet.style.display = 'block';            
        } else if (type === 'numbers') {
            const imageUrl = `images/${number}.jpg`;
            const videoUrl = `images/Auslan.mp4`;

            selectedImageNumbers.src = imageUrl;
            selectedImageNumbers.style.display = 'block';
            videoLinkNumbers.innerHTML = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            contentNumbers.style.display = 'block';
        }
    }
});
