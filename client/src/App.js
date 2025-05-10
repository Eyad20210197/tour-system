import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AiAssistant from "./pages/public/ChatAssistant";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <Router>
            <title>KEMET-WONDERS</title>
            <Header />
            <AppRoutes />
            <AiAssistant />
            <Footer />
        </Router>
    );
}

export default App;