import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TextArea, Slider, Column, Grid, TextInput, Dropdown, Button, SkeletonText } from '@carbon/react';
import {TrashCan,ArrowRight,ArrowLeft} from '@carbon/icons-react'
import './index.scss';
import './Edit.scss';


function getVideoId(resourcesLink) {
  try {
    const url = new URL(resourcesLink);
    const searchParams = new URLSearchParams(url.search);
    const videoId = searchParams.get("v");
    return videoId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const populateForm = async (id, setId, setTitle, setSubject, setConceptualRating, setType, setCategory, setNotes, setSummary, setResourcesLink, setLoading) => {
  setLoading(true);
  const response = await fetch(`https://airgapflux.in/api/contribute/index.php?id=${id}`);
  const data = await response.json();

  if (data.num_results > 0) {
    setTitle(data.TopicName);
    setSubject(data.Subject);
    setConceptualRating(parseInt(data.ConceptualRating));
    setType(data["Resource Type"] === "2" ? "Video" : "Text");


    if (data.category === "reso") {
      setCategory("Resources");
    } else if (data.category === "simu") {
      setCategory("Simulation");
    } else if (data.category === "boks") {
      setCategory("Books");
    }
    setNotes(data.Notes);
    setSummary(data.Summary);
    setResourcesLink(data.Resources);
  }
  else {
    let data = null;
    while (data === null || data.num_results === 0) {
      const response = await fetch(`https://airgapflux.in/api/contribute/index.php?id=${id}`);
      data = await response.json();
      id++;
    }
    setTitle(data.TopicName);
    setSubject(data.Subject);
    setConceptualRating(parseInt(data.ConceptualRating));
    setType(data["Resource Type"] === "2" ? "Video" : "Text");
    setCategory(data.Category);
    setNotes(data.Notes);
    setSummary(data.Summary);
    setResourcesLink(data.Resources);
    setId(id);
  }
  setLoading(false);
};


const handleDeleteClick = async () => {
  setLoading(true);
  const response = await fetch(`https://airgapflux.in/api/contribute/delete/index.php?id=${id}`);
  const data = await response.json();
  setLoading(false);
};


const EditAGP = () => {
  const [id, setId] = useState(53);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [conceptualRating, setConceptualRating] = useState(2);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [resourcesLink, setResourcesLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreviousClick = () => {
    const newId = id - 1;
    setId(newId);
    populateForm(newId, setId, setTitle, setSubject, setConceptualRating, setType, setCategory, setNotes, setSummary, setResourcesLink, setLoading);
  };

  return (
    <>
      <h1 style={{ "text-align": "center" }}>Bulk Edit Page</h1>
      <Grid>
        <Column lg={5} className="column">
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <TextInput
              id="title"
              type="text"
              labelText="Title"
              helperText="Eg: Alternator working"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <Dropdown
              id="default"
              titleText="Subject"
              helperText="This is some helper text"
              label="Select Subject"
              items={["Power Electronics", "Machine"]}
              selectedItem={subject}
              onChange={(e) => setSubject(e.selectedItem)}
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <Slider
              labelText="Conceptual Rating"
              value={conceptualRating}
              min={0}
              max={6}
              step={1}
              noValidate
              onChange={(e) => setConceptualRating(e.value)}
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <Dropdown
              id="default"
              titleText="Type"
              helperText="This is some helper text"
              label="Select Type of Resource"
              items={["Video", "Text"]}
              selectedItem={type}
              onChange={(e) => setType(e.selectedItem)}
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <Dropdown
              id="default"
              titleText="Category"
              helperText=""
              label="Select Category"
              items={["Resources", "Simulation", "Books"]}
              selectedItem={category}
              onChange={(e) => setCategory(e.selectedItem)}
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <TextArea
              labelText="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </Column>
        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <TextArea
              labelText="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          )}
        </Column>

        <Column lg={5} className="column" >
          {loading ? (
            <SkeletonText width="100%" />
          ) : (
            <TextInput
              id="title"
              type="text"
              labelText="Resources Link"
              value={resourcesLink}
              onChange={(e) => setResourcesLink(e.target.value)}
              required
            />
          )}
        </Column>

        <Column lg={5} className="column">
          <iframe
            width="460"
            height="215"
            src={`https://www.youtube.com/embed/${getVideoId(resourcesLink)}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Column>

        <Column lg={5} className="column">
          <Button
            kind="danger"
            onClick={handleDeleteClick}
          >
            <TrashCan size={18}/>
          Delete</Button>
        </Column>
        <Column lg={5} className="column">
          <Button kind="secondary" onClick={handlePreviousClick}>
            <ArrowLeft size={18}/>
            Previous
          </Button>
        </Column>
        <Column lg={5} className="column">
          <Button
            kind="primary"
            onClick={() => {
              setId(id + 1);
              populateForm(id, setId, setTitle, setSubject, setConceptualRating, setType, setCategory, setNotes, setSummary, setResourcesLink, setLoading);
            }}
          >
            Next
            <ArrowRight size={18}/>
          </Button>
        </Column>
      </Grid>
    </>
  );
};

export default EditAGP;

ReactDOM.render(<EditAGP />, document.getElementById("root"));