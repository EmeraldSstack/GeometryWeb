const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const supabaseUrl = 'https://kjtlbkxvytpqxiwqeuyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdGxia3h2eXRwcXhpd3FldXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mzg0MDYsImV4cCI6MjA2NTUxNDQwNn0.9piNOFW8yLOe7UxKcM0s8IU2yaepOrIrkWdUGiY-QjI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

// Game loop
function gameLoop() {
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

// Jump control
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && player.grounded) {
    player.velocityY = player.jumpForce;
  }
});

gameLoop();
