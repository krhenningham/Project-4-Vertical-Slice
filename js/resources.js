// resources.js
// Owns the gatherable resource nodes scattered around the map. Each node
// is one of three types and disappears once gathered.
// Depends on: CONFIG, Player.

window.Resources = {
  nodes: [],

  init: function () {
    this.nodes = [];
    var margin = 60;

    window.CONFIG.RESOURCE_TYPES.forEach(function (type) {
      for (var i = 0; i < window.CONFIG.RESOURCE_NODE_COUNT_PER_TYPE; i++) {
        window.Resources.nodes.push({
          type: type,
          x: margin + Math.random() * (window.CONFIG.CANVAS_WIDTH - margin * 2),
          y: margin + Math.random() * (window.CONFIG.CANVAS_HEIGHT - margin * 2),
          gathered: false
        });
      }
    });
  },

  update: function () {
    var player = window.Player;
    var radius = window.CONFIG.GATHER_RADIUS;

    this.nodes.forEach(function (node) {
      if (node.gathered) return;

      var dx = node.x - player.x;
      var dy = node.y - player.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        node.gathered = true;
        player.addResource(node.type, 1);
      }
    });
  },

  _colorFor: function (type) {
    if (type === "wood") return window.CONFIG.COLOR_WOOD;
    if (type === "grass") return window.CONFIG.COLOR_GRASS;
    if (type === "flint") return window.CONFIG.COLOR_FLINT;
    return "#ffffff";
  },

  // Basic placeholder sprites: colored squares per type. Swap for real
  // sprite art later without touching gathering logic.
  draw: function (ctx) {
    var size = window.CONFIG.RESOURCE_NODE_SIZE;

    this.nodes.forEach(function (node) {
      if (node.gathered) return;

      ctx.fillStyle = window.Resources._colorFor(node.type);
      ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size);
    });
  }
};

window.Resources.init();
