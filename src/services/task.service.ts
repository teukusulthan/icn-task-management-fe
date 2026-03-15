import { api } from "../api/axios";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my-tasks");
  return res.data.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/tasks", data);
  return res.data.data;
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    completed?: boolean;
  },
) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
