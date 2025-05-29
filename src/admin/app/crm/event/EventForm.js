import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../../../redux/slice/admin/crm/eventSlice"; // Adjust path as needed
// import "../../../css/crm/en";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneInput from "react-phone-input-2";

const EventForm = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    organization_name: "",
    organization_address: "",
    start: null,
    end: null,
    attendees: [],
  });

  const [errors, setErrors] = useState({});
  const [phoneValid, setPhoneValid] = useState(true);

  // Handle adding a new attendee
  const handleAddAttendee = () => {
    setEventData((prevData) => ({
      ...prevData,
      attendees: [...prevData.attendees, { name: "", email: "", pri_phone: "" }],
    }));
  };

  // Handle attendee input changes
  const handleAttendeeChange = (index, field, value) => {
    const updatedAttendees = [...eventData.attendees];
    updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };

    if (field === "pri_phone") {
      const phoneLength = value.replace(/\D/g, "").length;
      if (phoneLength >= 10 && phoneLength <= 15) {
        setErrors((prev) => ({ ...prev, [`attendee_${index}_pri_phone`]: undefined }));
        setPhoneValid(true);
        handleSave(); // Automatically submit when phone number is valid
      } else {
        setErrors((prev) => ({
          ...prev,
          [`attendee_${index}_pri_phone`]: "Enter a valid phone number (10-15 digits).",
        }));
        setPhoneValid(false);
      }
    }
    setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
  };

  // Handle removing an attendee
  const handleRemoveAttendee = (index) => {
    const updatedAttendees = eventData.attendees.filter((_, i) => i !== index);
    setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    if (!eventData.title) newErrors.title = "Event title is required";
    if (!eventData.start) newErrors.start = "Start date is required";
    if (!eventData.end) newErrors.end = "End date is required.";
    if (eventData.end && eventData.start > eventData.end) {
      newErrors.end = "End date cannot be earlier than start date.";
    }
    eventData.attendees.forEach((attendee, index) => {
      if (!attendee.name) newErrors[`attendee_${index}_name`] = "Attendee name is required.";
      if (!attendee.email) newErrors[`attendee_${index}_email`] = "Attendee email is required.";

      const phoneLength = attendee.pri_phone.replace(/\D/g, "").length;
      if (!attendee.pri_phone || phoneLength < 10 || phoneLength > 15) {
        newErrors[`attendee_${index}_pri_phone`] = "Enter a valid phone number (10-15 digits).";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save event
  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      await dispatch(
        createEvent({
          ...eventData,
          start: eventData.start.toISOString(),
          end: eventData.end.toISOString(),
          attendees: eventData.attendees.map(({ name, email, pri_phone }) => ({
            name,
            email,
            pri_phone
          })),
        })
      ).unwrap();

      toast.success("Event created successfully!");
      handleClose();
    } catch (error) {
      toast.error(`Error creating event: ${error.message || error}`);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" className="event-modal">
        <Modal.Header closeButton>
          <Modal.Title className="event-modal-title">Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Event Title */}
            <Form.Group controlId="eventTitle" className="mb-6">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={eventData.title || ""}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
                className="event-form-input"
              />
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="eventDescription" className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={eventData.description || ""}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
                className="event-form-input"
              />
            </Form.Group>

            {/* Organization Name */}
            <Form.Group controlId="organizationName" className="mb-4">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization name"
                value={eventData.organization_name || ""}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    organization_name: e.target.value,
                  }))
                }
                className="event-form-input"
              />
            </Form.Group>

            {/* Organization Address */}
            <Form.Group controlId="organizationAddress" className="mb-4">
              <Form.Label>Organization Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization address"
                value={eventData.organization_address || ""}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    organization_address: e.target.value,
                  }))
                }
                className="event-form-input"
              />
            </Form.Group>

            {/* Attendees */}
            <Form.Group controlId="eventAttendees" className="d-flex  justify-content-between mb-2">
              <Form.Label>Attendees</Form.Label>
              {eventData.attendees.map((attendee, index) => (
                <Row key={index} className="mb-3">
                  <Col md={10}>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={attendee.name}
                      onChange={(e) =>
                        handleAttendeeChange(index, "name", e.target.value)
                      }
                      isInvalid={!!errors[`attendee_${index}_name`]}
                    />
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={attendee.email}
                      onChange={(e) =>
                        handleAttendeeChange(index, "email", e.target.value)
                      }
                      isInvalid={!!errors[`attendee_${index}_email`]}
                    />
                  </Col>
                  <Col md={10}>
                    <PhoneInput
                      country={"np"} // Country code for Nepal
                      value={attendee.pri_phone}
                      onChange={(value) =>
                        handleAttendeeChange(index, "pri_phone", value)
                      }
                      inputStyle={{
                        width: "100%",
                        borderColor: errors[`attendee_${index}_pri_phone`] ? "red" : "green",
                      }}
                    />
                    {errors[`attendee_${index}_pri_phone`] && (
                      <p style={{ color: "red" }}>{errors[`attendee_${index}_pri_phone`]}</p>
                    )}
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveAttendee(index)}
                    >
                      <AiOutlineMinus />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button variant="primary" onClick={handleAddAttendee}>
                <AiOutlinePlus /> Add Attendee
              </Button>
            </Form.Group>

            {/* Start Date */}
            <Form.Group controlId="eventStart" className="mb-4">
              <Form.Label>Start Date & Time</Form.Label>
              <DatePicker
                selected={eventData.start || null}
                onChange={(date) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    start: date,
                  }))
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select start date and time"
                className="form-control event-date-picker"
              />
            </Form.Group>

            {/* End Date */}
            <Form.Group controlId="eventEnd" className="mb-4">
              <Form.Label>End Date & Time</Form.Label>
              <DatePicker
                selected={eventData.end || null}
                onChange={(date) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    end: date,
                  }))
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select end date and time"
                className="form-control event-date-picker"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="event-modal-close-btn"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="event-modal-save-btn"
          >
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventForm;



