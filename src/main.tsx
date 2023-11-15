import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Header = () => {
  return (
    <header>
      <nav className="h-20 px-10 flex w-full items-center bg-white absolute">
        <img alt="logo" width="147" height="32" src="/logo.svg"></img>
      </nav>
    </header>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-screen bg-stroke">
        Aplikacja
      </main>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
