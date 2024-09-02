import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";

/*The component accepts a prop called children, which is typed as ReactNode. This means that children can be any valid React content.*/

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
