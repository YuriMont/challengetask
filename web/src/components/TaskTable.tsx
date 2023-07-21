import { Pagination, PaginationProps, Stack, styled } from "@mui/material";
import { Task } from "./Task";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useParams } from "react-router-dom";
import { StyledComponent } from "@emotion/styled";

type Task = {
  id: string;
  title: string;
  description: string;
}[];

const PaginationStyled: StyledComponent<PaginationProps> = styled(
  (props: PaginationProps) => <Pagination {...props} />
)(() => ({
  "& .MuiPaginationItem-page": {
    color: "white",
    borderColor: "white",
  },
  "& .MuiPaginationItem-icon": {
    color: "white",
  },
  "& .MuiPaginationItem-text": {
    color: "white",
  },
}));

export function TaskTable() {
  const { page } = useParams<{ page: string }>();
  const [tasks, setTasks] = useState<Task>([]);

  function viewPage(numberPage: number) {
    const pages = [];
    for (let i = 0; i < tasks.length; i += 12) {
      pages.push(tasks.slice(i, i + 12));
    }
    return pages[numberPage];
  }

  useEffect(() => {
    api.get("/").then((response) => {
      setTasks(response.data);
    });
  }, [tasks]);

  return (
    <div
      className={`flex flex-col min-h-[80vh] relative items-center ${
        tasks.length === 0 ? "justify-center" : "justify-start"
      }`}
    >
      {tasks.length / 12 > 1 && (
        <PaginationStyled
          className="absolute top-4 right-auto left-auto"
          count={tasks.length / 12}
          color="secondary"
          shape="rounded"
        />
      )}
      {tasks.length === 0 ? (
        <span className="text-center">
          Nenhuma tarefa existente, adicione sua nova missão
        </span>
      ) : (
        <Stack spacing={1} className="">
          {viewPage(page === undefined ? 0 : Number(page)).map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </Stack>
      )}
    </div>
  );
}
