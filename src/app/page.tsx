import CesiumWrapper from "./components/CesiumWrapper";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* <Navbar /> */}
      <CesiumWrapper />
      {/* <footer className="font-extralight text-xs p-4 absolute bottom-0 flex w-full  justify-center items-center text-white md:hidden">
        © Phoenix Lidar Systems
      </footer> */}
    </main>
  );
}
