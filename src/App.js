
import React, { useState } from 'react';
import SearchSection from './SearchSection/SearchSection'
import './App.css';
import { RepoDetailsSection } from './RepoDetailsSection/RepoDetailsSection';
function App() {
  const [repo, setRepo] = useState();

  function getRepoDetails(selectedRepo) {
    setRepo(selectedRepo)
  }
  return (
    <div className="App">
      <SearchSection getRepoDetails={getRepoDetails}/>
      <RepoDetailsSection repo={repo}/>
    </div>
  );
}

export default App;
