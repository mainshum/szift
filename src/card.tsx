import { useState } from "react";
import "./index.css";
import tw from "tailwind-styled-components";

const LOCALE = "en-US";
const MONTH_MS = 1000 * 60 * 60 * 24 * 30;
const currentDate = Date.now();
// use US locale
export const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "USD",
});

const Input = tw.input`
  p-[16px]
  w-full
  h-[60px] 
  rubik-24
  rounded
  border
  border-grey
`;

const Button = tw(Input)`
  text-center 
  !sans-16
`;

const Arrow = tw.img`
  absolute
  active:bg-[rgba(232,234,242,1)]
  top-5
  hover:bg-[rgba(243,245,254,1)]
`;

export const Card = () => {
  const [money, setMoney] = useState("");
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
  const month = dateParsed.toLocaleString(LOCALE, { month: "long" });
  const year = dateParsed.getFullYear();

  const moneyParsed = !isNaN(Number(money)) ? Number(money) : 0;
  const total = Math.floor((date - currentDate) / MONTH_MS) * moneyParsed;

  return (
    <div className="w-full sm:w-[600px] rounded-[5px] shadow-level4 bg-white text-midnight h-screen sm:h-fit">
      <header className="bg-salmon px-10 py-6 gap-5 flex flex-col sm:flex-row items-center">
        <img
          className="relative bottom-1"
          width="72"
          height="72"
          src="/giving-block.svg"
          alt="block"
        />
        <div>
          <h1 className="sans-32">The giving block</h1>
          <span className="inter-16 text-purpleGrey">
            Set up your donation goal!
          </span>
        </div>
      </header>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-10 py-8 gap-8 grid sm:grid-cols-2"
      >
        {/* col 1 */}
        <div className="flex flex-col gap-2 relative before:content-dollar before:absolute before:top-[43px] before:left-[10px]">
          <label className="sans-14" htmlFor="donation">
            I can donate
          </label>
          <Input
            data-testid="donation"
            className="pl-[40px] focus:border-[rgba(66,60,102,1)] outline-none"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            type="number"
            name="donation"
            placeholder="0.00"
          />
        </div>
        {/* col 2 */}
        <div className="flex flex-col gap-2">
          <span className="sans-14">Every month until</span>
          <div className="relative flex h-[60px] justify-between">
            <Arrow
              data-testid="prev-month"
              className="top-5 left-2"
              onClick={handleDateBack}
              role="button"
              src="/chevron_left.svg"
              alt="prev-month"
            />
            <Input
              $as="div"
              data-testid="date"
              className="flex flex-col justify-center items-center"
            >
              <span className="rubik-16">{month}</span>
              <span className="sans-12">{year}</span>
            </Input>
            <Arrow
              data-testid="next-month"
              className="rotate-180 top-5 right-2"
              onClick={handleDateForward}
              role="button"
              src="/chevron_left.svg"
              alt="next-month"
            />
          </div>
        </div>
        <section className="flex flex-col col-span-full border gap-4 sm:gap-8 sm:border-none">
          <div className="flex px-6 pt-4 justify-between items-center">
            <span className="sans-20">Total amount</span>
            <span data-testid="total" className="inter-32">
              {currencyFormatter.format(total)}
            </span>
          </div>
          <div
            data-testid="summary"
            className="px-4 py-6 bg-stroke text-center sm:text-justify inter-12"
          >
            <span>You will be sending&nbsp;</span>
            <span className="font-semibold">
              {currencyFormatter.format(moneyParsed)}
            </span>
            <span>&nbsp;every month, until&nbsp;</span>
            <span className="font-semibold">{`${month} ${year}.`}</span>
            <span>&nbsp;Thank you!</span>
          </div>
        </section>
        <Button
          $as="button"
          className="hidden active:bg-[rgba(178,167,244,0.25)] hover:bg-[rgba(178,167,244,0.1)] sm:inline border-midnight"
        >
          Cancel
        </Button>
        <Button
          $as="button"
          className=" bg-midnight hover:bg-[rgba(100,93,147,1)] active:bg-[rgba(36,30,71,1)] text-white"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};
