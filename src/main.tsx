import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const MONTH_MS = 1000 * 60 * 60 * 24 * 30;
const currentDate = Date.now();
// use US locale
const formatNumber = new Intl.NumberFormat("en-US", { style: "decimal" });

const Header = () => {
  return (
    <header>
      <nav className="h-20 px-10 flex w-full items-center bg-white">
        <img alt="logo" width="147" height="32" src="/logo.svg"></img>
      </nav>
    </header>
  );
};

const Card = () => {
  const [money, setMoney] = useState("25");
  const [date, setDate] = useState<number>(currentDate); // we start with current date

  const handleDateForward = () => {
    setDate(date + MONTH_MS);
  };

  const handleDateBack = () => {
    const attemptedDate = date - MONTH_MS;

    if (attemptedDate < currentDate) return;

    setDate(attemptedDate);
  };

  const dateParsed = new Date(date);
  const month = dateParsed.toLocaleString("default", { month: "long" });
  const year = dateParsed.getFullYear();

  const moneyParsed = Number(money);
  const total =
    Math.floor((date - currentDate) / MONTH_MS) *
    (isNaN(moneyParsed) ? 0 : moneyParsed);

  return (
    <div className="w-[600px] rounded-[5px] overflow-hidden shadow-level4 bg-white text-midnight h-fit">
      <header className="bg-salmon px-10 py-6 gap-5 flex items-center h-32">
        <img width="72" height="72" src="/giving-block.svg" alt="block" />
        <div>
          <h1 className="card__header-font">The giving block</h1>
          <span className="text-purpleGrey">Set up your donation goal!</span>
        </div>
      </header>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-10 py-8 flex flex-col gap-8 card__body"
      >
        <div className="flex gap-6">
          <div className="flex flex-col gap-1.5 relative">
            <label className="el-label" htmlFor="donation">
              I can donate
            </label>
            {/* unfortunately, :after won't work and we need to use img */}
            <img
              className="w-4 h-4 left-4 top-12 absolute"
              alt="$"
              src="/dollar.svg"
            />
            <input
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              type="number"
              className="!pl-[40px]"
              name="donation"
              placeholder="25"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="el-label">Every month until</span>
            <div className="date-input flex">
              <img
                onClick={handleDateBack}
                role="button"
                src="/chevron_left.svg"
                alt="prev-month"
              />
              <div className="w-[144px] flex flex-col justify-center items-center date-picker">
                <span>{month}</span>
                <span>{year}</span>
              </div>
              <img
                onClick={handleDateForward}
                className="rotate-180"
                role="button"
                src="/chevron_left.svg"
                alt="prev-month"
              />
            </div>
          </div>
        </div>
        <div className="flex px-4 justify-between">
          <span className="total-amount">Total amount</span>
          <span className="sum">${formatNumber.format(total)}</span>
        </div>
        <div className="flex px-4 py-6 !items-center summary bg-stroke">
          <span>You will be sending&nbsp;</span>
          <span className="font-semibold">{money.concat("$")}</span>
          <span>&nbsp;every month, until&nbsp;</span>
          <span className="font-semibold">{`${month} ${year}.`}</span>
          <span>&nbsp;Thank you!</span>
        </div>
        <div className="flex gap-6">
          <button className="text-center cancel-btn">Cancel</button>
          <button
            className="text-center bg-midnight text-white continue-btn"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <main className="flex justify-center min-h-screen pt-16 bg-stroke">
      <Card />
    </main>
  </React.StrictMode>
);
