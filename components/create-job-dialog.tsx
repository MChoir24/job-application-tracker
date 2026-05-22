"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="company">Company *</label>
                <Input id="company" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="position">Position *</label>
                <Input id="position" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="location">Location</label>
                <Input id="location" />
              </div>
              <div className="space-y-2">
                <label htmlFor="salary">Salary</label>
                <Input id="salary" placeholder="$0,000" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="jobUrl">Job URL</label>
              <Input id="jobUrl" placeholder="https://example.com/job" />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <Input id="tags" placeholder="e.g., Python, React, Remote" />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Brief description of the job"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="notes">Notes</label>
              <Textarea id="notes" rows={3} placeholder="Additional notes" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