// import React, { useState, useEffect } from "react";
// import { Button, Form, Modal,Col ,Row} from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent } from "../../../redux/slice/admin/crm/eventSlice"; // Adjust path as needed
// import "../../css/eventForm.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-input-2";

// const EventForm = ({ handleClose, show }) => {
//   const dispatch = useDispatch();
//   const [toggle, setToggle] = useState(false);
//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     organization_name: "",
//     organization_address: "",
//     start: null,
//     end: null,
//     attendees: [],
//   });

//   const [errors, setErrors] = useState({});
//  const [phoneValid, setPhoneValid] = useState(true);

//   // Handle adding a new attendee
//   const handleAddAttendee = () => {
//     setEventData((prevData) => ({
//       ...prevData,
//       attendees: [...prevData.attendees, { name: "", email: "",pri_phone:"" }],
//     }));
//   };

//   // Handle attendee input changes
//   const handleAttendeeChange = (index, field, value) => {
//     const updatedAttendees = [...eventData.attendees];
//     updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
//     setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
//   };

//   // Handle removing an attendee
//   const handleRemoveAttendee = (index) => {
//     const updatedAttendees = eventData.attendees.filter((_, i) => i !== index);
//     setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
//   };

//   // Validate form fields
//   const validateFields = () => {
//     const newErrors = {};
//     if (!eventData.title) newErrors.title = "Event title is required";
//     if (!eventData.start) newErrors.start = "Start date is required";
//     //added
//     if (!eventData.end) newErrors.end = "End date is required.";
//     if (eventData.end && eventData.start > eventData.end) {
//       newErrors.end = "End date cannot be earlier than start date.";
//     }
//     eventData.attendees.forEach((attendee, index) => {
//       if (!attendee.name)
//         newErrors[`attendee_${index}_name`] = "Attendee name is required.";
//       if (!attendee.email)
//         newErrors[`attendee_${index}_email`] = "Attendee email is required.";
//       if (!attendee.pri_phone)
//         newErrors[`attendee_${index}_pri_phone`] = "Attendee phone is required.";
//     });
//     //added end
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   // pri_phone number validate
//   const validatePhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setEventData({ ...eventData, pri_phone: value });
//   };
//   const handleClick = () => {
//     setToggle((prev) => !prev);
//   };
//   const handleSave = async () => {
//     if (!validateFields()) return;

