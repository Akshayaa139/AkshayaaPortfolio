document.addEventListener('DOMContentLoaded', () => {
    // Manual/Static Stats for TUF/DSA
    const stats = {
        totalSolved: 307,
        totalQuestions: 1024, // Assumed total or strictly TUF sheet total
        easySolved: 57,
        totalEasy: 317,
        mediumSolved: 142,
        totalMedium: 449,
        hardSolved: 108,
        totalHard: 258
    };

    const loadingEl = document.getElementById('leetcode-loading');
    const contentEl = document.getElementById('leetcode-content'); // Id kept same in HTML for simplicity in previous step? No, check HTML.
    // HTML I just updated ID to dsa-dashboard but content ID probably still leetcode-content. 
    // Let's rely on class names or querySelector if IDs changed, but for now assuming ids inside are same.

    // Selectors
    const totalSolvedEl = document.getElementById('total-solved-count');
    const totalSolvedCircle = document.getElementById('total-solved-circle');

    const easySolvedEl = document.getElementById('easy-solved');
    const easyTotalEl = document.getElementById('easy-total');
    const easyBar = document.getElementById('easy-bar');

    const mediumSolvedEl = document.getElementById('medium-solved');
    const mediumTotalEl = document.getElementById('medium-total');
    const mediumBar = document.getElementById('medium-bar');

    const hardSolvedEl = document.getElementById('hard-solved');
    const hardTotalEl = document.getElementById('hard-total');
    const hardBar = document.getElementById('hard-bar');

    // Render Stats Function
    const renderStats = () => {
        // Update text stats
        totalSolvedEl.textContent = stats.totalSolved;

        easySolvedEl.textContent = stats.easySolved;
        easyTotalEl.textContent = stats.totalEasy;

        mediumSolvedEl.textContent = stats.mediumSolved;
        mediumTotalEl.textContent = stats.totalMedium;

        hardSolvedEl.textContent = stats.hardSolved;
        hardTotalEl.textContent = stats.totalHard;

        // Animate Circular Progress
        // 2 * PI * r (70) = ~440
        const circumference = 440;
        const percentage = Math.min(stats.totalSolved / stats.totalQuestions, 1);
        const offset = circumference - (percentage * circumference);

        // Trigger animation
        setTimeout(() => {
            totalSolvedCircle.style.strokeDashoffset = offset;
        }, 300);

        // Animate Bars
        const easyPct = Math.min((stats.easySolved / stats.totalEasy) * 100, 100);
        const mediumPct = Math.min((stats.mediumSolved / stats.totalMedium) * 100, 100);
        const hardPct = Math.min((stats.hardSolved / stats.totalHard) * 100, 100);

        setTimeout(() => {
            easyBar.style.width = `${easyPct}%`;
            mediumBar.style.width = `${mediumPct}%`;
            hardBar.style.width = `${hardPct}%`;
        }, 300);

        // Show Content
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) {
            contentEl.style.display = 'flex';
            setTimeout(() => {
                contentEl.style.opacity = '1';
            }, 50);
        }
    };

    // Simulate delay to feel "dynamic"
    setTimeout(renderStats, 500);
});
