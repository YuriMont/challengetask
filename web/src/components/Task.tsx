import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Close } from "@mui/icons-material";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  borderRadius: "8px",
  backgroundColor: "#18181B",
  color: "white",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        style={{ color: "white" }}
        sx={{ fontSize: "0.9rem" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#18181B",
  color: "white",
  borderRadius: "8px",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid #909090",
}));

interface TaskProps {
  id: string;
  title: string;
  description: string;
}

export function Task(props: TaskProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    navigate(`/edit/${props.id}`);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  async function handleDeleteTask() {
    await api.delete(`/${props.id}`);
  }

  return (
    <div className="sm:w-[600px]">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="flex items-center justify-between w-full">
            <Typography>{props.title}</Typography>
            <span className="flex items-center gap-1">
              <button
                onClick={handleDeleteTask}
                className="p-2 rounded-full hover:bg-zinc-800"
              >
                <Delete />
              </button>
              <button
                onClick={handleOpen}
                className="p-2 rounded-full hover:bg-zinc-800"
              >
                <Edit />
              </button>
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.description}</Typography>
        </AccordionDetails>
      </Accordion>

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