//     try {
//       await dispatch(
//         createEvent({
//           ...eventData,
//           start: eventData.start.toISOString(),
//           end: eventData.end.toISOString(),
//           attendees: eventData.attendees.map(({ name, email,pri_phone }) => ({
//             name,
//             email,
//             pri_phone
//           })),
//         })
//       ).unwrap();

//       toast.success("Event created successfully!");
//       handleClose();
//     } catch (error) {
//       toast.error(`Error creating event: ${error.message || error}`);
//     }
//   };



//   return (
//     <Modal show={show} onHide={handleClose} className="event-modal">
//       <Modal.Header closeButton>
//         <Modal.Title className="event-modal-title">Create Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           {/* Event Title */}
//           <Form.Group controlId="eventTitle" className="mb-6">
//             <Form.Label>Event Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter event title"
//               value={eventData.title || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   title: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Description */}
//           <Form.Group controlId="eventDescription" className="mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter description"
//               value={eventData.description || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   description: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Organization Name */}
//           <Form.Group controlId="organizationName" className="mb-4">
//             <Form.Label>Organization Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter organization name"
//               value={eventData.organization_name || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   organization_name: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Organization Address */}
//           <Form.Group controlId="organizationAddress" className="mb-4">
//             <Form.Label>Organization Address</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter organization address"
//               value={eventData.organization_address || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   organization_address: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>


//           {/* Attendees */}
//           <Form.Group controlId="eventAttendees" className="mb-4">
//             <Form.Label>Attendees</Form.Label>
//             {eventData.attendees.map((attendee, index) => (
//               <Row key={index} className="mb-3">
//                 <Col md={4}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Name"
//                     value={attendee.name}
//                     onChange={(e) =>
//                       handleAttendeeChange(index, "name", e.target.value)
//                     }
//                     isInvalid={!!errors[`attendee_${index}_name`]}
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <Form.Control
//                     type="email"
//                     placeholder="Email"
//                     value={attendee.email}
//                     onChange={(e) =>
//                       handleAttendeeChange(index, "email", e.target.value)
//                     }
//                     isInvalid={!!errors[`attendee_${index}_email`]}
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <PhoneInput
//                     country={"np"} // Country code for Nepal
//                     value={attendee.pri_phone}
//                     onChange={(value) =>
//                       handleAttendeeChange(index, "pri_phone", value)
//                     }
//                     inputStyle={{
//                       width: "100%",
//                       borderColor: phoneValid ? "green" : "red",
//                       backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                     }}
//                   />
//                   {!phoneValid && (
//                     <p style={{ color: "red" }}>
//                       Please enter a valid phone number between 10 and 15 digits.
//                     </p>
//                   )}
//                 </Col>
//                 <Col md={1}>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleRemoveAttendee(index)}
//                   >
//                     <AiOutlineMinus />
//                   </Button>
//                 </Col>
//               </Row>
//             ))}
//             <Button variant="primary" onClick={handleAddAttendee}>
//               <AiOutlinePlus /> Add Attendee
//             </Button>
//           </Form.Group>


//           {/* Start Date */}

//           <Form.Group controlId="eventStart" className="mb-4">
//             <Form.Label>Start Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.start || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   start: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select start date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>

//           {/* End Date */}
//           <Form.Group controlId="eventEnd" className="mb-4">
//             <Form.Label>End Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.end || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   end: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select end date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-between">
//         <Button
//           variant="outline-secondary"
//           onClick={handleClose}
//           className="event-modal-close-btn"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSave}
//           className="event-modal-save-btn"
//         >
//           Save Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EventForm;

//// 2 ND create form for event with old phone and email and name and new design
// import React, { useState, useEffect } from "react";
// import { Button, Form, Modal,Col ,Row} from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent } from "../../../redux/slice/admin/crm/eventSlice"; // Adjust path as needed
// import "../../css/eventForm.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-input-2";

// const EventForm = ({ handleClose, show }) => {
//   const dispatch = useDispatch();
//   const [toggle, setToggle] = useState(false);
//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     organization_name: "",
//     organization_address: "",
//     start: null,
//     end: null,
//     attendees: [],
//   });

