
import React, { useState } from 'react';
import SearchSection from './SearchSection/SearchSection'
import './App.css';
function App() {

  const [averageCommits, setAverageCommits] = useState(0);
  const [repo, setRepo] = useState();
  const [last3Commits, setLast3Commits] = useState([]);

  async function getRepoDetails(selectedRepo) {
    setRepo(selectedRepo)

    const { all: weeklyCommits} = await fetch(`https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/stats/participation`)
      .then(res => res.json());
      const commits = await fetch(`https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/commits`)
      .then(res => res.json())
 
    const aveWeeklyCommits = (weeklyCommits.reduce((prev, curr) => (prev + curr)) / weeklyCommits.length);
    const last3Coms =  commits.splice(0, 3).map(({commit: { message }}) =>  {
      let titleEnd = message.indexOf('\n');
      titleEnd = titleEnd > -1 ? titleEnd : message.length;

      return message.substring(0, titleEnd)
    }); 

    setAverageCommits(aveWeeklyCommits);
    setLast3Commits(last3Coms);
  }

  return (
    <div className="App">
      <SearchSection getRepoDetails={getRepoDetails}/>

      <section style={{padding: '1rem'}}>
        <h3 style={{textAlign: 'center'}}>Repo Summary</h3> 
        {repo? (<div>
          <div>Average Commits Per Week: <span>{Math.floor(averageCommits)}</span></div>
        </div>): null }
        {last3Commits?.length ?<h4>Last 3 commits</h4>: null}
        <ul>
          {last3Commits.map((message, index) =><li key={index}>{message}</li> )}
        </ul>
      </section>
    </div>
  );
}

export default App;
