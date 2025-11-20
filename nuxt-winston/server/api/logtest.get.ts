export default defineEventHandler(() => {
  winstonLogger.info({ event: 'log_test', message: 'Testing CloudWatch log' })
  throw createError({
    statusCode: 500,
    message: 'This is a test error for CloudWatch logging',
  })
  // throw new Error('hi')
  return { ok: true }
})
