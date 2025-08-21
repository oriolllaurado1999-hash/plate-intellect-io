import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8ef83f712a18403986a496b5e0a5de9e',
  appName: 'Kalore',
  webDir: 'dist',
  server: {
    url: 'https://8ef83f71-2a18-4039-86a4-96b5e0a5de9e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    HealthKit: {
      permissions: [
        'read:steps',
        'read:active_energy_burned',
        'read:body_mass',
        'read:height',
        'read:heart_rate',
        'read:exercise_time'
      ]
    }
  }
};

export default config;