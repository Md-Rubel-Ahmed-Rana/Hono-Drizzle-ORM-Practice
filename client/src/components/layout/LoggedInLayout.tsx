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
      <section>{children}</section>
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
