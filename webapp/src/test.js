let N, S, R, I, D, W = 1, G;

/**
 * 
 * @param {Int} S: States 
 * @param {Int} N: Number of letters
 * @param {Int} R: Number of rows
 */
const calculateCombinations = (S, N, R) => {
  P = Math.pow(S, N*R);
  D = (N > 1) ? Math.pow(N, R) : 0;
  I = Math.pow(Math.pow(S, N) - (N + 1), R);
  G = I + W;
  
  console.log(`Possible`, P);
  console.log(`Disallowed`, D);
  console.log(`Incorrect`, I);
  console.log(`Guesses`, G);
}

calculateCombinations(3, 5, 2);