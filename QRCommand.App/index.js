import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { AuthProvider } from "~/hooks/useAuth";

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app'); // Load routes from the app directory

  // Wrap ExpoRoot with AuthProvider
  return (
    <AuthProvider>
      <ExpoRoot context={ctx} />
    </AuthProvider>
  );
}

registerRootComponent(App);
