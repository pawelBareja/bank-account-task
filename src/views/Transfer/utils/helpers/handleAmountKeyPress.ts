export const handleAmountKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const pressedKey = event.key;
  if (!/[0-9.]/.test(pressedKey)) {
    event.preventDefault();
  }
};
