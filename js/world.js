// js/world.js
window.World = {
  timeInPhase: 0,
  phase: "day", // "day" | "night"

  update: function (dt) {
    this.timeInPhase += dt;

    if (this.phase === "day" && this.timeInPhase >= window.CONFIG.DAY_LENGTH) {
      this.phase = "night";
      this.timeInPhase = 0;
    } else if (this.phase === "night" && this.timeInPhase >= window.CONFIG.NIGHT_LENGTH) {
      this.phase = "day";
      this.timeInPhase = 0;
    }
  },

  isNight: function () {
    return this.phase === "night";
  },

  nightSurvivedFully: function () {
    // Returns true if it's day time and we just came from night
    return this.phase === "day" && this.timeInPhase < 0.1; 
  },

  draw: function (ctx) {
    ctx.fillStyle = this.isNight() ? window.CONFIG.COLOR_NIGHT_SKY : window.CONFIG.COLOR_DAY_SKY;
    ctx.fillRect(0, 0, window.CONFIG.CANVAS_WIDTH, window.CONFIG.CANVAS_HEIGHT);
  }
};