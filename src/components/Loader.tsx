const Loader = () => {
  return (
    <div className="text-[2rem] w-full h-full flex justify-center items-center ">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
        <p className="text-secondary dark:text-zinc-400">
          Your adventure is about to begin
        </p>
      </div>
    </div>
  );
};

export default Loader;
