// game.js
// Wires every system together, owns the main loop, and decides win/lose.
// This is the only file allowed to call update()/draw() on other modules
// directly and the only file that knows about the canvas element.
// Depends on: everything.

window.Game = {
  canvas: null,
  ctx: null,
  lastTime: 0,
  state: "playing", // "playing" | "won" | "lost"
  loseReason: "",

  init: function () {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  },

  loop: function (now) {
    var dt = Math.min(0.05, (now - this.lastTime) / 1000); // clamp to avoid huge jumps on tab switch
    this.lastTime = now;

    if (this.state === "playing") {
      this.update(dt);
    }
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  },

  update: function (dt) {
    window.World.update(dt);
    window.Player.update(dt);
    window.Resources.update();
    window.Fire.update(dt);
    window.Monster.update(dt);

    this._checkEndConditions();
  },

  _checkEndConditions: function () {
    if (!window.Player.alive) {
      this.state = "lost";
      this.loseReason = "You starved.";
      return;
    }

    if (window.Fire.wentOutAtNight()) {
      this.state = "lost";
      this.loseReason = "The fire went out.";
      return;
    }

    if (window.World.nightSurvivedFully() && window.Fire.isLit()) {
      this.state = "won";
    }
  },

  draw: function () {
    var ctx = this.ctx;

    window.World.draw(ctx);
    window.Resources.draw(ctx);
    window.Fire.draw(ctx);
    window.Player.draw(ctx);
    window.Monster.draw(ctx);
    window.UI.draw(ctx);

    if (this.state === "won") {
      window.UI.drawEndScreen(ctx, "You survived the night!");
    } else if (this.state === "lost") {
      window.UI.drawEndScreen(ctx, this.loseReason);
    }
  }
};

window.Game.init();
