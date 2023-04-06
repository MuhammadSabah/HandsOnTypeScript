// function getLength<T>(arg: T): number {
//   if (arg.hasOwnProperty("length")) {
//     return arg["length"];
//   }
//   return 0;
// }

// console.log(getLength<number>(22));
// console.log(getLength("Hello World!"));

interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

//! Does not work because numbers don't have the length property
// console.log(getLength<number>(22));
console.log(getLength("Hello World"));

/////////////////////////////////////////////////
namespace GenericNamespace {
  interface Wheels {
    count: number;
    diameter: number;
  }
  interface Vehicle<T> {
    getName(): string;
    getWheelCount: () => T;
  }

  class Automobile implements Vehicle<Wheels> {
    constructor(private name: string, private wheels: Wheels) {}
    getName(): string {
      return this.name;
    }

    getWheelCount(): Wheels {
      return this.wheels;
    }
  }

  class Chevy extends Automobile {
    constructor() {
      super("Chevy", { count: 4, diameter: 18 });
    }
  }

  const chevy = new Chevy();
  console.log("Car name ", chevy.getName());
  console.log("Wheels ", chevy.getWheelCount());
}
