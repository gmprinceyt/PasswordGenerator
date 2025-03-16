import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DiTravis } from "react-icons/di";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";

const Password = () => {
  const [lenght, setlenght] = useState(8);
  const [password, setPassword] = useState("");
  const [allowlower, setlower] = useState(true);
  const [allowupper, setupper] = useState(false);
  const [allownumber, setnumber] = useState(true);
  const [allowchar, setchar] = useState(false);
  const [Strengh, setStrengh] = useState("");

  // Password Generator Function
  const generatepassword = () => {
    let characters = "!@#$%^&*?/-<>=+~";
    let number = "1234567890";
    let small = "abcdefghijklmnopqstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwords = "";
    let len = "";

    // Check If Pasword Types Not true  then handle
    if (!allowchar && !allowlower && !allownumber && !allowupper)
      toast.error("Please Select Password Types ");

    if (allowlower) len += small;
    if (allowupper) len += upper;
    if (allownumber) len += number;
    if (allowchar) len += characters;

    for (let i = 1; i <= lenght; i++) {
      let ran = Math.floor(Math.random() * len.length + 1);
      passwords += len.charAt(ran);
    }
    setPassword(passwords);
  };

  const passwordChecker = () => {
    let StrenghLenght = 0;
    if (lenght >= 10) StrenghLenght++;
    if (allowlower) StrenghLenght++;
    if (allowupper) StrenghLenght++;
    if (allowchar) StrenghLenght++;
    if (allownumber) StrenghLenght++;
    switch (StrenghLenght) {
      case 1:
        setStrengh("Very Weak");
        break;
      case 2:
        setStrengh("Weak");
        break;
      case 3:
        setStrengh("Moderate");
        break;
      case 4:
        setStrengh("Strong");
        break;
      case 5:
        setStrengh("Very Strong");
        break;
      default:
        setStrengh("");
        break;
    }
  };

  // copy to cilipboard
  const CopyToCilipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied Success");
  }, [password]);

  // For Rerendering Coponents
  useEffect(() => {
    generatepassword();
    passwordChecker();
  }, [allowlower, allowupper, allownumber, allowchar, lenght]);

  return (
    <div className="main w-full h-screen py-10 px-3 bg-black text-white font-[Tomorrow]">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <main className="">
        <header className="name">
          <h1 className="leading-8 font-bold text-[#F8EF00] mb-6  tracking-[0.5rem] text-4xl">
            PASSWORD <br /> GENERATOR
          </h1>
        </header>

        <section className="password mb-5">
          <div className="border-[#00F0FF] mb-4 rounded bg-[#00eeff1f] border-2 flex items-center justify-between py-4 px-4">
            <input
              value={password}
              type="text"
              name="password"
              id="password"
              disabled
              className="text-xl text-[#00eeffc9]"
            />

            <span
              onClick={() => {
                generatepassword();
                if (allowchar || allowlower || allownumber || allowupper)
                  toast.success("Refresh");
              }}
              className="text-2xl text-[#00eeff] active:text-[#00eeff30] "
            >
              <FiRefreshCw />
            </span>
          </div>
          <div
            className="bg-[#F8EF00] border-buttom font-medium   flex active:bg-yellow-800 items-center justify-between px-8 text-black t rounded  w-full h-12 bg-contain bg-no-repeat"
            onClick={CopyToCilipBoard}
          >
            <span className="tracking-[0.5rem]">COPY PASSWORD_</span>
            <span className="text-2xl">
              <FiArrowRight />
            </span>
          </div>
        </section>

        <section className="range mb-10">
          <div className="flex gap-2 items-center justify-center ">
            <input
              onChange={(e) => setlenght(e.target.value)}
              type="range"
              name="range"
              id="range"
              min={4}
              value={lenght}
              max={20}
            />
            <span className="bg-[#00eefff6] py-1 text-black font-medium px-2 rounded-2xl">
              {lenght}
            </span>
          </div>
        </section>
        <section className="mb-6">
          <div className="flex items-center justify-between mb-5 px-4">
            <div className="flex items-center gap-4  ">
              <input
                onChange={(e) => setlower((prev) => !prev)}
                defaultChecked
                type="checkbox"
                name="lower"
                id="lower"
              />
              <label className="font-medium" htmlFor="lower">
                Lower Case
              </label>
            </div>
            <div className="flex items-center gap-4 ">
              <input
                onChange={(e) => setupper((prev) => !prev)}
                type="checkbox"
                name="upper"
                id="upper"
              />
              <label className="font-medium" htmlFor="upper">
                Upper Case
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 ">
            <div className="flex items-center gap-4 ">
              <input
                onChange={(e) => setnumber((prev) => !prev)}
                defaultChecked
                type="checkbox"
                name="number"
                id="number"
              />
              <label className="font-medium" htmlFor="number">
                Number Case
              </label>
            </div>
            <div className="flex items-center gap-4 ">
              <input
                onChange={(e) => setchar((prev) => !prev)}
                type="checkbox"
                name="characters"
                id="characters"
              />
              <label className="font-medium" htmlFor="characters">
                Symbols
              </label>
            </div>
          </div>
        </section>
        <section className="">
          <div
            className="bg-[#F8EF00] border-buttom font-medium   flex active:bg-yellow-800 items-center justify-between px-8 text-black  rounded  w-full h-12"
            onClick={() => {
              let value = passwordChecker();
              if (value === "Strong")
                toast.success("Its Strong Pasword 'You Can Use Any Where'");
            }}
          >
            Password Strength
            <span className="text-2xl">
              <FiArrowRight />
            </span>
          </div>
          <br />
        </section>
        <section className="">
          <div
            className={` h-3 rounded-md transition-all   ${
              Strengh === "Very Weak"
                ? "bg-red-500 w-1/5"
                : Strengh === "Weak"
                ? "bg-orange-500 w-2/5"
                : Strengh === "Moderate"
                ? "bg-yellow-500 w-3/5"
                : Strengh === "Strong"
                ? "bg-lime-500 w-4/5 "
                : Strengh === "Very Strong"
                ? "bg-green-700"
                : "w-0"
            }`}
          ></div>
          <span
          className={`${
            Strengh === "Very Strong"
              ? "text-green-600"
              : Strengh === "Strong"
              ? "text-lime-500"
              : Strengh === "Moderate"
              ? "text-yellow-500"
              : Strengh === "Weak"
              ? "text-orange-500"
              : "text-red-600"
          }`}
        >
          {Strengh}
        </span>
        </section>
      </main>
    </div>
  );
};

export default Password;
