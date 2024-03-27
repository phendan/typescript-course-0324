// Generics: Typ Parameter

import axios from 'axios';

const numbers: Array<number> = [1, 2, 3];
const strings = ['foo', 'bar'];

const x = numbers.pop();
const y = strings.pop();

const a = Promise.resolve(4.5);
const b = Promise.resolve('hi!');

const someAsyncFunction = async () => {
    const x = await a;
    const y = await b;
};

const numbersWithoutDuplicates = new Set<number>();

numbersWithoutDuplicates.add(1);

{
    type MyGenericType<Data> = {
        data: Data;
        doSomething: () => false;
    };

    type Example = MyGenericType<{ firstName: string }>;
}

// Generics in Funktionen
const request = <Response>(url: string): Promise<Response> => {
    return fetch(url).then(response => response.json());
};

{
    // type User = { id: number; name: string };
    // const response = await request<User[]>('/api/users');
    // const userId = response[0].id;
}

const convertToArray = <T>(param: T) => {
    return [param];
};

const array = convertToArray(false);

const addIdToObject = <T>(object: T) => {
    return {
        ...object,
        id: 1234
    };
};

const alteredObject = addIdToObject({
    firstName: 'john',
    lastName: 'doe',
    age: 22
});

alteredObject.firstName;
alteredObject.lastName;
alteredObject.id;

const measureDuration = async <T>(promise: Promise<T>) => {
    const startTime = performance.now();
    const value = await promise;
    const completionTime = performance.now();

    return { duration: completionTime - startTime, value };
};

const { duration, value } = await measureDuration(axios.get('/posts.json'));
console.log(duration, value);

// Generics eingrenzen - Constraints

type Person = {
    name: string;
};

function sayHello<T extends Person>(person: T): void {
    console.log(`Hello, ${person.name}`);
}

sayHello({ name: 'Simon' });

export {};
