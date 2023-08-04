import { ReactNode } from "react";
import { HeaderBooks } from "../organisms/HeaderBooks";

const BooksTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="contanier">
      <HeaderBooks
        links={[
          { link: "/wishlist", label: "Wishlist" },
        ]}
      />
      {children}
    </div>
  );
};

export default BooksTemplate;
