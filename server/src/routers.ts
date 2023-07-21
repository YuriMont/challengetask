import { Router } from "express";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./lib/firebase";
import { z } from "zod";

const routers = Router();

routers.get("/", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  
  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description
  }));

  return res.status(200).json(tasks);
});

routers.get("/:id", async (req, res) => {
    try {
      const loginUserParams = z.object({
        id: z.string(),
      });
  
      const { id } = loginUserParams.parse(req.params);
  
      const task = await getDoc(doc(collection(db, "tasks"), id));

      return res.status(200).json(task.data())

    } catch (error) {
      return res.status(400).json({ error });
    }
  });

routers.post("/", async (req, res) => {
  try {
    const createTaskParams = z.object({
      title: z.string(),
      description: z.string(),
    });

    const { title, description } = createTaskParams.parse(req.body);

    await addDoc(collection(db, "tasks"), {
      title,
      description,
    });

    return res.status(200).json({ message: "Tarefa adicionada com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

routers.put("/:id", async (req, res) => {
  try {
    const loginUserParams = z.object({
      id: z.string(),
    });

    const { id } = loginUserParams.parse(req.params);

    const updateTaskParams = z.object({
      title: z.string(),
      description: z.string(),
    });

    const { title, description } = updateTaskParams.parse(req.body);

    await setDoc(doc(collection(db, "tasks"), id), {
      title,
      description,
    });

    return res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

routers.delete("/:id", async (req, res) => {
  try {
    const loginUserParams = z.object({
      id: z.string(),
    });

    const { id } = loginUserParams.parse(req.params);

    await deleteDoc(doc(db, "tasks", id));

    return res.status(200).json({ message: "Tarefa excluida com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default routers;
