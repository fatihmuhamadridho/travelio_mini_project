const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dummyData = ["racecar", "bringback", "neveroddoreven", "carisonrace"];

const isPalindrome = str => {
  const reversetString = [...String(str)].reverse().join("");
  return str === reversetString ? "palindrom" : "not palindrom";
};

const main = payload => {
  const result = Array.from(payload).map(data => isPalindrome(data));
  console.log("Output :", result);
};

rl.question("Input : ", function (payload) {
  main(dummyData);
  rl.close();
});
