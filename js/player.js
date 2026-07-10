// player.js
// Owns player position, health, hunger, and gathered resource inventory.
// Depends on: CONFIG, Input.

window.Player = {
  x: window.CONFIG.CANVAS_WIDTH / 2 - 200,
  y: window.CONFIG.CANVAS_HEIGHT / 2,
  health: window.CONFIG.PLAYER_MAX_HEALTH,
  hunger: window.CONFIG.PLAYER_MAX_HUNGER,
  inventory: { wood: 0, grass: 0, flint: 0 },
  alive: true,

  update: function (dt) {
    if (!this.alive) return;

    this._handleMovement(dt);
    this._handleHunger(dt);

    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  },

  _handleMovement: function (dt) {
    var speed = window.CONFIG.PLAYER_SPEED;
    var dx = 0;
    var dy = 0;

    if (window.Input.isDown("arrowleft") || window.Input.isDown("a")) dx -= 1;
    if (window.Input.isDown("arrowright") || window.Input.isDown("d")) dx += 1;
    if (window.Input.isDown("arrowup") || window.Input.isDown("w")) dy -= 1;
    if (window.Input.isDown("arrowdown") || window.Input.isDown("s")) dy += 1;

    // Normalize diagonal movement so it isn't faster than cardinal movement.
    if (dx !== 0 && dy !== 0) {
      var len = Math.sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;
    }

    var half = window.CONFIG.PLAYER_SIZE / 2;
    this.x += dx * speed * dt;
    this.y += dy * speed * dt;

    // Keep the player on screen.
    this.x = Math.max(half, Math.min(window.CONFIG.CANVAS_WIDTH - half, this.x));
    this.y = Math.max(half, Math.min(window.CONFIG.CANVAS_HEIGHT - half, this.y));
  },

  _handleHunger: function (dt) {
    this.hunger -= window.CONFIG.HUNGER_DRAIN_PER_SEC * dt;
    if (this.hunger <= 0) {
      this.hunger = 0;
      this.health -= window.CONFIG.STARVE_HEALTH_DRAIN_PER_SEC * dt;
    }
  },

  takeDamage: function (amount) {
    this.health -= amount;
  },

  addResource: function (type, amount) {
    if (this.inventory.hasOwnProperty(type)) {
      this.inventory[type] += amount;
    }
  },

  hasRequiredResources: function () {
    var required = window.CONFIG.RESOURCE_REQUIRED_AMOUNT;
    return window.CONFIG.RESOURCE_TYPES.every(function (type) {
      return window.Player.inventory[type] >= required;
    });
  },

  // Basic placeholder sprite: a filled circle with a small direction-agnostic
  // face. Swap this out for real sprite art later without touching any
  // other file.
  draw: function (ctx) {
    var size = window.CONFIG.PLAYER_SIZE;

    ctx.fillStyle = window.CONFIG.COLOR_PLAYER;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y - 3, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 5, this.y - 3, 2, 0, Math.PI * 2);
    ctx.fill();
  }
};
