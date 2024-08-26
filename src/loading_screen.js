function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <div class="loading-text">Loading... 0%</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);
}

function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'flex';
    updateLoadingProgress(0);
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
}

function updateLoadingProgress(progress) {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = `Loading... ${progress}%`;
    }
}

function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            hideLoadingScreen();
        } else {
            progress += 1;
            updateLoadingProgress(progress);
        }
    }, 2);
}

document.addEventListener('DOMContentLoaded', function () {
    createLoadingScreen();
    showLoadingScreen();
    simulateLoading();
});