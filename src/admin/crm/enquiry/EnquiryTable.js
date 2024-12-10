import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import EnquiryForm from "./EnquiryForm";
import "../../css/Table.css";
import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
import { useSelector, useDispatch } from "react-redux"; // Correct import
import { Link, useNavigate } from "react-router-dom";
import EnquiryDelete from "./EnquiryDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const maxHistoryLength = 100; // Maximum characters to show for history
  const maxEnquiryPurposeLength = 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { enquiries, isLoading } = useSelector((state) => state.enquiries);

  // Handle search
  // const filteredEnquiries = enquiries.filter((enquiry) =>
  //   enquiry.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    //fetching data
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
        // setEnquiries(response.data.result || []); // Ensure the data is from 'result'
        const data = response.data.result || [];

        // Sort enquiries by next_follow_up_date in descending order
        const sortedEnquiries = data.sort((a, b) => {
          const dateA = new Date(a.next_follow_up_date);
          const dateB = new Date(b.next_follow_up_date);
          return dateB - dateA; // Descending order
        });
        setEnquiries(sortedEnquiries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enquiries:", error); // Log the error for debugging
        setError(error);
        setLoading(false);
      }
    };

    fetchEnquiries();

    //live search handling
    if (searchTerm) {
      setFilteredEnquiries(
        enquiries.filter((enquiry) =>
          enquiry.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEnquiries(enquiries);
    }
  }, [currentPage, itemsPerPage, searchTerm, enquiries]);

  useEffect(() => {
    dispatch(fetchEnquiries()); // Fetch enquiries using the dispatched action
  }, [dispatch]);

  // Helper function to format date as a readable string
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  // Helper function to check if the next follow-up date is tomorrow
  const isTomorrow = (dateString) => {
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    const nextFollowUp = new Date(dateString);

    // Set time to midnight for comparison
    tomorrow.setHours(0, 0, 0, 0);
    nextFollowUp.setHours(0, 0, 0, 0);

    return tomorrow.getTime() === nextFollowUp.getTime();
  };

  // handle in page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  // Truncate the history text to maxHistoryLength
  const truncateHistory = (history) => {
    if (history && history.length > maxHistoryLength) {
      return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
    }
    return history;
  };
  //enquiry purpose
  const truncateEnquiryPurpose = (enquiry_purpose) => {
    if (enquiry_purpose && enquiry_purpose.length > maxEnquiryPurposeLength) {
      return enquiry_purpose.substring(0, maxEnquiryPurposeLength) + "..."; // Add ellipsis
    }
    return enquiry_purpose;
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading enquiries: {error.message}</div>;
  }
  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //--converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      enquiries.map((enquiry) => ({
        ID: enquiry.id,
        Name: enquiry.customer_name,

        category: enquiry.category_name,
        organization_name: enquiry.organization_name,
        department: enquiry.department_name,
        designation: enquiry.designation_name,
        pri_phone: enquiry.pri_phone,
        sec_phone: enquiry.sec_phone,
        email: enquiry.email,
        gender: enquiry.gender,

        province: enquiry.province_name,
        // zone:enquiry.
        district: enquiry.district_name,
        municipality: enquiry.municipality_name,
        ward_no: enquiry.ward_no,
        tole_name: enquiry.tole_name,

        estimated_amount: enquiry.estimated_amount,
        enquiry_purpose: enquiry.enquiry_purpose,
        known_by: enquiry.known_by,
        created: enquiry.created,
        history: enquiry.history,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
    XLSX.writeFile(workbook, "enquiries.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("enquiries List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = enquiries.map((enquiry) => [
      enquiry.id,
      enquiry.customer_name,

      enquiry.category,
      enquiry.organization_name,
      enquiry.department,
      enquiry.designation,
      enquiry.pri_phone,
      enquiry.sec_phone,
      enquiry.email,
      enquiry.gender,

      enquiry.province_name,
      // zone:enquiry.
      enquiry.district_name,
      enquiry.municipality_name,
      enquiry.ward_no,
      enquiry.tole_name,

      enquiry.estimated_amount,
      enquiry.enquiry_purpose,
      enquiry.known_by,
      enquiry.created,
      enquiry.history,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("enquiries.pdf");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="card">
          {/* heading */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <h5 className="navbar-brand">Enquiry Table</h5>
              <div className="navbar-nav ml-auto">
                <Link to="create" className="nav-link btn btn-info">
                  <h5>Add Enquiry</h5>
                </Link>
                <form
                  method="get"
                  action="/enquiry/search"
                  className="form-inline ml-3"
                >
                  <div className="input-group">
                    <input
                      type="search"
                      id="default-search"
                      name="searchTerm"
                      className="form-control"
                      placeholder="Search Mockups, Logos..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      required
                    />
                    {/* <div className="input-group-append">
                        <button type="submit" className="btn btn-info">

                        </button>
                      </div> */}
                  </div>
                </form>
              </div>

              <div className="form-inline ml-4" id="navbarSupportedContent">
                <ul className="navbar-nav mr-30">
                  <li className="nav-item ">
                    <button
                      id="exportExcel"
                      className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                      onClick={exportToExcel}
                    >
                      Export Excel
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      id="exportPDF"
                      className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                      onClick={exportToPDF}
                    >
                      Export PDF
                    </button>
                  </li>
                  {/* Add other export buttons here */}
                </ul>
              </div>
            </div>
          </nav>
          {/* heading end */}
          <div className="card-body">
            <div className="table-container">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Enquiry Date</th>
                    <th>next follow date</th>
                    <th>category</th>
                    <th>Department</th>
                    <th>designation</th>
                    <th>Phone</th>
                    <th>whatsapp</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Province</th>
                    <th>District</th>
                    <th>Municipality</th>
                    <th>WardNo</th>
                    <th>Tole Name</th>
                    <th>Budget</th>
                    <th>Enquiry Purpose</th>

                    <th>Known By</th>

                    <th>History</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enquiry, index) => {
                      // Check if next follow-up date is tomorrow
                      const isRedMark = isTomorrow(enquiry.next_follow_up_date);
                      return (
                        <tr key={enquiry.id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{formatName(enquiry.customer_name)}</td>
                          <td>{formatDateTime(enquiry.created)}</td>
                          <td
                            style={{
                              backgroundColor: isRedMark
                                ? "red"
                                : "transparent",
                              color: isRedMark ? "white" : "black",
                            }}
                          >
                            {formatDateTime(enquiry.next_follow_up_date)}
                          </td>
                          <td>{enquiry.category_name}</td>
                          <td>{formatName(enquiry.department_name)}</td>
                          <td>{formatName(enquiry.designation_name)}</td>
                          <td>{enquiry.pri_phone}</td>
                          <td>{enquiry.sec_phone}</td>
                          <td>{enquiry.email}</td>
                          <td>{enquiry.gender}</td>
                          <td>{formatName(enquiry.province_name)}</td>
                          <td>{formatName(enquiry.district_name)}</td>
                          <td>{formatName(enquiry.municipality_name)}</td>
                          <td>{enquiry.ward_no}</td>
                          <td>{formatName(enquiry.tole_name)}</td>
                          <td>{enquiry.estimated_amount}</td>
                          <td>
                            {truncateEnquiryPurpose(enquiry.enquiry_purpose)}
                          </td>
                          <td>{enquiry.known_by}</td>

                          <td>
                            {/* Display truncated history */}
                            <p>{truncateHistory(enquiry.history)}</p>
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              to={`update/${enquiry.id}`}
                            >
                              Edit
                            </Link>
                            <Link
                              to={`detail/${enquiry.id}`}
                              className="btn btn-info"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => setEnquiryToDelete(enquiry.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="17">No enquiries found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <div className="pagination-info">
                  <label htmlFor="itemsPerPage">Items per page:</label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {enquiryToDelete !== null && (
          <EnquiryDelete
            id={enquiryToDelete}
            onClose={() => setEnquiryToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default EnquiryTable;
