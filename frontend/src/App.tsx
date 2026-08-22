import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import EncoderPage from "./pages/EncoderPage";
import PatternsPage from "./pages/PatternsPage";
import MeruPage from "./pages/MeruPage";
import RankPage from "./pages/RankPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/encoder" element={<EncoderPage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/meru" element={<MeruPage />} />
          <Route path="/rank" element={<RankPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;