//   const [errors, setErrors] = useState({});
//  const [phoneValid, setPhoneValid] = useState(true);

//   // Handle adding a new attendee
//   const handleAddAttendee = () => {
//     setEventData((prevData) => ({
//       ...prevData,
//       attendees: [...prevData.attendees, { name: "", email: "",pri_phone:"" }],
//     }));
//   };

//   // Handle attendee input changes
//   const handleAttendeeChange = (index, field, value) => {
//     const updatedAttendees = [...eventData.attendees];
//     updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
//     setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
//   };

//   // Handle removing an attendee
//   const handleRemoveAttendee = (index) => {
//     const updatedAttendees = eventData.attendees.filter((_, i) => i !== index);
//     setEventData((prevData) => ({ ...prevData, attendees: updatedAttendees }));
//   };

//   // Validate form fields
//   const validateFields = () => {
//     const newErrors = {};
//     if (!eventData.title) newErrors.title = "Event title is required";
//     if (!eventData.start) newErrors.start = "Start date is required";
//     //added
//     if (!eventData.end) newErrors.end = "End date is required.";
//     if (eventData.end && eventData.start > eventData.end) {
//       newErrors.end = "End date cannot be earlier than start date.";
//     }
//     eventData.attendees.forEach((attendee, index) => {
//       if (!attendee.name)
//         newErrors[`attendee_${index}_name`] = "Attendee name is required.";
//       if (!attendee.email)
//         newErrors[`attendee_${index}_email`] = "Attendee email is required.";
//       if (!attendee.pri_phone)
//         newErrors[`attendee_${index}_pri_phone`] = "Attendee phone is required.";
//     });
//     //added end
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   // pri_phone number validate
//   const validatePhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setEventData({ ...eventData, pri_phone: value });
//   };
//   const handleClick = () => {
//     setToggle((prev) => !prev);
//   };
//   const handleSave = async () => {
//     if (!validateFields()) return;

//     try {
//       await dispatch(
//         createEvent({
//           ...eventData,
//           start: eventData.start.toISOString(),
//           end: eventData.end.toISOString(),
//           attendees: eventData.attendees.map(({ name, email,pri_phone }) => ({
//             name,
//             email,
//             pri_phone
//           })),
//         })
//       ).unwrap();

//       toast.success("Event created successfully!");
//       handleClose();
//     } catch (error) {
//       toast.error(`Error creating event: ${error.message || error}`);
//     }
//   };



//   return (
//     <Modal show={show} onHide={handleClose} className="event-modal">
//       <Modal.Header closeButton>
//         <Modal.Title className="event-modal-title">Create Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           {/* Event Title */}
//           <Form.Group controlId="eventTitle" className="mb-6">
//             <Form.Label>Event Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter event title"
//               value={eventData.title || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   title: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Description */}
//           <Form.Group controlId="eventDescription" className="mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter description"
//               value={eventData.description || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   description: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Organization Name */}
//           <Form.Group controlId="organizationName" className="mb-4">
//             <Form.Label>Organization Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter organization name"
//               value={eventData.organization_name || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   organization_name: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Organization Address */}
//           <Form.Group controlId="organizationAddress" className="mb-4">
//             <Form.Label>Organization Address</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter organization address"
//               value={eventData.organization_address || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   organization_address: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Attendees */}
//           {/* <Form.Group controlId="eventAttendees" className="mb-4">
//             <Form.Label>Attendees</Form.Label>

//             {eventData.attendees.map((attendee, index) => (
//               <div key={index} className="d-flex align-items-center mb-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Name"
//                   value={attendee.name}
//                   onChange={(e) =>
//                     handleAttendeeChange(index, "name", e.target.value)
//                   }
//                   isInvalid={!!errors[`attendee_${index}_name`]} // Ensure proper error key
//                 />
//                 <Form.Control
//                   type="email"
//                   placeholder="Email"
//                   value={attendee.email}
//                   onChange={(e) =>
//                     handleAttendeeChange(index, "email", e.target.value)
//                   }
//                   isInvalid={!!errors[`attendee_${index}_email`]} // Ensure proper error key
//                 />

