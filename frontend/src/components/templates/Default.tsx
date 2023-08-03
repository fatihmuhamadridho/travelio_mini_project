import { ReactNode } from "react";

const Default = ({ children }: { children: ReactNode }) => {
  return <div className="contanier">{children}</div>;
};

export default Default;
