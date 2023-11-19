import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import BarChartComponent from "./stats";
import About from "./About";


function App() {
  return (
    <>
      <Theme >
        <NavHeader />
        <Content>
            <BarChartComponent />
        </Content>
      </Theme>
    </>
  );
}

export default App;
