import React, { useEffect, useState } from "react";

import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EnquiryDelete from "./EnquiryDelete";
// import { toast, ToastContainer } from "react-toastify";

const Enquiry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiries || []);
  const loading = useSelector((state) => state.enquiries.loading);
  const error = useSelector((state) => state.enquiries.error);
  const navigate = useNavigate();

  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  // Fetch event by ID when component mounts
  useEffect(() => {
    dispatch(fetchEnquiryById(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // if (!enquiry) return <div>No details found</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Enquiry Details</h3>

      {/* Row for enquiry details */}
      <div className="row">
        <div className="col-md-4">
          <h5>Customer Name</h5>
          <p>{enquiries.enquiries?.customer_name}</p>
        </div>
        <div className="col-md-4">
          <h5>Phone</h5>
          <p>{enquiries.enquiries?.pri_phone}</p>
        </div>
        <div className="col-md-4">
          <h5>Email</h5>
          <p>{enquiries.enquiries?.email}</p>
        </div>
      </div>

      {/* Additional details */}
      <div className="row">
        <div className="col-md-4">
          <h5>Enquiry Type</h5>
          <p>{enquiries.enquiries?.type}</p>
        </div>
        <div className="col-md-4">
          <h5>Status</h5>
          <p>{enquiries.enquiries?.status}</p>
        </div>
        <div className="col-md-4">
          <h5>Assigned To</h5>
          <p>{enquiries.enquiries?.assigned_to}</p>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            navigate(`/dashboard/crm/event/update/${enquiries.id}`)
          }
        >
          Update Event
        </Button>

        <Button
          variant="danger"
          onClick={() => setEnquiryToDelete(enquiries.id)}
          className="ms-2"
        >
          Delete Event
        </Button>

        {enquiryToDelete !== null && (
          <EnquiryDelete
            id={enquiryToDelete}
            onClose={() => setEnquiryToDelete(null)}
          />
        )}
      </div>

      {/* Follow-up History Table */}
      <h4 className="mt-5 text-center">Follow-up History</h4>
      {enquiries.followups?.length > 0 ? (
        <table className="table table-striped table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Note</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.followups.map((followup, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{followup.note}</td>
                <td>{followup.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No follow-up history</p>
      )}
    </div>
  );
};

export default Enquiry;
