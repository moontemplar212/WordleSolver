let N, S, R, I, D, W = 1, G;

/**
 * 
 * @param {Int} S: States 
 * @param {Int} N: Number of letters
 * @param {Int} R: Number of rows
 */
const calculateCombinations = ({S, N, R} = {}) => {
  P = Math.pow(S, N*R);
  // D = (N > 1) ? Math.pow(N, R) : 0;
  I = Math.pow(Math.pow(S, N) - (N + 1), R);
  G = I + W;
  D = P - G;
  
  console.log(`Possible`, P);
  console.log(`Disallowed`, D);
  console.log(`Incorrect`, I);
  console.log(`Winning`, W);
  console.log(`Guesses`, G);
}

// Wordle
calculateCombinations({ S: 3, N: 5, R: 2 });
