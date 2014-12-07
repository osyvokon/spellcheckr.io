var React = require('react/addons');
var cs = React.addons.classSet;
var Constants = require('../../constants/Constants');
var EditActions = require('../../actions/EditActions');
var ApiActions = require('../../actions/ApiActions');
var EditorStore = require('../../stores/EditorStore');
var AppStore = require('../../stores/AppStore');

function getStateFromStores() {
    return {
        text: EditorStore.getText(),
        isHighlight: EditorStore.getHighLightedState(),
        snippetId: EditorStore.getSnippetId()
    }
}

module.exports = React.createClass({

    propTypes: {
        text: React.PropTypes.string
    },

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        EditorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        EditorStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var mainClass = cs({
            'content-editor-wrapper': true,
            'highlight': this.state.isHighlight
        });

        return (
            <div className={mainClass}>
                <h5>Request</h5>
                <textarea
                    className="content-editor-textarea"
                    onChange={this._textChange}
                    value={this.state.text}></textarea>
                <div className="content-editor-display" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    _textChange: function (event) {
        var appState = AppStore.getAppState();
        if (appState == Constants.AppState.QUESTION_STATE) {
            EditActions.fireQuestion(event.target.value, this.state.snippetId);
        }
        else {
            // TODO we need author ID and question which we answer
            ApiActions.fireAnswer(null, event.target.value, null, this.snippetId);
        }
    }

});