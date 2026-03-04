import { Routes, Route } from "react-router-dom";
import Sprachbausteine from "./Sprachbausteine";
import NomenVerb from "./NomenVerb";
import Home from "./Home";
import { exercises } from "./NomenVerbData";

export default function App() {
  return (
    <Routes>
      <Route path="preposition-trainer/" element={<Home/>} />
      <Route path="/sprachbausteine" element={<Sprachbausteine />} />
      <Route path="/nomen-verb" element={<NomenVerb exercises={exercises} />} />
    </Routes>
  );
}