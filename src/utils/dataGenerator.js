// @ts-check

/**
 * Lightweight, dependency-free fake data generator.
 * Centralized so test data stays consistent and tests stay deterministic
 * when seeded. For broader needs, swap with @faker-js/faker.
 */

const FIRST_NAMES = ['Alex', 'Riya', 'Noah', 'Maya', 'Liam', 'Aria', 'Ethan', 'Zoe'];
const LAST_NAMES = ['Stone', 'Patel', 'Khan', 'Lopez', 'Singh', 'Kim', 'Garcia', 'Brown'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueSuffix() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function generateUser(overrides = {}) {
  const firstName = randomItem(FIRST_NAMES);
  const lastName = randomItem(LAST_NAMES);
  return {
    firstName,
    lastName,
    age: randomInt(18, 65),
    email: `${firstName}.${lastName}.${uniqueSuffix()}@example.com`.toLowerCase(),
    username: `${firstName}_${uniqueSuffix()}`.toLowerCase(),
    ...overrides,
  };
}

module.exports = {
  generateUser,
  uniqueSuffix,
  randomInt,
};
