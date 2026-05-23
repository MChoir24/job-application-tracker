"use server";

import { getSession } from "../auth/auth";
import dbConnect from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  notes?: string;
  columnId: string;
  boardId: string;
}

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await dbConnect();

  const {
    company,
    position,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    columnId,
    boardId,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }

  // Verify that the user has access to the board
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found or access denied" };
  }

  // Verify column belongs to board
  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  // Create the job application
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({
      order: -1,
    })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    salary,
    jobUrl,
    tags: tags || [],
    description,
    notes,
    columnId,
    boardId,
    userId: session.user.id,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}
