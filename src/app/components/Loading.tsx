"use client";

import Image from "next/image";

const LoadingSpinner = () => (
  <>
    <div
      style={{
        position: "relative", // Enable absolute positioning for the title
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center", // Center spinner horizontally
        alignItems: "center", // Center spinner vertically
        flexDirection: "column", // Stack items vertically
      }}
    >
      <div
        style={{
          position: "absolute", // Position the title and image independently
          top: "10%", // Position the row higher up
          display: "flex", // Arrange title and image in a row
          alignItems: "center", // Center them vertically
          gap: "10px", // Add spacing between the image and the title
        }}
      >
        <Image
          src="/assets/phoenix-logo.svg" // Path to your image in the public/assets folder
          alt="User Avatar"
          width={50} // Adjust the dimensions as needed
          height={50}
          className="rounded-full shadow-md hover:scale-110 active:scale-95 spinning-image"
          priority
        />
        <h2
          className="text-white"
          style={{
            fontSize: "2rem", // Increase font size for prominence
            fontWeight: "bold", // Make it bold
          }}
        >
          FlightPlanner
        </h2>
      </div>
      <div
        className="spinner"
        style={{
          border: "4px solid #f3f3f3", // Light grey for the rest of the spinner
          borderTop: "4px solid red", // Red top border for the spinner
          borderRadius: "50%",
          width: "100px", // Increased size
          height: "100px",
          animation: "spin 2s linear infinite",
          marginBottom: "20px", // Add spacing below spinner
        }}
      ></div>
      <p
        className="text-white"
        style={{
          marginTop: "10px", // Add spacing between spinner and text
          fontSize: "1.2rem", // Adjust font size
        }}
      >
        Loading...
      </p>
      <style>{`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spin3d {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    .spinning-image {
      animation: spin3d 3s linear infinite; // 3D spin animation
    }
  `}</style>
    </div>
  </>
);

export default function Loading() {
  return <LoadingSpinner />; // This is shown while CesiumWrapper is loading
}
