import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DemoPage from "./components/DemoPage";
import LabelAnalyzer from "./components/LabelAnalyzer";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LabelAnalyzer />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
