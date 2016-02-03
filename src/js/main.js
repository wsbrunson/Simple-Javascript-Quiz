import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render() {
		return (
			<div className='welcome'>
				<h1 className='welcome__title'>Quiz Simply</h1>
				<p className='welcome__description'>Create simple quizzes. Take simply quizzes. Continue living simply.</p>
				<TakeQuiz />
				<CreateQuiz />
			</div>
		);
	}
}

class TakeQuiz extends React.Component {
	render() {
		return (
			<div className='welcome__take-quiz'>
				<h4 className='welcome__container-title'>Take a Quiz</h4>
					<label>Enter the ID of the quiz you would like to take</label>
					<input className='welcome__take-input' type='text' />
					<button className='button welcome__button' ng-click='vm.startQuizButton()'>Start Quiz!</button>
			</div>
		);
	}
}

class CreateQuiz extends React.Component {
	render() {
		return (
			<div className='welcome__create-quiz'>
				<h4 className='welcome__container-title'>Create a Quiz</h4>
					<label>Enter the ID of the quiz you would like to take</label>
					<button className='button welcome__button' ng-click='vm.createQuizButton()'>Create Quiz!</button>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('main'));
