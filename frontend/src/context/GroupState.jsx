"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const GroupContext = createContext();

const GroupState = ({ children }) => {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  // const createGroupMembers = async (props) => {
  //     const { group_member_name } = props

  // }

  const createGroup = async (props) => {
    console.log("props: ", props);
    const {
      group_name,
      groupAdminId,
      total_members,
      media_url,
      github_url,
      project_desc,
    } = props;
    console.log("props: ", props);
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await fetch("http://localhost:8000/group/createGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_name: group_name,
          groupAdminId: groupAdminId,
          total_members: total_members,
          media_url: media_url,
          github_url: github_url,
          project_desc: project_desc,
        }),
      });

      if (!res.ok) {
        console.log("failed to create group");
      }
      console.log("res", res);
      const data = await res.json();
      console.log("data in group: ", data);
      setGroups((prevGroups) => prevGroups.concat(data));
      router.push("/dashboard/groups");
    } catch (error) {
      console.log(" lets see this error came: ", error);
    }
  };

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:8000/group/getAllGroups");
  };

  return (
    <GroupContext.Provider value={{ groups, setGroups, createGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupState, GroupContext };
