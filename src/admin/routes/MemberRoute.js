import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UseAttendance from "../../teacherComponent/attendanceComponents/UseAttendanceTable";
import TeacherDashboard from "../MyComponents/Teacher/TeacherDashboard";
import TeacherFeedback from "../MyComponents/Teacher/TeacherFeedback";
import TeacherMessages from "../MyComponents/Teacher/TeacherMessages";
import TeacherReport from "../MyComponents/Teacher/TeacherReport";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";

const MemberRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        <Route index element={<TeacherDashboard />} />
        <Route path=":id" element={<UseAttendance/>} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="messages" element={<TeacherMessages />} />
        <Route path="feedback" element={<TeacherFeedback />} />
        <Route path="report" element={<TeacherReport />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default MemberRoute;
