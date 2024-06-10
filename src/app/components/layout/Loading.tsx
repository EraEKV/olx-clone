export const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-bounce delay-450 rounded-full bg-rose-500" />
        <div className="h-4 w-4 animate-bounce delay-150 rounded-full bg-emerald-500" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-cyan-500" />
      </div>
    </div>
  );
};