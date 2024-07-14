import categoryModel from "../../../Database/models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  const { id } = req.auth;

  try {
    const category = await categoryModel.create({ categoryName, userId: id });

    res.json({ message: `${categoryName} category added!`, category });
  } catch (error) {
    req.status(500).json({ message: "internal server error" });
  }
};

export const getUserCategories = async (req, res) => {
  const { id } = req.auth;

  try {
    const categories = await categoryModel.find({ userId: id });

    res.json({
      message: `Hello! ${req.auth.name}, Your categories here: `,
      categories,
    });
  } catch (error) {
    req.status(500).json({ message: "internal server error" });
  }
};

export const getSingleCategory = async (req, res) => {
  const { id } = req.auth;
  const categoryId = req.params.id;

  try {
    const categoryToFind = await categoryModel.findOne({
      userId: id,
      _id: categoryId,
    });

    if (!categoryToFind)
      return res.json({
        message: "Category doesn't exist or you're not authorized to view it!",
      });

    res.json({
      message: `Hello! ${req.auth.name}, ${categoryToFind.categoryName} category here: `,
      categoryToFind,
    });
  } catch (error) {
    req.status(500).json({ message: "internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.auth;
  const { categoryName } = req.body;

  try {
    const category = await categoryModel.findOneAndUpdate(
      { _id: id, userId },
      { categoryName }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated!", category });
  } catch (error) {
    res.status(500).json({ Message: "internal server error", error: error });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.auth;

  try {
    const category = await categoryModel.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Category deleted!" });
  } catch (error) {
    res.status(500).json({ Message: "internal server error", error: error });
  }
};
