"use strict";
class Person {
}
const jill = {
    name: "jill",
};
const person = jill;
console.log(person);
//!: unknown type, use it instead of "any"
let val = 22;
val = "string value";
val = new Array();
if (val instanceof Array)
    val.push(22);
//!: intersection type
let obj = {
    name: "tom",
    age: 25,
};
console.log(obj);
//!: union type
let unionObj = null;
// We can also make it "null"
unionObj = { name: "jon" };
console.log(unionObj);
//! Literal types
let literal = "linda";
literal = "sue";
// literal = "john" => ERROR
console.log(literal);
let score = 20;
console.log(score);
let runner = function (miles) {
    if (miles > 10) {
        return true;
    }
    return false;
};
console.log(runner(9));
//! "never" type
function oldEnough(age) {
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
    constructor(msg) {
        this.msg = msg;
    }
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
    constructor(name) {
        this.name = name;
    }
    get Message() {
        if (!this.message.includes(this.name)) {
            throw Error("Message is missing speaker's name");
        }
        return this.message;
    }
    set Message(val) {
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
    constructor() { }
    static getFullName() {
        return "ClassA " + ClassA.typeName;
    }
}
// const a = new ClassA();
// console.log(a.typeName); => ERROR
console.log(ClassA.typeName);
// EX-2:
class Runner {
    constructor(typeName) {
        this.typeName = typeName;
    }
    run() {
        Runner.lastRunTypeName = this.typeName;
    }
}
const a = new Runner("a");
const b = new Runner("b");
b.run();
a.run();
console.log(Runner.lastRunTypeName);
const linda = {
    name: "Linda",
    id: 2,
    isManager: false,
    getUniqueId: () => {
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
    constructor(wheelCount) {
        this.wheelCount = wheelCount;
    }
    showNumberOfWheels() {
        console.log(`moved ${this.wheelCount} miles`);
    }
}
class Motorcycle extends Vehicle {
    constructor() {
        super(2);
    }
    updateWheelCount(newWheelCount) {
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
var A;
(function (A) {
    class FirstClass {
    }
})(A || (A = {}));
var B;
(function (B) {
    class SecondClass {
    }
    //* Here we can't access the code inside namespace "A"
    // const test = new FirstClass();
})(B || (B = {}));
//! Abstract Classes
var AbstractNamespace;
(function (AbstractNamespace) {
    class Vehicle {
        constructor(wheelCount) {
            this.wheelCount = wheelCount;
        }
        showNumberOfWheels() {
            console.log(`moved ${this.wheelCount} miles`);
        }
    }
    class Motorcycle extends Vehicle {
        constructor() {
            super(2);
        }
        updateWheelCount(newWheelCount) {
            this.wheelCount = newWheelCount;
            console.log(`Motorcycle has ${this.wheelCount}`);
        }
    }
    class Automobile extends Vehicle {
        constructor() {
            super(4);
        }
        updateWheelCount(newWheelCount) {
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
})(AbstractNamespace || (AbstractNamespace = {}));
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//! Inheritance with Interfaces
var InterfaceInheritance;
(function (InterfaceInheritance) {
    class Motorcycle {
        constructor(name) {
            //* No "super" for interfaces
            this.name = name;
        }
        updateWheelCount(newWheelCount) {
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
})(InterfaceInheritance || (InterfaceInheritance = {}));
