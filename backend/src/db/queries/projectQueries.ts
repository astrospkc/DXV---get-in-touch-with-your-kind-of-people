import { db } from './../db';
import { InsertProject, projectTable } from "../schema"

export const UploadProject = async (data: InsertProject) => {
    return await db.insert(projectTable).values(data).returning()
}