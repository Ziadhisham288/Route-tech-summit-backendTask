import mongoose, { SchemaType, SchemaTypes } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  taskType: {
    type: String,
    enum: ["text", "list"],
    required: true,
  },
  listItems: {
    type: [String],
  },
  shared: {
    type:  Boolean,
    default: false,
    required: true,
  },
  category: {
    type:  mongoose.Schema.Types.ObjectId,
    ref : "category",
    required: true,
  },
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref : "user",
    required: true,
  },
}, {
  timestamps : true
});

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
