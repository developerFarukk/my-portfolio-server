import { Blogs } from "../blog/blog.model";
import { Project } from "../projects/project.model";
import { Skills } from "../skills/skills.model";


const getAllDashboardDataFromDB = async () => {

    // Execute the query
    const totalProjects = await Project.countDocuments().exec();
    const totalBlogs = await Blogs.countDocuments().exec();
    const totalSkills = await Skills.countDocuments().exec();
    const totalTacknicalSkills = await Skills
        .countDocuments({ skillCategory: 'Technical' }).exec();
    const totalSoftSkills = await Skills
        .countDocuments({ skillCategory: 'Soft' }).exec();


    return {
        totalBlog: totalBlogs,
        totalProjects: totalProjects,
        totalSkills: totalSkills,
        totalTacknicalSkills: totalTacknicalSkills,
        totalSoftSkills: totalSoftSkills,
    };
};



export const dashboardService = {
    getAllDashboardDataFromDB
};