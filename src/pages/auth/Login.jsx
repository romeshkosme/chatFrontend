import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (username && username.length > 5 && password && password.length > 7) {
      setLoader(true);
      auth
        .signin({ username, password })
        .then((response) => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      console.log("small ");
    }
  };
  return (
    <>
      <div className="bg-[#f1faee] h-[100vh] flex justify-center items-center">
        {/* card */}
        <div className="bg-[#a8dadc] w-[420px] max-w-[450px] max-h-[430px] border-2 border-[#457b9d] rounded-[5px] py-[24px] px-[20px]">
          <p className="text-center font-[500] text-[#457b9d]">WELCOME BACK</p>
          <h1 className="text-center font-[600] text-xl text-[#1d3557]">
            Login
          </h1>
          {/* form */}
          <div className="flex flex-col mt-4">
            <label className="text-[#1d3557]">Username</label>
            <input
              type="text"
              className="bg-transparent border border-[#457b9d] text-[#457b9d] rounded-[4px] px-2 py-1 placeholder:text-[#457b9d] focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-[#1d3557]">Password</label>
            <input
              type="password"
              className="bg-transparent border border-[#457b9d] text-[#457b9d] rounded-[4px] px-2 py-1 placeholder:text-[#457b9d] focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={onSubmitHandle}
            className="font-[500] w-full bg-[#457b9d] text-[#caf0f8] px-2 py-1 rounded-[4px] mt-4"
          >
            Login
          </button>
          <p className="mt-2 text-[#457b9d]">
            Not registered?{" "}
            <Link to={"/register"}>
              <span className="font-[500] text-[#1d3557] cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
