import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export default function EmptyState({ onCreate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <ClipboardList size={22} />
      </div>

      <h3 className="text-lg font-semibold mb-1">No tasks yet</h3>

      <p className="text-sm text-muted-foreground mb-5">
        Create your first task to get started
      </p>

      <Button onClick={onCreate}>Create Task</Button>
    </div>
  );
}
