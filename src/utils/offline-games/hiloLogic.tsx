export const generateCard = () => {
  let cardNumber = Math.floor(Math.random() * 13) + 1;
  let cardColor = Math.floor(Math.random() * 4) + 1;

  return { cardNumber, cardColor };
};
