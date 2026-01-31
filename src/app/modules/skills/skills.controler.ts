

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { skillService } from "./skills.service";


// Create Skill
const createSkill = catchAsync(async (req, res) => {

    const result = await skillService.createSkillsIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Skill is created succesfully',
        data: result,
    });
});

// All skills data
const getAllSkills = catchAsync(async (req, res) => {

    const result = await skillService.getAllSkillFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skills fetched successfully',
        data: result,
    });
});


// Soft skills data
const getSkillsByCategory = catchAsync(async (req, res) => {

    const result = await skillService.getSkillsByCategoryFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category Skills fetched successfully',
        data: result,
    });
});


// Technical skills data
// const getTechnicalSkills = catchAsync(async (req, res) => {

//     const result = await skillService.getTechnicalSkillFromDB();

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Technical Skills fetched successfully',
//         data: result,
//     });
// });


// Get Single Skill
const getSingleSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await skillService.getSingleSkillsFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Skill is retrieved succesfully',
        data: result,
    });
});


// Update Skill
const updateSkill = catchAsync(async (req, res) => {
    // console.log('test', req.user);
    const { id } = req.params;
    const result = await skillService.updateSkillsIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill is updated succesfully',
        data: result,
    });
});

// Delete Skill Data
const deleteSkill = catchAsync(async (req, res) => {
    const id = req.params.id;

    await skillService.deleteSkillFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Skill deleted succesfully',
        data: null
    });
});



export const SkillsControllers = {
    createSkill,
    getAllSkills,
    // getSoftSkills,
    getSkillsByCategory,
    // getTechnicalSkills,
    updateSkill,
    deleteSkill,
    getSingleSkill

};