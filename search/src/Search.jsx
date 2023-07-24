import React, { useState, useEffect } from 'react';
import { Book, Laptop, LogoYoutube, Wikis, PlayFilled } from '@carbon/icons-react';
import { ExpandableTile, TileBelowTheFoldContent, ClickableTile, Search, SkeletonPlaceholder } from '@carbon/react';
import { createBrowserHistory } from "history";
import ReactMarkdown from 'react-markdown'
import './App.scss'
const lookupTable = {
  "oali": "Analog Electronics"
 , "basc": "Fundamentals"
 , "embs": "Embedded Systems"
 , "psop": "Power system operation"
 , "fats": "Flexible AC Transmission Systems"
 , "rees": "Renewable Energy Systems"
 , "hevs": "Hybrid Electric Vehicles"
 , "bect": "Circuit Theory"
 , "coel": "Consumer Electronics"
 , "cosy": "Control Systems"
 , "diel": "Digital Electronics"
 , "doem": "Design Of Electrical Machines"
 , "dsip": "Digital Signal Processing"
 , "edac": "Electronic Devices And Circuits"
 , "emfi": "Electromagnetic Fields"
 , "mach": "Electrical Machines"
 , "main": "Measurement and Instrumentation"
 , "mpmc": "Microprocessors"
 , "meeg": "Mechanical Engineering"
 , "phys": "Physics"
 , "plsc": "PLC and Scada"
 , "poel": "Power Electronics"
 , "posy": "Power Systems Analysis"
 , "prsw": "Protection And Switch Gear"
 , "slsd": "Solid State Drives"
 , "spem": "Special Machines"
 , "tmdt": "Transmission And Distribution",
};

function SearchAGP() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = createBrowserHistory(); // create a history object

  useEffect(() => {
    const location = history.location; // get the current URL from the history object
    const params = new URLSearchParams(location.search); // parse the query string
    const q = params.get('q'); // get the value of q parameter
    if (q) {
      setQuery(q); // set the query state
      handleSearch(q); // call your search function
    }
  }, [location]); // this is the array of dependencies

  const handleSearch = async (query) => {
    setLoading(true);
    history.push(`search?q=${query}`);
    const response = await fetch(`https://api.airgapflux.in/fetch/index.php?s=${query}`); // use query instead of query state
    const data = await response.json();
    setResults(data);
    setLoading(false);

  };

  // A function to render a tile for a resource based on its category and subject
const renderResult = (resource) => {
  // Render a tile for a book resource
  if (resource["Category"] == "books") {
    return (
      <ExpandableTile
        style={{
          "margin-top": "10px",
          "margin-bottom": "10px",
          "max-width": "100%",
        }}
        key={resource.id}
        href={resource.Resources}
        target="_blank"
      >
        <p class="title" style={{ "margin-bottom": "10px" }}>
          {<Book size={"25"} style={{ marginRight: "10px" }} />}
          {resource.TopicName}
        </p>
        <p class="subject" style={{ "font-size": "small", "color": "#808080" }}>
          {lookupTable[resource.Subject]}
        </p>
        <TileBelowTheFoldContent>
          <ReactMarkdown>{resource.Notes}</ReactMarkdown>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
  }

  // Render a tile for a simulation resource
  if (resource["Category"] == "simu") {
    return (
      <ClickableTile
        style={{
          "margin-top": "10px",
          "margin-bottom": "10px",
          "max-width": "100%",
        }}
        key={resource.id}
        href={resource.Resources}
        target="_blank"
      >
        <p class="title" style={{ "margin-bottom": "10px" }}>
          {<Laptop size={"25"} style={{ marginRight: "10px" }} />}
          {resource.TopicName}
        </p>
        <p class="subject" style={{ "font-size": "small", "color": "#808080" }}>
          {lookupTable[resource.Subject]}
        </p>
      </ClickableTile>
    );
  }

  // Render a tile for a resource with only one link
  if (resource.Resources.length < 2) {
    return (
      <ExpandableTile
        style={{
          "margin-top": "10px",
          "margin-bottom": "10px",
          "max-width": "100%",
        }}
        key={resource.id}
        href={resource.Resources}
        target="_blank"
      >
        <p class="title" style={{ "margin-bottom": "10px" }}>
          {resource.TopicName}
        </p>
        <p class="subject" style={{ "font-size": "small", "color": "#808080" }}>
          {lookupTable[resource.Subject]}
        </p>
        <TileBelowTheFoldContent>
          <ReactMarkdown>{resource.Notes}</ReactMarkdown>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
  }

  // Render a tile for a resource that is not from YouTube
  if (!resource.Resources.includes("youtube.com")) {
    return (
      <ClickableTile
        className="tile"
        style={{
          "margin-top": "10px",
          "margin-bottom": "10px",
          "max-width": "100%",
        }}
        key={resource.id}
        href={resource.Resources}
        target="_blank"
      >
        <p className="title" style={{ "margin-bottom": "10px" }}>
          {resource.Resources.includes("youtube.com") && (
            <LogoYoutube size={"25"} style={{ marginRight: "10px" }} />
          )}
          {resource.TopicName}
        </p>
        <p class="subject" style={{ "font-size": "small", "color": "#808080" }}>
          {lookupTable[resource.Subject]}
        </p>
      </ClickableTile>
    );
  }

  // Render a tile for a resource from YouTube with an image thumbnail
  return (
    <>
      <ClickableTile
        className="tile"
        style={{
          "margin-top": "10px",
          "margin-bottom": "10px",
          "max-width": "100%",
        }}
        key={resource.id}
        href={resource.Resources}
        target="_blank"
      >
        <p className="title" style={{ "margin-bottom": "10px" }}>
          {resource.Resources.includes("youtube.com/watch?v=") && (
            <LogoYoutube size={"25"} style={{ marginRight: "10px" }} />
          )}
          {resource.TopicName}
        </p>
        <p class="subject" style={{ "font-size": "small", "color": "#808080" }}>
          {lookupTable[resource.Subject]}
        </p>
        <div className="image-container">
          <div className="image-wrapper">
            <img
              loading="lazy"
              src={`https://airgapflux.in/thumbnailcache/images/${resource.id}.jpg`}
              alt=""
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <PlayFilled className="play-icon" />
          </div>
        </div>
      </ClickableTile>
    </>
  );
};


  return (
    <div className="App">
      <Search
        id="search"
        size='lg'
        labelText="Search"
        placeholder='search eg: inductor'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(query);
          }
        }}
      />

      <div className="results">
        {loading ? (
          <div className="skeleton">
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
            <SkeletonPlaceholder style={{ width: "100%", height: "300px", marginTop: "10px", marginBottom: "10px" }} />
          </div>
        ) : (
          results.map((result) => (
            renderResult(result)
          ))
        )}
      </div>


    </div>
  );
}

export default SearchAGP;