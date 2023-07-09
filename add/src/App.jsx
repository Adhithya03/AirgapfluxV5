import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import Addresource from './Add'

import "./App.scss";

function App() {
   return (
      <>    
         <Theme theme="g100">
            <NavHeader/>
         </Theme>
            <Content>
               <Addresource></Addresource>
            </Content>
      </>
   );
}

export default App;

