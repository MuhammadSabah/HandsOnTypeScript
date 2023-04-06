"use strict";
// function getLength<T>(arg: T): number {
//   if (arg.hasOwnProperty("length")) {
//     return arg["length"];
//   }
//   return 0;
// }
function getLength(arg) {
    return arg.length;
}
console.log(getLength(22));
console.log(getLength("Hello World"));
