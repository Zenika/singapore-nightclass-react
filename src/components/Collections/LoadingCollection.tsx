export const LoadingCollection = () => {
  return (
    <div className={`flex animate-pulse flex-col justify-start border-solid`}>
      <div className={"overflow-hidden rounded"}>
        <img src="data:," alt="" className={"aspect-square bg-gray-200"} />
      </div>
      <p className={"my-4 flex h-[18px] items-center rounded bg-gray-200"}></p>
    </div>
  );
};
