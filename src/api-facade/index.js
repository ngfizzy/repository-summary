

export const DataService = {

    baseApiUrl: 'https://api.github.com/repos/',

    async getAverageWeeklyCommits(repo) {
        const { all: weeklyCommits} = await fetch(
            `${this.baseApiUrl}${repo.owner.login}/${repo.name}/stats/participation`
            )
            .then(res => res.json());
        
        return (weeklyCommits.reduce((prev, curr) => (prev + curr)) / weeklyCommits.length);
    },

    async getLastThreeCommits(repo) {
        const commits = await fetch(`${this.baseApiUrl}${repo.owner.login}/${repo.name}/commits`)
            .then(res => res.json())

        return commits.splice(0, 3).map(({commit: { message }}) =>  {
            let titleEnd = message.indexOf('\n');
            titleEnd = titleEnd > -1 ? titleEnd : message.length;
      
            return message.substring(0, titleEnd)
          }); 
      
    }
};