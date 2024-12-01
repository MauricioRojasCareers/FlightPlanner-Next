import styles from "./page.module.css";
import MainPage from "./main/page";

export default function Home() {
  return (
    <main>
      <MainPage />
      <div className="z-10 p-4 absolute top-0 font-extralight text-white text-xs md:text-xl sm:flex items-center justify-center md:block hidden">
        Phoenix Lidar Systems
      </div>
    </main>
  );
}
