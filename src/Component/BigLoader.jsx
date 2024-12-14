// import { ThreeCircles } from "react-loader-spinner";
const BigLoader = () => {
  const loadingSpinnerContainer = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 5000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loadingSpinner = {
    width: "90px",
    height: "90px",
    border: "8px solid",
    borderColor: "#00cc66 transparent #00cc66 transparent",
    borderRadius: "50%",
    animation: "spin 1.4s linear infinite",
  };
  return (
    // <div className="w-full min-h-[95vh] flex justify-center items-center">
    //   <ThreeCircles
    //     height="130"
    //     width="130"
    //     color="#4fa94d"
    //     visible={true}
    //     ariaLabel="three-circles-rotating"
    //     outerCircleColor="#3498db"
    //     innerCircleColor="#e67e22"
    //     middleCircleColor="#e74c3c"
    //   />
    // </div>
    <div className="w-full min-h-[95vh] flex justify-center items-center">
      <div style={loadingSpinnerContainer}>
        <div className="animate-spin" style={loadingSpinner}></div>
      </div>
    </div>
  );
};

export default BigLoader;
