


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";
import httpStatus from 'http-status';


// Create Blogs
const createblogs = catchAsync(async (req, res) => {

    const result = await blogService.createBlogIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog is created succesfully',
        data: result,
    });
});

// All Blog data
const getAllBlog = catchAsync(async (req, res) => {


    const result = await blogService.getAllBlogFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
});


// Get Single Project
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogService.getSingleBlogFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Blog is retrieved succesfully',
        data: result,
    });
});


// Update Blog
const updateBlog = catchAsync(async (req, res) => {
    // console.log('test', req.user);
    const { id } = req.params;
    const result = await blogService.updateBlogIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is updated succesfully',
        data: result,
    });
});

// Delete Blog Data
const deleteBlog = catchAsync(async (req, res) => {
    const id = req.params.id;

    await blogService.deleteBlogFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted succesfully',
        data: undefined
    });
});



export const BlogsControllers = {
    createblogs,
    getAllBlog,
    updateBlog,
    deleteBlog,
    getSingleBlog

};