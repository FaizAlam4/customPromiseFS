const fs = require("fs");
const { resolve } = require("path");
const readlineSync = require("readline-sync");

let range = Math.random() * 10 + 1;

range = Math.floor(range);

let path = "./myFiles";

function fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles) {
  let p1 = new Promise((resolve, reject) => {
    fs.access(absolutePathOfRandomDirectory, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  p1.then(() => {
    console.log("Directory exists!");
    randomFileGenerator(absolutePathOfRandomDirectory, randomNumberOfFiles);
  }).catch((err) => {
    console.log("no such directory exists, I'll make it..");
    let p2 = new Promise((resolve, reject) => {
      fs.mkdir(absolutePathOfRandomDirectory, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    p2.then(() => {
      console.log("Directory is made..");
      randomFileGenerator(absolutePathOfRandomDirectory, randomNumberOfFiles);
    }).catch((err) => {
      console.log(err);
    });
  });

  let randomFileGenerator = (
    absolutePathOfRandomDirectory,
    randomNumberOfFiles
  ) => {
    let createdFile = [];
    for (let index = 1; index <= randomNumberOfFiles; index++) {
      var prom = new Promise((resolve, reject) => {
        fs.writeFile(
          `${absolutePathOfRandomDirectory}/generatedFile${index}.json`,
          '{"message":"welcome"}',
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
      prom
        .then(() => {
          console.log(`File${index} written`);
        })
        .catch((err) => {
          console.log("Error writing files");
        });
    }
    createdFile.push(prom);
    let answer = readlineSync.question(
      "Do you want to delete files later after making?(y/n)"
    );
    if (answer == "y") {
      deleteFile(absolutePathOfRandomDirectory, createdFile);
    }
  };

  let deleteFile = (absolutePathOfRandomDirectory, createdFile) => {
    Promise.all(createdFile)
      .then(() => {
        var prom3 = new Promise((resolve, reject) => {
          fs.readdir(absolutePathOfRandomDirectory, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
        prom3
          .then((data) => {
            data = data.toString();
            let fileNames = data.split(",");
            fileNames.forEach((ele) => {
              var prom4 = new Promise((resolve, reject) => {
                fs.unlink(absolutePathOfRandomDirectory + "/" + ele, (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              });
              prom4
                .then(() => {
                  console.log("Deleted files!");
                })
                .catch((err) => {
                  console.log("Couldn't delete files as error exists:", err);
                });
            });
          })
          .catch((err) => {
            console.log("Couldn't read directory as error exist:", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

fsProblem1(path, range);
