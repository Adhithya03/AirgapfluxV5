import React, { useState } from "react";
import {TextArea, Content, TextInput, Button, Search, Theme } from "@carbon/react";

function RecordEditor() {

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [resources, setResources] = useState("");
  const [notes, setNotes] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.airgapflux.in/fetch/index.php?s=${query}`,
    );
    const data = await response.json();
    setResults(data);

    setId(data[0]["id"]);
    setTitle(data[0]["TopicName"]);
    setResources(data[0]["Resources"]);
    setNotes(data[0]["Notes"]);

    setLoading(false);
  };

  return (
    <Theme theme="g100">
    <Content>
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
      {loading && <p>Loading...</p>}
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
            labelText="Notes"
            id="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></TextArea>
  
          <br />
          <br />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </Content>
</Theme>
  );
}

export default RecordEditor;