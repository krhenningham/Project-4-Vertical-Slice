// world.js
// Owns the day/night cycle clock and draws the sky background.
// Depends on: CONFIG.

window.World = {
  phase: "day", // "day" or "night"
  timeInPhase: 0,

  update: function (dt) {
    this.timeInPhase += dt;

    if (this.phase === "day" && this.timeInPhase >= window.CONFIG.DAY_LENGTH) {
      this.phase = "night";
      this.timeInPhase = 0;
    }
  },

  isNight: function () {
    return this.phase === "night";
  },

  // Returns true once the night phase has fully elapsed - this is the
  // trigger the win condition checks for.
  nightSurvivedFully: function () {
    return this.phase === "night" && this.timeInPhase >= window.CONFIG.NIGHT_LENGTH;
  },

  draw: function (ctx) {
    var color = this.isNight() ? window.CONFIG.COLOR_NIGHT_SKY : window.CONFIG.COLOR_DAY_SKY;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, window.CONFIG.CANVAS_WIDTH, window.CONFIG.CANVAS_HEIGHT);
  }
};
