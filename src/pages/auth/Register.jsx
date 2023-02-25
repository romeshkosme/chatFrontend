import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (username && username.length > 5 && password && password.length > 7) {
      setLoader(true);
      auth
        .signup({ username, password })
        .then((response) => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("finally");
          setLoader(false);
        });
    } else {
      console.log("small ");
    }
  };
  return (
    <div className="bg-[#EFF6FC] h-[100vh] flex justify-center items-center">
      {/* card */}
      <div className="bg-[#ffffff] w-[420px] max-w-[450px] max-h-[430px] border-2 border-[#6E00FF] rounded-[5px] py-[24px] px-[20px]">
        <p className="text-center font-[500] text-gray-400">WELCOME</p>
        <h1 className="text-center font-[600] text-xl text-[#6E00FF]">
          Register
        </h1>
        {/* form */}
        <div className="flex flex-col mt-4">
          <label className="text-gray-500">Username</label>
          <input
            type="text"
            className="bg-[#EFF6FC] text-gray-500 rounded-[4px] px-2 py-1 placeholder:text-gray-500 focus:outline-none"
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
            className="bg-[#EFF6FC] text-gray-500 rounded-[4px] px-2 py-1 placeholder:text-gray-500 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {loader ? (
          <LoaderButton loading={loader} />
        ) : (
          <button
            className="font-[500] w-full bg-[#6E00FF] text-white px-2 py-1 rounded-[4px] mt-4"
            onClick={onSubmitHandle}
          >
            Register
          </button>
        )}
        <p className="mt-2 text-gray-500">
          Not registered?{" "}
          <Link to={"/"}>
            <span className="font-[500] text-[#6E00FF] cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
