"use client";

import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/model.types";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(() => initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(
    () => initialBoard?.columns || [],
  );
  const [error, setError] = useState<string | null>(null);

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((column) => ({
        ...column,
        jobApplications: [...column.jobApplications],
      }));
      // Find the source column and remove the job application from it
      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const column of newColumns) {
        const jobIndex = column.jobApplications.findIndex(
          (j) => j._id === jobApplicationId,
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = column.jobApplications[jobIndex];
          oldColumnId = column._id;
          column.jobApplications = column.jobApplications.filter(
            (job) => job._id !== jobApplicationId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));
          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });
  }

  return { board, columns, error, moveJob };
}
