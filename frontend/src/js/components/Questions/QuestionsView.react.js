var React = require('react/addons');
var cs = React.addons.classSet;
var QuestionStore = require('../../stores/QuestionStore');
var Question = require('./Question.react');
var Toolbar = require('../Toolbar.react')

function getStateFromStores() {
    return {
        questions: QuestionStore.getQuestions()
    }
}

module.exports = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        QuestionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        QuestionStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var state = this.props.state;
        if (state) {
            return <Toolbar />;
        }

        var questions = this.state.questions;
        if (questions && Object.keys(questions).length < 1) {
            return <div className="no-answers-message">You don't have answers for the text.</div>;
        }

        var list = questions.map(function (q) {
            return  (
                <Question question={q} />
            );
        });

        return (
            <div className="questions-view">
                <h4>Questions View</h4>
                {list}
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});