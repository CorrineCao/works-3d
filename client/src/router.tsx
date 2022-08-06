import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThreePage from "pages/threePage";
import BabylonPage from "pages/babylonPage";
import NotFoundPage from "pages/notFound";

declare global {
  interface Window {
    setInterval: (callback: () => void, time: number) => number;
    token: string;
  }
}

const AppRouter = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/threeDemo" />} />
        <Route path="/threeDemo" element={<ThreePage />} />
        <Route path="/babylonDemo" element={<BabylonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
