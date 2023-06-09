export default function Confirmation() {
  return (
    <div className={"flex-1 bg-gray-100 p-4 md:p-10"}>
      <h1 className={"my-8 text-5xl font-bold"}>Your order is confirmed</h1>
      <div className={"flex justify-center"}>
        <img
          className={"max-w-xl"}
          src="/undraw_order_confirmed.svg"
          alt="an cart with confirmation icon"
        />
      </div>
    </div>
  );
}
