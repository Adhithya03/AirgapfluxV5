import React from 'react';

import "./About.scss";


const AboutAirgapfluxPage = () => {
  return (
    <div className="container">

      <h2>AboutAirgapflux</h2>
      <div className="text">
        <p>This is the source code for <a target="_blank" href="https://airgapflux.in">this entire project</a>, can be found in <a href="https://github.com/Adhithya03/AirgapfluxV5">this github repository</a></p>

        <h2>Goal</h2>
        <p>The aim of the website is to curate electrical engineering resources which explain concepts in a way that makes students and engineers love the subject.</p>

        <h2>Acknowledgements</h2>
        <p>I dedicate this website to some of the people who continuously inspire me to pursue electrical engineering, and to whom I am very grateful. With their books, the below esteemed people have sparked and fueled my curiosity: </p>
        
        <ul>
          <li>Prof. <strong>Alexandra von Meier</strong>, author of "A Conceptual Introduction to Power Systems" and professor at UC Berkeley. <a target="_blank" href="https://www2.eecs.berkeley.edu/Faculty/Homepages/vonmeier.html">Website</a></li>
          <li><strong>Theodore Wildi</strong>, author of "Electrical Machines, Drives and Power Systems".</li>
        </ul>

        <h1>Project Technical Details</h1>

        <h2>How website search works?</h2>
        <img className="img" width="500px" loading="eager" src="./searchWorking.jpg" alt="" />

        <h2>Hosting</h2>
        <p>The website is hosted on Hostinger.in for two years, and the domain name is registered on godaddy.com for three years. The total cost so far [06-07-2023] is about $100.</p>

        <h2>Front End</h2>
        <p>The UI is based on IBM's <strong>Carbon Design System</strong> and uses React JSX with Vite as the package bundler.</p>

        <h2>Backend</h2>
        <p>The backend is built with PHP, Algolia for search functionality, and MYSQL for database management.</p>

        <h1>For Devs and Nerds</h1>
        <p>Core front-end files are located responsible for what the user is seeing on screen.</p>
        <img className="img" width="500px" loading="eager" src="./projectStructure.jpg" alt="" />

        <h3>Credits</h3>
        <p>As a hobby programmer, I am amazed by what I could achieve with the help of BING Chatbot (GPT-4) and ChatGPT for technical guidance and learning.</p>
        <p>I am very grateful to OpenAI for creating a new way of accessing knowledge like never before and to Microsoft for making it available at scale.</p>
      </div>
    </div>
  );
}

export default AboutAirgapfluxPage;
