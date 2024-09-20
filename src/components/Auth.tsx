import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthProvider";

const Auth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hashPassword = (input: string): string => {
    return input.split("").reverse().join("");
  };

  const {
    isLoggedIn,
    isRegistering,
    user,
    setIsLoggedIn,
    setIsRegistering,
    setUser,
  } = useAuthContext();

  // Validating session on component mount
  useEffect(() => {
    const userSession = sessionStorage.getItem("userSession");
    if (userSession) {
      setIsLoggedIn(true);
      setUser(userSession);
    } else {
      setIsLoggedIn(false);
    }
  }, [isRegistering]);

  const handleRegister = () => {
    const hashedPassword = hashPassword(password);
    const user = {
      username: username,
      password: hashedPassword,
    };

    sessionStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
  };

  const handleLogin = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const hashedPassword = hashPassword(password);

      if (
        parsedUser.username === username &&
        parsedUser.password === hashedPassword
      ) {
        sessionStorage.setItem("userSession", username);
        setIsLoggedIn(true);
        alert("Login successful!");
        setIsRegistering(false);
        setUser(username);
      } else {
        alert("Invalid username or password");
      }
    } else {
      alert("No registered user found. Please register first.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userSession");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="h-screen flex items-center justify-center">
          <form className="grid w-60 border-4 border-solid border-stone-400 p-3 shadow-md gap-5 mb-auto">
            <h2>{!isLoggedIn && isRegistering ? "Register" : "Login"}</h2>
            <input
              className="border-4 border-solid border-stone-400 p-3 shadow-md"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border-4 border-solid border-stone-400 p-3 shadow-md"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLoggedIn && isRegistering ? (
              <button
                className="bg-blue-500 text-white p-2 rounded w-full"
                onClick={handleRegister}
              >
                Register
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white p-2 rounded w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
            {!isLoggedIn && !isRegistering && (
              <p className="text-gray-600 text-sm mt-4 text-center">
                Don't have an account?{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistering(true);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </button>
              </p>
            )}

            {!isLoggedIn && isRegistering && (
              <p className="text-gray-600 text-sm mt-4 text-center">
                Already registered?{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistering(false);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="float-right border-4 border-solid border-stone-400 p-3 shadow-md gap-6 mr-5">
          <h2>Welcome, {user}!</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white p-1 rounded w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
