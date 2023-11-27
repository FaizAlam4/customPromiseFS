const fs = require("fs").promises;

let myFunc = () => {
  let appendMyFile = (filePath, nameOfFile) => {
    fs.appendFile(filePath, nameOfFile)
      .then(() => {
        return fs.readFile("./newLipsum.txt", "utf-8");
      })
      .then((data) => {
        data = data.toLowerCase();
        let arr = data.split(".");
        arr = arr.join("\n");
        return fs.writeFile("./newLipsum2.txt", arr);
      })
      .then(() => {
        return fs.appendFile("./fileName.txt", "./newLipsum2.txt");
      })
      .then(() => {
        return fs.readFile("./newLipsum2.txt", "utf-8");
      })
      .then((data) => {
        let dataArray = data.split("\n");
        dataArray.sort();
        let myData = dataArray.join("\n").trim();
        return fs.writeFile("./newLipsum3.txt", myData);
      })
      .then(() => {
        return fs.appendFile("./fileName.txt", "./newLipsum3.txt");
      })
      .then(() => {
        return fs.readFile("./fileName.txt", "utf-8");
      })
      .then((data) => {
        data = data.split("./");
        console.log(data);
        for (let myData of data) {
          if (myData != "newLipsum.txt" && myData != "") {
            fs.unlink(myData).catch((err) => {
              console.log(err);
            });
          }
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  let writeMyFile = (name, data) => {
    fs.writeFile(name, data)
      .then(() => {
        appendMyFile("./fileName.txt", name);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  let readMyFile = (fileNamePath) => {
    fs.readFile(fileNamePath, "utf-8")
      .then((data) => {
        data = data.toUpperCase();
        // console.log(data)
        writeMyFile("./newLipsum.txt", data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  readMyFile("./givenContent/lipsum.txt");
};

myFunc();
