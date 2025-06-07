document.addEventListener("DOMContentLoaded", function () {
  const reels = document.querySelectorAll(".reel");
  const spinButton = document.querySelector(".spin_btn");
  const messageDisplay = document.querySelector(".message");
  const reelSound = document.getElementById("reelSound");
  const winSound = document.getElementById("winSound");
  const balanceDisplay = document.querySelector(".balance");
  const winPopup = document.getElementById("win-popup");

  if (!reels.length || !spinButton || !messageDisplay || !balanceDisplay || !winPopup) {
    console.error("Missing elements in HTML. Check .reel, .spin_btn, .message, .balance, and win-popup.");
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
    placeBet();
  });

  function spinReels() {
    if (spinning) return;
    spinning = true;
    reelSound.play();
    messageDisplay.textContent = "Spinning...";

    reels.forEach((reel, index) => {
        setTimeout(() => {
            spinReel(reel, index);
        }, index * 500);
    });

    setTimeout(() => {
        checkWin();
    }, reels.length * 600);
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
    spinning = false; 

    const [reel1, reel2, reel3] = reelStates.map((reel) => reel[0]);

    if (reel1 === reel2 && reel2 === reel3) {
      const payout = betAmount * 5;
      balance += payout;
      winSound.play();
      messageDisplay.textContent = "🎉 You Win! 🎉";
      setTimeout(() => { showPopup(); }, 500);
    } else {
      messageDisplay.textContent = "Try Again";
    }
    updateBalanceDisplay();
  }

  function showPopup() {
    winPopup.style.display = "block";
    winPopup.style.top = "5%";
    winPopup.style.opacity = "1";
    winPopup.style.animation = "fadeIn 0.5s ease-in-out";
  }

 function closePopup() {
    winPopup.style.display = "none"; 
    winPopup.style.opacity = "0"; // Ensures it fades out completely
}


  updateBalanceDisplay();
});
