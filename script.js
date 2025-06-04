document.addEventListener("DOMContentLoaded", function () {
    const reels = document.querySelectorAll(".reel");
    const spinButton = document.getElementById("spin-btn"); // Correct button ID
    const winMessage = document.getElementById("win-message");
    const tryAgainMessage = document.getElementById("try-again-message");
    const reelSound = document.getElementById("reelSound");
    const winSound = document.getElementById("winSound");
    const balanceDisplay = document.querySelector(".balance");

    if (!reels.length || !spinButton || !winMessage || !tryAgainMessage || !balanceDisplay) {
        console.error("Missing elements in HTML. Check IDs and class names.");
        return;
    }

    const symbols = ["🍒", "🔔", "🍋", "🍉", "⭐", "7️⃣", "🍊", "🍓", "🍈", "🍍"];
    let balance = 1000;
    let betAmount = 10;
    let spinning = false;

    function updateBalanceDisplay() {
        balanceDisplay.textContent = `Balance: $${balance}`;
    }

    function placeBet() {
        if (balance >= betAmount) {
            balance -= betAmount;
            updateBalanceDisplay();
            spinReels();
        } else {
            console.error("Not enough balance!");
        }
    }

    spinButton.addEventListener("click", function () {
        console.log("Spin button clicked!");
        placeBet();
    });

    function spinReels() {
        if (spinning) return;
        spinning = true;
        reelSound.play();
        winMessage.style.display = "none";
        tryAgainMessage.style.display = "none";

        setTimeout(() => {
            spinReel();
        }, 500);
    }

    function spinReel() {
        const results = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];

        reels.forEach((reel, index) => {
            reel.innerHTML = `<div class="symbol">${results[index]}</div>`;
        });

        spinning = false;
        reelSound.pause();
        reelSound.currentTime = 0;
        checkWin(results);
    }

    function checkWin(results) {
        if (results[0] === results[1] && results[1] === results[2]) {
            const payout = betAmount * 5;
            balance += payout;
            winSound.play();
            winMessage.style.display = "block";
            tryAgainMessage.style.display = "none";
            console.log("Winner!");
        } else {
            tryAgainMessage.style.display = "block";
            winMessage.style.display = "none";
            console.log("Try again!");
        }
        updateBalanceDisplay();
    }

    updateBalanceDisplay();
});
