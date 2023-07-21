import { Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../lib/axios";
import { useParams } from "react-router-dom";

type TaskType = () => void;

interface TaskParam {
  handleClose: TaskType;
}

export function TaskForm({ handleClose }: TaskParam) {
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/${id}`).then((response) => {
      setTitle(response.data.title);
      setDescription(response.data.description);
    });
  }, [id]);

  const [isCreated, setIsCreated] = useState(true);

  async function updateTask() {
    await api
      .put(`/${id}`, {
        title,
        description,
      })
      .catch((error) => {
        toast.error(error.data.message, {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  }

  async function createTask() {
    await api
      .post("/", {
        title,
        description,
      })
      .then(() => {
        setTitle("");
        setDescription("");
        handleClose();
      })
      .catch(() => {
        toast.error("Informe todos os campos", {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  }

  function changeTask(event: FormEvent) {
    event.preventDefault();
    setIsCreated(false);

    if (id) {
      updateTask();
    } else {
      createTask();
    }

    setIsCreated(true);
  }

  return (
    <>
      <form className="min-w-[30vw]" onSubmit={changeTask}>
        <Typography variant="h4" fontWeight={600} marginBottom={2}>
          Sua tarefa
        </Typography>
        <Typography variant="subtitle1">Titulo da tarefa</Typography>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          className="mb-4 px-3 py-2 w-full bg-zinc-700 rounded-md text-zinc-300"
          placeholder="Ex: Reunião, Compras...."
        />
        <Typography variant="subtitle1">Descrição da tarefa</Typography>
        <textarea
          value={description}
          name="content"
          spellCheck={false}
          onChange={(event) => setDescription(event.target.value)}
          cols={8}
          rows={6}
          className="mb-4 w-full h-auto flex-1 px-3 py-2 resize-none rounded border-0 bg-zinc-700 leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Adicione informações sobre essa tarefa"
        />
        <Button
          size="large"
          color="secondary"
          variant="contained"
          type="submit"
          startIcon={isCreated ? <CheckIcon /> : null}
        >
          {isCreated ? "Salvar" : "Salvando..."}
        </Button>
      </form>
      <ToastContainer position="bottom-left" />
    </>
  );
}
