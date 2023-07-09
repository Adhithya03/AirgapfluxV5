import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import {
  FormGroup,
  Dropdown,
  TextInput,
  Button,
  Stack,
  Form,
  Content,
  ToastNotification,
  TextArea,
} from "@carbon/react";
// import { set } from "date-fns";


const Addresource = () => {

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setnotes] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showSucc, setSucc] = useState("");

  const handleSubjectChange = (event) => {
    setSubject(event.selectedItem);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && link && subject) {

      const lookupTable = {
        "Fundamentals": "basc",
        "Embedded Systems": "embs",
        "Power system operation": "psop",
        "Flexible AC Transmission Systems": "fats",
        "Renewable Energy Systems": "rees",
        "Hybrid Electric Vehicles": "hevs",
        "Circuit Theory": "bect",
        "Consumer Electronics": "coel",
        "Control Systems": "cosy",
        "Digital Electronics": "diel",
        "Design Of Electrical Machines": "doem",
        "Digital Signal Processing": "dsip",
        "Electronic Devices And Circuits": "edac",
        "Electromagnetic Fields": "emfi",
        "Electrical Machines": "mach",
        "Measurements": "main",
        "Microprocessors": "mpmc",
        "Analog Electronics": "oali",
        "Physics": "phys",
        "Plc And Scada": "plsc",
        "Power Electronics": "poel",
        "Power Systems": "posy",
        "Protection And Switch Gear": "prsw",
        "Solid State Drives": "slsd",
        "Special Machines": "spem",
        "Transmission And Distribution": "tmdt",
      };

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
            setSucc(data.message); // store the message from the backend
          } else {
            setShowToast(data.message); // store the error message from the backend
          }
          
          setTimeout(() => {
            setSucc("");
            setShowToast(false);
          }, 3000);
        })
      .catch(error => setShowToast(error.message)); // handle any fetch errors and store the error message
      console.log(data);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };




  return (
    <>
      <Content>
        <h1>Add Resource</h1>

        <FormGroup legendText="">
          <Form >
            <Stack gap={7}>
              {showToast && (
                <ToastNotification
                  kind="error"
                  title="Something went wrong"
                  subtitle={showToast} // display the error toast message
                  caption=""
                  timeout={3000}
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
              />
              <TextInput
                required
                id="resourcelink"
                type="text"
                labelText="Resource Link *"
                helperText="Eg: https://www.youtube.com/watch?v=PmNcRsxSovs"
                value={link}
                onChange={e => setLink(e.target.value)}
              />


              <Dropdown
                id="subject"
                titleText="Subject *"
                label="Select Subject"
                items={["Analog Electronics", "Circuit Theory", "Consumer Electronics", "Control Systems", "Digital Electronics", "Design Of Electrical Machines", "Digital Signal Processing", "Electronic Devices And Circuits", "Electromagnetic Fields", "Electrical Machines", "Fundamentals", "Measurements", "Microprocessors", "Plc And Scada", "Power Electronics", "Power Systems", "Protection And Switch Gear", "Physics", "Solid State Drives", "Special Machines", "Transmission And Distribution", "Embedded Systems",
                  "Power system operation",
                  "Flexible AC Transmission Systems",
                  "Renewable Energy Systems",
                  "Hybrid Electric Vehicles"]}
                selectedItem={subject}
                onChange={handleSubjectChange}
                required
              ></Dropdown>

              {/* <Dropdown
              id="category"
              titleText="Resource Category *"
              label="Select Category"
              items={["Books", "Resources", "Simulation"]}
              selectedItem={category}
              onChange={handleCategoryChange}
              required
            ></Dropdown>

            <Dropdown
              id="Type"
              titleText="Type of Resource *"
              label="Select Type"
              items={["Video", "Text"]}
              selectedItem={type}
              onChange={handleTypeChange}
              required
            ></Dropdown> 

              
          */}
              <TextArea labelText="Notes"
                id="notes"
                type="text"
                value={notes}
                onChange={e => setnotes(e.target.value)}
              ></TextArea>


              <TextInput
                required
                id="password"
                type="password"
                labelText="Password *"
                helperText="Password to edit/delete the resource"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Form>
        </FormGroup>

      </Content>
    </>
  );
};

export default Addresource;