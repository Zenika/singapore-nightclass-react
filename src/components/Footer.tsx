import { api } from "~/utils/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export function Footer() {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // TODO:#6 use `react-query`'s `useMutation` to make a POST call and get a `mutate` function to use

  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    e.preventDefault();
    console.log("[Footer] trying to subscribe to newsletter using", email);
    // TODO:#6 use your `mutate` function here
  };
  return (
    <footer
      className={"flex flex-col items-center gap-4 bg-slate-900 p-8 text-white"}
    >
      {subscribed ? (
        <p>Subscribed!</p>
      ) : (
        <>
          <p>Subscribe to our newsletter</p>
          <form className={"flex gap-4"} onSubmit={handleSubmit}>
            <input
              className="rounded py-1 ps-2 text-black"
              placeholder="john.doe@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={
                "rounded bg-purple-400 px-2 hover:bg-purple-500 active:bg-purple-600"
              }
            >
              Submit
            </button>
          </form>
        </>
      )}
      <p>© 2023 - Zenika</p>
    </footer>
  );
}
