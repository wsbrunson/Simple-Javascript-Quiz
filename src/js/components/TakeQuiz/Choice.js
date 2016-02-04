import React from 'react';

class Choice extends React.Component {

	render() {
		const inputId = `${this.props.choiceNumber}-${this.props.questionNumber}`;

		return (
			<li>
				<input
					id={inputId}
					type='radio'
					name={`group-${this.props.questionNumber}`}
					onClick={this.props.selectAnswer.bind(this, this.props.questionNumber - 1, this.props.choiceNumber - 1)}
				/>
				<label htmlFor={inputId}>
					<span></span>
					<p className='choice-text'>{ `${this.props.choiceNumber}. ${this.props.answer}`}</p>
				</label>
			</li>
		);
	}
}

Choice.PropTypes = {
	answer: React.PropTypes.string.isRequired,
	selectAnswer: React.PropTypes.func.isRequired,
	choiceNumber: React.PropTypes.number.isRequired,
	questionNumber: React.PropTypes.number.isRequired
};

export default Choice;
