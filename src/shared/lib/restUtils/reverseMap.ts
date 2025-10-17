export function reverseMap<Input, Output>(
    arr: Input[],
    callback: (value: Input, index: number, array: Input[]) => Output,
): Output[] {
    const result: Output[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const value: Output = callback(arr[i], i, arr);
        result.push(value);
    }
    return result;
}
