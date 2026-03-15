import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { taskSchema, type TaskFormData } from "@/validators/task.schema";

import { createTask, updateTask, Task } from "@/services/task.service";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  task?: Task | null;
}

function TaskForm({ open, onClose, refresh, task }: Props) {
  const isEdit = !!task;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const descriptionRegister = register("description");

  const descriptionValue = watch("description");

  useEffect(() => {
    setCharCount(descriptionValue?.length || 0);
  }, [descriptionValue]);

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description || "");
      setValue("completed", task.completed);
    } else {
      reset({
        title: "",
        description: "",
        completed: false,
      });
    }
  }, [task, setValue, reset]);

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEdit && task) {
        await updateTask(task.id, data);
        toast.success("Task updated successfully");
      } else {
        await createTask(data);
        toast.success("Task created successfully");
      }

      refresh();
      onClose();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-8">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? "Edit Task" : "Create Task"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update your task details."
              : "Add a new task to your task manager."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 pt-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Title</Label>

            <Input
              placeholder="Enter task title"
              className="border-gray-300 hover:border-gray-400 focus:border-gray-500"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Description</Label>

            <Textarea
              {...descriptionRegister}
              maxLength={1000}
              ref={(el) => {
                descriptionRegister.ref(el);
                textareaRef.current = el;
              }}
              placeholder="Optional description..."
              rows={1}
              className="resize-none overflow-hidden border-gray-300 hover:border-gray-400 focus:border-gray-500"
              onInput={(e) => autoResize(e.currentTarget)}
            />

            <div className="flex justify-end text-xs text-muted-foreground">
              {charCount}/1000
            </div>
          </div>

          {isEdit && (
            <div className="flex items-center gap-3 pt-1">
              <Checkbox
                onCheckedChange={(checked) =>
                  setValue("completed", Boolean(checked))
                }
              />

              <Label className="text-sm">Mark as completed</Label>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update Task"
                  : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskForm;
