import React, { Component } from "react";
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

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

class BarChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      options: {
        title: "Number of Video Resources by Subject",

        axes: {
          left: {
            mapsTo: "group",
            scaleType: "labels",
          },
          bottom: {
            mapsTo: "value",
          },
        },
        height: "1000px",
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("https://api.airgapflux.in/fetch/videos.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: this.processData(data) });
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  };
  processData = (data) => {
    const subjectResourceCounts = data.reduce((acc, item) => {
      const subjectAcronym = item.Subject || "Unknown"; // Acronym or 'Unknown'
      if (subjectAcronym === "Unknown") {
        console.log(`${item.Subject}`);
      }
      // log unknown subject
      const subject = lookupTable[subjectAcronym] || subjectAcronym; // Use lookup table or the acronym itself
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});

    let chartData = Object.keys(subjectResourceCounts).map((subject) => ({
      group: subject,
      value: subjectResourceCounts[subject],
    }));

    // Sort chart data by the value field (the amount of resources)
    chartData.sort((a, b) => a.value - b.value);

    return chartData;
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <h3>Resource Distribution Chart</h3>
        <p>
          The below is a chart of the number of resources available for each
          subject in our website database. The data is fetched from the database
          and is updated each time you refresh this page.
        </p>
        <SimpleBarChart data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}

export default BarChartComponent;
