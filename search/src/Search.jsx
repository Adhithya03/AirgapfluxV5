import React, { useState, useEffect } from 'react';
import { Book, Laptop, InformationFilled,LogoYoutube, Wikis, PlayFilled } from '@carbon/icons-react';
import { DefinitionTooltip,ExpandableTile, TileBelowTheFoldContent, ClickableTile, Search, SkeletonPlaceholder } from '@carbon/react';
import { createBrowserHistory } from "history";
import ReactMarkdown from 'react-markdown'
import './App.scss'

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


  const renderResult = (result) => (
    result["Category"] == "books" ? (
      <ExpandableTile style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
        <p class='title' style={{ "margin-bottom": "10px" }}>
          {<Book size={'25'} style={{ marginRight: '10px' }} />}
          {result.TopicName}
        </p>
        <TileBelowTheFoldContent>
          <ReactMarkdown>
            {result.Notes}
          </ReactMarkdown>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    ) : result["Category"] == "simu" ? (
      <ClickableTile style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
        <p class='title' style={{ "margin-bottom": "10px" }}>
          {<Laptop size={'25'} style={{ marginRight: '10px' }} />}
          {result.TopicName}
        </p>

      </ClickableTile>

    ) : result.Resources.length < 2 ? (
      <ExpandableTile style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
        <p class='title' style={{ "margin-bottom": "10px" }}>
          {result.TopicName}
        </p>

        <TileBelowTheFoldContent>
          <ReactMarkdown>
            {result.Notes}
          </ReactMarkdown>
        </TileBelowTheFoldContent>
      </ExpandableTile>


    ) : !result.Resources.includes('youtube.com') ? (

      <ClickableTile className="tile" style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
        <p className='title' style={{ "margin-bottom": "10px" }}>
          {result.Resources.includes('youtube.com') && <LogoYoutube size={'25'} style={{ marginRight: '10px' }} />}
          {result.TopicName}
        </p>
      </ClickableTile>


    ) : (
      <>
        <DefinitionTooltip definition={`${result.id}`}>
          <InformationFilled></InformationFilled>
        </DefinitionTooltip>
        <ClickableTile className="tile" style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
          <p className='title' style={{ "margin-bottom": "10px" }}>
            {result.Resources.includes('youtube.com/watch?v=') && <LogoYoutube size={'25'} style={{ marginRight: '10px' }} />}
            {result.TopicName}
          </p>
          <div className="image-container">
            <div className="image-wrapper">
              <img loading="lazy" src={`https://airgapflux.in/thumbnailcache/images/${result.id}.jpg`} alt="" style={{ maxWidth: "100%", height: "auto" }} />
              <PlayFilled className="play-icon" />
            </div>
          </div>
        </ClickableTile>

      </>
    )
  );

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