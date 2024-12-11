function integrationBenchmark(f: (x: number) => number, a: number, b: number, n: number): number {
  const h = (b - a) / n;
  let integral = 0.5 * (f(a) + f(b));

  for (let i = 1; i < n; i++) {
      integral += f(a + i * h);
  }
  return integral * h;
}

export default function integration(n: number) {
  return integrationBenchmark(Math.sin, 0, Math.PI, 1000000000)
}

if(require.main === module) {
  let initTime = new Date().getTime()
  console.log(integration(1000000000))
  console.log(`Time taken: ${new Date().getTime() - initTime}ms`)
}