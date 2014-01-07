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
          <div className="inner-wrap">
            <nav className="tab-bar">
              <section className="left-small">
                <a className="left-off-canvas-toggle menu-icon"><span></span></a>
              </section>
              <section className="middle tab-bar-section">

                <h1>Editting: new unsaved markdown</h1>
              </section>
            </nav>
            <aside className="left-off-canvas-menu">
              <ul className="off-canvas-list recentFiles">

                <li><label>Recent Files</label></li>

                <li><a href="#">First title</a></li>
              </ul>
            </aside>
            <section className="main-section">
              <div className="row">
                <Editor onEditorChange={this.handleEditorChange}/>
                <Renderer data={this.state.data}/>
              </div>

              <div className="row">
                <div className="large-6 columns utils">
                  <ul className="small-block-grid-3">

                    <li><a className="button small">New</a></li>

                    <li><a className="button small">Save</a></li>

                    <li><a className="button alert small">Delete</a></li>
                  </ul>
                </div>
              </div>
            </section>
            <a className="exit-off-canvas"></a>
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
  document.getElementById("app")
);
