import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, AccessibilityInfo } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Add security headers for web platform
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  // Content Security Policy
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = "default-src 'self' https:; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:; frame-src 'self' https: youtube.com *.youtube.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:";
  document.head.appendChild(cspMeta);

  // X-Content-Type-Options
  const xContentTypeMeta = document.createElement('meta');
  xContentTypeMeta.httpEquiv = 'X-Content-Type-Options';
  xContentTypeMeta.content = 'nosniff';
  document.head.appendChild(xContentTypeMeta);

  // X-Frame-Options
  const xFrameOptionsMeta = document.createElement('meta');
  xFrameOptionsMeta.httpEquiv = 'X-Frame-Options';
  xFrameOptionsMeta.content = 'SAMEORIGIN';
  document.head.appendChild(xFrameOptionsMeta);

  // Referrer-Policy
  const referrerPolicyMeta = document.createElement('meta');
  referrerPolicyMeta.name = 'referrer';
  referrerPolicyMeta.content = 'strict-origin-when-cross-origin';
  document.head.appendChild(referrerPolicyMeta);
}

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Announce app ready for screen readers
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
          const announcement = 'Application loaded and ready';
          const element = document.createElement('div');
          element.setAttribute('role', 'status');
          element.setAttribute('aria-live', 'polite');
          element.textContent = announcement;
          document.body.appendChild(element);
          setTimeout(() => document.body.removeChild(element), 1000);
        } else {
          AccessibilityInfo.announceForAccessibility('Application loaded and ready');
        }
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
    if (typeof window !== 'undefined' && window.frameworkReady) {
      window.frameworkReady();
    }

    return () => {
      if (typeof window !== 'undefined' && window.frameworkReady) {
        delete window.frameworkReady;
      }
    };
  }, []);

  return (
    <>
      <Stack 
        screenOptions={{
          headerShown: false,
          gestureEnabled: Platform.OS !== 'web',
          headerBackImageSource: Platform.OS === 'web' ? undefined : null,
          animation: 'fade',
          animationDuration: 200, // Reduced for better performance
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            freezeOnBlur: true,
          }} 
        />
        <Stack.Screen 
          name="belt" 
          options={{ 
            headerShown: false,
            freezeOnBlur: true,
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            title: 'Page Not Found',
            freezeOnBlur: true,
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}