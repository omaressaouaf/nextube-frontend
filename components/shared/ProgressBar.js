const ProgressBar = ({ percentage }) => {
  return (
    <div className="shadow w-full bg-grey-light my-5">
      <div className="bg-green-500 text-xs leading-none py-1 text-center text-white animate-pulse transition-all ease-out duration-1000" style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
