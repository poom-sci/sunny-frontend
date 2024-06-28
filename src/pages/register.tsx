import React from "react";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      {/* Add your login form here */}
      <button onClick={handleGoBack}>Go back to login</button>
    </div>
  );
};

export default RegisterPage;
