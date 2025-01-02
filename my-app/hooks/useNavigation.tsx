// utils/useNavigation.ts
import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  const handlePricingNavigation = () => {
    router.push("/pricing");
  };

  return { handlePricingNavigation };
};

export default useNavigation;
