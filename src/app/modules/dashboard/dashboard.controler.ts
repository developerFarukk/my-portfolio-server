import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dashboardService } from "./dashboard.service";
import httpStatus from 'http-status';




// All Dashboard data
const getAllDashboardData = catchAsync(async (req, res) => {

    const result = await dashboardService.getAllDashboardDataFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard data fetched successfully',
        data: result,
    });
});



export const DashboardControllers = {
    getAllDashboardData
};