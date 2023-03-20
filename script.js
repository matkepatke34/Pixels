// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 1000;
const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Set up the player
let playerColor = "black";
let playerCooldown = 0;
let playerPixelsPlaced = 0;
let playerProfile = {
  name: "",
  pixelsPlaced: 0
};

// Set up the pixel data
let pixels = [];

// Set up the palette
const colors = ["black", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray"];
const palette = document.getElementById("palette");
for (let i = 0; i < colors.length; i++) {
  const color = colors[i];
  const div = document.createElement("div");
  div.style.backgroundColor = color;
  div.classList.add("color");
  div.addEventListener("click", function() {
    playerColor = color;
  });
  palette.appendChild(div);
}

// Set up the cooldown timer
let cooldownInterval = setInterval(function() {
  if (playerCooldown > 0) {
    playerCooldown--;
  }
}, 1000);

// Set up the hourly cooldown boost
let hourlyBoostInterval = setInterval(function() {
  playerCooldown += 2;
  setTimeout(function() {
    playerCooldown -= 2;
  }, 20 * 60 * 1000);
}, 60 * 60 * 1000);

// Set up the draw function
function drawPixel(x, y, color) {
  if (playerCooldown > 0) {
    return;
  }
  if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) {
    return;
  }
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    if (pixel.x === x && pixel.y === y) {
      return;
    }
  }
  pixels.push({
    x: x,
    y: y,
    color: color
  });
  playerPixelsPlaced++;
  playerCooldown = 7;
  if (playerProfile.name !== "") {
    playerProfile.pixelsPlaced = playerPixelsPlaced;
  }
  drawPixelOnCanvas(x, y, color);
}

function drawPixelOnCanvas(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

// Set up the click listener for the canvas
canvas.addEventListener("click", function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  drawPixel(x, y, playerColor);
});

// Set up the player profile modal
const profileModal = document.getElementById("profile-modal");
const profileNameInput = document.getElementById("profile-name-input");
const saveProfileButton = document.getElementById("save-profile-button");
const closeModalButton = document.getElementById("close-modal-button");
const profileName = document.getElementById("profile-name");
const pixelsPlaced = document.getElementById("pixels-placed");
const viewProfileButton = document.getElementById("view-profile-button");

saveProfileButton.addEventListener("click", function() {
  playerProfile.name = profileNameInput.value;
  profileModal.classList.remove("show");
  profileName.textContent = playerProfile.name;
});

closeModalButton.addEventListener("click", function() {
  profileModal.classList.remove("show");
});

viewProfileButton.addEventListener("click", function(){})
