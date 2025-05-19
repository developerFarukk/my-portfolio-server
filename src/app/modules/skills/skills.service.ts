

import { TSkills } from "./skills.interface";
import { Skills } from "./skills.model";



// Create Skills
const createSkillsIntoDB = async (payload: TSkills) => {

    const newPayload = { ...payload };

    const result = await Skills.create(newPayload);

    return result;
};


// Get All Skill
const getAllSkillFromDB = async () => {

    // Execute the query
    const result = Skills.find()

    return result;
};


// get Soft Skils
const getSoftSkillFromDB = async () => {

    const result = await Skills.find({ skillCategory: 'Soft' });
    return result;
};

// get Technical Skils
const getTechnicalSkillFromDB = async () => {

    const result = await Skills.find({ skillCategory: 'Technical' });
    return result;
};


// Get Single skills
const getSingleSkillsFromDB = async (id: string) => {

    const skill = await Skills.findById(id);

    // Check skill Exist
    if (!skill) {
        throw new Error('This skill not found !')
    }

    const result = await Skills.findById(id)

    return result;
};


// Update skills Data
const updateSkillsIntoDB = async (id: string, payload: Partial<TSkills>) => {

    const result = await Skills.findOneAndUpdate({ _id: id }, payload,
        {
            new: true,
        },
    )

    return result;
};

// Delete skills
const deleteSkillFromDB = async (id: string) => {

    const skill = await Skills.findById(id);

    // Check skills Exist
    if (!skill) {
        throw new Error('This skill not found !')
    }

    const result = Skills.findByIdAndDelete(id)
    return result;
};

export const skillService = {
    createSkillsIntoDB,
    getAllSkillFromDB,
    updateSkillsIntoDB,
    deleteSkillFromDB,
    getSingleSkillsFromDB,
    getSoftSkillFromDB,
    getTechnicalSkillFromDB

};