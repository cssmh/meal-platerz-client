const SmallLoader = () => {
  const loadingSpinnerContainer = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loadingSpinner = {
    width: "75px",
    height: "75px",
    border: "8px solid",
    borderColor: "#00cc66 transparent #00cc66 transparent",
    borderRadius: "50%",
    animation: "spin 1.2s linear infinite",
  };

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center">
      <div style={loadingSpinnerContainer}>
        <div className="animate-spin" style={loadingSpinner}></div>
      </div>
    </div>
  );
};

export default SmallLoader;
