module.exports = {
  roots: ["<rootDir>"], // Définit la racine à partir du dossier principal
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$",
};
