import HeadTag from "@/components/shared/Head";
import LoginForm from "@/components/shared/LoginForm";
import React from "react";

const SignIn = () => {
  return (
    <>
      <HeadTag
        title="Sign In"
        description="Social Platform"
        keywords="network"
      />
      <LoginForm />
    </>
  );
};

export default SignIn;
