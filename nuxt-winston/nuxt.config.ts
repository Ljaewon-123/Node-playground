// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    AWS_REGION: process.env.AWS_REGION || 'us-west-1',
    CLOUDWATCH_LOG_GROUP: process.env.CLOUDWATCH_LOG_GROUP || 'nuxt-winston-log-group',
    CLOUDWATCH_LOG_STREAM: process.env.CLOUDWATCH_LOG_STREAM || 'nuxt-winston-log-stream',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})
