import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/authen/signin"; // Import ไฟล์ signin.ts
import Home from "./components/home/home";// ตัวอย่างหน้า Home
import SignUp from "./components/authen/signup";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
