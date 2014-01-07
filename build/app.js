/** @jsx React.DOM */

var App = React.createClass({
  handleEditorChange: function (data) {
    console.log(data);
  },
  render: function () {
    return (
      <div className="editors">
        <Editor onEditorChange={this.handleEditorChange}/>
        <Renderer data="Some fancy stuff here"/>
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
  render: function () {
    return (
      <div className="renderer large-6 columns panel" >{this.props.data}</div>
    );
  }
});
React.renderComponent(
  <App />,
  document.getElementById("editPanels")
);
