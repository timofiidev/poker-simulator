// generate straight
const straight = [];
// special case, low ace
for (var s0 = 0n; s0 < 4; s0++)
  for (var s1 = 0n; s1 < 4; s1++)
    for (var s2 = 0n; s2 < 4; s2++)
      for (var s3 = 0n; s3 < 4; s3++)
        for (var s4 = 0n; s4 < 4; s4++) {
          const i = 12n * 4n + s0;
          const j = 0n * 4n + s1;
          const k = 1n * 4n + s2;
          const l = 2n * 4n + s3;
          const m = 3n * 4n + s4;
          const mask =
            (1n << i) | (1n << j) | (1n << k) | (1n << l) | (1n << m);
          straight.push(Number(mask));
        }
for (var top = 4n; top < 13; top++)
  for (var s0 = 0n; s0 < 4; s0++)
    for (var s1 = 0n; s1 < 4; s1++)
      for (var s2 = 0n; s2 < 4; s2++)
        for (var s3 = 0n; s3 < 4; s3++)
          for (var s4 = 0n; s4 < 4; s4++) {
            const i = top * 4n + s0;
            const j = (top - 1n) * 4n + s1;
            const k = (top - 2n) * 4n + s2;
            const l = (top - 3n) * 4n + s3;
            const m = (top - 4n) * 4n + s4;
            const mask =
              (1n << i) | (1n << j) | (1n << k) | (1n << l) | (1n << m);
            straight.push(Number(mask));
          }

// generate flush
const flush = [];
for (var suit = 0n; suit < 4; suit++)
  for (var r0 = 0n; r0 < 13; r0++)
    for (var r1 = r0 + 1n; r1 < 13; r1++)
      for (var r2 = r1 + 1n; r2 < 13; r2++)
        for (var r3 = r2 + 1n; r3 < 13; r3++)
          for (var r4 = r3 + 1n; r4 < 13; r4++) {
            const i = r0 * 4n + suit;
            const j = r1 * 4n + suit;
            const k = r2 * 4n + suit;
            const l = r3 * 4n + suit;
            const m = r4 * 4n + suit;
            const mask =
              (1n << i) | (1n << j) | (1n << k) | (1n << l) | (1n << m);
            flush.push(Number(mask));
          }
const BIT_1111 = (1n << 4n) - 1n;

// generate four of a kind
const fourOfAKind = [];
for (var r = 0n; r < 13; r++) {
  const mask = BIT_1111 << (r * 4n);
  fourOfAKind.push(Number(mask));
}

// generate three of a kind
const threeOfAKind = [];
for (var r = 0n; r < 13; r++)
  for (var x = 0n; x < 4; x++) {
    const v = BIT_1111 ^ (1n << x);
    const mask = v << (r * 4n);
    threeOfAKind.push(Number(mask));
  }

// generate pair
const pair = [];
for (var r = 0n; r < 13; r++)
  for (var x1 = 0n; x1 < 4; x1++)
    for (var x2 = x1 + 1n; x2 < 4; x2++) {
      const v = BIT_1111 ^ (1n << x1) ^ (1n << x2);
      const mask = v << (r * 4n);
      pair.push(Number(mask));
    }

// generate two pairs
const twoPair = [];
for (var r1 = 0n; r1 < 13; r1++)
  for (var r2 = r1 + 1n; r2 < 13; r2++)
    for (var x1 = 0n; x1 < 4; x1++)
      for (var x2 = x1 + 1n; x2 < 4; x2++)
        for (var y1 = 0n; y1 < 4; y1++)
          for (var y2 = y1 + 1n; y2 < 4; y2++) {
            const v1 = BIT_1111 ^ (1n << x1) ^ (1n << x2);
            const mask1 = v1 << (r1 * 4n);
            const v2 = BIT_1111 ^ (1n << y1) ^ (1n << y2);
            const mask2 = v2 << (r2 * 4n);
            const mask = mask1 | mask2;
            twoPair.push(Number(mask));
          }

// generate full house
const fullHouse = [];
for (var r1 = 0n; r1 < 13; r1++)
  for (var r2 = 0n; r2 < 13; r2++) {
    if (r1 == r2) continue;
    for (var x1 = 0n; x1 < 4; x1++)
      for (var x2 = x1 + 1n; x2 < 4; x2++)
        for (var y = 0n; y < 4; y++) {
          const v3 = BIT_1111 ^ (1n << y);
          const mask3 = v3 << (r1 * 4n);
          const v2 = BIT_1111 ^ (1n << x1) ^ (1n << x2);
          const mask2 = v2 << (r2 * 4n);
          const mask = mask3 | mask2;
          fullHouse.push(Number(mask));
        }
  }

straight.sort((a, b) => a - b);
flush.sort((a, b) => a - b);
fullHouse.sort((a, b) => a - b);
const straightFlush = straight.filter((e) => flush.includes(e));
export {
  straightFlush,
  fourOfAKind,
  fullHouse,
  flush,
  straight,
  threeOfAKind,
  twoPair,
  pair,
};
// uncomment this to write result to files
// import * as fs from "fs";
// fs.writeFileSync("./special-hands.json", JSON.stringify({
//   straightFlush,
//   fourOfAKind,
//   fullHouse,
//   flush,
//   straight,
//   threeOfAKind,
//   twoPair,
//   pair,
// }));
