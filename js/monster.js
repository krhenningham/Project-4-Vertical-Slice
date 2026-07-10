// monster.js
// Owns the single night monster: spawns once night begins, then walks
// straight toward the player, dealing contact damage.
// Depends on: CONFIG, World, Player.

window.Monster = {
  active: false,
  x: 0,
  y: 0,
  sprite: null,
  spriteLoaded: false,

  init: function() {
    // Create and load the image asset
    this.sprite = new Image();
    this.sprite.src = 'assets/dont_starve_zombie_gothic_exaggerated-removebg-preview.png';
    this.sprite.onload = function() {
      window.Monster.spriteLoaded = true;
    };
  },

  update: function (dt) {
    if (!this.active) {
      if (window.World.isNight()) {
        this._spawn();
      }
      return;
    }

    var player = window.Player;
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      var speed = window.CONFIG.MONSTER_SPEED;
      this.x += (dx / dist) * speed * dt;
      this.y += (dy / dist) * speed * dt;
    }

    var contactDist = (window.CONFIG.MONSTER_SIZE + window.CONFIG.PLAYER_SIZE) / 2;
    if (dist <= contactDist) {
      player.takeDamage(window.CONFIG.MONSTER_CONTACT_DAMAGE_PER_SEC * dt);
    }
  },

  _spawn: function () {
    this.active = true;
    // Spawn just off one of the four screen edges, chosen at random.
    var edge = Math.floor(Math.random() * 4);
    var w = window.CONFIG.CANVAS_WIDTH;
    var h = window.CONFIG.CANVAS_HEIGHT;

    if (edge === 0) { this.x = -30; this.y = Math.random() * h; }
    else if (edge === 1) { this.x = w + 30; this.y = Math.random() * h; }
    else if (edge === 2) { this.x = Math.random() * w; this.y = -30; }
    else { this.x = Math.random() * w; this.y = h + 30; }
  },

  draw: function (ctx) {
    if (!this.active) return;

    // Use a larger drawing scale so the creepy details are visible
    var drawWidth = 64; 
    var drawHeight = 84; 

    if (this.spriteLoaded) {
      // Draws the sprite centered on the monster's current coordinates
      ctx.drawImage(
        this.sprite, 
        this.x - drawWidth / 2, 
        this.y - drawHeight / 2, 
        drawWidth, 
        drawHeight
      );
    } else {
      // Fallback placeholder circle just in case the image hasn't finished loading yet
      var size = window.CONFIG.MONSTER_SIZE;
      ctx.fillStyle = window.CONFIG.COLOR_MONSTER;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

// Initialize the module to trigger image loading
window.Monster.init();