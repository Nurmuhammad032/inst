import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../contextFire/firebase";
import "./style.css";
import { HOME, LOGIN, FORGOTPASSWORD } from "../../utils/routes";
import { doesUsernameExist } from "../../Allservices/firebase";
import InstaLogo from "../../components/InstaLogo";

const SignUp = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [username, setUsernameOvfsad] = useState("");
  const [fullName, setFullNameFulll] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });

          navigate(HOME);
        } catch (error) {
          setFullNameFulll("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
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
              <p>Sign Up</p>
            </div>
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="" method="post">
              <div>
                <input
                  type="text"
                  aria-label="Enter your email username"
                  placeholder=" Your Username"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={username}
                  onChange={(e) => setUsernameOvfsad(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  aria-label="Full name"
                  placeholder=" Your Full Name"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={fullName}
                  onChange={(e) => setFullNameFulll(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  aria-label="Your email address"
                  placeholder=" Your Email"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  aria-label="Enter your password"
                  placeholder="Password(12345678)"
                  className="text-xs p-3 mb-3 text-lg focus:border-[#333333] border-[#dbdbdb] border-b-2 text-sm outline-none rounded-sm bg-tranparent w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-end mb-3 ">
                <Link
                  to={FORGOTPASSWORD}
                  className="text-[#073c6e] text-center w-full text-xs my-3"
                >
                  Forgot password?
                </Link>
              </div>
              <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="">
              <div className="flex justify-center flex-col items-center flex-col w-full p-4">
                <p className="text-sm pt-[155px]">Or Login Using</p>
                <Link to={LOGIN} className="font-semibold ml-1 text-blue-500">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
