import { headers } from "next/headers";

const BodyWrapper = async ({ children }) => {
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") ?? " https://www.google.com";
  console.log(fullUrl);
  const url = new URL(fullUrl);
  const pathname = url.pathname;
  // Tambahkan kondisi di sini
  const isAdminOrCheckoutPage =
    pathname.startsWith("/dashboard/admin") || pathname.startsWith("/checkout");

  return (
    <body
      className={`${
        isAdminOrCheckoutPage ? "pt-0 pb-0" : "pt-20 pb-20"
      } antialiased relative`}
    >
      {children}
    </body>
  );
};

export default BodyWrapper;
