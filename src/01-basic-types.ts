// Verfügbare Typen in TypeScript
// Grundlegende Typen / Simple eingebaute Typen
const string = 'hello world';
const boolean = false;
const number = 4.5;
const empty = null;
const unavailable = undefined;
const anything: any = 1; // Schaltet effektiv das TypeChecking aus
const externalData: unknown = false; // Relevant für Daten von z.B. externen APIs
let impossible: never;

let speed: number | null = null;

// Geschwindigkeit in mph (Miles Per Hour), aber wir wollen kph (Kilometers per Hour)

speed = 1;

if (typeof speed === 'number') {
    speed = speed * 1.60934;
    speed.toExponential;
}

const user = {
    id: 1,
    username: 'test',
    age: 25,
    professions: ['test', 2]
};

const getFullName = (firstName: string, lastName: string, separator?: string) => {
    return `${firstName}${separator ?? ''}${lastName}`;
};

// TS weiß, dass fullName ein String ist, weil es den Return-Wert von getFullName erkennt
const fullName = getFullName('philip', 'braunen');

const getUsername = (user: { username: string }) => {
    return user.username;
};

{
    const getUsername = (user: { isSignedIn: boolean; username?: string }): string => {
        if (user.isSignedIn && typeof user.username === 'string') {
            return user.username;
        }

        return 'Unknown';
    };
}

{
    type User = { isSignedIn: false } | { isSignedIn: true; username: string };

    const getUsername = (user: User): string => {
        return user.isSignedIn ? user.username : 'Unknown';
    };

    const user = {
        isSignedIn: true,
        username: 'test'
    };

    getUsername(user);
}
