export default function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

if(require.main === module) {
    let initTime = new Date().getTime()
    console.log(fibonacci(40))
    console.log(`Time taken: ${new Date().getTime() - initTime}ms`)
}