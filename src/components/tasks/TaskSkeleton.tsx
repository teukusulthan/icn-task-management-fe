import { Skeleton } from "@/components/ui/skeleton";

export default function TaskSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="flex items-start gap-3">
        <Skeleton className="h-4 w-4 rounded-sm mt-1" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-60" />
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
