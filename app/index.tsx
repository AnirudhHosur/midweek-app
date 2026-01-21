import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to welcome screen
    router.replace("/welcome");
  }, [router]);

  return null;
}