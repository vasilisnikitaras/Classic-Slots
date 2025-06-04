document.addEventListener("DOMContentLoaded", function () {
    const reels = document.querySelectorAll(".reel");
    const spinButton = document.getElementById("spin-btn");
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
        balanceDisplay.textContent = `Balance: $${balance}`;document.addEventListener("DOMContentLoaded", function () {
    const reels = document.querySelectorAll(".reel");
    const spinButton = document.getElementById("spin-btn");
    const winMessage = document.getElementById("win-message");
    const bottomWinMessage = document.getElementById("bottom-win-message"); // New bottom win message
    const tryAgainMessage = document.getElementById("try-again-message");
    const reelSound = document.getElementById("reelSound");
    const winSound = document.getElementById("winSound");
    const balanceDisplay = document.querySelector(".balance");

    if (!reels.length || !spinButton || !winMessage || !tryAgainMessage || !bottomWinMessage || !balanceDisplay) {
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
        bottomWinMessage.style.display = "none";

        reels.forEach((reel, index) => {
            setTimeout(() => {
                spinReel(reel, index);
            }, index * 500);
        });
    }

    function spinReel(reel, index) {
        const spinCount = 10 + Math.floor(Math.random() * 5);
        let currentSpin = 0;

        const interval = setInterval(() => {
            const shuffledSymbols = symbols.sort(() => Math.random() - 0.5);
            reel.innerHTML = "";
            shuffledSymbols.slice(0, 6).forEach(symbol => {
                const symbolDiv = document.createElement("div");
                symbolDiv.classList.add("symbol");
                symbolDiv.textContent = symbol;
                reel.appendChild(symbolDiv);
            });

            currentSpin++;
            if (currentSpin >= spinCount) {
                clearInterval(interval);
                spinning = false;
                reelSound.pause();
                reelSound.currentTime = 0;
                checkWin();
            }
        }, 50 + index * 50);
    }

    function checkWin() {
        const firstSymbols = Array.from(reels, reel => reel.children[0].textContent);
        if (firstSymbols.every((symbol, _, arr) => symbol === arr[0])) {
            const payout = betAmount * 5;
            balance += payout;
            winSound.play();
            winMessage.style.display = "block";
            bottomWinMessage.style.display = "block"; // Show winning message at the bottom
            tryAgainMessage.style.display = "none";
            console.log("Winner!");
        } else {
            tryAgainMessage.style.display = "block";
            winMessage.style.display = "none";
            bottomWinMessage.style.display = "none";
            console.log("Try again!");
        }
        updateBalanceDisplay();
    }

    updateBalanceDisplay();
});

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
