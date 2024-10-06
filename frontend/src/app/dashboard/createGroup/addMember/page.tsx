"use client"
import debounce from '@/components/miscellaneous/debounce'
import { Input, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { GroupContext } from "@/context/GroupState";
import UserBadge from '@/UsersList/UserBadge';
import UserListItem from '@/UsersList/UserListItem';


const AddMember = ({ group, selectedUser, setSelectedUser }: any) => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const group_context = useContext(GroupContext)
  const { addMember }: any = group_context
  const toast = useToast()



  // handle search user
  const handleSearch = async (query: string) => {
    const token = localStorage.getItem("token")
    if (!query) {
      alert("Please enter a search query")
    }
    console.log("query: ", query)
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:7000/api/?search=${query}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

      )
      const data = await res.json()
      console.log("data with search query: ", data)
      setLoading(false)
      setSearchResults(data)

      console.log("search result: ", searchResults)

    } catch (error) {
      toast({
        title: "Error fetching the chat",
        position: 'bottom-left',
        isClosable: true
      })
    }
  }

  console.log("search results: ", searchResults)

  // handle search change -> debounce it , make the search call optimised
  const handleSearchChange = debounce((value) => {
    handleSearch(value)
  })
  useEffect(() => {
    handleSearchChange
  }, [])

  const handleGroup = (user) => {
    if (selectedUser.includes(user.id)) {
      toast({
        title: "user already exist",
        position: "bottom-left",
        isClosable: true
      })
    }
    setSelectedUser([...selectedUser, user])
  }
  // console.log("SelectedUser", selectedUser)

  const handleDelete = (delUser: any) => {
    setSelectedUser(selectedUser.filter((user: any) => user.id !== delUser.id))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("handle submit")
  //   // addMember(group_id, group_member_id)


  // }
  return (
    <div className='flex flex-col justify-center items-center m-auto bg-gray-950 p-4 '>
      Add members to the group

      <Input
        placeholder="search names and add" onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div>
        {
          selectedUser?.map((u) => (
            <UserBadge key={u.id} user={u} handleFn={() => handleDelete(u)} />
          ))
        }
      </div>
      {
        loading ? <div>loading ... </div> : (
          searchResults?.map((user) => (
            <UserListItem

              key={user?.id}
              user={user}
              handleFn={() => handleGroup(user)}

            />
          ))
        )
      }

      {/* <button onClick={handleSubmit}>Add</button> */}
    </div>
  )
}

export default AddMember
