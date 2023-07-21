import { Button, Modal, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    navigate("/create");
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="min-w-[50vw] mx-auto flex flex-col sm:flex-row items-center sm:gap-12 gap-2 justify-between">
      <Typography variant="h2" fontWeight={600}>
        Tarefas
      </Typography>
      <Button
        onClick={handleOpen}
        size="large"
        color="secondary"
        variant="contained"
        startIcon={<AddOutlinedIcon />}
      >
        Criar tarefa
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-screen min-h-screen flex flex-col items-center justify-center"
      >
        <div className="w-auto p-8 bg-zinc-900 rounded-md relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-3 flex items-center justify-end rounded-full p-2 hover:bg-zinc-800"
          >
            <Close />
          </button>
          <TaskForm handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}
