import { Router } from "express"
import {  SpecialtyRoutes } from "../modules/specialty/specialty.route"
import { AuthRoutes } from "../modules/Auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { DoctorRoutes } from "../modules/doctor/doctor.route"
import { AdminRoutes } from "../modules/admin/admin.route"
import { scheduleRoutes } from "../modules/schedule/schedule.route"
import { AppointmentRoutes } from "../modules/appointment/appointment.route"
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route"

const router=Router()
router.use("/auth",AuthRoutes)
router.use("/specialties",SpecialtyRoutes)
router.use("/users",UserRoutes)
router.use("/doctors",DoctorRoutes)
router.use("/admins",AdminRoutes)
router.use("/schedules",scheduleRoutes)
router.use("/appointments",AppointmentRoutes)
router.use("/doctor-schedules", DoctorScheduleRoutes)

export default router