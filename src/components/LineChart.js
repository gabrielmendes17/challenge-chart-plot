import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: this.props.serie,
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  handleChartChange = event => {
    const newSeries = {
      name: "series-2",
      data: [32, 42, 47, 53, 54, 62, 73, 86]
    };
    this.setState({
      series: [{ ...this.state.series }, newSeries]
    });
    // Chart.updateSeries(newSeries, true);
  };

  componentDidMount = () => {
    this.handleChartChange();
  };

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
