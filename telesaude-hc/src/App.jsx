import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WatsonChat from "./components/WatsonChat";
import "./styles/global.css";

const App = () => (
  <div className="app-root">
    <a href="#main-content" className="skip-link">
      Pular para o conteúdo principal
    </a>
    <Header />
    <Outlet />
    <Footer />
    <WatsonChat />
  </div>
);

export default App;
