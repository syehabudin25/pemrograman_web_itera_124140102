import { byId, showJSON } from "../utils.js";

// var menimpa variabel pada function scope, sedangkan let dibatasi oleh blok.
export function demoVariables() {
  var oldVar = "Nilai awal var";
  { var oldVar = "var berubah dari dalam blok"; }
  let newLet = "let di luar blok";
  let insideLet;
  {
    let newLet = "let di dalam blok";
    insideLet = newLet;
  }
  const user = { name: "Syehabudin", age: 20 };
  user.age = 21;
  let reassignmentError;
  try {
    user = { name: "Pengganti", age: 22 };
  } catch (error) {
    reassignmentError = `${error.name}: referensi const tidak boleh diganti.`;
  }
  let temporalDeadZone;
  try {
    const value = notDeclaredYet;
    let notDeclaredYet = "Baru dideklarasikan";
    temporalDeadZone = value;
  } catch (error) {
    temporalDeadZone = `${error.name}: let belum dapat diakses sebelum deklarasi.`;
  }
  return { oldVar, outsideLet: newLet, insideLet, constObjectAfterMutation: user, reassignmentError, temporalDeadZone };
}

export function demoArrowFunctions(a = 5, b = 3) {
  function regularSum(first, second) { return first + second; }
  const arrowSum = (first, second) => { return first + second; };
  const shortArrowSum = (first, second) => first + second;
  const sayHello = () => "Halo dari arrow function!";
  const square = number => number * number;
  const createUser = (name, age) => ({ name, age });
  return {
    regularSum: regularSum(a, b),
    arrowSum: arrowSum(a, b),
    implicitReturn: shortArrowSum(a, b),
    noParameter: sayHello(),
    oneParameter: square(a),
    objectReturn: createUser("Syehabudin", 20)
  };
}

if (typeof document !== "undefined") {
  const run = () => {
    showJSON("hasil-variabel", demoVariables());
    showJSON("hasil-arrow", demoArrowFunctions(Number(byId("angka-a").value), Number(byId("angka-b").value)));
  };
  byId("form-arrow").addEventListener("submit", (event) => { event.preventDefault(); run(); });
  byId("ulang-variabel").addEventListener("click", () => showJSON("hasil-variabel", demoVariables()));
  run();
}
