class Person {
  name: string;
}

const jill: { name: string } = {
  name: "jill",
};

const person: Person = jill;
console.log(person);

//!: unknown type, use it instead of "any"
let val: unknown = 22;
val = "string value";
val = new Array();
if (val instanceof Array) val.push(22);

//!: intersection type
let obj: { name: string } & { age: number } = {
  name: "tom",
  age: 25,
};
console.log(obj);

//!: union type
let unionObj: null | { name: string } = null;
// We can also make it "null"
unionObj = { name: "jon" };
console.log(unionObj);

//! Literal types
let literal: "tom" | "linda" | "jeff" | "sue" = "linda";
literal = "sue";

// literal = "john" => ERROR
console.log(literal);

//! Type aliases
type Points = 20 | 30 | 40 | 50;
let score: Points = 20;

console.log(score);

type ComplexPerson = {
  name: string;
  age: number;
  birthday: Date;
  married: boolean;
  address: string;
};

//! Function Signature
type Run = (miles: number) => boolean;
let runner: Run = function (miles: number): boolean {
  if (miles > 10) {
    return true;
  }
  return false;
};

console.log(runner(9));

//! "never" type
function oldEnough(age: number): never | boolean {
  if (age > 59) {
    throw Error("Too old!");
  }
  if (age <= 18) {
    return false;
  }
  return true;
}

//! Classes
class Person2 {
  constructor(private readonly msg: string) {}
  // msg: string;
  speak() {
    // this.msg = "speak" + this.msg; => ERROR because of readonly modifier
    console.log(this.msg);
  }
}

const tom = new Person2("Hello!");
// tom.msg = "hello";
tom.speak();

//! Getters & Setters
class Speaker {
  private message: string;
  constructor(private name: string) {}
  get Message(): string | never {
    if (!this.message.includes(this.name)) {
      throw Error("Message is missing speaker's name");
    }
    return this.message;
  }

  set Message(val: string) {
    let tmpMessage = val;
    if (!val.includes(this.name)) {
      tmpMessage = this.name + " " + val;
    }
    this.message = tmpMessage;
  }
}

const speaker = new Speaker("John");
speaker.Message = "Hello";
console.log(speaker.Message);

//! Static Properties & Methods
class ClassA {
  static typeName: string;
  constructor() {}
  static getFullName() {
    return "ClassA " + ClassA.typeName;
  }
}

// const a = new ClassA();
// console.log(a.typeName); => ERROR

console.log(ClassA.typeName);

// EX-2:
class Runner {
  static lastRunTypeName: string;
  constructor(private typeName: string) {}
  run() {
    Runner.lastRunTypeName = this.typeName;
  }
}

const a = new Runner("a");
const b = new Runner("b");

b.run();
a.run();

console.log(Runner.lastRunTypeName);

//!: Interface
interface Employee {
  name: string;
  id: number;
  isManager: boolean;
  getUniqueId: () => string;
}

const linda: Employee = {
  name: "Linda",
  id: 2,
  isManager: false,
  getUniqueId: (): string => {
    let uniqueId = linda.id + "-" + linda.name;
    if (!linda.isManager) {
      return "emp-" + uniqueId;
    }
    return uniqueId;
  },
};

console.log(linda.getUniqueId());

//! Inheritance
//? NOTE: The "protected" allows the class and any inheriting classes to have access to the member.
class Vehicle {
  constructor(protected wheelCount: number) {}
  showNumberOfWheels() {
    console.log(`moved ${this.wheelCount} miles`);
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super(2);
  }

  updateWheelCount(newWheelCount: number) {
    this.wheelCount = newWheelCount;
  }
}
class Automobile extends Vehicle {
  constructor() {
    super(4);
  }
}

const motorCycle = new Motorcycle();
motorCycle.showNumberOfWheels();
const autoMobile = new Automobile();
autoMobile.showNumberOfWheels();

//! namespaces
//?: We use it to separate one set of code from another. Providing scope with namespaces hides whatever is inside on namespace from the outside of it.
namespace A {
  class FirstClass {}
}
namespace B {
  class SecondClass {}
  //* Here we can't access the code inside namespace "A"
  // const test = new FirstClass();
}

//! Abstract Classes
namespace AbstractNamespace {
  abstract class Vehicle {
    constructor(protected wheelCount: number) {}
    abstract updateWheelCount(newWheelCount: number): void;
    showNumberOfWheels() {
      console.log(`moved ${this.wheelCount} miles`);
    }
  }

  class Motorcycle extends Vehicle {
    constructor() {
      super(2);
    }
    updateWheelCount(newWheelCount: number) {
      this.wheelCount = newWheelCount;
      console.log(`Motorcycle has ${this.wheelCount}`);
    }
  }

  class Automobile extends Vehicle {
    constructor() {
      super(4);
    }
    updateWheelCount(newWheelCount: number) {
      this.wheelCount = newWheelCount;
      console.log(`Automobile has ${this.wheelCount}`);
    }

    showNumberOfWheels() {
      console.log(`moved ${this.wheelCount} miles`);
    }
  }

  const motorCycle = new Motorcycle();
  motorCycle.updateWheelCount(1);
  const autoMobile = new Automobile();
  autoMobile.updateWheelCount(3);
}
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//! Inheritance with Interfaces
namespace InterfaceInheritance {
  interface Thing {
    name: string;
    getFullName: () => string;
  }

  interface Vehicle extends Thing {
    wheelCount: number;
    updateWheelCount: (newWheelCount: number) => void;
    showNumberOfWheels: () => void;
  }

  class Motorcycle implements Vehicle {
    name: string;
    wheelCount: number;
    constructor(name: string) {
      //* No "super" for interfaces
      this.name = name;
    }

    updateWheelCount(newWheelCount: number) {
      this.wheelCount = newWheelCount;
      console.log(`Auto mobile has ${this.wheelCount}`);
    }

    showNumberOfWheels() {
      console.log(`moved Automobile ${this.wheelCount} miles`);
    }

    getFullName() {
      return "MC-" + this.name;
    }
  }
  const moto = new Motorcycle("beginner-cycle");
  console.log(moto.getFullName());
}
