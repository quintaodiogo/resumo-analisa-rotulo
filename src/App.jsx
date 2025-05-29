import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DemoPage from "./components/DemoPage"; // que é seu arquivo demo atual (ex-App.jsx)
import LabelAnalyzer from "./components/LabelAnalyzer"; // novo arquivo
import Layout from "./Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<LabelAnalyzer />} />
                    <Route path="/demo" element={<DemoPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
