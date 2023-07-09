import React, { useEffect, useState } from 'react';
import { Content, Accordion, AccordionItem, Link, AccordionSkeleton } from '@carbon/react';
import { Book, LogoYoutube } from '@carbon/icons-react';
import ReactMarkdown from 'react-markdown'

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
    { Subject: "phys" },
    { Subject: "plsc" },
    { Subject: "psop" },
    { Subject: "poel" },
    { Subject: "posy" },
    { Subject: "prsw" },
    { Subject: "rees" },
    { Subject: "slsd" },
    { Subject: "spem" },
    { Subject: "tmdt" }
];


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
    , "main": "Measurements"
    , "mpmc": "Microprocessors"
    , "phys": "Physics"
    , "plsc": "PLC And Scada"
    , "poel": "Power Electronics"
    , "posy": "Power Systems"
    , "prsw": "Protection And Switch Gear"
    , "slsd": "Solid State Drives"
    , "spem": "Special Machines"
    , "tmdt": "Transmission And Distribution",
};


const getAirgapfluxUrl = (topicName) => {
    const encodedTopicName = encodeURIComponent(topicName);
    return `https://airgapflux.in?s=${encodedTopicName}`;
};

const ExplorePage = () => {
    const [resources, setResources] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch('https://api.airgapflux.in/fetch/videos.php');
            const data1 = await response1.json();
            setResources(data1);
            const response2 = await fetch('https://api.airgapflux.in/fetch/books.php');
            const data2 = await response2.json();
            setBooks(data2);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        };
        fetchData();
    }, []);

    return (
        <>
            <Content>
                <h1 class='h1'>Explore Our Resources</h1>
                <br />
                <br />
                <h3 class='h3'><LogoYoutube size={20} /> Video Resources</h3>
                <br />
                {loading ? (
                    <AccordionSkeleton open={false} count={26} />
                ) : (
                    <Accordion>
                        {subjects.map((subject) => (
                            <AccordionItem title={lookupTable[subject.Subject]} key={subject.id}>
                                <ul key={subject.id}>
                                    {resources
                                        .filter((resource) => resource.Subject === subject.Subject)
                                        .map((resource) => (
                                            <div className="indvidialList">
                                                <li key={resource.id}>
                                                    <Link key={resource.id} href={resource.Resources}>
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

                <br />
                <br />
                <br />
                <br />
                <h3 class='h3'><Book size={20} />  Books suggested</h3>
                <br />
                <p class='note'>Note only author name is mentioned for books, you can search for the book in google/amazon/bookswagon to buy it.
                <br />
                For eg: A conceptual introduction to powersystem by <strong>Alexandra von Meier</strong> will be just mentioned as <strong>Alexandra von Meier</strong> in the list.                
                </p>
                <br />
                <br />
                {loading ? (
                    <AccordionSkeleton open={false} count={26} />
                ) : (
                    <Accordion>
                        {subjects.map((subject) => (
                            <AccordionItem title={lookupTable[subject.Subject]} key={subject.id}>
                                <ul key={subject.id}>
                                    {books
                                        .filter((book) => book.Subject === subject.Subject)
                                        .map((book) => (
                                            <div className="indvidialList">
                                                <li key={book.id}>
                                                    <ReactMarkdown>
                                                        {book.Notes}
                                                    </ReactMarkdown>
                                                </li>
                                            </div>
                                        ))}
                                </ul>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </Content>
        </>
    );
};

export default ExplorePage;
