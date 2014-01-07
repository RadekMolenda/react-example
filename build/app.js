/** @jsx React.DOM */

var App = React.createClass({
  getInitialState: function () {
    return { data: "" };
  },
  handleEditorChange: function (data) {
    this.setState({data: data});
  },
  render: function () {
    return (
      <div className="editors">
        <Editor onEditorChange={this.handleEditorChange}/>
        <Renderer data={this.state.data}/>
      </div>
    );
  }
});

var Editor = React.createClass({
  handleChange: function () {
    this.props.onEditorChange(this.refs.editor.getDOMNode().value);
  },
  render: function () {
    return (
      <div className="editor large-6 columns">
        <textarea
          ref="editor"
          className="editor large-6.columns panel"
          placeholder="Write some **Markdown** here"
          onChange={this.handleChange} />
      </div>
    );
  }
});

var Renderer = React.createClass({
  converter: new Showdown.converter(),
  render: function () {
    var rawMarkup = this.converter.makeHtml(this.props.data);
    return (
      <div className="renderer large-6 columns panel"
      dangerouslySetInnerHTML={{__html: rawMarkup}}></div>
    );
  }
});
React.renderComponent(
  <App />,
  document.getElementById("editPanels")
);
