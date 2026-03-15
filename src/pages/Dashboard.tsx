import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyTasks, Task } from "@/services/task.service";

import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { Plus, LogOut } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
  }, []);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setOpenForm(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Task Manager</CardTitle>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCreateTask}>
                <Plus size={16} className="mr-1" />
                New Task
              </Button>

              <Button size="sm" variant="ghost" onClick={handleLogout}>
                <LogOut size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {loading && (
              <p className="text-sm text-muted-foreground">Loading tasks...</p>
            )}

            {!loading && tasks.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No tasks yet. Create your first task.
              </p>
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
