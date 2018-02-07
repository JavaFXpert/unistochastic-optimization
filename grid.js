// The rotation angles to observe
var rotationangles  = [
  { label: 'CD', value: 0 },
  { label: 'CE', value: 0 },
  { label: 'CF', value: 0 },
  { label: 'CG', value: 0 },
  { label: 'CA', value: 0 },
  { label: 'CB', value: 0 },
  { label: 'CX', value: 0 },
  { label: 'DE', value: 0 },
  { label: 'DF', value: 0 },
  { label: 'DG', value: 0 },
  { label: 'DA', value: 0 },
  { label: 'DB', value: 0 },
  { label: 'DX', value: 0 },
  { label: 'EF', value: 0 },
  { label: 'EG', value: 0 },
  { label: 'EA', value: 0 },
  { label: 'EB', value: 0 },
  { label: 'EX', value: 0 },
  { label: 'FG', value: 0 },
  { label: 'FA', value: 0 },
  { label: 'FB', value: 0 },
  { label: 'FX', value: 0 },
  { label: 'GA', value: 0 },
  { label: 'GB', value: 0 },
  { label: 'GX', value: 0 },
  { label: 'AB', value: 0 },
  { label: 'AX', value: 0 },
  { label: 'BX', value: 0 }
]

var rotationDegOfFreedom = 28;

// Determines whether to show the unistochastic (squared) matrix
var showuni = false;

// register the grid component
Vue.component('demo-grid', {
  template: '#matrix-template',
  replace: true,
  props: {
    numrowscols: Number,
    colnames: Array,
    //TODO: study how to be able to camel case rownames, etc. in Vue
    rownames: Array,
  },
  computed: {
    matrixAsArray: function () {
      //return computeStochasticMatrix().valueOf();
      return computeStochasticMatrix(createAnglesArrayFromRotationAngles()).valueOf();
    }
  },
  methods: {
  }
})

// function to create array of 180 degree angles
function create180AnglesArray() {
  return Array(rotationDegOfFreedom).fill(180);
}

// function to create array from the rotationangles array
function createAnglesArrayFromRotationAngles() {
  var anglesArray = Array(rotationDegOfFreedom).fill(0);
  for (var i = 0; i < rotationDegOfFreedom; i++) {
    anglesArray[i] = degreesToRadians(rotationangles[i].value);
  }
  return anglesArray;
}


// function to compute rotation matrix
//function computeStochasticMatrix(anglesArrayInDegrees, showUnistochastic) {
//function computeStochasticMatrix() {
function computeStochasticMatrix(arrayOfAngles) {
  matrixDims = 8;
  var a = math.zeros(rotationDegOfFreedom);
  for (var i = 0; i < rotationDegOfFreedom; i++) {
    a[i] = degreesToRadians(arrayOfAngles[i]);
  }
  var matrix = math.eye(matrixDims);
  var rotatedMatrix =
    math.multiply(math.transpose(math.matrix([[math.cos(a[0]), -math.sin(a[0]), 0, 0, 0, 0, 0, 0], [math.sin(a[0]), math.cos(a[0]), 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
      math.multiply(math.transpose(math.matrix([[math.cos(a[1]), 0, -math.sin(a[1]), 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [math.sin(a[1]), 0, math.cos(a[1]), 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
        math.multiply(math.transpose(math.matrix([[math.cos(a[2]), 0, 0, -math.sin(a[2]), 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [math.sin(a[2]), 0, 0, math.cos(a[2]), 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
          math.multiply(math.transpose(math.matrix([[math.cos(a[3]), 0, 0, 0, -math.sin(a[3]), 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [math.sin(a[3]), 0, 0, 0, math.cos(a[3]), 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
            math.multiply(math.transpose(math.matrix([[math.cos(a[4]), 0, 0, 0, 0, -math.sin(a[4]), 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [math.sin(a[4]), 0, 0, 0, 0, math.cos(a[4]), 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
              math.multiply(math.transpose(math.matrix([[math.cos(a[5]), 0, 0, 0, 0, 0, -math.sin(a[5]), 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [math.sin(a[5]), 0, 0, 0, 0, 0, math.cos(a[5]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                math.multiply(math.transpose(math.matrix([[math.cos(a[6]), 0, 0, 0, 0, 0, 0, -math.sin(a[6])], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [math.sin(a[6]), 0, 0, 0, 0, 0, 0, math.cos(a[6])]])),
                  math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[7]), -math.sin(a[7]), 0, 0, 0, 0, 0], [0, math.sin(a[7]), math.cos(a[7]), 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                    math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[8]), 0, -math.sin(a[8]), 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, math.sin(a[8]), 0, math.cos(a[8]), 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                      math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[9]), 0, 0, -math.sin(a[9]), 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, math.sin(a[9]), 0, 0, math.cos(a[9]), 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                        math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[10]), 0, 0, 0, -math.sin(a[10]), 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, math.sin(a[10]), 0, 0, 0, math.cos(a[10]), 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                          math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[11]), 0, 0, 0, 0, -math.sin(a[11]), 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, math.sin(a[11]), 0, 0, 0, 0, math.cos(a[11]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                            math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, math.cos(a[12]), 0, 0, 0, 0, 0, -math.sin(a[12])], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, math.sin(a[12]), 0, 0, 0, 0, 0, math.cos(a[12])]])),
                              math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, math.cos(a[13]), -math.sin(a[13]), 0, 0, 0, 0], [0, 0, math.sin(a[13]), math.cos(a[13]), 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, math.cos(a[14]), 0, -math.sin(a[14]), 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, math.sin(a[14]), 0, math.cos(a[14]), 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                  math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, math.cos(a[15]), 0, 0, -math.sin(a[15]), 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, math.sin(a[15]), 0, 0, math.cos(a[15]), 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                    math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, math.cos(a[16]), 0, 0, 0, -math.sin(a[16]), 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, math.sin(a[16]), 0, 0, 0, math.cos(a[16]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                      math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, math.cos(a[17]), 0, 0, 0, 0, -math.sin(a[17])], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, math.sin(a[17]), 0, 0, 0, 0, math.cos(a[17])]])),
                                        math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, math.cos(a[18]), -math.sin(a[18]), 0, 0, 0], [0, 0, 0, math.sin(a[18]), math.cos(a[18]), 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                          math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, math.cos(a[19]), 0, -math.sin(a[19]), 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, math.sin(a[19]), 0, math.cos(a[19]), 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                            math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, math.cos(a[20]), 0, 0, -math.sin(a[20]), 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, math.sin(a[20]), 0, 0, math.cos(a[20]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                              math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, math.cos(a[21]), 0, 0, 0, -math.sin(a[21])], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, math.sin(a[21]), 0, 0, 0, math.cos(a[21])]])),
                                                math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, math.cos(a[22]), -math.sin(a[22]), 0, 0], [0, 0, 0, 0, math.sin(a[22]), math.cos(a[22]), 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                                  math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, math.cos(a[23]), 0, -math.sin(a[23]), 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, math.sin(a[23]), 0, math.cos(a[23]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                                    math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, math.cos(a[24]), 0, 0, -math.sin(a[24])], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, math.sin(a[24]), 0, 0, math.cos(a[24])]])),
                                                      math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, math.cos(a[25]), -math.sin(a[25]), 0], [0, 0, 0, 0, 0, math.sin(a[25]), math.cos(a[25]), 0], [0, 0, 0, 0, 0, 0, 0, 1]])),
                                                        math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, math.cos(a[26]), 0, -math.sin(a[26])], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, math.sin(a[26]), 0, math.cos(a[26])]])),
                                                          math.multiply(math.transpose(math.matrix([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, math.cos(a[27]), -math.sin(a[27])], [0, 0, 0, 0, 0, 0, math.sin(a[27]), math.cos(a[27])]])),
                                                            matrix))))))))))))))))))))))))))));
  if (showuni) {
    rotatedMatrix = math.square(rotatedMatrix);
  }

  return rotatedMatrix;
}

