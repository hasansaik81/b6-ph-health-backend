import { Router } from "express"
import { SpecialtyRoute } from "../modules/specialty/specialty.route"
import { AuthRoutes } from "../modules/Auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"

const router=Router()
router.use("/auth",AuthRoutes)
router.use("/specialties",SpecialtyRoute)
router.use("/users",UserRoutes)

export default router