const rollbarConfig = {
  accessToken: '153e96a073aa43ce8a53543f3f87ed8e',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'testenv',
    // context: 'rollbar/test'
    client: {
      javascript: {
        code_version: '1.0',
        // source_map_enabled: true,
        // guess_uncaught_frames: true
      },
    },
  },
}

export default rollbarConfig
