import mongoose, { SchemaTypes } from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName : {
    type : String,
    required : true
  },
  userId : {
    type : SchemaTypes.ObjectId,
    required : true,
    ref: 'user'
  }
})


const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
