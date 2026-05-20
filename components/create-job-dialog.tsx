import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-1 border border-gray-400 rounded-md px-2 py-1 cursor-pointer text-sm text-gray-600 hover:bg-gray-100">
          <Plus /> Add job
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Job Application</DialogHeader>
        <DialogDescription>Track a new job application</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
