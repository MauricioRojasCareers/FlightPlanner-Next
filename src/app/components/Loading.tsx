"use client";

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      height: "100vh",
    }}
  >
    <div
      className="spinner"
      style={{
        border: "4px solid #f3f3f3", // Light grey for the rest of the spinner
        borderTop: "4px solid red", // Red top border for the spinner
        borderRadius: "50%",
        width: "100px", // Increased size
        height: "100px",
        animation: "spin 2s linear infinite",
      }}
    ></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function Loading() {
  return <LoadingSpinner />; // This is shown while CesiumWrapper is loading
}
