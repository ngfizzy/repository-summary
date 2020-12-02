import React, { useEffect, useState } from 'react';
import './RepoDetailsSection.css'
import { DataService } from '../api-facade';

export function RepoDetailsSection({ repo }) {
    const [averageCommits, setAverageCommits] = useState(0);
    const [last3Commits, setLast3Commits] = useState([]);

    async function getRepoDetails(selectedRepo) {
        const aveWeeklyCommits = await DataService.getAverageWeeklyCommits(selectedRepo)
        const last3Coms =  await DataService.getLastThreeCommits(selectedRepo)
        setAverageCommits(aveWeeklyCommits);
        setLast3Commits(last3Coms);
    }

    useEffect(() => {
        if(repo) {

            getRepoDetails(repo);
        }
    }, [repo])

    const cta = <h3>Please search for a repo above</h3>

    const summary = (
        <>
            <h3 style={{textAlign: 'center'}}>
                Repo Summary
            </h3>

            <div>
                Average Commits Per Week:
                <span>{Math.floor(averageCommits)}</span>
            </div>

            {last3Commits?.length ?  <h4>Last 3 commits</h4> : null}

            <ul>
                {last3Commits.map((message, index) => (<li key={index}>{message}</li>))}
            </ul>

        </>
    )




    return (
        <section  className="Section Background-White">
            { repo ? summary : cta }
        </section>)
}