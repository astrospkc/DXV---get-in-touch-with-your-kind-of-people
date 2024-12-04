// id, project_name, project_desc, project_media_url, group_id, user_id, 

import express from "express"
const router = express.Router()

import { db } from "../db/db";
import { projectTable } from "../db/schema/index";
import { and, eq } from "drizzle-orm";
import fetchuser from "../../middleware/fetchuser";
import uploadOnCLoudinary from "../utils/cloudinary";
import { upload } from "../middleware/multer.middleware";
import { UploadProject } from "../db/queries/projectQueries";


// upload a file
// remove a file

const uploadFile = async (req: express.Request, res: express.Response) => {
    const user_id = parseInt(req.user?.id || "")
    const { group_id, project_name, project_desc } = req.body

    let filePath
    if (req.files && 'project_media_url' in req.files) {
        filePath = req.files.project_media_url[0]?.path
    }
    const file = await uploadOnCLoudinary(filePath)

    // if group_id and user_id are available then append the project_media_url else new row
    const groupProjectRowExist = await db.select().from(projectTable).where(and(eq(projectTable.group_id, group_id), eq(projectTable.user_id, user_id))).limit(1).execute()
    if (groupProjectRowExist.length > 0) {
        console.log("group project row exist: ", groupProjectRowExist)
        groupProjectRowExist[0]?.project_media_url?.push(file?.url ?? '')
        return res.status(200).json(groupProjectRowExist)
    }
    const project = await UploadProject({
        user_id,
        group_id,
        project_name,
        project_desc,
        project_media_url: [file?.url ?? '']
    })

    console.log("project: ", project)
    res.json(project)
}


router.route("/uploadFile").post(upload.fields([{ name: "project_media_url", maxCount: 1 }]), fetchuser, uploadFile)

export default router