//                       <div className="form-group">
//                         <PhoneInput
//                           country={"np"} // Country code for Nepal
//                           value={eventData.pri_phone}
//                           onChange={validatePhoneNumber}
//                           inputStyle={{
//                             width: "100%",
//                             borderColor: phoneValid ? "green" : "red",
//                             backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                           }}
//                         />
//                         {!phoneValid && (
//                           <p style={{ color: "red" }}>
//                             Please enter a valid phone number between 10 and 15
//                             digits.
//                           </p>
//                         )}

//                       {errors.pri_phone && <p>{errors.pri_phone}</p>}
//                     </div>

//                 <Button
//                   variant="danger"
//                   onClick={() => handleRemoveAttendee(index)}
//                 >
//                   <AiOutlineMinus />
//                 </Button>
//               </div>
//             ))}
//           </Form.Group> */}

//           {/* Attendees */}
//           <Form.Group controlId="eventAttendees" className="mb-4">
//             <Form.Label>Attendees</Form.Label>
//             {eventData.attendees.map((attendee, index) => (
//               <Row key={index} className="mb-3">
//                 <Col md={4}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Name"
//                     value={attendee.name}
//                     onChange={(e) =>
//                       handleAttendeeChange(index, "name", e.target.value)
//                     }
//                     isInvalid={!!errors[`attendee_${index}_name`]}
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <Form.Control
//                     type="email"
//                     placeholder="Email"
//                     value={attendee.email}
//                     onChange={(e) =>
//                       handleAttendeeChange(index, "email", e.target.value)
//                     }
//                     isInvalid={!!errors[`attendee_${index}_email`]}
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <PhoneInput
//                     country={"np"} // Country code for Nepal
//                     value={attendee.pri_phone}
//                     onChange={(value) =>
//                       handleAttendeeChange(index, "pri_phone", value)
//                     }
//                     inputStyle={{
//                       width: "100%",
//                       borderColor: phoneValid ? "green" : "red",
//                       backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                     }}
//                   />
//                   {!phoneValid && (
//                     <p style={{ color: "red" }}>
//                       Please enter a valid phone number between 10 and 15 digits.
//                     </p>
//                   )}
//                 </Col>
//                 <Col md={1}>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleRemoveAttendee(index)}
//                   >
//                     <AiOutlineMinus />
//                   </Button>
//                 </Col>
//               </Row>
//             ))}
//             <Button variant="primary" onClick={handleAddAttendee}>
//               <AiOutlinePlus /> Add Attendee
//             </Button>
//           </Form.Group>

//           {/* <Button variant="primary" onClick={handleAddAttendee}>
//             <AiOutlinePlus /> Add Attendee
//           </Button> */}

//           {/* Start Date */}

//           <Form.Group controlId="eventStart" className="mb-4">
//             <Form.Label>Start Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.start || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   start: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select start date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>

//           {/* End Date */}
//           <Form.Group controlId="eventEnd" className="mb-4">
//             <Form.Label>End Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.end || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   end: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select end date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-between">
//         <Button
//           variant="outline-secondary"
//           onClick={handleClose}
//           className="event-modal-close-btn"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSave}
//           className="event-modal-save-btn"
//         >
//           Save Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EventForm;
// 1 ST ===============================
// import React, { useState, useEffect } from "react";
// import { Button, Form, Modal } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import "../../css/eventForm.css"; // Custom CSS file for additional styling

// const EventForm = ({
//   eventData,
//   setEventData,
//   handleClose,
//   handleSaveEvent,
//   show,
// }) => {
//   // State for attendees - each attendee will have a name and email
//   const [attendees, setAttendees] = useState(eventData.attendees || []);

//   const dispatch = useDispatch();

//   // Handle adding a new attendee (name and email)
//   const handleAddAttendee = () => {
//     setAttendees((prev) => [
//       ...prev,
//       { name: "", email: "", id: Date.now() }, // Temporary ID using timestamp
//     ]);
//   };

//   // Handle attendee input changes
//   const handleAttendeeChange = (index, field, value) => {
//     const updatedAttendees = [...attendees];
//     updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
//     setAttendees(updatedAttendees);
//   };

