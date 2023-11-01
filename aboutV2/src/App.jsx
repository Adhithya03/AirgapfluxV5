import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import About from './About'

import "./About.scss";

function App() {
   return (
      <>    
         <Theme theme="g100">
            <NavHeader/>
            </Theme>
         <Theme theme="g100">
            <Content>
               <About></About>
            </Content>
            </Theme>
      </>
   );
}

export default App;