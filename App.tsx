import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./Main";
import { NativeBaseProvider } from "native-base";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
