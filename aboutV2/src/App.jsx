import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import BarChartComponent from "./stats";
import AboutAirgapfluxPage from "./About";


function App() {
  return (
    <>
      <Theme theme="g100">
        <NavHeader />
      </Theme >
      <Theme >
        <Content>
            <BarChartComponent />

            <AboutAirgapfluxPage />
        </Content>
      </Theme>
    </>
  );
}

export default App;
