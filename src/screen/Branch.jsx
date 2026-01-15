
import { Outlet, useNavigate } from 'react-router';


function Branch() {
  const navigate = useNavigate()
  
  return (
     <div className="p-5 bg-gray-100 rounded-xl ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold  text-blue-700">Branch Management</h1>
        <div className='flex gap-2'>
        <button
          onClick={() =>navigate("/branch") }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
         Branch List
        </button>

        <button
          onClick={() =>navigate("createbranch") }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Add Branch
        </button>
        </div>
      </div>

      <div className='border rounded-2xl p-6'>
        <Outlet />

        

      </div>

    </div>
  )
}

export default Branch