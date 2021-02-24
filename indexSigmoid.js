/* Desafio
    Dada a array abaixo, preencher os valores null com base nos outros valores da array.
    Estamos tendo problema de performance com o algorÃ­tmo atual. Leve isso em consideraÃ§Ã£o!
    Uma array de objetos do mesmo tipo Ã© esperada como retorno.

    Ex1.:
        [null, 1, 2] podemos repetir o primeiro valor encontrado para a primeira posiÃ§Ã£o da array
        Resultado [1, 1, 2]

    Ex2.:
        [1, 2, null] podemos repetir o Ãºltimo valor encontrado para a Ãºltima posiÃ§Ã£o da array
        Resultado [1, 2, 2]

    Ex3.:
        [1, null, null, 4] podemos fazer a diferenÃ§a entre os valores e preencher a array de forma homogÃªnea
        Resultado [1, 2, 3, 4]
*/

/* Constraints
 * Essa array tem pelo menos 2 elementos
 * Pelo menos 2 valores dessa array tem valores diferentes de null
 * VocÃª pode assumir que a array estÃ¡ ordenada
 */

// Logistic funcion
// Um tipo de função sigmoide. Nada mais é do que uma forma parametrizada
// https://en.wikipedia.org/wiki/Logistic_function
const sigmoid = (x, firstPoint, secondPoint, growthRateModule) => {
  const amplitude = secondPoint.value - firstPoint.value;

  // A especificação da coordenada X do ponto de inflexão já deixa implícita a translação
  // da função no eixo X para o que desejamos.
  const translationInY = firstPoint.value;
  const midPoint = (firstPoint.timestamp + secondPoint.timestamp) / 2;

  return (
    translationInY +
    amplitude / (1 + Math.exp(-growthRateModule * (x - midPoint)))
  );
};

const list = [
  { value: null, timestamp: 10 },
  { value: null, timestamp: 12 },
  { value: 10, timestamp: 15 },
  { value: 30, timestamp: 18 },
  { value: 67, timestamp: 25 },
  { value: null, timestamp: 30 },
  { value: null, timestamp: 31 },
  { value: null, timestamp: 33 },
  { value: null, timestamp: 40 },
  { value: 150, timestamp: 41 },
  { value: null, timestamp: 43 },
  { value: 320, timestamp: 45 },
  { value: null, timestamp: 46 },
  { value: null, timestamp: 48 },
  { value: 10, timestamp: 51 },
  { value: null, timestamp: 53 },
  { value: 10, timestamp: 54 },
  { value: null, timestamp: 55 },
  { value: null, timestamp: 59 },
  { value: null, timestamp: 63 },
  { value: null, timestamp: 70 },
  { value: 100, timestamp: 71 },
  { value: null, timestamp: 72 },
  { value: null, timestamp: 75 },
  { value: null, timestamp: 79 },
];

let newList = list;

// Primeiro elemento
if (newList[0].value == null) {
  const firstTruthyValueIndex = list.findIndex((item) => item.value !== null);

  for (let i = 0; i < firstTruthyValueIndex; i++) {
    newList[i].value = newList[firstTruthyValueIndex].value;
  }
}

// Ultimo elemento
if (newList[newList.length - 1].value == null) {
  let firstTruthyValueIndex = 0;

  for (let i = newList.length - 1; firstTruthyValueIndex == 0; i = i - 1) {
    if (newList[i].value !== null) {
      firstTruthyValueIndex = i;
    }
  }

  for (let i = firstTruthyValueIndex; i < list.length; i++) {
    newList[i].value = newList[firstTruthyValueIndex].value;
  }
}

// Região intermediária
for (let i = 0; i < newList.length - 1; i++) {
  if (newList[i].value == null) {
    let inNullInterval = true;

    let nullCount = 0;

    for (let x = i; inNullInterval == true; x++) {
      if (newList[x].value !== null) {
        inNullInterval = false;
      }
      nullCount = x - i;
    }

    inNullInterval = true;

    for (let x = i; inNullInterval == true; x++) {
      if (newList[x].value !== null) {
        inNullInterval = false;
      } else {
        // Note que "i" não muda nesse loop interno, apenas x.
        newList[x].value = sigmoid(
          newList[x].timestamp, // x na função
          newList[i - 1], // Primeiro valor não nulo antes da sequência de nulos
          newList[i + nullCount], // Primeiro valor não nulo depois da sequência de nulos
          1 // Growth rate. Arbitrei como 1, mas pode ser alterado.
        );
      }
    }
  }
}

console.log(newList);
