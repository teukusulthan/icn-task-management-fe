import { useState } from "react";

import { Task, updateTask } from "@/services/task.service";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Pencil, Trash2 } from "lucide-react";

import { toast } from "sonner";

import DeleteTaskDialog from "./DeleteTaskDialog";

interface Props {
  task: Task;
  refresh: () => void;
  onEdit: (task: Task) => void;
  onOpenDetail: (task: Task) => void;
}

export default function TaskCard({
  task,
  refresh,
  onEdit,
  onOpenDetail,
}: Props) {
  const [openDelete, setOpenDelete] = useState(false);

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

  return (
    <>
      <Card
        className="transition-all hover:shadow-sm cursor-pointer"
        onClick={() => onOpenDetail(task)}
      >
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex gap-3 items-start">
            <Checkbox
              checked={task.completed}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={() => toggleComplete()}
            />

            <div className="leading-tight">
              <p
                className={`text-sm font-medium ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </p>

              {task.description && (
                <p className="text-xs text-muted-foreground truncate max-w-[420px]">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              <Pencil size={15} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDelete(true);
              }}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeleteTaskDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        taskId={task.id}
        refresh={refresh}
      />
    </>
  );
}
