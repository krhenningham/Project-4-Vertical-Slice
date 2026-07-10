// ui.js
// Draws all HUD elements on top of the game world. Reads from other
// modules but never modifies them.
// Depends on: CONFIG, Player, World, Fire.

window.UI = {
  drawBar: function (ctx, x, y, width, height, ratio, color) {
    ctx.fillStyle = "#222222";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width * Math.max(0, Math.min(1, ratio)), height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  },

  draw: function (ctx) {
    var player = window.Player;

    this.drawBar(ctx, 16, 16, 160, 14, player.health / window.CONFIG.PLAYER_MAX_HEALTH, "#c0392b");
    this.drawBar(ctx, 16, 36, 160, 14, player.hunger / window.CONFIG.PLAYER_MAX_HUNGER, "#d9a441");

    ctx.fillStyle = "#ffffff";
    ctx.font = "12px sans-serif";
    ctx.fillText("Health", 182, 27);
    ctx.fillText("Hunger", 182, 47);

    var invText = "Wood: " + player.inventory.wood +
      "  Grass: " + player.inventory.grass +
      "  Flint: " + player.inventory.flint +
      "  (need " + window.CONFIG.RESOURCE_REQUIRED_AMOUNT + " each)";
    ctx.fillText(invText, 16, 74);

    var phaseText = window.World.isNight() ? "Night" : "Day";
    var timeLeft = window.World.isNight()
      ? Math.max(0, window.CONFIG.NIGHT_LENGTH - window.World.timeInPhase)
      : Math.max(0, window.CONFIG.DAY_LENGTH - window.World.timeInPhase);
    ctx.fillText(phaseText + " — " + Math.ceil(timeLeft) + "s", window.CONFIG.CANVAS_WIDTH - 110, 24);

    if (!window.Fire.built) {
      ctx.fillText("Fire not built", window.CONFIG.CANVAS_WIDTH - 110, 44);
    } else {
      ctx.fillText("Fire fuel: " + Math.ceil(window.Fire.fuel), window.CONFIG.CANVAS_WIDTH - 110, 44);
    }
  },

  drawEndScreen: function (ctx, message) {
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(0, 0, window.CONFIG.CANVAS_WIDTH, window.CONFIG.CANVAS_HEIGHT);

    ctx.fillStyle = "#ffffff";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(message, window.CONFIG.CANVAS_WIDTH / 2, window.CONFIG.CANVAS_HEIGHT / 2);
    ctx.font = "14px sans-serif";
    ctx.fillText("Refresh the page to try again", window.CONFIG.CANVAS_WIDTH / 2, window.CONFIG.CANVAS_HEIGHT / 2 + 32);
    ctx.textAlign = "left";
  }
};
