const Loading: React.FC = () => {
  return (
    <div className="w-fit h-fit flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-white/[.1] border-t-2 border-t-teal-300 rounded-full animate-spin"></div>
      <span className="text-white">Please wait...</span>
    </div>
  );
};

export default Loading;
