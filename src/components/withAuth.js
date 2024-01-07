import { getToken } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "./AuthProvider/AuthProvider";
const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const token = getToken();

    const router = useRouter();
    useEffect(() => {
      if (!token) {
        router.push("/login"); // Redirecciona a login si no hay token
      }
    }, [token, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
