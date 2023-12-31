import { ReactNode } from "react";
import { HeaderResponsive } from "../organisms/Header";

const Default = ({ children }: { children: ReactNode }) => {
  return (
    <div className="contanier">
      <HeaderResponsive
        links={[
          { link: "/wishlist", label: "Wishlist" },
        ]}
      />
      {children}
    </div>
  );
};

export default Default;
