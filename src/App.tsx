/**
 * While we theoretically don't need this file,
 *  it's helpful for if we decide to add hierarchy or multiple components to this extensin in the future.
 * It also maintains convention with the community of using an App.tsx file.
 * See: https://stackoverflow.com/a/50493780
 */

import Dashboard from "./scenes/Dashboard/Dashboard";
// import PopUp from "./scenes/PopUp/PopUp";
 
 function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <PopUp /> */}
    </div>
  );
 }
  
 export default App;