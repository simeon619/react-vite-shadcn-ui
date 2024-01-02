import { getInfo } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export const useAuth = () => {
  const { setAccount, account , status } = useAuthStore();

  const loadData = () => {
    getInfo().then((account) => {
      setAccount(account);
    });
  };
  useEffect(() => {
    if (!account) {
      loadData();
    }
  }, [account]);

  return { account, status };
};
