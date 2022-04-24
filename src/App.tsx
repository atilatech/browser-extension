/**
 * While we theoretically don't need this file,
 *  it's helpful for if we decide to add hierarchy or multiple components to this extensin in the future.
 * It also maintains convention with the community of using an App.tsx file.
 * See: https://stackoverflow.com/a/50493780
 */

import CollectionList from "./scenes/CollectionList/CollectionList";
import Dashboard from "./scenes/Dashboard/Dashboard";
import PopUp from "./scenes/PopUp/PopUp";
 
 function App() {

  // used in debugging to show the popup
  const showPopUp = window.location.origin.startsWith("http://localhost") && window.location.pathname.startsWith("/popup")


  // show the collection list
  const showCollectionList = window.location.origin.startsWith("http://localhost") && window.location.pathname.startsWith("/collection")

  return (
    <div className="App">
      {showCollectionList ?  <CollectionList /> :
        <div>
          {!showPopUp && <Dashboard />}
          {showPopUp && <PopUp />}
        </div>
      }
    </div>
  );
 }

 export default App;