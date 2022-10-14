"use strict";

// class Color {
//     R = Number;
//     G = Number;
//     B = Number;
//     New color
//     createColor(){
//         const min = 0;
//         const max = 255;
//         red = Math.floor(Math.random()*(max-min+1)+min);
//         green = Math.floor(Math.random()*(max-min+1)+min);
//         blue = Math.floor(Math.random()*(max-min+1)+min);
//         console.log(`${red} ${green} ${blue}`)
//     }
// }
function createColor(params) {
  var min = 0;
  var max = 255;
  red = Math.floor(Math.random() * (max - min + 1) + min);
  green = Math.floor(Math.random() * (max - min + 1) + min);
  blue = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("The color is ".concat(red, " ").concat(green, " ").concat(blue));
}

createColor();
