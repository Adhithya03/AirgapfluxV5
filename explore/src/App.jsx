import { Content, Theme } from "@carbon/react";
import NavHeader from "./Header";
import ExplorePage from './explore'
import "./App.scss";

function App() {
   return (
      <>    
         <Theme theme="g100">
            <NavHeader/>
            </Theme>
         <Theme theme="g100">
            <Content>
               <ExplorePage></ExplorePage>
            </Content>
            </Theme>
      </>
   );
}

export default App;

