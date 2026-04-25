import dbConnect from "./db";
import { Board, Column } from "./models";
import jobApplication from "./models/job-application";

const DEFAULT_COLUMNS = [
  { name: "Wish list", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing ", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await dbConnect();

    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });
    if (existingBoard) {
      return existingBoard;
    }

    // Create the board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    // Create the columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplication: [],
        }),
      ),
    );

    // update  the board with the new column ids
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (error) {
    throw error;
  }
}
