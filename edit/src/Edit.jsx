import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { TextInputSkeleton, TextArea, TextAreaSkeleton, Content, TextInput, Button, Search, Theme } from "@carbon/react";

import { ToastNotification } from "@carbon/react";


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


  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);
  useEffect(() => {
    // Check if the results array has any elements
    if (results.length > 0) {
      // Update the state variables with the current result object
      setId(results[index]["id"]);
      setTitle(results[index]["TopicName"]);
      setResources(results[index]["Resources"]);
      setNotes(results[index]["Notes"]);
    }
  }, [index]);

  function handleSubmit() {
    const data = {
      id: id,
      title: title,
      resources: resources,
      notes: notes,
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
      `https://api.airgapflux.in/fetch/index.php?s=${query}`,
    );
    const data = await response.json();
    setResults(data);

    if (data.length > 0) {
      setId(data[0]["id"]);
      setTitle(data[0]["TopicName"]);
      setResources(data[0]["Resources"]);
      setNotes(data[0]["Notes"]);
    }

    setLoading(false);
  };

  return (
    <Theme theme="g100">
      <Content>
        <h1>Edit Resources</h1>
        <br /><br />
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
            {/* Render skeleton components while loading */}
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
            {/* Use the resources state variable as the value prop and update it on change */}
            <TextInput
              id="resources"
              labelText="Resources"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
            />
            <br />
            <br />

            {/* Use the notes state variable as the value prop and update it on change */}
            <TextArea
              labelText="Notes"
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></TextArea>
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