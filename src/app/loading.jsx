const Loading = () => {
  return (
    <div
      aria-label="Loading..."
      className="flex justify-center items-center bg-secondary fixed top-0 left-0 z-50 w-screen h-screen"
      role="status"
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
