const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = [
  "evan|50000|D",
  "jefry|70000|C",
  "rizky|30000|D",
  "hanson|10000|B",
  "candra|30000|A",
  "goklas|20000|A",
  "hendra|20000|B",
  "surya|30000|A",
];

const main = payload => {
  const arrayData = Array.from(payload).map(data => {
    let objectDetail = { name: "", grade: "", point: 0 };
    String(data)
      .split("|")
      .map(detailData => {
        if (isNaN(Number(detailData)) && detailData.length > 1) objectDetail["name"] = detailData;
        if (isNaN(Number(detailData)) && detailData.length === 1)
          objectDetail["grade"] = detailData;
        if (!isNaN(Number(detailData))) objectDetail["point"] = Number(detailData);
      });

    return objectDetail;
  });

  const result = arrayData
    .sort(
      (grade_a, grade_b) =>
        grade_a.point - grade_b.point && grade_a.grade.charCodeAt() - grade_b.grade.charCodeAt()
    )
    .map(item => item.name);

  console.log("Output :", String(result));
};

rl.question("Input : ", function (payload) {
  main(data);
  rl.close();
});
