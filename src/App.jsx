import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { AddEditPost } from "./pages/AddEditPost";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { PwReset } from "./pages/PwReset";
import { Navbar } from "./components/Navbar";
import { CategProvider } from "./context/CategContext";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <BrowserRouter>
      <CategProvider>
        <UserProvider>
          <ConfirmProvider>
            <div className="app">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/update/:id" element={<AddEditPost />} />
                <Route path="/create" element={<AddEditPost />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/pwreset" element={<PwReset />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ConfirmProvider>
        </UserProvider>
      </CategProvider>
    </BrowserRouter>
  );
}

export default App;
