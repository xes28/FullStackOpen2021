const MostVoted = ({ anecdote, votes }) => {
    //Calculamos el voto máximo
    const maxVoted = Math.max(...votes);
    //Recuperamos la posicion del voto máximo
    const winnerIndex = votes.indexOf(maxVoted)
    //Recuperamos la anectoda
    const mostVotedAnecdote = anecdote[winnerIndex];

    if (maxVoted === 0) {
        return <p>Not voted yet</p>
    }

    return (
        <div>
            <p>{mostVotedAnecdote}</p>
            <p>Has {maxVoted} votes</p>
        </div>
    )
}

export default MostVoted;