//   // Handle removing an attendee
//   const handleRemoveAttendee = (index) => {
//     const updatedAttendees = attendees.filter((_, i) => i !== index);
//     setAttendees(updatedAttendees);
//   };

//   // Handle form submission
//   const handleSave = () => {
//     const eventToSave = {
//       title: eventData.title,
//       start: eventData.start.toISOString(),
//       end: eventData.end.toISOString(),
//       attendees: attendees, // Store full attendee objects
//       notes: eventData.notes || "",
//     };

//     handleSaveEvent(eventToSave)
//       .then((response) => {
//         console.log("Event saved successfully", response);
//       })
//       .catch((error) => {
//         console.error(
//           "Error saving event:",
//           error.response?.data || error.message
//         );
//         alert(
//           `Error saving event: ${error.response?.data?.error || error.message}`
//         );
//       });
//   };

//   return (
//     <Modal show={show} onHide={handleClose} className="event-modal">
//       <Modal.Header closeButton>
//         <Modal.Title className="event-modal-title">Create Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           {/* Event Title */}
//           <Form.Group controlId="eventTitle" className="mb-4">
//             <Form.Label>Event Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter event title"
//               value={eventData.title || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   title: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Notes */}
//           <Form.Group controlId="eventNotes" className="mb-4">
//             <Form.Label>Notes</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter notes"
//               value={eventData.notes || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   notes: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           {/* Attendees */}
//           <Form.Group controlId="eventAttendees" className="mb-4">
//             <Form.Label>Attendees</Form.Label>
//             {attendees.map((attendee, index) => (
//               <div
//                 key={attendee.id}
//                 className="d-flex align-items-center mb-2 attendee-row"
//               >
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter attendee name"
//                   value={attendee.name}
//                   onChange={(e) =>
//                     handleAttendeeChange(index, "name", e.target.value)
//                   }
//                   className="attendee-name-input"
//                 />
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter attendee email"
//                   value={attendee.email}
//                   onChange={(e) =>
//                     handleAttendeeChange(index, "email", e.target.value)
//                   }
//                   className="attendee-email-input ms-2"
//                 />
//                 <Button
//                   variant="outline-danger"
//                   className="ms-2 attendee-remove-btn"
//                   onClick={() => handleRemoveAttendee(index)}
//                 >
//                   <AiOutlineMinus />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               variant="outline-primary"
//               onClick={handleAddAttendee}
//               className="add-attendee-btn"
//             >
//               <AiOutlinePlus /> Add Attendee
//             </Button>
//           </Form.Group>

//           {/* Start Date */}
//           <Form.Group controlId="eventStart" className="mb-4">
//             <Form.Label>Start Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.start || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   start: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select start date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>

//           {/* End Date */}
//           <Form.Group controlId="eventEnd" className="mb-4">
//             <Form.Label>End Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.end || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   end: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select end date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-between">
//         <Button
//           variant="outline-secondary"
//           onClick={handleClose}
//           className="event-modal-close-btn"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSave}
//           className="event-modal-save-btn"
//         >
//           Save Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EventForm;

// multiple attendee to save db
// import React, { useState, useEffect } from "react";
// import { Button, Form, Modal } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { fetchAttendees } from "../../../redux/slice/admin/crm/attendeeSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import "../../css/eventForm.css"; // Custom CSS file for additional styling

// const EventForm = ({
//   eventData,
//   setEventData,
//   handleClose,
//   handleSaveEvent,
//   show,
// }) => {
//   const [attendeeIds, setAttendeeIds] = useState(
//     eventData.attendees?.map((attendee) => attendee.id) || []
//   );

//   const dispatch = useDispatch();

//   const handleSelectAttendee = (index, value) => {
//     const updatedAttendeeIds = [...attendeeIds];
//     updatedAttendeeIds[index] = value; // This should correctly set the attendee ID
//     setAttendeeIds(updatedAttendeeIds);
//   };
//   useEffect(() => {
//     dispatch(fetchAttendees());
//   }, [dispatch]);

//   const {
//     list: existingAttendees = [],
//     isLoading,
//     error,
//   } = useSelector((state) => state.attendees || {});

