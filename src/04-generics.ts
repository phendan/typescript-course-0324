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

const getValueFromObject = (object: Record<string, any>, key: string) => {
    return object[key];
};

type Card = {
    /** Farbe */
    suit: string;
    /** 2..10, Jack, Queen, King, Ace */
    rank: string;
    value: number;
};

const deck: Array<Card> = [{ rank: 'Ace', suit: 'Spades', value: 11 }];

const card: Card = deck[0];

// const color = getValueFromObject(card, 'color'); // ist falsch

{
    const getValueFromObject = <Object extends {}>(object: Object, key: keyof Object) => {
        return object[key];
    };

    const color = getValueFromObject(card, 'suit');
}

{
    const getValueFromObject = <Object extends {}, Key extends keyof Object>(
        object: Object,
        key: Key
    ) => {
        return object[key];
    };

    const suit = getValueFromObject(card, 'suit');
}

const clamp = <Min extends number, Max extends number>(
    number: number,
    bounds: [Min, Max]
) => {
    const [min, max] = bounds;
    return Math.min(Math.max(number, min), max);
};

const clamped = clamp(100, [0, 50]);

// as -> Type Assertions
const typedObjectKeys = <T extends {}>(object: T) => {
    // As nur sehr selten benutzen
    const returnValue = Object.keys(object) as Array<keyof T>;
    return returnValue;
};

let keys = typedObjectKeys(card);

// Default Typen für Generics
const createSet = <T = string>() => {
    return new Set<T>();
};

const numberSet = createSet<number>();
const stringSet = createSet<string>();

const otherStringSet = createSet();

class Test<T> {
    private prop: T;

    constructor(value: T) {
        this.prop = value;
    }
}

// as const
const routes = {
    home: '/',
    users: '/users',
    contact: '/contact',
    admin: '/admin',
    support: '/help'
} as const;

type RouteKey = keyof typeof routes;
type Route = (typeof routes)[RouteKey];

const goToRoute = (route: Route) => {
    // window.location.href = route;
};

goToRoute('/users');

const routesX = Object.freeze({
    home: '/',
    users: '/users',
    contact: '/contact',
    admin: '/admin',
    support: '/help',
    nested: {
        route: '/nested-route'
    }
});

routesX.nested.route = '/another-route';

enum NotificationLevel {
    Notice,
    Warning,
    Error,
    Success
}

const sendNotification = (message: string, level: NotificationLevel) => {
    //
};

sendNotification(
    'You are not signed in. Please head over to the sign in page.',
    NotificationLevel.Notice
);

{
    const notificationLevels = ['notice', 'warning', 'error', 'success'] as const;
    type NotificationLevel = (typeof notificationLevels)[number];

    const sendNotification = (message: string, level: NotificationLevel) => {
        //
    };

    sendNotification(
        'You are not signed in. Please head over to the sign in page.',
        'warning'
    );
}

export {};
