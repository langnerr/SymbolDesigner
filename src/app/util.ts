export function round(x: number) {
  const fac = 10e4;
  return Math.round(x * fac) / fac;
}
