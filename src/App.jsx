import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoPage from "./components/DemoPage"; 
import LabelAnalyzer from "./components/LabelAnalyzer"; 
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
