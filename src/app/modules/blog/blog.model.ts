



import { model, Schema } from "mongoose";
import { Tblog } from "./blog.interface";


const blogSchema = new Schema<Tblog>(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        content: {
            type: String,
            required: [true, "Content is required"]
        },
        image: { type: String, required: false },
        category: { type: String, required: false },
    },
    {
        timestamps: true,
        versionKey: false
    },
);




export const Blogs = model<Tblog>('Blog', blogSchema);