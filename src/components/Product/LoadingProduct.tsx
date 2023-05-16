export const LoadingProduct = () => {
  return (
    <div
      className={
        "flex animate-pulse flex-col justify-start gap-[5px] border-solid"
      }
    >
      <div className={"overflow-hidden rounded"}>
        <img src="data:," alt="" className={"aspect-square bg-gray-200"} />
      </div>
      <span className={"mt-4 h-[18px] bg-gray-200"}></span>
      <span className={"mb-4 mt-2 h-[16px] bg-gray-200"}></span>
    </div>
  );
};
