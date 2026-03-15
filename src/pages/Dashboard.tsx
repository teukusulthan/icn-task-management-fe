import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyTasks, Task } from "@/services/task.service";
import { logout } from "@/services/auth.service";

import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import TaskDetailDialog from "@/components/tasks/TaskDetailDialog";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

import { Plus, LogOut, ListTodo } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openDetail, setOpenDetail] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

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

  const handleOpenDetail = (task: Task) => {
    if (openForm || openDetail) return;
    setDetailTask(task);
    setOpenDetail(true);
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
    <div className="min-h-screen bg-muted/40">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <ListTodo size={20} />
              <h1 className="text-xl font-semibold">ICN Task Manager</h1>
            </div>

            <p className="text-xs text-muted-foreground">
              Manage your daily tasks efficiently
            </p>
          </div>

          <div className="flex items-center gap-2">
            {email && (
              <Badge variant="secondary" className="px-2 py-0 text-[11px]">
                {email}
              </Badge>
            )}

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={14} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="py-0 px-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Your Tasks</h2>
                <p className="text-xs text-muted-foreground">
                  Track and organize your work
                </p>
              </div>

              <Button size="sm" onClick={handleCreateTask}>
                <Plus size={14} className="mr-1" />
                New Task
              </Button>
            </div>

            {loading && (
              <div className="py-6 text-center text-xs text-muted-foreground">
                Loading tasks...
              </div>
            )}

            {!loading && tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                <ListTodo size={28} className="text-muted-foreground" />

                <p className="text-xs text-muted-foreground">No tasks yet</p>

                <Button size="sm" onClick={handleCreateTask}>
                  <Plus size={14} className="mr-1" />
                  Create Task
                </Button>
              </div>
            )}

            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  refresh={fetchTasks}
                  onEdit={handleEditTask}
                  onOpenDetail={handleOpenDetail}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        refresh={fetchTasks}
        task={selectedTask}
      />

      <TaskDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        task={detailTask}
      />
    </div>
  );
}

export default Dashboard;
