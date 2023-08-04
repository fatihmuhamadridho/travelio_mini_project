const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numbers = [12, 5, 7, 17, 8, 0, -1, 16, 7];

const main = payload => {
  const findSecondLargest = Array.from(payload).sort((a, b) => b - a);
  return findSecondLargest[1];
};

rl.question("Input : ", function (payload) {
  const result = main(numbers);
  console.log("Output :", result);
  rl.close();
});
