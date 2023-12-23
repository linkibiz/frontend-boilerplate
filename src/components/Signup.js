import { useAuthContext } from "@/context/auth-context";
import { setToken } from "@/utils/helpers";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import BackArrow from "./Icons/BackArrow";
import InputField from "./InputField";
import LoadingSpinner from "./LoadingSpinner";
import SignUpHeading from "./SignUpHeading";
import { debounce } from "lodash";

const Signup = ({ onNextStep, onSubmit }) => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUserData, updateUserData } = useAuthContext();
  const [usernameError, setUsernameError] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const isValidUsername = (username) => {
    return !/[@\s]/.test(username);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateUsernameOnInput = (username) => {
    if (!isValidUsername(username)) {
      setUsernameError("El nombre de usuario no debe contener espacios en blanco ni el símbolo '@'");
    } else {
      setUsernameError(""); // clear the error if username becomes valid
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce(async (username) => {
      setIsCheckingUsername(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/check-username/${username}`);
        console.log(response);
        if (response.data.available) {
          setUsernameError(""); // Username is available
          setIsUsernameAvailable(true);
        } else {
          setUsernameError("Este nombre de usuario ya está en uso.");
          setIsUsernameAvailable(false);
        }
      } catch (error) {
        console.error("Error checking username availability:", error);
        setUsernameError("Error al verificar la disponibilidad del nombre de usuario.");
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500),
    [] // dependencies array is empty because debounce function doesn't depend on any state or props
  );

  const handleUserChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    // Reset errors if input is empty
    if (newUsername === "") {
      setUsernameError("");
      setIsUsernameAvailable(true);
      return;
    }

    validateUsernameOnInput(newUsername);

    if (isValidUsername(newUsername)) {
      debouncedCheckUsername(newUsername);
    }
  };

  useEffect(() => {
    return () => {
      debouncedCheckUsername.cancel();
    };
  }, [debouncedCheckUsername]);

  const handleContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, signupData);

      const userData = response.data;
      console.log("USER DATA", userData.jwt);
      if (userData.error) {
        throw new Error(userData.error);
      } else {
        setToken(userData.jwt);
        // Update the AuthProvider's userData with the new user's data
        setUserData(userData.user);
        onSubmit(userData.user.id);
        onNextStep();
      }
    } catch (err) {
      setError("Corre ya existe. Intente con otro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-3">
      <SignUpHeading title="Sign up" subtitle="Ingrese su email y contraseña en los siguientes campos" />
      <form onSubmit={handleContinue} className="flex flex-col gap-2">
        <div className="relative">
          <InputField
            label="Usuario"
            placeholder="Usuario"
            name="username"
            type="text"
            value={signupData.username}
            onChange={handleInputChange}
            errorMessage={usernameError}
          />
          {isCheckingUsername && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <InputField label="Email" placeholder="Email" name="email" type="email" value={signupData.email} onChange={handleInputChange} />
        <InputField
          label="Contraseña"
          name="password"
          placeholder="Password"
          type="password"
          value={signupData.password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isLoading || isCheckingUsername || !isUsernameAvailable || !isValidUsername(signupData.username)}
          className={`mt-5 py-4 px-5 w-full ${
            isLoading || isCheckingUsername || !isUsernameAvailable ? "bg-[#303030]" : "bg-[#000]"
          } text-white rounded-lg font-bold text-center `}
        >
          {isLoading ? <LoadingSpinner /> : "Continuar"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Signup;
