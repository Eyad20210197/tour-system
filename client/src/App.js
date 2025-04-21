import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <Router>
            <title>KEMET-WONDERS</title>
            <Header />
            <AppRoutes />
            <Footer />
        </Router>
    );
}

export default App;