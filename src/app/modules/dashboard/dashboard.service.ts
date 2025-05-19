import { Blogs } from "../blog/blog.model";




const getAllDashboardDataFromDB = async () => {

    // Execute the query
    const blog = Blogs.find()

    return blog;
};



export const dashboardService = {
    getAllDashboardDataFromDB
};