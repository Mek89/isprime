export function isPrimenumber(value: i32): i32 {
  const squreRoot = Math.sqrt(value);
  for (let i = 2; i <= squreRoot; i++) {
    if (value % i === 0) {
      return 0;
    }
  }

  return value > 1 ? 1 : 0;
}
