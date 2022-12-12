import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/routes";

const ForgotPassword = () => {
  const [emailObbo, setEmailAnaAnaAns] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, emailObbo)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = emailObbo.trim() === "";

  useEffect(() => {
    document.title = "Forgot Password - Instagram";
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
              <p>Update password</p>
            </div>

            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="" method="post">
              <div>
                <input
                  type="text"
                  aria-label="Enter your email address"
                  placeholder="Enter Your Email"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={emailObbo}
                  onChange={(e) => setEmailAnaAnaAns(e.target.value)}
                />
              </div>
              <div className="my-3">
                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn" type="submit">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="pt-[150px]">
              <div className="flex justify-center flex-col items-center flex-col w-full p-4 my-2">
                <p className="text-sm">Or Sign Up Using</p>
                <Link to={LOGIN} className="font-semibold text-black">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
