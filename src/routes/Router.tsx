import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

interface IrouterProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

function Router({ toggleDarkMode, isDarkMode }: IrouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/:coinId/" element={<Coin />}>
          <Route path={`price`} element={<Price />} />
          <Route path={`chart`} element={<Chart isDarkMode={isDarkMode} />} />
        </Route>
        <Route path="/" element={<Coins toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
