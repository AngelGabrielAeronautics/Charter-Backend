export function generateUID(): string {
    // Generate the UID from two parts here to ensure the random number provide enough bits.
    let partA = (Math.random() * 46656) | 0;
    let partB = (Math.random() * 46656) | 0;
    const a  = ("000" + partA.toString(36)).slice(-3);
    const b = ("000" + partB.toString(36)).slice(-3);
    return a + b;
}