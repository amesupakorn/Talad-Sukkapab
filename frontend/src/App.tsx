import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./client/page/signin"; // Import ไฟล์ signin.ts
import Home from "./client/page/home";// ตัวอย่างหน้า Home
import SignUp from "./client/page/signup";
import ConfirmEmail from "./client/components/authen/confirmEmail";
import Product from "./client/page/product";

import CategoryManage from "./admin/page/categoryManage";

const App = () => {
  return (
    <Router>
      <Routes>
      {/* client */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />

        <Route path="/product" element={<Product />}/>


      {/* admin */}
        <Route path="admin/category" element={<CategoryManage/>}/>


        
        {/* <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
