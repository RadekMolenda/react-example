/** @jsx React.DOM */

var App = React.createClass({
  render: function () {
    return (
      <div className="editors">
        <Editor />
        <Renderer />
      </div>
    );
  }
});

var Editor = React.createClass({
  render: function () {
    return (
      <div className="editor large-6 columns">
        <textarea
          className="editor large-6.columns panel"
          placeholder="Write some **Markdown** here" />
      </div>
    );
  }
});

var Renderer = React.createClass({
  render: function () {
    return (
      <div className="renderer large-6 columns panel"></div>
    );
  }
});
React.renderComponent(
  <App />,
  document.getElementById("editPanels")
);
