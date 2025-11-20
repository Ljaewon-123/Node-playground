export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', () => {
    winstonLogger.error('❌ Nitro 서버에서 오류가 발생했습니다.')
  })

  // 이거 안보내짐;; 왜일까나 터미널에는 찍히는데. 보내기전에 종료되어서???
  nitroApp.hooks.hook('close', async () => {
    await Promise.resolve(winstonLogger.warn({
      event: 'nitro_close',
      message: 'Nitro 서버가 종료되었습니다.',
    }));
  })

})
