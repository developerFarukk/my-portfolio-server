

import { model, Schema } from "mongoose";
import { SkillCategorys, TSkills } from "./skills.interface";


const skillSchema = new Schema<TSkills>(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ''
        },
        skillCategory: {
            type: String,
            enum: {
                values: SkillCategorys,
                message: '{VALUE} is not a valid skill category',
            },
            required: [true, 'Skill category is required'],
        },
    },
    {
        timestamps: true,
        versionKey: false
    },
);




export const Blogs = model<TSkills>('Skills', skillSchema);