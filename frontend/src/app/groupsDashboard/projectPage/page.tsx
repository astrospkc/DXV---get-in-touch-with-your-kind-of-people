"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GroupContext } from '@/context/GroupState';
import { ProjectContext } from '@/context/ProjectState';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'


// user id and group id -> will be prefilled  from the group dashboard
// user_id, group_id, project_desc, project_name, project_media_url
// a modal will be opened when  upload project button is clicked , then fillup all the details
const ProjectPage = () => {
    const [projectFile, setProjectFile] = useState("");
    const { groupInfo } = useContext(GroupContext)
    const [isClicked, setIsClicked] = useState(false);
    // const { projectMaterials, setProjectMaterials } = useContext(ProjectContext)
    const [projectMaterials, setProjectMaterials] = useState([])
    const router = useRouter()
    const [projectInfo, setProjectInfo] = useState({
        project_name: "",
        project_desc: "",
        project_media_url: [],
        group_id: ""
    })

    const projectUpload = async (props) => {
        const { project_name, project_desc } = props

        const formData = new FormData()
        formData.append("project_name", project_name)
        formData.append("project_desc", project_desc)
        formData.append("group_id", groupInfo.group_id)
        if (projectFile) {
            formData.append("project_media_url", projectFile)
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/project/uploadFile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (!res.data.ok) {
            console.log("failed to upload project")
        }

        const data = await res.data
        console.log("project data: ", data)

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("project handle submit: ", projectInfo);
        projectUpload(projectInfo)
        setIsClicked(false)
        router.push("/groupsDashboard/projectPage")
    }

    const handleChange = (e: any) => {
        setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const getProjectMaterialsOfGroupId = async (groupId) => {
            const token = localStorage.getItem("token")
            if (!token) {
                throw new Error("No token found in local storage.");
            }

            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/project/groupProjects/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = res.data
            console.log("project materials: ", data)
            setProjectMaterials([...data])
        }
        getProjectMaterialsOfGroupId(groupInfo.group_id)
    }, [groupInfo.group_id])

    console.log("project materials: ", projectMaterials)


    return (
        <div className='flex justify-center items-center m-auto h-full'>
            <div className="flex flex-col gap-4">
                <div className="text-white">
                    all the project files reside here
                </div>
                <div>
                    {projectMaterials && projectMaterials.map((material: any) => {
                        return (
                            <>
                                <div key={material.id} className="bg-white p-4">
                                    <div>{material.project_name}</div>

                                    {/* <Button variant="secondary"><Link href={material.project_media_url}>Open</Link></Button> */}
                                </div>
                            </>
                        )
                    })}
                </div>

                <div>
                    <div className='flex flex-col justify-center items-center'>
                        <Dialog open={isClicked} onOpenChange={setIsClicked}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setIsClicked(true)} variant="outline" className='bg-white my-3'>Post</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Upload Project</DialogTitle>
                                    <DialogDescription>
                                        Upload your project
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <input type="text" placeholder='Project Name' defaultValue={groupInfo.group_name} name="project_name" onChange={handleChange} />
                                    <Textarea className='text-white' name="Project_desc" defaultValue={groupInfo.group_desc} placeholder="Type your project description here" onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="file" name="project_media_url" onChange={(e) => setProjectFile(e.target.files[0])} />
                                </div>
                                <DialogFooter>
                                    <Button variant="secondary" type="submit" onClick={handleSubmit}>Post</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

            </div>


        </div>
    )
}
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
export default ProjectPage
