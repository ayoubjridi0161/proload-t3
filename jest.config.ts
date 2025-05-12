import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@auth/core(.*)$': '<rootDir>/node_modules/@auth/core/dist$1',
    '^next-auth/providers/(.*)$': '<rootDir>/node_modules/next-auth/providers/$1.js',
    '^@auth/core$': '<rootDir>/node_modules/@auth/core/dist/index.js'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-auth|@auth)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default createJestConfig(config)