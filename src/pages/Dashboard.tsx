import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyTasks, Task } from "@/services/task.service";
import { logout } from "@/services/auth.service";

import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { Plus, LogOut } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [email, setEmail] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setOpenForm(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("userEmail");

      toast.success("Logged out successfully");

      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Task Manager</h1>

            <p className="text-sm text-muted-foreground">
              {email ? `Logged in as ${email}` : "Manage your daily tasks"}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleCreateTask}>
                <Plus size={16} className="mr-2" />
                New Task
              </Button>
            </div>

            {loading && (
              <p className="text-sm text-muted-foreground">Loading tasks...</p>
            )}

            {!loading && tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No tasks yet. Create your first task.
                </p>

                <Button onClick={handleCreateTask}>
                  <Plus size={16} className="mr-2" />
                  Create Task
                </Button>
              </div>
            )}

            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                refresh={fetchTasks}
                onEdit={handleEditTask}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <TaskForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        refresh={fetchTasks}
        task={selectedTask}
      />
    </div>
  );
}

export default Dashboard;
