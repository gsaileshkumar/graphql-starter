import { Schema, model } from "mongoose";

const TodoSchema = new Schema(
  {
    id: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate"
    }
  }
);

export default model("Todo", TodoSchema);
