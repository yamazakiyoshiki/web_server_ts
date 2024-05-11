function add(v1: number, v2: number) {
  return v1 + v2;
}

function calculate(v1: number, v2: number, callback: Function) {
  return callback(v1, v2);
}

const addResult = calculate(1, 2, add);
console.log(addResult);

function multiply(v1: number, v2: number) {
  return v1 * v2;
}

const multiplyResult = calculate(1, 2, multiply);
console.log(multiply);

const hello = () => {
  console.log("hello");
};

setTimeout(() => {
  console.log("hello");
}, 5000);
