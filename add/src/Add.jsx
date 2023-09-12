import React, { useState } from "react";
import './index.scss';
import {
  FormGroup,
  Dropdown,
  TextInput,
  Button,
  Stack,
  Form,
  ToastNotification,
  TextArea,
  Theme,
} from "@carbon/react";

const Addresource = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSucc, setSucc] = useState("");

  const lookupTable = {
    "Analog Electronics": "oali",
    "Circuit Theory": "bect",
    "Consumer Electronics": "coel",
    "Control Systems": "cosy",
    "Design Of Electrical Machines": "doem",
    "Digital Electronics": "diel",
    "Digital Signal Processing": "dsip",
    "Electrical Machines": "mach",
    "Electromagnetic Fields": "emfi",
    "Electronic Devices And Circuits": "edac",
    "Embedded Systems": "embs",
    "Flexible AC Transmission Systems": "fats",
    "Fundamentals": "basc",
    "Hybrid Electric Vehicles": "hevs",
    "Measurement and Instrumentation": "main",
    "Microprocessors": "mpmc",
    "Mechanical Engineering": "meeg",
    "Physics": "phys",
    "PLC and Scada": "plsc",
    "Power Electronics": "poel",
    "Power system operation": "psop",
    "Power Systems Analysis": "posy",
    "Protection And Switch Gear": "prsw",
    "Renewable Energy Systems": "rees",
    "Solid State Drives": "slsd",
    "Special Machines": "spem",
    "Transmission And Distribution": "tmdt",
  };

  const handleSubjectChange = (event) => {
    setSubject(event.selectedItem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && link && subject) {
      setIsSubmitting(true);

      const agpInsertEndPoint = 'https://airgapflux.in/api/insert/index.php';

      const data = {
        "subject": lookupTable[subject],
        "topicname": title,
        "resources": link,
        "notes": notes,
        "password": password,
      };

      fetch(agpInsertEndPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.success) {
            setSucc(data.message);
          } else {
            setShowToast(data.message);
          }

          setTimeout(() => {
            setSucc("");
            setShowToast(false);
            setIsSubmitting(false);
          }, 3000);
        })
        .catch(error => setShowToast(error.message));
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
 
      <Theme theme="g100">
        <h1>Add Resource</h1>
        <br />
        <br />
        <FormGroup legendText="">
          <Form>
            <Stack gap={7}>
              {showToast && (
                <ToastNotification
                  kind="error"
                  title="Something went wrong"
                  subtitle={showToast} // display the error toast message
                  caption=""
                  timeout={5000}
                  style={{ position: 'fixed', top: 100, right: 50, zIndex: 9999 }}
                />
              )}
              {showSucc && (
                <ToastNotification
                  kind="success"
                  title="Thank you!"
                  subtitle={showSucc} // display the success toast message
                  caption=""
                  timeout={3000}
                  style={{ position: 'fixed', top: 100, right: 50, zIndex: 9999 }}
                />
              )}
              <TextInput
                id="title"
                type="text"
                labelText="Title *"
                helperText="Eg: Alternator working"
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
                disabled={isSubmitting}
              />
              <TextInput
                required
                id="resourcelink"
                type="text"
                labelText="Resource Link *"
                helperText="Eg: https://www.youtube.com/watch?v=PmNcRsxSovs"
                value={link}
                disabled={isSubmitting}
                onChange={e => setLink(e.target.value)}
              />
              <Dropdown
                id="subject"
                titleText="Subject *"
                label="Select Subject"
                items={Object.keys(lookupTable)}
                selectedItem={subject}
                onChange={handleSubjectChange}
                required
                disabled={isSubmitting}
              />
              <TextArea
                labelText="Notes"
                id="notes"
                type="text"
                value={notes}
                disabled={isSubmitting}
                onChange={e => setNotes(e.target.value)}
              />
              <TextInput
                required
                id="password"
                type="password"
                labelText="Password *"
                helperText="Password to edit/delete the resource"
                value={password}
                disabled={isSubmitting}
                onChange={e => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Form>
        </FormGroup>
      </Theme>
  );
};

export default Addresource;