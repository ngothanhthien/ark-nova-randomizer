export function createArrayFromXtoY(x: number, y: number) {
    if (y < x) {
        return [];
    }
    return Array.from({ length: y - x + 1 }, (_, k) => k + x);
}
