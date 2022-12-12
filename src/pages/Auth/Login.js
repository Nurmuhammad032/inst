import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../contextFire/firebase";
import "./style.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "../../utils/routes";
import InstaLogo from "../../components/InstaLogo";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmailUffMas] = useState("");
  const [password, setPasswordSecret] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } catch (error) {
      setEmailUffMas("");
      setPasswordSecret("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-wrap items-center justify-center p-3"
      style={{
        background:
          "url('https://colorlib.com/etc/lf/Login_v4/images/bg-01.jpg') no-repeat center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-[500px]">
        <div className="w-full">
          <div className="bg-white px-4 py-[35px] rounded-[12px]">
            <div className="w-full mb-[34px] justify-center mx-auto flex flex-col items-center space-y-4">
              <h1 className="text-3xl text-bold text-black">Instagram</h1>
              <p>Login</p>
            </div>

            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-3" method="post">
              <div>
                <input
                  type="text"
                  aria-label="Your email address"
                  placeholder="Your email account"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={email}
                  onChange={(e) => setEmailUffMas(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  aria-label="Your password"
                  placeholder="Password"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={password}
                  onChange={(e) => setPasswordSecret(e.target.value)}
                />
              </div>
              <div>
                <div className="text-end mb-3">
                  <Link
                    to={FORGOTPASSWORD}
                    className="text-[#5A686C] text-center w-full text-xs my-3"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              {/* <div className="buttonlar">
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={`mt-3 cursor-pointer text-white rounded w-full h-8 font-semibold disabled:opacity-[0.4] disabled:cursor-auto`}
                  // style={{
                  //   background:
                  //     "linear-gradient(269.53deg, #A336BD -4.74%, #FF387D 29.23%, #FF5D34 70.94%, #FFAA1B 105.94%)",
                  // }}
                >
                  Log In
                </button>
              </div> */}
              <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>

              <div className="pt-[155px]">
                <div className="flex justify-center flex-col items-center flex-col w-full p-4">
                  <p className="text-sm mb-4">Or Sign Up Using</p>
                  <Link
                    to={SIGN_UP}
                    className="font-semibold uppercase ml-2 text-blue-500"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
