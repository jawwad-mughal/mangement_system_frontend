import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { allBranch, deleteBranch, resetBranch } from "../store/slices/branchSlice";
import { useRef } from "react";

function BranchList() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const scrollRef = useRef()
  const [page, setPage] = useState(1)
  const limit = 10

  const {list, hasMore} = useSelector(state => state.branch )

  useEffect(() => {
    dispatch(resetBranch())
    if(page === 1){
      dispatch(allBranch({page, limit}))
    }
  },[])

  // -------- Scroll Detection ----------
  useEffect(() => {
    const div = scrollRef.current;

    const handleScroll = () => {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 10) {
        if (hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    div.addEventListener("scroll", handleScroll);

    return () => div.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    if(hasMore){
      dispatch(allBranch({page, limit}))
    }
  },[page])
  
  return (
    /* Branch List Table */
    
      <div ref={scrollRef} className="bg-white w-full mx-auto small-scroll overflow-auto h-[69vh] border mb-2 p-4 ">
        <h1 className="text-2xl font-bold mb-2 text-blue-700">Branch List</h1>
        <table className="w-full text-sm ">
          <thead className="bg-gray-100 font-semibold">
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">No #</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Branch Name</th>
              <th className="p-2 border">Branch Code</th>
              <th className="p-2 border">Manager</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b, i) => (
              <tr key={b._id} className="bg-gray-100">
                <td className="p-2 border text-center ">{i+1}</td>
                <td className="p-2 border text-center"> <img
            src={ `http://localhost:5000/uploads/${b.branchImage}`}
            className="w-20 h-20 object-cover"
          /></td>
                <td className="p-2 border text-center ">{b.branchName}</td>
                <td className="p-2 border text-center ">{b.branchCode}</td>
                <td className="p-2 border text-center ">{b.managerName}</td>
                <td className="p-2 border text-center ">{b.city}</td>
                <td className="p-2 border text-center ">{b.phone}</td>
                <td className="p-2 border text-center ">{b.address}</td>
                <td className="p-2 border text-center ">{b.active}</td>
                <td className="p-2 border text-center space-x-2 space-y-2">
                  <button
                    onClick={() => navigate(`/branch/editbranch/${b._id}`)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded text-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteBranch(b._id))}
                    className="px-4 py-2 bg-red-600 text-white rounded text-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-2xl text-blue-700 font-bold text-center mt-3">{hasMore? "More Branch": "No More Branch"}</p>
      </div>
    
  );
}

export default BranchList;
