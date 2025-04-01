const Navbox = ({ children }) => {
  return (
    <header className="box-shadow w-full md:h-20 lg:h-20 h-14 bg-white fixed bottom-0 md:top-0 lg:top-0 z-50">
      <nav className="flex md:justify-between justify-center items-center h-full md:px-10">
        {children}
      </nav>
    </header>
  );
};

export default Navbox;


