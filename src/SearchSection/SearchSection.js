import React, { useState, useEffect } from 'react';

import './SearchSection.css'

export default function SearchSection({ getRepoDetails }) {

    const [submitted, setSubmitted ] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [repos, setRepos] = useState([]);

    async function findRepo() {
       const result = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
        .then(res => res.json());

        setRepos(result.items.splice(0, 10));
        
    }

    useEffect(() => {
        if(submitted) {
            findRepo();
        } else {
            setRepos(() => [])
        }

    }, [submitted])

    function perfSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return <section className="SearchSection Background-White"> 
            <form onSubmit={e => perfSubmit(e)}>
                <input
                    value={searchTerm}
                    placeholder="Search Repository"
                    onChange={e => {setSearchTerm(e.target.value); setSubmitted(false)}}
                />
                <button  type="submit" className="Search">
                    Search
                </button>
            </form>

            <div className="SearchResult">
                <ul>
                 {repos.map(repo => <li key={repo.id} onClick={() => getRepoDetails(repo)}>{repo.name}</li>)}
                </ul>
            </div>
    </section>
};

