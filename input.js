// input.js
// Tracks which keys are currently held down. Other modules read
// window.Input.keys to decide what to do - this file never touches
// game state directly.

window.Input = {
  keys: {},
  actionPressed: false, // one-shot flag for the "E" build action

  init: function () {
    window.addEventListener("keydown", function (e) {
      window.Input.keys[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === "e") {
        window.Input.actionPressed = true;
      }
    });
    window.addEventListener("keyup", function (e) {
      window.Input.keys[e.key.toLowerCase()] = false;
    });
  },

  isDown: function (key) {
    return !!this.keys[key.toLowerCase()];
  },

  // Consumes the action press so a single key tap only triggers once.
  consumeAction: function () {
    if (this.actionPressed) {
      this.actionPressed = false;
      return true;
    }
    return false;
  }
};

window.Input.init();
