import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import SearchAGP from './Search'

import "./App.scss";

function App() {
   return (
      <>    
         <Theme theme="g100">
            <NavHeader/>
            </Theme>
         <Theme theme="g100">
            <Content>
               <SearchAGP></SearchAGP>
            </Content>
            </Theme>
      </>
   );
}

export default App;