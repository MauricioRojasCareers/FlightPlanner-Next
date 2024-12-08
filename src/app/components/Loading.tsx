"use client";

import Image from "next/image";

const LoadingSpinner = () => (
  <>
    <div
      style={{
        position: "relative",
        backgroundColor: "black",
        backgroundImage: "url('/background.png')", // Set your background image
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the background image
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white", // Ensures text is visible
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Image
          src="/assets/phoenix-logo.svg"
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full shadow-md hover:scale-110 active:scale-95 spinning-image"
          priority
        />
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          FlightPlanner
        </h2>
      </div>
      <div
        className="spinner"
        style={{
          border: "4px solid #f3f3f3",
          borderTop: "4px solid red",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          animation: "spin 2s linear infinite",
          marginBottom: "20px",
        }}
      ></div>
      <p
        style={{
          marginTop: "10px",
          fontSize: "1.2rem",
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
        animation: spin3d 3s linear infinite;
      }
    `}</style>
    </div>
  </>
);

export default function Loading() {
  return <LoadingSpinner />; // This is shown while CesiumWrapper is loading
}
