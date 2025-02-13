/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  rootDir: 'src',
  setupFilesAfterEnv: ['testSetup.js']
};

// npx jest