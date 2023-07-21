import { Header } from "../components/Header";
import { TaskTable } from "../components/TaskTable";

export function Home() {
  return (
    <div className="w-screen sm:py-8 flex justify-center items-center">
      <div className="sm:px-16 sm:w-auto w-screen px-8 min-h-screen py-8 flex flex-col gap-3 rounded-md bg-zinc-950">
        <Header />
        <TaskTable />
      </div>
    </div>
  );
}
