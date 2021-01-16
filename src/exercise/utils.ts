export function sleep(ms): Promise<boolean> {
    return new Promise<boolean>(resolve => setTimeout(() => resolve(true), ms));
}

export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
