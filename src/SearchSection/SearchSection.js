import React from 'react';

import './SearchSection.css'

export default function SearchSection() {

    function searchRepo(event) {
        event.preventDefault();
        console.log('repo>>>>>>>>>>>>>>>>>>>> search', event)
    }

    return <section className="SearchSection Background-White"> 
            <form onSubmit={e => searchRepo(e)}>
                <input  placeholder="Search Repository"/>
                <button  type="submit" className="Search">
                    Search
                </button>
            </form>

            <div className="SearchResult">

            </div>
    </section>
};

