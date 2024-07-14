import categoryModel from "../../../Database/models/categoryModel.js";
import taskModel from "../../../Database/models/tasksModel.js";
import userModel from "../../../Database/models/userModel.js";

export const createTask = async (req, res) => {
  const { title, description, taskType, listItems, shared, category } =
    req.body;
  const { id: user } = req.auth;

  const categoryToFind = await categoryModel.findOne({
    _id: category,
    userId: user,
  });

  if (!categoryToFind) {
    return res.status(400).json({
      message: "Invalid category ID or you do not have access to this category",
    });
  }

  try {
    const task = await taskModel.create({
      title,
      description,
      taskType,
      listItems,
      shared,
      category,
      user,
    });

    res.json({ message: "Task created successfully", task: task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5, category, shared, sort, userId } = req.query;
    let query = {};

    query.user = userId;

    if (!req.auth) {
      // Guest user
      if (shared === undefined || shared === "true") {
        query.shared = true;
      } else {
        query._id = null;
      }
    } else if (req.auth.id !== userId) {
      query.$or = [{ shared: true }, { userId: req.auth.id }];
    }

    if (category) {
      const categoryQuery = { categoryName: category, userId: userId };
      const categories = await categoryModel.find(categoryQuery);
      const categoryIds = categories.map((cat) => cat._id);
      query.category = { $in: categoryIds };
    }

    if (shared !== undefined) {
      query.shared = shared === "true";
    }

    const tasks = await taskModel
      .find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await taskModel.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.auth;
  const { taskId } = req.params;
  const { title, description, taskType, listItems } = req.body;

  try {
    const task = await taskModel.findOneAndUpdate(
      { user: id, _id: taskId },
      {
        title,
        description,
        taskType,
        listItems,
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.json({
        message: "Task doesn't exist or you're not authorized to update it!",
      });
    }

    res.json({ message: "Task updated successfully!", task: task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.auth;
  const { taskId } = req.params;

  try {
    const task = await taskModel.findOneAndDelete(
      { user: id, _id: taskId },
      {
        new: true,
      }
    );

    if (!task) {
      return res.json({
        message: "Task doesn't exist or you're not authorized to delete it!",
      });
    }

    res.json({ message: "Task deleted successfully!", task: task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
