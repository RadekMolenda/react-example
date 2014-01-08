/** @jsx React.DOM */

function titleize(str) {
  if(str) {
    return str.substring(0, 15);
  } else {
    return "New Document";
  }
};
var App = React.createClass({
  getInitialState: function () {
    return { data: "",
             action: "Save",
             current: undefined };
  },
  handleEditorChange: function (data) {
    this.setState( { data: data } );
  },
  handleSaveButtonClick: function () {
    documents.add(this.state.data);
    this.setState( { action: "Update",
                     current: this.state.data } );
  },
  handleUpdateButtonClick: function () {
    documents.update(this.state.current, this.state.data);
    this.setState( { current: this.state.data } );
  },
  isSaved: function () {
    return _.isEqual(this.state.current, this.state.data);
  },
  render: function () {
    return (
          <div className="inner-wrap">
            <nav className="tab-bar">
              <section className="left-small">
                <a className="left-off-canvas-toggle menu-icon"><span></span></a>
              </section>
              <section className="middle tab-bar-section">
                <Title doc={this.state.current}
                       saved={this.isSaved()}/>
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

                    <SaveButton
                      onSaveButtonClick={this.handleSaveButtonClick}
                      onUpdateButtonClick={this.handleUpdateButtonClick}
                      action={this.state.action}/>

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

var SaveButton = React.createClass({
  actions: {
    "Save": function () {
      this.props.onSaveButtonClick();
    },
    "Update": function () {
      this.props.onUpdateButtonClick();
    }
  },
  handleClick: function () {
    this.actions[this.props.action].bind(this)();
  },
  render: function () {
    return (
      <li>
        <a onClick={this.handleClick}
           className="button small">{this.props.action}</a>
      </li>
    );
  }
});

var Title = React.createClass({
  needsSaving: function () {
    if(this.props.saved){
      return "saved";
    } else {
      return "unsaved";
    }
  },
  render: function () {
    return (
        <h1>Editting: {titleize(this.props.doc)} ({this.needsSaving()})</h1>
    );
  }
});
React.renderComponent(
  <App />,
  document.getElementById("app")
);
