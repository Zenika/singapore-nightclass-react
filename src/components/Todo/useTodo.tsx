import { useQuery } from "@tanstack/react-query";

// This is just an example to show how reusable a data fetching call can be using react-query
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export function useTodo() {
  return useQuery(
    [`todos`],
    async (): Promise<Todo> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      return (await response.json()) as Todo;
    },
    { staleTime: 10000 }
  );
}
