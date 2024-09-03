import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts } from "../../redux/slice/districtSlice";
import { Link } from "react-router-dom";

const DistrictList = () => {
  const dispatch = useDispatch();
  const {
    list: districts,
    isLoading,
    error,
  } = useSelector((state) => state.districts);

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">District List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add district</h5>
                  </Link>
                  <form
                    method="get"
                    action="/district/search"
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="q"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
                        required
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-info">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.length > 0 ? (
                    districts.map((district) => (
                      <tr key={district.id}>
                        <td>{district.id}</td>
                        <td>{district.name}</td>
                        <td>
                          <Link to={`/district/update/${district.id}`}>
                            Edit
                          </Link>{" "}
                          |{" "}
                          <Link to={`/district/delete/${district.id}`}>
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No districts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictList;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// const DistrictList = () => {
//   const dispatch = useDispatch();
//   // Adjust the selector to match the state structure
//   const { districts, isLoading, error } = useSelector(
//     (state) => state.district
//   );

//   useEffect(() => {
//     dispatch(fetchDistrict());
//   }, [dispatch]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add district</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/district/search"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {districts.length > 0 ? (
//                     districts.map((district) => (
//                       <tr key={district.id}>
//                         <td>{district.id}</td>
//                         <td>{district.name}</td>
//                         <td>
//                           <Link to={`/district/update/${district.id}`}>
//                             Edit
//                           </Link>{" "}
//                           |{" "}
//                           <Link to={`/district/delete/${district.id}`}>
//                             Delete
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3">No districts found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistrictList;
