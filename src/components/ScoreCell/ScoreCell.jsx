import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreCell extends Component {
    render() {

        let scoreCellArray =
            this.props.scores.map((score, index) => {
                for (let i = 0; i < this.props.standards; i++) {
                    if (score.standard_id === i.id) {
                        return (
                            <p key={index}>{score.score}</p>
                        )
                    }
                    else { return null }
                }
            }
            )


        return (
            <td>{scoreCellArray}</td >
        )
    }

}

let mapStateToProps = (state) => {
    return ({
        scores: state.score.scores,
    })
}

export default connect(mapStateToProps)(ScoreCell);