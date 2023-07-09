import React, { useState } from 'react';
import { ClickableTile, DefinitionTooltip, Search, Button, SkeletonPlaceholder, SkeletonText } from '@carbon/react';
import { Book, Laptop, LogoYoutube, Wikis, SearchLocate, InformationFilled } from '@carbon/icons-react';
import { Grid, ExpandableTile, TileBelowTheFoldContent, Column } from '@carbon/react';
import ReactMarkdown from 'react-markdown'
import './App.scss'


function SearchAGP() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`https://api.airgapflux.in/fetch/index.php?s=${query}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };


  const renderResult = (result) => (
    result["Category"] == "boks" ? (
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

      <ClickableTile style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
        <p class='title' style={{ "margin-bottom": "10px" }}>
          {<Wikis size={'25'} style={{ marginRight: '10px' }} />}
          {result.TopicName}
        </p>



        <img loading="lazy" src={`https://airgapflux.in/thumbnailcache/images/${result.id}.jpg`} alt="" style={{ maxWidth: "100%", height: "auto" }} />
      </ClickableTile>



    ) : (
      <>
        {/* <DefinitionTooltip definition={`${result.id}`}>
          <InformationFilled></InformationFilled>
        </DefinitionTooltip> */}

        <ClickableTile style={{ "margin-top": "10px", "margin-bottom": "10px", "max-width": "100%" }} key={result.id} href={result.Resources} target="_blank">
          <p class='title' style={{ "margin-bottom": "10px" }}>
            {result.Resources.includes('youtube.com') && <LogoYoutube size={'25'} style={{ marginRight: '10px' }} />}
            {result.TopicName}
          </p>
          <img loading="lazy" src={`https://airgapflux.in/thumbnailcache/images/${result.id}.jpg`} alt="" style={{ maxWidth: "100%", height: "auto" }} />

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
            handleSearch();
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