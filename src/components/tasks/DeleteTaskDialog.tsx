import { deleteTask } from "@/services/task.service";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { TriangleAlert } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: string;
  refresh: () => void;
}

function DeleteTaskDialog({ open, onClose, taskId, refresh }: Props) {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      refresh();
      onClose();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md p-6">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
              <TriangleAlert size={18} />
            </div>

            <AlertDialogTitle className="text-lg">Delete Task</AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="pt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTaskDialog;
