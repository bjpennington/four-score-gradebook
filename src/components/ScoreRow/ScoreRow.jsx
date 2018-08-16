import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScoreCell from '../ScoreCell/ScoreCell';

class ScoreRow extends Component {
    render() {
        let scoreRowArray = this.props.scores.map((score, index) => {
            if (score.student_id === this.props.student.id) {
                return (
                    // <ScoreCell key={index} standards={this.props.standards} />
                    <td key={index}>{score.score}</td>
                )
            }
            else { return null }
        });

        console.log('SCORE CELL PROPS:', this.props);


        return (

            <tr>
                <td>{this.props.student.student_name}</td>
                {scoreRowArray}
            </tr>


        )
    }
}

let mapStateToProps = (state) => {
    return ({
        scores: state.score.scores,
    })
}

export default connect(mapStateToProps)(ScoreRow);