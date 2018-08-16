import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreCell extends Component {
    render() {
        let scoreCellArray = this.props.scores.map((score, index) => {
            if (score.student_id === this.props.student) {
                return (
                    <p key={index}>{score.score}</p>
                )
            }
            else { return null }
        });

        console.log('SCORE CELL PROPS:', this.props);


        return (

            <td>
                {scoreCellArray}
            </td>


        )
    }
}

let mapStateToProps = (state) => {
    return ({
        scores: state.score.scores,
    })
}

export default connect(mapStateToProps)(ScoreCell);