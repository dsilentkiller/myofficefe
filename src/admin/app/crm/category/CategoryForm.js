import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCategory,
  fetchCategories,
} from "../../../../redux/slice/admin/crm/categorySlice";

const CategoryForm = () => {
  const [formData, setFormData] = useState({ category_name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use a fallback value in case `categories` is undefined
  const categories = useSelector((state) => state.categories?.list || []);
  const createStatus = useSelector((state) => state.categories.createStatus);
  const createError = useSelector((state) => state.categories.createError);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Category created successfully!");
      setFormData({ category_name: "" }); // Clear the form after successful creation
      dispatch(fetchCategories()); // Refresh the category list
      navigate("/dashboard/crm/category"); // Redirect to the table page
    }
  }, [createStatus, navigate, dispatch]);

  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input and check if it's empty
    // Trim input and check if it's empty
    const trimmedName = formData.category_name.trim();
    if (trimmedName === "") {
      toast.error("Category name cannot be empty.");
      return;
    }

    // Check if category name already exists (ignores case and trims spaces)
    // Check if category name already exists (safely checking for undefined values)
    const existingCategory = categories.some(
      (category) =>
        category?.category_name && // Ensure category is defined and has category_name
        category.category_name.trim().toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (existingCategory) {
      toast.error("Category with this name already exists.");
      return;
    }

    // Dispatch the action to create a new category
    dispatch(createCategory({ category_name: trimmedName })).unwrap();
    // .then(() => {
    //   // setFormData({ category_name: "" }); // Clear the form after successful submission
    // })
    // .catch((error) => {
    //   console.error("Create Error:", error); // Log error
    // });
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Category Name</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Category Name:</label>
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    value={formData.category_name}
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createCategory,
//   fetchCategories,
// } from "../../redux/slice/crm/categorySlice";

// const CategoryForm = () => {
//   const [formData, setFormData] = useState({ category_name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Use a fallback value in case `categories` is undefined
//   const categories = useSelector((state) => state.categories.list || []);
//   const createStatus = useSelector((state) => state.categories.createStatus);
//   // const createError = useSelector((state) => state.categories.createError);
//   const createError = useSelector((state) => state.categories.createError); // Update based on your state structure

//   useEffect(() => {
//     // Fetch categories when the component mounts
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Category created successfully!");
//       setFormData({ category_name: "" }); // Clear the form after successful creation
//       dispatch(fetchCategories()); // Refresh the category listnpm start
//       navigate("/dashboard/crm/category"); // Redirect to the table page
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.category_name.trim() === "") return; // Prevent empty name submission

//     // Check if category name already exists
//     const existingCategory = categories.some(
//       (category) =>
//         category.category_name &&
//         category.category_name.toLowerCase() ===
//           formData.category_name.toLowerCase()
//     );

//     if (existingCategory) {
//       toast.error("Category with this name already exists.");
//       return;
//     }

//     // Dispatch the action to create a new category
//     dispatch(createCategory(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ category_name: "" }); // Clear the form
//       })
//       .catch((error) => {
//         console.error("Create Error:", error); // Log error
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Category Name</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name"> Category Name:</label>
//                   <input
//                     type="text"
//                     id="category_name"
//                     name="category_name"
//                     value={formData.category_name}
//                     className="form-control"
//                     placeholder="Enter category name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;
