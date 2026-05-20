import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

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
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form>
          <div>
            <div>
              <div>
                <label htmlFor="company">Company *</label>
                <Input id="company" required />
              </div>
              <div>
                <label htmlFor="position">Position *</label>
                <Input id="position" required />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
