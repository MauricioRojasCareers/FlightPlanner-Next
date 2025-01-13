import Image from "next/image";

export default function MobileFirstTimeVisitorView() {
  return (
    <div
      className="flex justify-center items-center text-center text-white p-4 bg-cover bg-center bg-no-repeat h-screen w-screen"
      style={{
        backgroundImage: "url('/background.png')", // Replace with your image path
      }}
    >
      <div className="w-full max-w-md p-4">
        <h1 className="text-3xl mb-4">FlightPlanner Mobile</h1>
        <div className="flex justify-center">
          <Image
            src="/assets/phoenix-logo.svg" // Path to your image in the public/assets folder
            alt="User Avatar"
            width={100} // Adjust the dimensions as needed
            height={100}
            className="rounded-full"
            priority
          />
        </div>
      </div>
    </div>
    // Working template being used for Desktop first time view
    // <div className="text-white flex justify-center items-center h-[100vh] w-full">
    //   <div
    //     className="absolute inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center text-white"
    //     style={{
    //       backgroundImage: "url('/background.png')", // Replace with your image path
    //     }}
    //   >
    //     <h1 className="text-6xl font-bold text-center">Flight Planner</h1>
    //   </div>
    // </div>
  );
}
