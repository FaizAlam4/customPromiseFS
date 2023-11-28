const { rejects } = require("assert");
const fs = require("fs");

let myFunc = () => {
  let appendMyFile = (filePath, nameOfFile) => {
    var p4 = new Promise((resolve, reject) => {
      fs.appendFile(filePath, nameOfFile, (err) => {
        if (err) reject(err);
        else {
          resolve();
        }
      });
    });
    p4.then(() => {
      return new Promise((resolve, reject) => {
        fs.readFile("./newLipsum.txt", "utf-8", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    })
      .then((data) => {
        data = data.toLowerCase();
        // console.log(data)
        let arr = data.split(".");
        arr = arr.join("\n");
        return new Promise((resolve, reject) => {
          fs.writeFile("./newLipsum2.txt", arr, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          fs.appendFile("./fileName.txt", "./newLipsum2.txt", (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          fs.readFile("./newLipsum2.txt", "utf-8", (err,data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
      .then((data) => {
        let dataArray = data.split("\n");
        dataArray.sort();
        let myData = dataArray.join("\n").trim();
        return new Promise((resolve, reject) => {
          fs.writeFile("./newLipsum3.txt", myData, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          fs.appendFile("./fileName.txt", "./newLipsum3.txt", (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          fs.readFile("./fileName.txt", "utf-8", (err,data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
      .then((data) => {
        data = data.split("./");
        // console.log(data);
        for (let myData of data) {
          if (myData != "newLipsum.txt" && myData != "") {
            let myPro = new Promise((resolve, reject) => {
              fs.unlink(myData, (err) => {
                if (err) reject(err);
                else resolve();
              });
            });

            myPro.catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let writeMyFile = (name, data) => {
    let p2 = new Promise((resolve, reject) => {
      fs.writeFile(name, data, (err) => {
        if (err) reject(err);
        else {
          resolve();
        }
      });
    });
    p2.then(() => {
      appendMyFile("./fileName.txt", name);
    }).catch((err) => {
      console.log("Error:", err);
    });
  };

  let readMyFile = (fileNamePath) => {
    let p1 = new Promise((resolve, reject) => {
      fs.readFile(fileNamePath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    p1.then((data) => {
      data = data.toUpperCase();

      writeMyFile("./newLipsum.txt", data);
    }).catch((err) => {
      console.log("Error:", err);
    });
  };
  readMyFile("./givenContent/lipsum.txt");
};

myFunc();
