function isPrime(n: number): boolean {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
  }
  return true;
}

export default function prime(limit: number): number[] {
  // primeNumbersBenchmark
  const primes: number[] = [];
  for (let num = 2; num < limit; num++) {
      if (isPrime(num)) primes.push(num);
  }
  return primes;
}

if(require.main === module) {
  let initTime = new Date().getTime()
  console.log(prime(100000000))
  console.log(`Time taken: ${new Date().getTime() - initTime}ms`)
}