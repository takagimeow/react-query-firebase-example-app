import { StatusBar } from "expo-status-bar";
import { HomeScreen } from "./screens/HomeScreen";

export default function Main() {
  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
}
