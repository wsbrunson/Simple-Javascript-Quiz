import React from 'react';
import autobind from 'autobind-decorator';

import Choice from './Choice';

@autobind
class Question extends React.Component {

	renderChoices() {
		let elements = [];

		this.props.choices.forEach((choice, key) => {
			elements.push(
				<Choice
					key={`${key} + ${this.props.questionNumber}`}
					choiceNumber={parseInt(key, 10) + 1}
					questionNumber={this.props.questionNumber}
					answer={choice.answer}
					selectAnswer={this.props.selectAnswer}
				/>
			);
		});

		return elements;
	}

	render() {
		if (this.props.selection) {
			console.log(true);
		}
		return (
			<div className='question'>
				<h3 className='question-title'>{`Question ${this.props.questionNumber}`}</h3>
					<p className='question-copy'>{`${this.props.questionTitle}:`}</p>
					<ul>
						{this.renderChoices()}
					</ul>
			</div>
		);
	}
}

Question.PropTypes = {
	questionTitle: React.PropTypes.string.isRequired,
	choices: React.PropTypes.array.isRequired,
	selectAnswer: React.PropTypes.func.isRequired,
	key: React.PropTypes.number.isRequired
};

export default Question;
