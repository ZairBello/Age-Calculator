import React, { useState } from "react";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({
    day: false,
    month: false,
    year: false,
  });

  const validateInputs = () => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const today = new Date();
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);

    if (!day || !month || !year) {
      setError("Todos los campos son obligatorios.");
      setInputError({ day: !day, month: !month, year: !year });
      return false;
    }

    if (dayNum < 1 || dayNum > 31) {
      setError("El día debe estar entre 1 y 31.");
      setInputError({ day: true });
      return false;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("El mes debe estar entre 1 y 12.");
      setInputError({ month: true });
      return false;
    }

    if (birthDate > today) {
      setError("La fecha de nacimiento no puede ser en el futuro.");
      setInputError({ day: true, month: true, year: true });
      return false;
    }

    if (
      birthDate.getDate() !== dayNum ||
      birthDate.getMonth() + 1 !== monthNum ||
      birthDate.getFullYear() !== yearNum
    ) {
      setError("La fecha ingresada no es válida.");
      setInputError({ day: true, month: true, year: true });
      return false;
    }

    return true;
  };

  const calculateAge = (e) => {
    e.preventDefault();
    setError("");
    setInputError({ day: false, month: false, year: false });

    if (!validateInputs()) return;

    const today = new Date();
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="flex flex-col justify-start lg:justify-center items-start lg:items-center h-screen w-screen bg-neutral-200 overflow-hidden px-4 pt-24">
      <div className="bg-white lg:h-3/4 lg:w-2/5 w-full h-3/4 lg:p-8 px-4 py-8 rounded-3xl lg:rounded-br-[15rem] rounded-br-[8rem] font-poppins">
        <form
          className="w-full lg:h-2/5 h-64 grid lg:grid-cols-4 grid-cols-6 lg:grid-rows-2 uppercase gap-4 gap-y-2 lg:gap-10 font-poppins"
          onSubmit={calculateAge}
        >
          {["Day", "Month", "Year"].map((label) => (
            <div key={label} className="w-12 lg:w-36 lg:col-span-1 col-span-2">
              <h1 className="text-sm text-gray-500 font-black tracking-[0.3rem] mb-2">
                {label}
              </h1>
              <input
                className={`border-[0.5px] rounded-lg w-20 h-12 lg:w-36 lg:h-16 p-4 outline-none text-lg lg:text-2xl font-black focus:border-[#844dff] ${
                  inputError[label.toLowerCase()]
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
                placeholder={
                  label === "Day" ? "DD" : label === "Month" ? "MM" : "YYYY"
                }
                value={label === "Day" ? day : label === "Month" ? month : year}
                onChange={(e) =>
                  label === "Day"
                    ? setDay(e.target.value)
                    : label === "Month"
                    ? setMonth(e.target.value)
                    : setYear(e.target.value)
                }
              />
            </div>
          ))}
          <div className="col-span-6 lg:col-span-1 lg:pb-5 pb-1 place-content-center">
            {error && (
              <div className="text-red-500 text-sm font-light lg:mt-7 mt-0">
                {error}
              </div>
            )}
          </div>
          <hr className="lg:col-span-4 lg:row-start-2 lg:col-start-1 mt-8 col-start-1 row-start-2 col-span-6 place-content-center" />
          <div className="lg:col-start-4 lg:row-start-2 col-start-3 row-start-2 col-span-2">
            <button
              type="submit"
              className="text-4xl text-white rounded-full bg-[#844dff] p-4 cursor-pointer hover:bg-black duration-300 active:scale-95 scale-90 lg:scale-100"
            >
              <img
                src="./src/assets/images/icon-arrow.svg"
                alt="ARROW"
                className="scale-75"
              />
            </button>
          </div>
        </form>
        <div className="flex flex-col items-start text-left w-full gap-4 px-4 italic font-poppins">
          <h1 className="lg:text-7xl text-4xl font-black text-black">
            <span className="lg:text-7xl text-5xl text-[#844dff] tracking-[0.3rem]">
              {age.years}
            </span>{" "}
            years
          </h1>
          <h1 className="lg:text-7xl text-4xl font-black text-black">
            <span className="lg:text-7xl text-5xl text-[#844dff] tracking-[0.3rem]">
              {age.months}
            </span>{" "}
            months
          </h1>
          <h1 className="lg:text-7xl text-4xl font-black text-black">
            <span className="lg:text-7xl text-5xl text-[#844dff] tracking-[0.3rem]">
              {age.days}
            </span>{" "}
            days
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
