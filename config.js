// config.js
// Global constants shared by every other module. This file has no
// dependencies and must load first. Nothing in here should reference
// game state - only fixed numbers and settings.

window.CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,

  // Day/night cycle, in seconds
  DAY_LENGTH: 60,
  NIGHT_LENGTH: 30,

  // Player
  PLAYER_SIZE: 24,
  PLAYER_SPEED: 180, // pixels per second
  PLAYER_MAX_HEALTH: 100,
  PLAYER_MAX_HUNGER: 100,
  HUNGER_DRAIN_PER_SEC: 0.6,
  STARVE_HEALTH_DRAIN_PER_SEC: 3, // health lost per sec once hunger hits 0

  // Resources
  RESOURCE_TYPES: ["wood", "grass", "flint"],
  RESOURCE_REQUIRED_AMOUNT: 3, // of EACH type, needed to build the fire
  RESOURCE_NODE_COUNT_PER_TYPE: 4,
  RESOURCE_NODE_SIZE: 18,
  GATHER_RADIUS: 26, // how close player must be to gather on contact

  // Fire
  FIRE_POSITION: { x: 400, y: 300 },
  FIRE_RADIUS: 30,
  FIRE_MAX_FUEL: 100,
  FIRE_FUEL_DRAIN_PER_SEC: 1.2,
  FIRE_LIGHT_RADIUS: 140, // monster keeps distance from lit fire within this radius

  // Monster
  MONSTER_SIZE: 26,
  MONSTER_SPEED: 70,
  MONSTER_CONTACT_DAMAGE_PER_SEC: 12,

  // Colors (placeholder basic sprites - swap out for real art later)
  COLOR_DAY_SKY: "#4a7ea8",
  COLOR_NIGHT_SKY: "#0c1024",
  COLOR_PLAYER: "#e0c28a",
  COLOR_WOOD: "#7a5230",
  COLOR_GRASS: "#4c8f3a",
  COLOR_FLINT: "#9a9a9a",
  COLOR_FIRE_LIT: "#ff8c1a",
  COLOR_FIRE_UNLIT: "#555555",
  COLOR_MONSTER: "#3a1420"
};
