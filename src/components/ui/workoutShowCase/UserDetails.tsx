import React from 'react'

const UserDetails = async () => {
    
  return (
    <div className="flex items-center">
      <img
        src="https://randomuser.me/api/portraits"
        alt="profile"
        className="h-10 w-10 mr-4 rounded-md"
        />
        <div>       
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">
                2 days agos
            </p>
        </div>
    </div>
)
}

export default UserDetails