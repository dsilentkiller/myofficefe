import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";

const EnquiryDetail = () => {
  const { id } = useParams();
  const [enquiryDetail, setEnquiryDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchEnquiryDetail = async () => {
  //     try {
  //       const response = await axios.get(`/api/enquiry/${id}/`);
  //       setEnquiryDetail(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };
  //   fetchEnquiryDetail();
  // }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Enquiry Details</h3>
      <p>Customer Name: {enquiryDetail.enquiry.customer_name}</p>
      <p>Phone: {enquiryDetail.enquiry.pri_phone}</p>
      {/* Other fields */}

      <h4>Follow-up History</h4>
      {enquiryDetail.followups.length > 0 ? (
        enquiryDetail.followups.map((followup, index) => (
          <div key={index}>
            <p>{followup.note}</p>
            <p>{followup.date}</p>
          </div>
        ))
      ) : (
        <p>No follow-up history</p>
      )}
    </div>
  );
};

export default EnquiryDetail;
