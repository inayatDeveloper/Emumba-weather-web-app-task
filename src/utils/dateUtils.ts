export function getFiveDays(): string[] {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fiveDays = [];
  for (let i = 0; i < 5; i++) {
    fiveDays.push(days[new Date(Date.now() + (i + 0) * 24 * 60 * 60 * 1000).getDay()]);
  }
  return fiveDays;
}
