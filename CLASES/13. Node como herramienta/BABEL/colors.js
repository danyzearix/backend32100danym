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
    const min = 0;
    const max = 255;
    red = Math.floor(Math.random()*(max-min+1)+min);
    green= Math.floor(Math.random()*(max-min+1)+min);
    blue = Math.floor(Math.random()*(max-min+1)+min);
    console.log(`The color is ${red} ${green} ${blue}`)
}

createColor();
