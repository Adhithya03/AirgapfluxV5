import React, { useState } from "react";
import {
  Grid,
  Column,
  DatePicker,
  DatePickerInput,
  Button,
  Form,
  Row,
  DefinitionTooltip,
  Slider,
  ComposedModal,
  ModalFooter,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  ModalBody,
  StructuredListBody,
} from "@carbon/react";
import { format, differenceInDays } from "date-fns";

const daySubMatrix = [
  [1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 2, 1],
  [0, 0, 1, 1, 1, 1],
  [1, 1, 0, 0, 1, 1],
];

const subjects = [
  "Design of Machines",
  "Consumer Electronics",
  "Microprocessor",
  "Solid State Drives",
  "Protection and Switchgear",
  "PLC (or) SEM",
];

const AttendanceTracker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const diffInDays = differenceInDays(endDate[0], startDate[0]);
    const totalDays = diffInDays + 1;

    const weekends = Math.floor(totalDays / 7) * 2 + (totalDays % 7 === 5 ? 1 : totalDays % 7 === 6 ? 2 : 0);
    const workdays = totalDays - weekends;

    const holidays = [0, 0, 0, 0, 0, 0, 0];
    const totPer = [0, 0, 0, 0, 0, 0, 0];
    const attPer = [0, 0, 0, 0, 0, 0, 0];

    const leaves = leaveDays.map((leave, index) => leave + holidays[index]);

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (holidays[x] > 0) {
        holidays[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        totPer[j] += daySubMatrix[x][j];
      }
    }

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (leaves[x] > 0) {
        leaves[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        attPer[j] += daySubMatrix[x][j];
      }
    }

    const percent = attPer.map((value, index) => Math.round((value / totPer[index]) * 100, 4));

    toggleModal();
  };

  return (
    <>
      <h1>Attendance Tracker</h1>
      <Form onSubmit={handleSubmit}>
        <div className="cas">
          <Grid>
            <Column lg={{ span: 4, offset: 4 }} md={8} sm={4}>
              <DatePicker
                className="date-picker"
                dateFormat="d/m/Y"
                id="start-date-picker"
                datePickerType="single"
                value={startDate}
                onChange={(startDate) => setStartDate(startDate)}
              >
                <DatePickerInput
                  id="start-date-picker-input-id"
                  placeholder="dd/mm/yyyy"
                  labelText="Start Date"
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </DatePicker>
            </Column>

            <Column lg={{ span: 4, offset: 0 }} md={8} sm={4}>
              <DatePicker
                dateFormat="d/m/Y"
                id="date-picker"
                datePickerType="single"
                value={endDate}
                onChange={(endDate) => setEndDate(endDate)}
              >
                <DatePickerInput
                  id="end-date-picker-input-id"
                  placeholder="dd/mm/yyyy"
                  labelText="End Date"
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </DatePicker>
            </Column>

            <Column lg={{ span: 0, offset: 0 }} md={8} sm={{ span: 4, offset: 0 }}>
              <h2 style={{ marginTop: "50px", marginBottom: "10px" }}>Your Leave Days</h2>
            </Column>

            <Column lg={{ span: 4, offset: 2 }} md={{ span: 8, offset: 2 }} sm={{ span: 4, offset: 0 }}>
              <div style={{ marginBottom: "20px" }}>
                <DefinitionTooltip definition="Enter the number of days you took leave. For example, if you took 2 leaves on Tuesday b/w the dates you selected, enter 2. Do this for all days and press submit.">
                  <p>Need help?</p>
                </DefinitionTooltip>
              </div>

              {["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Monday"].map((day, index) => (
                <React.Fragment key={day}>
                  <p>{day}</p>
                  <Slider
                    max={5}
                    min={0}
                    value={leaveDays[index]}
                    onChange={(event) =>
                      setLeaveDays([
                        ...leaveDays.slice(0, index),
                        event.value,
                        ...leaveDays.slice(index + 1),
                      ])
                    }
                  />
                </React.Fragment>
              ))}
            </Column>

            <Column lg={{ span: 4, offset: 6 }} md={8} sm={{ span: 4, offset: 0 }}>
              <Button type="submit">Submit</Button>
            </Column>
          </Grid>
        </div>
      </Form>

      <ComposedModal open={isModalOpen}>
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Subject</StructuredListCell>
              <StructuredListCell head>Percent</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {percent.map((value, index) => (
              <StructuredListRow key={index}>
                <StructuredListCell>{subjects[index]}</StructuredListCell>
                <StructuredListCell>{value}%</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>

        <ModalFooter>
          <p style={{ padding: "0.5rem", margin: "0.5rem auto" }}>Made with 💝 by Anabhayan and adhithya</p>
          <Button size="sm" style={{ float: "center" }} kind="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </ComposedModal>
    </>
  );
};

export default AttendanceTracker;