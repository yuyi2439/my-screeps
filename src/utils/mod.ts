export function generatePixel(): void {
    if (Game.cpu.bucket === 10000) {
        Game.cpu.generatePixel();
    }
}
