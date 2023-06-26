import { useAuthContext } from "@/context/auth-context";
import { getToken } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const token = getToken()
    const { userData } = useAuthContext();
    const router = useRouter();
    console.log(userData)
    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [userData]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
