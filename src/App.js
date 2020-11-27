
import React, { useState } from 'react';
import SearchSection from './SearchSection/SearchSection'
import { RepoDetailsSection } from './RepoDetailsSection/RepoDetailsSection';
import './App.css';

function App() {
  const [repo, setRepo] = useState();

  function getRepoDetails(selectedRepo) {
    setRepo(selectedRepo)
  }

  function clearSelection(e) {
    if(e.target.keyCode !== 13) {
      setRepo(null)
    }
  }


  return (
    <div className="App">
      <SearchSection 
          getRepoDetails={getRepoDetails}
          clearSelection={clearSelection}
        />
      <RepoDetailsSection repo={repo}/>
    </div>
  );
}

export default App;
