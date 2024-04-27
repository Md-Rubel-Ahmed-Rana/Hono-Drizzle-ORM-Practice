import HeadTag from "@/components/shared/Head";
import RegisterForm from "@/components/shared/RegisterForm";
import React from "react";

const SignUp = () => {
  return (
    <>
      <HeadTag
        title="Sign Up"
        description="Social Platform"
        keywords="network"
      />
      <RegisterForm />
    </>
  );
};

export default SignUp;
