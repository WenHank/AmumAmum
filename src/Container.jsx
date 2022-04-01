import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Admin from "./pages/Admin";
import A1 from "./pages/A1";
import A1_BST from './pages/A1/components/BSTdoucument'
import A2 from "./pages/A2";
import A2_Tree from "./pages/A2/components/Tree";
import A2_BST from "./pages/A2/components/BST";
import A2_AVL from "./pages/A2/components/AVL";
import A2_RBT from "./pages/A2/components/RBT";
import A2_Test from './pages/A2/components/Test'
import A3 from "./pages/A3";
import A3_BST from "./pages/A3/components/BSTInteractive";
import A3_AVL from "./pages/A3/components/AVLinteractive";
import Exam from "./pages/Exam";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { palette } from "@mui/system";

const Container = () => {
  ///////////////Login審查/////////
  const [user, setUser] = useState(null);
  ///////////////Page檢查///////////
  const [page, setPage] = useState("Login");
  useEffect(() => {
    const IsLogin = localStorage.getItem("user");
    IsLogin && JSON.parse(IsLogin) ? setUser(IsLogin) : setUser(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);
  useEffect(() => {
    setPage(window.location.pathname);
    console.log(page);
  }, [window.location.pathname]);
  ////////////////////////////////
  return (
    <Router>
      <Routes>
        {!user && (
          <Route
            path="/Login"
            element={<Login AccessToken={() => setUser(true)} />}
          />
        )}
        {user && (
          <>
            <Route path="/A1" element={<A1 />} />
            <Route path="/A1/BST" element={<A1_BST />} />
            <Route path="/A2" element={<A2 />} />
            <Route path="/A2/Tree" element={<A2_Tree />} />
            <Route path="/A2/BST" element={<A2_BST />} />
            <Route path="/A2/AVL" element={<A2_AVL />} />
            <Route path="/A2/RBT" element={<A2_RBT />} />
            <Route path="/A2/Test" element={<A2_Test />} />
            <Route path="/A3" element={<A3 />} />
            <Route path="/A3/Tree" element={<A2_Tree />} />
            <Route path="/A3/BST" element={<A3_BST />} />
            <Route path="/A3/AVL" element={<A3_AVL />} />
            <Route path="/Exam" element={<Exam />} />
            <Route path="/Admin" element={<Admin />} />
            <Route
              path="/Profile"
              element={<Profile Logout={() => setUser(false)} />}
            />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={user ? "/Profile" : "/Login"} />}
        />
      </Routes>
    </Router>
  );
};
export default Container;
