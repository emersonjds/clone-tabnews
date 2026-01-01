const nextJest = require('next/jest')
require('dotenv').config({ path: '.env.development' })

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'node',
}

module.exports = createJestConfig(customJestConfig)