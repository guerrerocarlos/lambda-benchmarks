export default function matrix(size: number): number[][] {
  const A: number[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
  const B: number[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
  const result: number[][] = Array.from({ length: size }, () => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
              result[i][j] += A[i][k] * B[k][j];
          }
      }
  }
  return result;
}

if(require.main === module) {
  let initTime = new Date().getTime()
  console.log(matrix(1000))
  console.log(`Time taken: ${new Date().getTime() - initTime}ms`)
}