import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DefaultHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"), // CSRF token
        },
        credentials: "include", // This is important for sessions
      });

      if (response.ok) {
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Helper function to get CSRF token from cookies
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="index3.html" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="navbar-search"
              to="#"
              role="button"
            >
              <i className="fas fa-search"></i>
            </Link>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Logout Button */}
          <li className="nav-item">
            <button className="nav-link btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DefaultHeader;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// const DefaultHeader = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("api/logout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         navigate("/login"); // Redirect to login page
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === name + "=") {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="pushmenu"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-bars"></i>
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="index3.html" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="#" className="nav-link">
//               Contact
//             </Link>
//           </li>
//         </ul>

//         {/* <!-- Right navbar links --> */}
//         <ul className="navbar-nav ml-auto">
//           {/* <!-- Navbar Search --> */}
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="navbar-search"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-search"></i>
//             </Link>
//             <div className="navbar-search-block">
//               <form className="form-inline">
//                 <div className="input-group input-group-sm">
//                   <input
//                     className="form-control form-control-navbar"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                   />
//                   <div className="input-group-append">
//                     <button className="btn btn-navbar" type="submit">
//                       <i className="fas fa-search"></i>
//                     </button>
//                     <button
//                       className="btn btn-navbar"
//                       type="button"
//                       data-widget="navbar-search"
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </li>

//           {/* Logout Button */}
//           <li className="nav-item">
//             <button className="nav-link btn" onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default DefaultHeader;
