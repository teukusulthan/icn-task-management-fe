import { api } from "../api/axios";

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my-tasks");
  return res.data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  completed?: boolean;
}) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: string, task: any) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
