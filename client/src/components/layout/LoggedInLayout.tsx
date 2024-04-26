import React, { ReactNode } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

type Props = {
  children: ReactNode;
};

const LoggedInLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
