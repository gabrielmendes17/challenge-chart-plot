import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { Button, Toolbar, AppBar } from "@material-ui/core";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      span: {
        begin: 0,
        end: 0
      },
      start: 0,
      stop: 0,
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

  handleStartEvent = async item => {
    await this.setState({
      start: item.timestamp,
      stop: 0
    });
  };

  handleSpanEvent = async item => {
    await this.setState({
      span: {
        begin: item.begin,
        end: item.end
      },
      options: {
        chart: this.state.options.chart,
        xaxis: {
          categories: ["00:00", this.getSecondsBtweenTwoDates(item)]
        },
        legend: { ...this.state.options.legend }
      }
    });
  };

  handleDataEvents = itens => {
    itens.map((item, index, arr) => {
      if (this.isTimeValid(item) && this.isTimeInsideSpanRange(item)) {
        const secondItem = itens.find(
          i =>
            i.os === item.os &&
            i.browser === item.browser &&
            i.timestamp !== item.timestamp
        );
        if (secondItem) {
          itens.splice(index, 1, []);
          return this.transformItensTochartLine(item, secondItem, arr);
        } else {
          return itens.splice(index, 1, []);
        }
      }
    });
    this.setState({
      series: this.state.newSeries
    });
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
    this.setState({
      stop: item.timestamp
    });
  };

  isTimeInsideSpanRange = item => {
    return (
      item.timestamp >= this.state.span.begin &&
      item.timestamp <= this.state.span.end
    );
  };

  getSecondsBtweenTwoDates = ({ begin, end }) => {
    const duration = moment.duration(
      moment(new Date(end)).diff(moment(new Date(begin)))
    );
    return moment(new Date(duration)).format("mm:ss");
  };

  separateEvents = events => {
    const start = this.props.events.find(i => i.type.toLowerCase() === "start");
    const stop = this.props.events.find(i => i.type.toLowerCase() === "stop");
    const span = this.props.events.find(i => i.type.toLowerCase() === "span");
    const datas = this.props.events.filter(
      i => i.type.toLowerCase() === "data"
    );
    return { start, stop, span, datas };
  };

  handleChartChange = async events => {
    const { start, stop, span, datas } = this.separateEvents(events);
    if (start) await this.handleStartEvent(start);
    if (span && this.isTimeValid(span)) await this.handleSpanEvent(span);
    if (datas) this.handleDataEvents(datas);
    if (stop) this.handleStopEvent(stop);
  };

  isTimeValid = item => {
    if (this.state.stop === 0) return item.timestamp >= this.state.start;
    return (
      item.timestamp <= this.state.stop && item.timestamp >= this.state.start
    );
  };

  generateChart = events => {
    this.handleChartChange();
  };

  render() {
    return (
      <>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="450"
          width="100%"
        />
        <AppBar
          position="static"
          style={{
            background: "#C6C6C6",
            height: "60px",
            justifyContent: "center"
          }}
        >
          <Toolbar>
            <Button
              variant="contained"
              onClick={() => this.generateChart(this.props.events)}
              color="primary"
            >
              Generate Chart
            </Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default LineChart;
