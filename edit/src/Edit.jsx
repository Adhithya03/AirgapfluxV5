import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import {
  TextInputSkeleton,
  TextArea,
  TextAreaSkeleton,
  Content,
  TextInput,
  Button,
  Search,
  Theme,
} from "@carbon/react";
import { ToastNotification } from "@carbon/react";
import { Dropdown } from "@carbon/react";

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
  Fundamentals: "basc",
  "Hybrid Electric Vehicles": "hevs",
  "Measurement and Instrumentation": "main",
  Microprocessors: "mpmc",
  "Mechanical Engineering": "meeg",
  Physics: "phys",
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

function getVideoId(resources) {
  if (resources.includes("youtube.com/watch?v=")) {
    return resources.split("=")[1];
  } else {
    return null;
  }
}

function RecordEditor() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [resources, setResources] = useState("");
  const [notes, setNotes] = useState("");

  // Define a state variable for the selected category
  const [category, setCategory] = useState("");

  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Check if the results array has any elements
    if (results.length > 0) {
      // Update the state variables with the current result object
      setId(results[index]["id"]);
      setTitle(results[index]["TopicName"]);
      setResources(results[index]["Resources"]);
      setNotes(results[index]["Notes"]);
      setCategory(results[index]["Category"]);
      setSubject(results[index]["Subject"]);
    }
  }, [index]);

  function handleSubmit() {
    const code = lookupTable[subject];

    const data = {
      id: id,
      title: title,
      resources: resources,
      notes: notes,
      category: category,
      subject: code, // Use the code here instead of the name
    };

    fetch("https://api.airgapflux.in/contribute/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setToast(
          <ToastNotification
            kind="success"
            title="Thank you!"
            subtitle={result.message}
            caption=""
            timeout={3000}
            style={{ position: "fixed", top: 100, right: 50, zIndex: 9999 }}
          />
        );
        setTimeout(() => {
          setToast(null);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setToast(
          <ToastNotification
            kind="error"
            title="Something went wrong"
            subtitle={error.message} // display the error toast message
            caption=""
            timeout={3000}
            style={{ position: "fixed", top: 100, right: 50, zIndex: 9999 }}
          />
        );
        setTimeout(() => {
          setToast(null);
        }, 3000);
      });
  }

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    const response = await fetch(
      `https://api.airgapflux.in/fetch/index.php?s=${query}`
    );
    const data = await response.json();
    setResults(data);

    if (data.length > 0) {
      setId(data[0]["id"]);
      setTitle(data[0]["TopicName"]);
      setResources(data[0]["Resources"]);
      setNotes(data[0]["Notes"]);

      // Set the category state variable with the first result object's category
      setCategory(data[0]["Category"]);
    }
    setLoading(false);
    // Get the index of the code in the values array
  };

  return (
    <Theme theme="g100">
      <Content>
        <h1>Edit Resources</h1>
        <br />
        <br />
        <Search
          id="search"
          labelText="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <br />
        <br />
        {loading && (
          <div>
            <TextInputSkeleton />
            <br />
            <br />
            <TextInputSkeleton />
            <br />
            <br />
            <TextAreaSkeleton />
          </div>
        )}
        {results.length > 0 && (
          <div>
            <TextInput
              id="title"
              labelText="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />

            <TextInput
              id="resources"
              labelText="Resources"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
            />
            <br />
            <br />

            <TextArea
              rows={10}
              labelText="Notes"
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></TextArea>
            <br />
            <br />

            <Dropdown
              id="category"
              label="Category"
              titleText="Category"
              items={["books", "simu", "reso"]} // Use the items prop to pass an array of values
              selectedItem={category} // Use the selectedItem prop to bind the selected value
              onChange={(e) => setCategory(e.selectedItem)} // Use the onChange prop to handle the selection change
            />

            <br />
            <br />
            <Dropdown
              id="subject"
              labelText="Subject"
              items={[
                "Fundamentals",
                "Analog Electronics",
                "Circuit Theory",
                "Consumer Electronics",
                "Control Systems",
                "Digital Electronics",
                "Design Of Electrical Machines",
                "Digital Signal Processing",
                "Electronic Devices And Circuits",
                "Electromagnetic Fields",
                "Electrical Machines",
                "Measurement and Instrumentation",
                "Microprocessors",
                "Mechanical Engineering",
                "PLC and Scada",
                "Power Electronics",
                "Power Systems Analysis",
                "Protection And Switch Gear",
                "Physics",
                "Solid State Drives",
                "Special Machines",
                "Transmission And Distribution",
                "Embedded Systems",
                "Power system operation",
                "Flexible AC Transmission Systems",
                "Renewable Energy Systems",
                "Hybrid Electric Vehicles",
              ]} // Use the items prop to pass an array of values
              selectedItem={subject} // Use the selectedItem prop to bind the selected value
              onChange={(e) => setSubject(e.selectedItem)} // Use the onChange prop to handle the selection change
            />

            <br />
            <br />

            <Button onClick={handleSubmit}>Submit</Button>
            <br />
            <br />
            {getVideoId(results[index]["Resources"]) && (
              <YouTube videoId={getVideoId(results[index]["Resources"])} />
            )}

            {toast}
            <Button
              kind="secondary"
              onClick={() => {
                // Decrease the index by 1 if it is not 0
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}
              // Disable the button if the index is 0
              disabled={index === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                // Increase the index by 1 if it is not the last element of the array
                if (index < results.length - 1) {
                  setIndex(index + 1);
                }
              }}
              // Disable the button if the index is the last element of the array
              disabled={index === results.length - 1}
            >
              Next
            </Button>
          </div>
        )}
      </Content>
    </Theme>
  );
}

export default RecordEditor;
