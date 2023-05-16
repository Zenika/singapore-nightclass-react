export const Error = () => {
  return (
    <>
      <h2 className={"mb-4 text-2xl font-bold"}>
        Looks like there&apos;s something wrong on our end.
      </h2>
      <p className={"mb-8"}>Please try again later.</p>
      <div className={"flex justify-center"}>
        <img
          className={"max-w-xl"}
          src="/undraw_error.svg"
          alt="An error occured"
        />
      </div>
    </>
  );
};
