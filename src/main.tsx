import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Card } from "./card";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <main className="flex justify-center min-h-screen sm:pt-36 bg-stroke">
      <Card />
    </main>
  </React.StrictMode>
);
