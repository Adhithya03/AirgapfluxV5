import { Book, LogoYoutube,Fire ,StarFilled} from "@carbon/icons-react";
import {
  Accordion,
  AccordionItem,
  AccordionSkeleton,
  Content,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@carbon/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const subjects = [
  "basc",
  "oali",
  "bect",
  "coel",
  "cosy",
  "diel",
  "doem",
  "dsip",
  "edac",
  "emfi",
  "embs",
  "mach",
  "fats",
  "hevs",
  "main",
  "mpmc",
  "meeg",
  "phys",
  "plsc",
  "psop",
  "poel",
  "posy",
  "prsw",
  "rees",
  "slsd",
  "spem",
  "tmdt",
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

const ExplorePage = () => {
  const [resources, setResources] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [response1, response2, response3] = await Promise.all([
        fetch("https://api.airgapflux.in/fetch/videos.php"),
        fetch("https://api.airgapflux.in/fetch/books.php"),
        fetch("https://api.airgapflux.in/fetch/simulations.php"),
      ]);
      const [data1, data2, data3] = await Promise.all([
        response1.json(),
        response2.json(),
        response3.json(),
      ]);
      setResources(data1);
      setBooks(data2);
      setSimulations(data3);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />

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
                  .filter((subject) =>
                    resources.some((resource) => resource.Subject === subject)
                  )
                  .map((subject) => (
                    <AccordionItem title={lookupTable[subject]} key={subject}>
                      <ul>
                        {resources
                          .filter((resource) => resource.Subject === subject)
                          .map((resource) => (
                            <div key={resource.id} className="indvidialList">
                              <li key={resource.id}>
                              {resource.featured === 1 && (
                                  <StarFilled style={{ color: 'orange',marginRight:"5px" }}/> 
                                )}
                                
                                <Link href={resource.Resources}>
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
              that will make you love the subjects. you can search for the book
              in google/amazon/bookswagon "author + subject name" to buy it.
              (here only author name is given). Note this is not link to book.
              <br />
            </p>
            <br />
            <br />
            {loading ? (
              <AccordionSkeleton open={false} count={13} />
            ) : (
              <Accordion>
                {subjects
                  .filter((subject) =>
                    books.some((book) => book.Subject === subject)
                  )
                  .map((subject) => (
                    <AccordionItem
                      open={false}
                      title={lookupTable[subject]}
                      key={subject}
                    >
                      <ul>
                        {books
                          .filter((book) => book.Subject === subject)
                          .map((book) => (
                            <div key={book.id} className="indvidialList">
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
                  .filter((subject) =>
                    simulations.some(
                      (simulation) => simulation.Subject === subject
                    )
                  )
                  .map((subject) => (
                    <AccordionItem title={lookupTable[subject]} key={subject}>
                      <ul>
                        {simulations
                          .filter(
                            (simulation) => simulation.Subject === subject
                          )
                          .map((simulation) => (
                            <div key={simulation.id} className="indvidialList">
                              <li key={simulation.id}>
                                <Link href={simulation.Resources}>
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
    </>
  );
};

export default ExplorePage;
