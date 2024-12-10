"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProjectContext = createContext([])

const ProjectProvider = ({ children }) => {
    const [projectMaterials, setProjectMaterials] = useState([])

    // const getProjectMaterialsOfGroupId = async (groupId) => {
    //     const token = localStorage.getItem("token")
    //     if (!token) {
    //         throw new Error("No token found in local storage.");
    //     }

    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/project/groupProjects/${groupId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     })
    //     const data = res.data
    //     console.log("project materials: ", data)
    //     setProjectMaterials(data)
    // }
    return (
        <ProjectContext.Provider value={{
            projectMaterials,
            setProjectMaterials,
            // getProjectMaterialsOfGroupId
        }}>
            {children}
        </ProjectContext.Provider>
    )


}

export { ProjectContext, ProjectProvider }