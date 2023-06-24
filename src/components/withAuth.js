import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { userData, isLoading } = useAuthContext();
    const router = useRouter();
    console.log(userData, isLoading)
    useEffect(() => {
      if (!userData && !isLoading) {
        router.replace("/login");
      }
    }, [userData, router,isLoading]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
