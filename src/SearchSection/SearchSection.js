import React, { useState, useEffect } from 'react';

import '../App.css';
import './SearchSection.css'

function findRepo(searchTerm) {
    return fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
     .then(res => res.json());
 }


export default function SearchSection({ getRepoDetails, clearSelection }) {

    const [submitted, setSubmitted ] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [repos, setRepos] = useState([]);


    useEffect(() => {
        if(submitted) {
            findRepo(searchTerm)
                .then(
                    result => setRepos(result.items.splice(0, 10))
                );

        } else {
            setRepos(() => [])
        }

    }, [submitted, searchTerm])

    function perfSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return <section className="Section SearchSection Background-White"> 
            <form onSubmit={e => perfSubmit(e)}>
                <input
                    value={searchTerm}
                    placeholder="Search Repository"
                    onChange={e => {setSearchTerm(e.target.value); setSubmitted(false)}}
                    onKeyUp={e => clearSelection(e)}
                />
                <button  type="submit" className="Search">
                    Search
                </button>
            </form>

            <div className="SearchResult">
                {repos?.length ? <h3> Please Select One Of The Repos</h3> : null}
                <ul>
                 {repos.map(repo => 
                    <li 
                        className="SearchResultItem"
                        key={repo.id}
                        onClick={() => getRepoDetails(repo)}>
                        {`${repo.owner.login}/${repo.name}`}
                    </li>)}
                </ul>
            </div>
    </section>
};

