import React, { useEffect, useState } from "react";
import {
  Content,
  Accordion,
  AccordionItem,
  Link,
  AccordionSkeleton,
} from "@carbon/react";
import { Book, LogoYoutube } from "@carbon/icons-react";
import ReactMarkdown from "react-markdown";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";

const subjects = [
  { Subject: "basc" },
  { Subject: "oali" },
  { Subject: "bect" },
  { Subject: "coel" },
  { Subject: "cosy" },
  { Subject: "diel" },
  { Subject: "doem" },
  { Subject: "dsip" },
  { Subject: "edac" },
  { Subject: "emfi" },
  { Subject: "embs" },
  { Subject: "mach" },
  { Subject: "fats" },
  { Subject: "hevs" },
  { Subject: "main" },
  { Subject: "mpmc" },
  { Subject: "meeg" },
  { Subject: "phys" },
  { Subject: "plsc" },
  { Subject: "psop" },
  { Subject: "poel" },
  { Subject: "posy" },
  { Subject: "prsw" },
  { Subject: "rees" },
  { Subject: "slsd" },
  { Subject: "spem" },
  { Subject: "tmdt" },
];

const lookupTable = {
  oali: "Analog Electronics",
  basc: "Fundamentals",
  embs: "Embedded Systems",
  psop: "Power system operation",
  fats: "Flexible AC Transmission Systems",
  rees: "Renewable Energy Systems",
  hevs: "Hybrid Electric Vehicles",
  bect: "Circuit Theory",
  coel: "Consumer Electronics",
  cosy: "Control Systems",
  diel: "Digital Electronics",
  doem: "Design Of Electrical Machines",
  dsip: "Digital Signal Processing",
  edac: "Electronic Devices And Circuits",
  emfi: "Electromagnetic Fields",
  mach: "Electrical Machines",
  main: "Measurement and Instrumentation",
  mpmc: "Microprocessors",
  meeg: "Mechanical Engineering",
  phys: "Physics",
  plsc: "PLC and Scada",
  poel: "Power Electronics",
  posy: "Power Systems Analysis",
  prsw: "Protection And Switch Gear",
  slsd: "Solid State Drives",
  spem: "Special Machines",
  tmdt: "Transmission And Distribution",
};

const getAirgapfluxUrl = (topicName) => {
  const encodedTopicName = encodeURIComponent(topicName);
  return `https://airgapflux.in?s=${encodedTopicName}`;
};

const ExplorePage = () => {
  const [resources, setResources] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState([]); // create a new state variable for simulations

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await fetch(
        "https://api.airgapflux.in/fetch/videos.php"
      );
      const data1 = await response1.json();
      setResources(data1);
      const response2 = await fetch(
        "https://api.airgapflux.in/fetch/books.php"
      );
      const data2 = await response2.json();
      setBooks(data2);
      const response3 = await fetch(
        "https://api.airgapflux.in/fetch/simulations.php"
      ); // fetch the simulations data from the API
      const data3 = await response3.json();
      setSimulations(data3); // store the simulations data in the state variable
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  return (
    <>
      <Content>
        {" "}
        <h1 id="videos" className="h1">
          Explore Our Resources
        </h1>
        <br />
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Video Resources</Tab>
            <Tab>Suggested Books</Tab>
            <Tab>Simulations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h3 className="h3">
                <LogoYoutube size={20} /> Video Resources
              </h3>
              <p className="note">
                Video resources are from youtube and are listed in a hope that
                will make you love the subjects.
              </p>
              <br />
              {loading ? (
                <AccordionSkeleton open={false} count={26} />
              ) : (
                <Accordion>
                  {subjects
                    .filter(
                      (subject) =>
                        resources.some(
                          (resource) => resource.Subject === subject.Subject
                        ) // filter out the subjects that have no resources
                    )
                    .map((subject) => (
                      <AccordionItem
                        title={lookupTable[subject.Subject]}
                        key={subject.id}
                      >
                        <ul key={subject.id}>
                          {resources
                            .filter(
                              (resource) => resource.Subject === subject.Subject
                            )
                            .map((resource) => (
                              <div className="indvidialList">
                                <li key={resource.id}>
                                  <Link
                                    key={resource.id}
                                    href={resource.Resources}
                                  >
                                    {resource.TopicName}
                                  </Link>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </TabPanel>
            <TabPanel>
              <h3 id="books" className="h3">
                <Book size={20} /> Books suggested
              </h3>

              <p className="note">
                These books are for conceptual learning and are listed in a hope
                that will make you love the subjects. you can search for the
                book in google/amazon/bookswagon "author + subject name" to buy
                it. (here only author name is given)
                <br />
              </p>
              <br />
              <br />
              {loading ? (
                <AccordionSkeleton open={false} count={13} />
              ) : (
                <Accordion>
                  {subjects
                    .filter(
                      (subject) =>
                        books.some((book) => book.Subject === subject.Subject) // filter out the subjects that have no books
                    )
                    .map((subject) => (
                      <AccordionItem
                        open={false}
                        title={lookupTable[subject.Subject]}
                        key={subject.id}
                      >
                        <ul key={subject.id}>
                          {books
                            .filter((book) => book.Subject === subject.Subject)
                            .map((book) => (
                              <div className="indvidialList">
                                <li key={book.id}>
                                  <ReactMarkdown>{book.Notes}</ReactMarkdown>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </TabPanel>
            <TabPanel>
              {" "}
              <h3 className="h3">Simulations</h3>
              These simulations are for practical learning and are listed in a
              hope that will make you enjoy the subjects.
              <br />
              <br />
              {loading ? (
                <AccordionSkeleton open={false} count={26} />
              ) : (
                <Accordion>
                  {subjects
                    .filter(
                      (subject) =>
                        simulations.some(
                          (simulation) => simulation.Subject === subject.Subject
                        ) // filter out the subjects that have no simulations
                    )
                    .map((subject) => (
                      <AccordionItem
                        title={lookupTable[subject.Subject]}
                        key={subject.id}
                      >
                        <ul key={subject.id}>
                          {simulations
                            .filter(
                              (simulation) =>
                                simulation.Subject === subject.Subject
                            )
                            .map((simulation) => (
                              <div className="indvidialList">
                                <li key={simulation.id}>
                                  <Link
                                    key={simulation.id}
                                    href={simulation.Resources}
                                  >
                                    {simulation.TopicName}
                                  </Link>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Content>
    </>
  );
};

export default ExplorePage;