//   useEffect(() => {
//     setAttendeeIds(eventData.attendees?.map((attendee) => attendee.id) || []);
//   }, [eventData]);

//   const handleRemoveAttendee = (index) => {
//     const updatedAttendeeIds = attendeeIds.filter((_, i) => i !== index);
//     setAttendeeIds(updatedAttendeeIds);
//   };

//   const handleAddAttendee = () => {
//     setAttendeeIds((prev) => [...prev, ""]);
//   };

//   if (isLoading) return <p>Loading attendees...</p>;
//   if (error) return <p>Error loading attendees: {error}</p>;

//   const handleSave = () => {
//     const selectedAttendees = attendeeIds
//       .filter((id) => id)
//       .map((id) => {
//         const attendee = existingAttendees.find(
//           (att) => att.id === parseInt(id, 10)
//         );
//         return attendee ? attendee.id : null;
//       })
//       .filter(Boolean);

//     const eventToSave = {
//       title: eventData.title,
//       start: eventData.start.toISOString(),
//       end: eventData.end.toISOString(),
//       attendees: selectedAttendees, // IDs to save
//       notes: eventData.notes || "",
//     };

//     handleSaveEvent(eventToSave)
//       .then((response) => {
//         console.log("Event saved successfully", response);
//       })
//       .catch((error) => {
//         console.error(
//           "Error saving event:",
//           error.response?.data || error.message
//         );
//         alert(
//           `Error saving event: ${error.response?.data?.error || error.message}`
//         );
//       });
//   };

//   return (
//     <Modal show={show} onHide={handleClose} className="event-modal">
//       <Modal.Header closeButton>
//         <Modal.Title className="event-modal-title">Create Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="eventTitle" className="mb-4">
//             <Form.Label>Event Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter event title"
//               value={eventData.title || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   title: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           <Form.Group controlId="eventNotes" className="mb-4">
//             <Form.Label>Notes</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter notes"
//               value={eventData.notes || ""}
//               onChange={(e) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   notes: e.target.value,
//                 }))
//               }
//               className="event-form-input"
//             />
//           </Form.Group>

//           <Form.Group controlId="eventAttendees" className="mb-4">
//             <Form.Label>Attendees</Form.Label>
//             {attendeeIds.map((attendeeId, index) => (
//               <div
//                 key={index}
//                 className="d-flex align-items-center mb-2 attendee-row"
//               >
//                 <Form.Control
//                   as="select"
//                   value={attendeeId}
//                   onChange={(e) => handleSelectAttendee(index, e.target.value)}
//                   className="attendee-select"
//                 >
//                   <option value="">Select Attendee</option>
//                   {existingAttendees.map((existingAttendee) => (
//                     <option
//                       key={existingAttendee.id}
//                       value={existingAttendee.id}
//                     >
//                       {existingAttendee.attendee_name} -{" "}
//                       {existingAttendee.email}
//                     </option>
//                   ))}
//                 </Form.Control>
//                 <Button
//                   variant="outline-danger"
//                   className="ms-2 attendee-remove-btn"
//                   onClick={() => handleRemoveAttendee(index)}
//                 >
//                   <AiOutlineMinus />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               variant="outline-primary"
//               onClick={handleAddAttendee}
//               className="add-attendee-btn"
//             >
//               <AiOutlinePlus /> Add Attendee
//             </Button>
//           </Form.Group>

//           <Form.Group controlId="eventStart" className="mb-4">
//             <Form.Label>Start Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.start || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   start: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select start date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>

//           <Form.Group controlId="eventEnd" className="mb-4">
//             <Form.Label>End Date & Time</Form.Label>
//             <DatePicker
//               selected={eventData.end || null}
//               onChange={(date) =>
//                 setEventData((prevData) => ({
//                   ...prevData,
//                   end: date,
//                 }))
//               }
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               dateFormat="MMMM d, yyyy h:mm aa"
//               placeholderText="Select end date and time"
//               className="form-control event-date-picker"
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-between">
//         <Button
//           variant="outline-secondary"
//           onClick={handleClose}
//           className="event-modal-close-btn"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSave}
//           className="event-modal-save-btn"
//         >
//           Save Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EventForm;
