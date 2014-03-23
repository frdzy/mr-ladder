/**
 * @jsx React.DOM
 */

var LabeledAxis = React.createClass({
  getDefaultProps: function() {
    return {
      labelFontSize: 12,
      markSize: 5,
      markSizeMajor: 10,
      delta: 10,
      deltaMajor: 50,
      stroke: 'gray'
    };
  },

  _getTextTranslate: function() {
    var translateX = 0;
    var translateY = this.props.labelFontSize;
    return 'translate(' + translateX + ',' + translateY + ')';
  },

  _getTickTranslate: function(offset) {
    var translateX = 0;
    var translateY = 0;
    if (this.props.orientation === 'X') {
      translateX = offset;
    } else if (this.props.orientation === 'Y') {
      translateY = offset;
    } else {
      throw 'Unexpected orientation';
    }
    return 'translate(' + translateX + ',' + translateY + ')';
  },

  render: function() {
    var children = [];
    for (var i = 0; i <= this.props.size; i += this.props.delta) {
      var markSize = this.props.markSize;
      var text = null;
      if (i % this.props.deltaMajor === 0) {
        markSize = this.props.markSizeMajor;
        text = (
          <text
            transform={this._getTextTranslate()}>
            {i}
          </text>
        );
      }
      var x1 = 0;
      var x2 = 0;
      var y1 = 0;
      var y2 = 0;
      if (this.props.orientation === 'X') {
        y2 = markSize;
      } else if (this.props.orientation === 'Y') {
        x2 = markSize;
      } else {
        throw 'Unexpected orientation';
      }
      children.push(
        <g
          transform={this._getTickTranslate(i)}>
          <line
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
            stroke={this.props.stroke}
          />
          {text}
        </g>
      );
    }
    return <g>{children}</g>;
  }
});

var XAxis = React.createClass({
  render: function() {
    return (
      <LabeledAxis
        size={this.props.size}
        orientation="X"
      />
    );
  }
});

var YAxis = React.createClass({
  render: function() {
    return (
      <LabeledAxis
        size={this.props.size}
        orientation="Y"
      />
    );
  }
});

var LadderApp = React.createClass({
  render: function() {
    return (
      <svg>
        <XAxis size={this.props.width} />
        <YAxis size={this.props.height} />
      </svg>
    );
  }
});

Meteor.startup(function() {
  React.renderComponent(
    <LadderApp
      width={800}
      height={800}
    />,
    document.getElementById('stage')
  );
});

