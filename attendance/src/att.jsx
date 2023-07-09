import React, { useState } from "react";
import { Grid, Column, DatePicker, DatePickerInput, Button, Form, Row, DefinitionTooltip, Slider, ComposedModal, ModalFooter, StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, ModalBody, StructuredListBody, } from "@carbon/react";
import { format, differenceInDays } from 'date-fns';

var percent = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];


const adhithya = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [yourLeave, setYourLeave] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    const diffInDays = differenceInDays(date2[0], date1[0]);
    const totalDays = diffInDays + 1;

    var weekends = Math.floor(totalDays / 7) * 2;


    if (totalDays % 7 === 5) {
      weekends += 1;
    } else if (totalDays % 7 === 6) {
      weekends += 2;
    }

    var workdays = totalDays - weekends;



    var holidays = [0, 0, 0, 0, 0, 0, 0];
    var tot_per = [0, 0, 0, 0, 0, 0, 0];
    var att_per = [0, 0, 0, 0, 0, 0, 0];

    const daySubMatrix = [
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 2, 1],
      [0, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1]
    ];


    const leaves = yourLeave.map((leave, index) => leave + holidays[index]);

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (holidays[x] > 0) {
        holidays[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        tot_per[j] += daySubMatrix[x][j];
      }
    }

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (leaves[x] > 0) {
        leaves[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        att_per[j] += daySubMatrix[x][j];
      }
    }

    for (let i = 0; i < 6; i++) {
      percent[i] = Math.round((att_per[i] / tot_per[i]) * 100, 4);
    }


    // Debug
    // console.log("Date:", format(date1[0], 'dd-MM-yyyy'));
    // console.log("Date:", format(date2[0], 'dd-MM-yyyy'));
    // console.log("Value:", yourLeave);
    // console.log("Delta:", diffInDays);
    // console.log("Total Days:", totalDays);
    // console.log("Weekends:", weekends);
    // console.log("Workdays:", workdays);
    // console.log(percent);

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
                value={date1}

                onChange={(date1) => setDate1(date1)}
              >
                <DatePickerInput
                  id="start-date-picker-input-id"
                  placeholder="dd/mm/yyyy"
                  labelText="Start Date"
                  onChange={(event) => setDate1(event.target.value)}
                />
              </DatePicker>
            </Column>


            <Column lg={{ span: 4, offset: 0 }} md={8} sm={4}>
              <DatePicker
                dateFormat="d/m/Y"
                id="date-picker"
                datePickerType="single"
                value={date2}
                onChange={(date2) => setDate2(date2)}
              >
                <DatePickerInput
                  id="end-date-picker-input-id"
                  placeholder="dd/mm/yyyy"
                  labelText="End Date"
                  onChange={(event) => setDate2(event.target.value)}
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
              <p>Tuesday</p>

              <Slider
                max={5}
                min={0}
                value={yourLeave[0]}
                onChange={(event) => setYourLeave([event.value, yourLeave[1], yourLeave[2], yourLeave[3], yourLeave[4], yourLeave[5]])}
              />

              <p>Wednesday</p>
              <Slider
                max={5}
                min={0}
                value={yourLeave[1]}
                onChange={(event) =>
                  setYourLeave([
                    yourLeave[0],
                    event.value,
                    yourLeave[2],
                    yourLeave[3],
                    yourLeave[4],
                    yourLeave[5],
                  ])
                }
              />
              <p>Thursday</p>
              <Slider
                max={5}
                min={0}
                value={yourLeave[2]}
                onChange={(event) =>
                  setYourLeave([
                    yourLeave[0],
                    yourLeave[1],
                    event.value,
                    yourLeave[3],
                    yourLeave[4],
                    yourLeave[5],
                  ])
                }
              />


            </Column>

            <Column lg={{ span: 8, offset: 10 }} md={{ span: 4, offset: 2 }} sm={{ span: 4, offset: 0 }}>

              <p>Friday</p>
              <Slider
                max={5}
                min={0}
                value={yourLeave[3]}
                onChange={(event) =>
                  setYourLeave([
                    yourLeave[0],
                    yourLeave[1],
                    yourLeave[2],
                    event.value,
                    yourLeave[4],
                    yourLeave[5],
                  ])
                }
              />
              <p>Saturday</p>
              <Slider
                max={5}
                min={0}
                value={yourLeave[4]}
                onChange={(event) =>
                  setYourLeave([
                    yourLeave[0],
                    yourLeave[1],
                    yourLeave[2],
                    yourLeave[3],
                    event.value,
                    yourLeave[5],
                  ])
                }
              />
              <p>Monday</p>
              <Slider
                max={5}
                min={0}
                disabled={false}
                value={0}
                onChange={(event) =>
                  setYourLeave([
                    yourLeave[0],
                    yourLeave[1],
                    yourLeave[2],
                    yourLeave[3],
                    yourLeave[4],
                    event.value,
                  ])
                }
              />
            </Column>

            <Column lg={{ span: 4, offset: 6 }} md={8} sm={{ span: 4, offset: 0 }}>
              <Button type="submit">Submit</Button>
            </Column>
          </Grid>

        </div>
      </Form>
      <ComposedModal
        open={isModalOpen}
      >

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
                <StructuredListCell>{["Design of Machines", "Consumer Electronics", "Microprocessor", "Solid State Drives", "Protection and Switchgear", "PLC (or) SEM"][index]}</StructuredListCell>
                <StructuredListCell>{value}%</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>


        <ModalFooter>
          <p style={{ padding: "0.5rem", margin: "0.5rem auto" }}>Made with 💝 by Anabhayan and adhithya</p>
          <Button size='sm' style={{ float: "center" }} kind='secondary' onClick={toggleModal}>Close</Button>

        </ModalFooter>

      </ComposedModal>

    </>

  );
};

export default adhithya;