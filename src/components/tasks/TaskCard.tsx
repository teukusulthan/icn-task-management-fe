import { Task, updateTask, deleteTask } from "@/services/task.service";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  task: Task;
  refresh: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, refresh, onEdit }: Props) {
  const toggleComplete = async () => {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });

      toast.success("Task updated");
      refresh();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);

      toast.success("Task deleted");
      refresh();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex items-start justify-between p-4">
        <div className="flex gap-3 items-start">
          <Checkbox checked={task.completed} onCheckedChange={toggleComplete} />

          <div>
            <p
              className={`font-medium ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
            <Pencil size={16} />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
