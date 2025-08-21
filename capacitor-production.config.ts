import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kalore.nutrition', // Cambiar para producción
  appName: 'Kalore',
  webDir: 'dist',
  // Remover la configuración de servidor para producción
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false
    },
    StatusBar: {
      style: "DEFAULT",
      backgroundColor: "#ffffff"
    }
  }
};

export default config;