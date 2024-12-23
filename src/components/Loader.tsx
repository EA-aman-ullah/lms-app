const Loader = () => {
  return (
    <div>
      <button
        type="button"
        className="bg-indigo-500 flex items-center m-auto mt-10 p-3 rounded-lg text-white"
        disabled
      >
        <svg
          className="animate-spin h-5 w-5 mr-3  border-4 border-[#e1e1e1] border-t-[#fff] rounded-full"
          viewBox="0 0 24 24"
        ></svg>
        Loading...
      </button>
    </div>
  );
};

export default Loader;
