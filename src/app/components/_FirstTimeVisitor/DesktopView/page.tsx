export default function DesktopFirstTimeVisitorView() {
  return (
    // <div
    //   className="absolute inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center text-white"
    //   style={{
    //     backgroundImage: "url('/background.png')", // Replace with your image path
    //   }}
    // >
    //   <h1 className="text-6xl font-bold">Flight Planner</h1>
    // </div>
    <div className="text-white flex justify-center items-center h-[100vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center text-white"
        style={{
          backgroundImage: "url('/background.png')", // Replace with your image path
        }}
      >
        <h1 className="text-6xl font-bold">Flight Planner</h1>
      </div>
    </div>
  );
}

// MobileFirstTimeVisitor
