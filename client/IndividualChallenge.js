import React from 'react';

const IndividualChallenge = () => {

    const ChallengeToRender = {name: 'challenge1', description: 'draw a circle', difficulty: 1}
    return(
        <div>
            <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr key={ChallengeToRender.name}>
                                <td>{ChallengeToRender.name}</td>
                                <td>{ChallengeToRender.description}</td>
                                <td>{ChallengeToRender.difficulty}</td>
                            </tr>
                        }
                    </tbody>
                </table>
        </div>
    )
}