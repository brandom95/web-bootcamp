/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs"; // File system access

inquirer

  // ask que question to the user so they will input their url
  .prompt([
    {
      name: "qrConvertor",
      message: "put here your URL to make it a QR ",
    },
  ])

  .then((answers) => {
    // make a txt file of the user input
    fs.writeFile("UserInput.txt", answers.qrConvertor, (err, data) => {
      if (err) throw err;
      console.log(data);
    });

    // create the qr code
    var qr_png = qr.image(answers.qrConvertor, { type: "png" });
    qr_png.pipe(fs.createWriteStream("userqr.png"));

    console.log("qr-made ", answers.qrConvertor);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
