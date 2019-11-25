import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSeries: [],
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["00:00", "00:09"]
        },
        legend: {
          position: "right",
          fontFamily: "Helvetica, Arial, sans-serif"
        }
      },
      series: []
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

  handleDataEvents = itens => {
    console.log("datas events", itens);
    itens.map((item, index, arr) => {
      console.log(index, arr);
      const secondItem = itens.find(
        i =>
          i.os === item.os &&
          i.browser === item.browser &&
          i.timestamp !== item.timestamp
      );
      console.log(item, secondItem);
      if (secondItem) {
        itens.splice(index, 1, []);
        return this.transformItensTochartLine(item, secondItem, arr);
      } else {
        return itens.splice(index, 1);
      }
    });
    this.setState({
      series: this.state.newSeries
    });
    console.log(this.state);
  };

  getResponseTimes = (item_res, second_item_res) => {
    return item_res > second_item_res
      ? { item_res, second_item_res }
      : { second_item_res, item_res };
  };

  transformItensTochartLine = (item, secondItem, arr) => {
    const item_min_res = Object.values(
      this.getResponseTimes(
        item.min_response_time,
        secondItem.min_response_time
      )
    );
    const item_max_res = Object.values(
      this.getResponseTimes(
        item.max_response_time,
        secondItem.max_response_time
      )
    );
    const newSerieMin = {
      name: `${item.os} ${item.browser} Min Response Time`,
      data: [item_min_res[1], item_min_res[0]]
    };
    const newSerieMax = {
      name: `${item.os} ${item.browser} Max Response Time`,
      data: [item_max_res[1], item_max_res[0]]
    };
    this.state.newSeries.push(newSerieMin, newSerieMax);
  };

  handleStopEvent = item => {
    console.log("stop event", item);
  };

  getSecondsBtweenTwoDates = ({ begin, end }) => {
    const duration = moment.duration(
      moment(new Date(end)).diff(moment(new Date(begin)))
    );
    return moment(new Date(duration)).format("mm:ss");
  };

  separateEvents = events => {
    const start = this.props.events.find(i => i.type === "start");
    const stop = this.props.events.find(i => i.type === "stop");
    const span = this.props.events.find(i => i.type === "span");
    const datas = this.props.events.filter(i => i.type === "data");
    return { start, stop, span, datas };
  };

  handleChartChange = events => {
    const { start, stop, span, datas } = this.separateEvents(events);
    this.handleStartEvent(start);
    this.handleSpanEvent(span);
    this.handleStopEvent(stop);
    this.handleDataEvents(datas);
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
