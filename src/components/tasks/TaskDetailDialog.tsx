import { Task } from "@/services/task.service";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

function TaskDetailDialog({ open, onClose, task }: Props) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-tight">
              {task.title}
            </h2>

            <p className="text-xs text-muted-foreground">Task details</p>
          </div>

          <Badge variant={task.completed ? "default" : "secondary"}>
            {task.completed ? "Completed" : "Active"}
          </Badge>
        </div>

        {task.description && (
          <div className="mt-6 rounded-md border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground mb-2">Description</p>

            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">Created</p>

          <p className="text-sm">{new Date(task.createdAt).toLocaleString()}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailDialog;
