import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/authen/signin"; // Import ไฟล์ signin.ts
import Home from "./components/home/home";// ตัวอย่างหน้า Home
import SignUp from "./components/authen/signup";
import ConfirmEmail from "./components/authen/confirmEmail";
import Product from "./components/shop/product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />

        <Route path="/product" element={<Product />}/>

        {/* <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
