/** GH₵ 1,234 — decimals only when needed (GH₵ 1.50). */
export function cedi(amount: number) {
  const rounded = Math.round(amount * 100) / 100;
  const whole = Number.isInteger(rounded);
  return (
    'GH₵ ' +
    rounded.toLocaleString('en-GH', {
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );
}
