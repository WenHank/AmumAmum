import React from "react";
import Signup from "./components/Signup";
import MemberList from "./components/MemberList";

const Admin = () => {
  return (
    <div>
      <h2 className="AdminTitle">管理頁面</h2>
      <hr></hr>
      <Signup />
      <MemberList />
    </div>
  );
};

export default Admin;
