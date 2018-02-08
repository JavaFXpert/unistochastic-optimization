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

// Determines whether to show the unistochastic (squared) matrix
var showuni = false;

// Object wrapper for reactive variables.
// TODO: Ascertain how to not have to use a wrapper to make reactive variables stay in sync with
//       the Vue data.
var rv = {
  // Euclidean distance between desired stochastic matrix and calculated unistochastic matrix
  euclideandistance: 23
};

// constant for number of degrees of freedom in 8 dimensional rotations
var rotationDegOfFreedom = 28;

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
      return computeStochasticMatrix(createAnglesArrayFromRotationAngles(), showuni).valueOf();
    },
  },
  methods: {
  }
})

// function to create array of 180 degree angles
function create180AnglesArray() {
  var anglesArray = Array(rotationDegOfFreedom).fill(180);
  for (var i = 0; i < rotationDegOfFreedom; i++) {
    anglesArray[i] = degreesToRadians(anglesArray[i]);
  }
  //console.log("anglesArray: " + anglesArray)
  return anglesArray;
}

// function to create array from the rotationangles array
function createAnglesArrayFromRotationAngles() {
  var anglesArray = Array(rotationDegOfFreedom).fill(0);
  for (var i = 0; i < rotationDegOfFreedom; i++) {
    anglesArray[i] = degreesToRadians(rotationangles[i].value);
  }
  //console.log("anglesArray: " + anglesArray)
  return anglesArray;
}


/**
 * Function to compute rotation matrix
 * @param arrayOfAngles Array of rotation angles in radians
 * @param unistochastic Flag that indicates whether to return a unistochastic matrix,
 *                      or the underlying unitary matrix
 * @returns {Unit|*}
 */
function computeStochasticMatrix(arrayOfAngles, unistochastic) {
  matrixDims = 8;
  var a = math.zeros(rotationDegOfFreedom);
  for (var i = 0; i < rotationDegOfFreedom; i++) {
    a[i] = arrayOfAngles[i];
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

  var rotatedMatrixSquared = math.square(rotatedMatrix);

  // Calculate how closely this matrix fits the desired stochastic matrix
  euclidean(rotatedMatrixSquared, desiredHarmonyMatrix);

  var retVal = rotatedMatrix;
  if (unistochastic) {
    retVal = rotatedMatrixSquared;
  }

  return retVal;
}

// function to convert degrees to radians
function degreesToRadians(angleInDegrees) {
  var radians = angleInDegrees * (math.pi / 180);
  return radians;
}

// function to convert radians to degrees
function radiansToDegrees(angleInRadians) {
  var degrees = angleInRadians / (math.pi / 180);
  return degrees;
}

// Optimization code -----------------
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

function euclidean(computedMatrix, desiredMatrix) {
  var differenceMatrix =
    math.subtract(computedMatrix, desiredMatrix);
  var differenceArraySquared = math.flatten(math.square(differenceMatrix)).valueOf();

  var sumOfSquares = 0;
  for (var i = 0; i < differenceArraySquared.length; i++) {
    sumOfSquares += differenceArraySquared[i];
  }
  this.rv.euclideandistance = math.sqrt(sumOfSquares);
  //console.log("euclideandistance: " + this.rv.euclideandistance);
  return this.rv.euclideandistance;
}

function loss(arrayOfAngles) {
  var rotMatrix = computeStochasticMatrix(arrayOfAngles, true);

  // Get Euclidean distance between computed and desired matrices
  var euclidDist = euclidean(rotMatrix, desiredHarmonyMatrix);
  //console.log("euclidDist: " + euclidDist);
  return euclidDist;
}

/**
 * Optimize the angles to minimize the difference between unistochastic matrix and one desired.
 * Uses the rotation angles (e.g. set by sliders) as a starting point
 * @param lossFunction
 * @returns Array of rotation angles in radians, optimized for the best fit
 */
function optimizeRotationAngles(lossFunction) {
  var arrayOfAnglesRad = Array(rotationDegOfFreedom).fill(0);
  var numEpochs = 5; // number of iterations over the rotational angles
  var minDistance = Number.POSITIVE_INFINITY;

  //For each degree of freedom this will be either 1 or -1, signifying direction of movement
  var unitDirectionArray = Array(rotationDegOfFreedom).fill(1);

  var moveRadians = degreesToRadians(1.00);
  var midpointAngleRad = degreesToRadians(180);

  for (var i = 0; i < rotationDegOfFreedom; i++) {
    arrayOfAnglesRad[i] = degreesToRadians(rotationangles[i].value);
  }
  minDistance = lossFunction(arrayOfAnglesRad);

  for (var epochIdx = 0; epochIdx < numEpochs - 1; epochIdx++) {
    console.log("epochIdx: " + epochIdx);
    for (var dofIdx = 0; dofIdx < rotationDegOfFreedom; dofIdx++) {
      console.log("dofIdx: " + dofIdx);
      var curAngRad = arrayOfAnglesRad[dofIdx];
      //console.log("  curAngRad: " + curAngRad);
      // Decide whether to move right or left
      if (curAngRad > midpointAngleRad) {
        unitDirectionArray[dofIdx] = -1;
      }
      curAngRad += unitDirectionArray[dofIdx] * moveRadians;
      if (curAngRad >= 0.0 && curAngRad < degreesToRadians(360)) {
        arrayOfAnglesRad[dofIdx] = curAngRad;
        var tempDistance = lossFunction(arrayOfAnglesRad);
        if (tempDistance > minDistance) {
          // Moving in the wrong direction
          unitDirectionArray[dofIdx] *= -1;
        }
        while (tempDistance < minDistance && curAngRad >= moveRadians && curAngRad < degreesToRadians(360 - moveRadians)) {
          minDistance = tempDistance;
          curAngRad += moveRadians * unitDirectionArray[dofIdx];
          arrayOfAnglesRad[dofIdx] = curAngRad;
          tempDistance = lossFunction(arrayOfAnglesRad);
        }
        rotationangles[dofIdx].value = radiansToDegrees(curAngRad);
        minDistance = tempDistance;
        console.log("minDistance: " + minDistance);
      }
    }
  }

  console.log("distance: " + minDistance);
  return arrayOfAnglesRad;
}

// end of optimization code -----------

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {
    gridNumRowsCols: 8,
    gridRowNames: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'X'],
    gridColNames: ["C'", "D'", "E'", "F'", "G'", "A'", "B'", "X'"],
    rotationangles : rotationangles,
    showuni: showuni,
    rv: rv
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
      var angles180DegreeArray = create180AnglesArray();
      for (var i = 0; i < rotationDegOfFreedom; i++) {
        rotationangles[i].value = angles180DegreeArray[i];
      }
      var solutionInRad = optimizeRotationAngles(loss);
      var solutionInDeg = Array(rotationDegOfFreedom).fill(0);
      for (var i = 0; i < rotationDegOfFreedom; i++) {
        solutionInDeg[i] = radiansToDegrees(solutionInRad[i]);
        rotationangles[i].value = solutionInDeg[i];
      }
      console.log("solution is: " + solutionInDeg);
    },
  }
})
