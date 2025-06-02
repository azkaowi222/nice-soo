import TopNavbar from "../navbar/top-nav/TopNav";
import Navbar from "../navbar/Navbar";
import { headers } from "next/headers";

const LayoutWrapper = async ({ children }) => {
  // const pathname = usePathname();
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") ?? " https://www.google.com";
  const url = new URL(fullUrl);
  const pathname = url.pathname;
  const hideNavbarRoutes = ["/dashboard", "/admin", "/checkout"];
  const showNavbar = !hideNavbarRoutes.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {showNavbar && (
        <>
          <TopNavbar />
          <Navbar />
        </>
      )}
      {children}
    </>
  );
};

export default LayoutWrapper;
