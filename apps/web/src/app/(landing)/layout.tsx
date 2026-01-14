import React from "react";

import { LandingLayout } from "@/components/landing/landing-layout";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
