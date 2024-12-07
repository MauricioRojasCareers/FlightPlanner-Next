import Image from "next/image";

export default function MobileFirstTimeVisitorView() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex text-center justify-center items-center text-white p-4">
      <div className="w-full h-[75%] p-4">
        <h1 className="text-3xl ">FlightPlanner Mobile</h1>
        <div className="flex justify-center p-4">
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
  );
}
