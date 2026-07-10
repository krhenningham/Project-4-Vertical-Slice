// fire.js
// Owns the campfire: whether it's built, its fuel level, and whether it's
// currently lit. The fire only exists at one fixed location for this slice.
// Depends on: CONFIG, Input, Player, World.

window.Fire = {
  built: false,
  fuel: 0,

  update: function (dt) {
    var player = window.Player;
    var pos = window.CONFIG.FIRE_POSITION;
    var dx = pos.x - player.x;
    var dy = pos.y - player.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var nearFire = dist <= window.CONFIG.FIRE_RADIUS + window.CONFIG.PLAYER_SIZE;

    if (!this.built) {
      if (nearFire && player.hasRequiredResources() && window.Input.consumeAction()) {
        this.built = true;
        this.fuel = window.CONFIG.FIRE_MAX_FUEL;
      }
      return;
    }

    if (this.isLit()) {
      this.fuel -= window.CONFIG.FIRE_FUEL_DRAIN_PER_SEC * dt;
      if (this.fuel < 0) this.fuel = 0;
    }
  },

  isLit: function () {
    return this.built && this.fuel > 0;
  },

  // Lose condition helper: fire was built, then went out, during the night.
  wentOutAtNight: function () {
    return this.built && this.fuel <= 0 && window.World.isNight();
  },

  draw: function (ctx) {
    var pos = window.CONFIG.FIRE_POSITION;

    // Fire pit base, always visible so the player can find the build spot.
    ctx.strokeStyle = "#3a2a1a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, window.CONFIG.FIRE_RADIUS, 0, Math.PI * 2);
    ctx.stroke();

    if (this.isLit()) {
      ctx.fillStyle = window.CONFIG.COLOR_FIRE_LIT;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y - 22);
      ctx.lineTo(pos.x + 14, pos.y + 10);
      ctx.lineTo(pos.x - 14, pos.y + 10);
      ctx.closePath();
      ctx.fill();
    } else if (this.built) {
      ctx.fillStyle = window.CONFIG.COLOR_FIRE_UNLIT;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
