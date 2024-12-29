const TempDesktopToolbar = ({}) => {
  return (
    <>
      <div className="bg-transparent font-bold text-white h-[100vh] relative">
        {/* <!-- Top Left Navbar --> */}
        <div className="absolute top-0 left-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>

        {/* <!-- Top Right Navbar --> */}
        <div className="absolute top-0 right-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>

        {/* <!-- Bottom Left Navbar --> */}
        <div className="absolute bottom-0 left-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>

        {/* <!-- Bottom Right Navbar --> */}
        <div className="absolute bottom-0 right-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>
      </div>
    </>
  );
};

export default TempDesktopToolbar;
