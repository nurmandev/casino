export const getDiceNumber = () => {
  let randomNum = Math.random() * 100;
  return Math.round(randomNum * 100) / 100;
};
