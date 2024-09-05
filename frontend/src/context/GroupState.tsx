"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const GroupContext = createContext();

const GroupState = ({ children }) => {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [usergroup, setUserGroup] = useState([]);
  const [allGroups, setAllGroups] = useState([])
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupAdmin, setGroupAdmin] = useState([])

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
      alert("group created successfully");
      // router.push("/dashboard/groups");
    } catch (error) {
      console.log(" lets see this error came: ", error);
    }
  };

  // get all groups of single user , the group who he/she is admin also the group he/she has joined
  // 1. lets first fetch the groups of the user created

  const fetchCreatedGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage.");
        console.log("no token is available")
        return; // Exit if no token is available
      }

      console.log("token", token);
      const res = await fetch(
        "http://localhost:8000/group/getAllGroupsOfUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is okay (status in the range 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("data: ", data);

      // Check if data is an array and set state accordingly
      setUserGroup(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching groups: ", error);
    }
  };

  // handling api calls:

  // this I need in the find group section
  const fetchGroups = async () => {
    const res = await fetch("http://localhost:8000/group/getAllGroups", {
      method: "GET",
      headers: {
        'Content-type': "application/json",
      }
    });

    console.log("res: ", res)
    const data = await res.json()
    setAllGroups(data);


  };

  const userId_Username = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:8000/group/getSingleUserInfo/${userId}`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
        },
      });

      // Check if the response is ok (status in the range 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("data: ", data);

      // Assuming setGroupAdmin is defined in the same scope
      setGroupAdmin(data); // Ensure this is defined in the context where this function is called

      return data; // Optionally return the data
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error; // Optionally rethrow the error for further handling
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        createGroup,
        usergroup,
        setUserGroup,
        fetchCreatedGroups,
        fetchGroups,
        allGroups, setAllGroups,
        userId_Username, setGroupAdmin, groupAdmin

      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export { GroupState, GroupContext };
