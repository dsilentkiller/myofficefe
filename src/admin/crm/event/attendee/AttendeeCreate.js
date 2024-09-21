import React, { useState } from "react";

const AttendeeCreate = () => {
  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    whatsapp: "",
    phone: "",
    organization: "",
    organizationDetail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendee({ ...attendee, [name]: value });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Add Attendee </h1>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={attendee.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={attendee.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input
                    type="text"
                    className="form-control"
                    name="whatsapp"
                    value={attendee.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Enter WhatsApp number"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={attendee.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Organization</label>
                  <input
                    type="text"
                    className="form-control"
                    name="organization"
                    value={attendee.organization}
                    onChange={handleInputChange}
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="form-group">
                  <label>Organization Detail</label>
                  <textarea
                    className="form-control"
                    name="organizationDetail"
                    value={attendee.organizationDetail}
                    onChange={handleInputChange}
                    placeholder="Enter organization detail"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Attendee
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttendeeCreate;
