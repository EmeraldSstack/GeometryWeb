// Supabase setup
const supabaseUrl = 'https://kjtlbkxvytpqxiwqeuyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdGxia3h2eXRwcXhpd3FldXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mzg0MDYsImV4cCI6MjA2NTUxNDQwNn0.9piNOFW8yLOe7UxKcM0s8IU2yaepOrIrkWdUGiY-QjI'; // 👍 Only public key here
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('main-menu');
const playBtn = document.getElementById('play-btn');

// Player
let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  velocityY: 0,
  jumpForce: -12,
  gravity: 0.6,
  grounded: false
};

let gameStarted = false;

function gameLoop() {
  if (!gameStarted) return;

  requestAnimationFrame(gameLoop);

  // Gravity
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  // Ground collision
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.grounded = true;
  } else {
    player.grounded = false;
  }

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = '#0ff';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && player.grounded && gameStarted) {
    player.velocityY = player.jumpForce;
  }
});

playBtn.addEventListener('click', () => {
  menu.style.display = 'none';
  canvas.style.display = 'block';
  gameStarted = true;
  gameLoop();
});

// Other buttons
document.getElementById('create-btn').addEventListener('click', () => {
  alert('Level editor coming soon!');
});
document.getElementById('levels-btn').addEventListener('click', () => {
  alert('Level viewer coming soon!');
});
document.getElementById('settings-btn').addEventListener('click', () => {
  alert('Settings coming soon!');
});
