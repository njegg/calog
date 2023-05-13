import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.njegg.calog',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    discardUncaughtJsExceptions: true,
  }
} as NativeScriptConfig;
