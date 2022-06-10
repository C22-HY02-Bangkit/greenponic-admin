const Alert = ({ children }) => {
  return (
    <div
      className="container bg-red-400 flex items-center justify-center  text-white text-sm font-bold px-4 py-2 relative rounded-md"
      role="alert"
    >
      <p>{children}</p>
    </div>
  );
};

export default Alert;
