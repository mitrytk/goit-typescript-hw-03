
interface IKey {
    getSignature(): number;
}

interface IPerson {
    getKey(): IKey;
}
class Key implements IKey {
    private signature: number;
    constructor() {
        this.signature = Math.random();
    }

    getSignature(this: Key) {
        return this.signature;
    }
}

class Person implements IPerson {
    private key: Key;
    constructor(Key: Key) {
        this.key = Key;
    }

    getKey(this: Person) {
        return this.key;
    }
}

abstract class House {
    door: boolean;
    tenants: Person[] = [];


    constructor(public key: Key) {
    }

    comeIn(person: Person) {
        if(!this.door) {
            console.log("I'm sorry, but this door is closed. Use the key to enter.")
        }
        this.tenants.push(person);
        console.log("Congratulations! You rented this house.")
    }

    abstract openDoor(key: Key): void;
}

class MyHouse extends House {

    openDoor(key: Key): void {
        if (this.key.getSignature() === key.getSignature()) {
            this.door = true;
            console.log("This door is open. Welcome!")
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};