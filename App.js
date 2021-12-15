import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Providers from "./navigation";
import TabNavigator from "./navigation/TabNavigator";

const App = () => {
  return (
/*     <NavigationContainer>
      <TabNavigator />
    </NavigationContainer> */
    
    <Providers />
  );
};

export default App;
