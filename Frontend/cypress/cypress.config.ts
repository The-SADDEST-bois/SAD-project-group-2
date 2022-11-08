import { defineConfig } from 'cypress'

export default defineConfig({
  waitForAnimations: false,
  animationDistanceThreshold: 50
})

// script to run cypress not sure is needed "cy:run": "cypress run --browser chrome --config-file cypress/cypress.config.ts",