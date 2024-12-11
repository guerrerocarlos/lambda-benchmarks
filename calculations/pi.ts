export default function pi(iterations: number): number {
  // Monte Carlo method
  let insideCircle = 0;

  for (let i = 0; i < iterations; i++) {
      const x = Math.random();
      const y = Math.random();
      if (x * x + y * y <= 1) {
          insideCircle++;
      }
  }
  return (insideCircle / iterations) * 4;
}

if(require.main === module) {
  let initTime = new Date().getTime()
  console.log(pi(1000000000))
  console.log(`Time taken: ${new Date().getTime() - initTime}ms`)
}