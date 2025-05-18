
import { model, Schema } from "mongoose";
import { TProject } from "./project.interface";



const projectSchema = new Schema<TProject>(
    {
        // _id: { type: Types.ObjectId, required: false },
        title: {
            type: String,
            required: [true, "Title is required "]
        },
        descriptions: {
            type: String,
            required: [true, "Description is required"]
        },
        liveLink: {
            type: String,
            required: [true, "LiveLink is required"]
        },
        image: { type: String, required: false, default: '' },
        githubClient: { type: String, required: false },
        githubServer: { type: String, required: false },
    },
    {
        timestamps: true,
        versionKey: false
    },
);




export const Project = model<TProject>('Project', projectSchema);