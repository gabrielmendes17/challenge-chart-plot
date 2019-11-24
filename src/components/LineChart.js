import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["00:00", "00:09"]
        }
      },
      series: [
        {
          name: this.props.serie,
          data: ["0.1", "0.2"]
        },
        {
          name: this.props.serie,
          data: ["0.3", "0.5"]
        },
        {
          name: this.props.serie,
          data: ["1.1", "1.3"]
        },
        {
          name: this.props.serie,
          data: ["1.3", "1.5"]
        }
      ]
    };
  }

  handleStartEvent = item => {
    console.log("start event", item);
  };

  handleSpanEvent = item => {
    console.log("span event", item);

    this.setState({
      options: {
        chart: this.state.options.chart,
        xaxis: {
          categories: ["00:00", this.getSecondsBtweenTwoDates(item)]
        }
      }
    });
  };

  handleDataEvent = item => {
    console.log("data event", item);
  };

  handleStopEvent = item => {
    console.log("stop event", item);
  };

  getSecondsBtweenTwoDates = ({ begin, end }) => {
    const now = moment(new Date(begin)); //todays date
    const then = moment(new Date(end));
    const duration = moment.duration(then.diff(now));
    return moment(new Date(duration)).format("mm:ss");
  };

  handleChartChange = event => {
    this.props.event.forEach(item => {
      switch (item.type) {
        case "start":
          this.handleStartEvent(item);
          break;
        case "span":
          this.handleSpanEvent(item);
          break;
        case "data":
          this.handleDataEvent(item);
          break;
        case "stop":
          this.handleStopEvent(item);
          break;
        default:
      }
    });
  };

  componentDidMount = () => {
    // console.log(this.props.event);
    this.handleChartChange();
  };

  componentWillReceiveProps = () => {};

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="450"
        width="100%"
      />
    );
  }
}

export default LineChart;
