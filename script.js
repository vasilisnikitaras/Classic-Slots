document.addEventListener("DOMContentLoaded", function () {
  const reels = document.querySelectorAll(".reel");
  const spinButton = document.querySelector(".spin_btn");
  const messageDisplay = document.querySelector(".message");
  const winMessage = document.getElementById("win-message"); // Winning message element
  const tryAgainMessage = document.getElementById("try-again-message"); // Losing message element
  const reelSound = document.getElementById("reelSound");
  const winSound = document.getElementById("winSound");
  const balanceDisplay = document.querySelector(".balance");

  if (!reels.length || !spinButton || !messageDisplay || !balanceDisplay) {
    console.error("Missing elements in HTML. Check .reel, .spin_btn, .message, .balance classes.");
    return;
  }

  const symbols = ["🍒", "🔔", "🍋", "🍉", "⭐", "7️⃣", "🍊", "🍓", "🍈", "🍍"];
  let reelStates = [
    ["🍒", "🍒", "🍒", "🍋", "🍋", "🍉"],
    ["🍒", "🍋", "🍋", "🍉", "🍒", "7️⃣"],
    ["🍒", "7️⃣", "🍋", "🍒", "🍓", "🍋"]
  ];

  let spinning = false;
  let balance = 1000;
  let betAmount = 10;

  function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: $${balance}`;
  }

  function placeBet() {
    if (balance >= betAmount) {
      balance -= betAmount;
      updateBalanceDisplay();
      spinReels();
    } else {
      messageDisplay.textContent = "Not enough balance!";
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
    messageDisplay.textContent = "Spinning.........";

    // Hide messages before spinning starts
    winMessage.style.display = "none";
    tryAgainMessage.style.display = "none";

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
      reelStates[index].unshift(reelStates[index].pop());
      reel.innerHTML = "";
      reelStates[index].forEach((symbol) => {
        const symbolDiv = document.createElement("div");
        symbolDiv.classList.add("symbol");
        symbolDiv.textContent = symbol;
        reel.appendChild(symbolDiv);
      });

      currentSpin++;
      if (currentSpin >= spinCount) {
        clearInterval(interval);
        if (index === reels.length - 1) {
          spinning = false;
          reelSound.pause();
          reelSound.currentTime = 0;
          checkWin();
        }
      }
    }, 50 + index * 50);
  }

  function checkWin() {
    const [reel1, reel2, reel3] = reelStates.map((reel) => reel[0]);

    if (reel1 === reel2 && reel2 === reel3) {
      const payout = betAmount * 5;
      balance += payout;
      winSound.play();
      messageDisplay.textContent = "You Win!";
      
      // ✅ Ensure "You Won!!" appears below the SPIN button
      winMessage.style.display = "block";
      tryAgainMessage.style.display = "none";
    } else {
      messageDisplay.textContent = "Try Again";
      
      // ✅ Ensure "Try Again" appears when losing
      winMessage.style.display = "none";
      tryAgainMessage.style.display = "block";
    }

    updateBalanceDisplay();
  }

  updateBalanceDisplay();
});
