import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import InputField from "./InputField";
import LoadingSpinner from "./LoadingSpinner";
import SignUpHeading from "./SignUpHeading";
import { useAuthContext } from "./AuthProvider/AuthProvider";

const Signup = ({ onNextStep, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData, updateUserData, userData } = useAuthContext();
  const [usernameError, setUsernameError] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isValidUsername = (username) => {
    return !/[@\s]/.test(username);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
    setFormState((prevState) => ({ ...prevState, username: newUsername }));

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
    updateUserData(formState);
    onNextStep();
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
            value={formState.username}
            onChange={handleUserChange}
            errorMessage={usernameError}
          />
          {isCheckingUsername && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <InputField label="Email" placeholder="Email" name="email" type="email" value={formState.email} onChange={handleInputChange} />
        <InputField
          label="Contraseña"
          name="password"
          placeholder="Password"
          type="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isLoading || isCheckingUsername || !isUsernameAvailable || !isValidUsername(userData.username)}
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
