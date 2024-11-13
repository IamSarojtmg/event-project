import { useState } from "react";

const AdminLogin = () => {
  // Initial email and password states
  const [email, setEmail] = useState("northcoders@gmail.com");
  const [password, setPassword] = useState("northcoders123");

  // State to control visibility of the email
  const [showEmail, setShowEmail] = useState(false);

  function handleClick() {
    // Toggle the visibility of the email
    setShowEmail(!showEmail);
  }

  return (
    <>
      <button onClick={handleClick}>Log in details</button>
      {showEmail && <div>{email}</div>} 
      {showEmail && <div>{password}</div>} 

    </>
  );
};

export default AdminLogin;