// function to convert a vector containing degrees to radians
function degreesToRadians(angleInDegrees) {
  var radians = angleInDegrees * (math.pi / 180);
  return radians;
}

//Nelder-Mead optimization code -----------------
function euclidean(computedMatrix, desiredMatrix) {
  var differenceMatrix =
    math.subtract(computedMatrix, desiredMatrix);
  var differenceArraySquared = math.flatten(math.square(differenceMatrix)).valueOf();

  var sumOfSquares = 0;
  for (var i = 0; i < differenceArraySquared.length; i++) {
    sumOfSquares += differenceArraySquared[i];
  }
  var euclideanDistance = math.sqrt(sumOfSquares);
  console.log("euclideanDistance: " + euclideanDistance);
  return euclideanDistance;
}

function loss(arrayOfAngles) {
  var rotMatrix = computeStochasticMatrix(arrayOfAngles);
  //TODO: Don't use this flag
  if (!showuni) {
    rotMatrix = math.square(rotMatrix);
  }

  // C4  D4  E4  F4  G4  A4  B4  C5
  var desiredHarmonyMatrix = math.matrix(
    [[.00, .00, .25, .25, .25, .25, .00, .00], //C4
      [.00, .00, .00, .25, .25, .25, .25, .00], //D4
      [.20, .00, .00, .00, .20, .20, .20, .20], //E4
      [.20, .20, .00, .00, .00, .20, .00, .20], //F4
      [.20, .20, .20, .00, .00, .00, .20, .20], //G4
      [.20, .20, .20, .20, .00, .00, .00, .20], //A4
      [.00, .33, .33, .00, .33, .00, .00, .00], //B4
      [.00, .00, .25, .25, .25, .25, .00, .00]]); //C5

  // Get Euclidean distance between computed and desired matrices
  var euclideanDistance = euclidean(rotMatrix, desiredHarmonyMatrix);

  return euclideanDistance;
}
// end of Nelder-Mead optimization code -----------

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {
    gridNumRowsCols: 8,
    gridRowNames: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'X'],
    gridColNames: ["C'", "D'", "E'", "F'", "G'", "A'", "B'", "X'"],
    rotationangles : rotationangles ,
    showuni: showuni
  },
  methods: {
    toggleuni: function () {
      showuni = !showuni;

      //TODO: Find a way for the showuni variable to cause
      // the computeStochasticMatrix() method to be run, instead of
      // resorting to the following hack
      rotationangles [0].value = 359 - rotationangles [0].value;
      rotationangles [0].value = 359 - rotationangles [0].value;
    },
    optimizerotationangles: function() {
      var solution = fmin.nelderMead(loss, create180AnglesArray());
      console.log("solution is at " + solution.x);
    }
  }
})
