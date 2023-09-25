import React from 'react';
import ReactApexChart from 'react-apexcharts';

//Map



// TODAY ORDERS

const oprderSeries = [
  {
    data: [5, 9, 5, 6, 4, 12, 18, 14, 10, 15, 12, 5, 8, 5, 12, 5, 12, 10, 16, 12]
  }
];

const orderOptions: any = {
  chart: {
    type: 'area',
    height: 30,
    sparkline: {
      enabled: true
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3
  },
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  yaxis: {
    min: 0
  },
  colors: ['#DCE6EC'],
};


export function Order() {
  return (
    <div id="compositeline">
      <ReactApexChart options={orderOptions} className="pt-1" series={oprderSeries} type="area" height={30} />
    </div>
  )
};


// TODAY DANGER EARNINGS

const earningSeries = [
  {
    data: [3, 2, 4, 6, 12, 14, 8, 7, 14, 16, 12, 7, 8, 4, 3, 2, 2, 5, 6, 7]
  }
];

const earningOptions: any = {
  chart: {
    type: 'area',
    height: 30,
    sparkline: {
      enabled: true
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3
  },
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  yaxis: {
    min: 0
  },
  colors: ['#DCE6EC'],
};


export function DangerEarnings() {
  return (
    <div id="compositeline2">
      <ReactApexChart options={earningOptions} className="pt-1" series={earningSeries} type="area" height={30} />
    </div>
  )
};

// TODAY SUCCESS EARNINGS 

const earningsSeries = [
  {
    data: [5, 10, 5, 20, 22, 12, 15, 18, 20, 15, 8, 12, 22, 5, 10, 12, 22, 15, 16, 10]
  }
];

const earningsOptions: any = {
  chart: {
    type: 'area',
    height: 30,
    sparkline: {
      enabled: true
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3
  },
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  yaxis: {
    min: 0
  },
  colors: ['#DCE6EC'],
};


export function SuccessEarning() {
  return (
    <div id="compositeline3">
      <ReactApexChart options={earningsOptions} className="pt-1" series={earningsSeries} type="area" height={30} />
    </div>
  )
};

// PRODUCT SOLD

const soldSeries = [
  {
    data: [5, 9, 5, 6, 4, 12, 18, 14, 10, 15, 12, 5, 8, 5, 12, 5, 12, 10, 16, 12]
  }
];

const soldOptions: any = {
  chart: {
    type: 'area',
    height: 30,
    sparkline: {
      enabled: true
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3
  },
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  yaxis: {
    min: 0
  },
  colors: ['#DCE6EC'],
};


export function Sold() {
  return (
    <div id="compositeline4">
      <ReactApexChart options={soldOptions} className="pt-1" series={soldSeries} type="area" height={30} />
    </div>
  )
};

// Order Status 

const Statusseries = [
  {
    name: 'Impressions',
    data: [74, 85, 57, 56, 76, 35, 61, 98, 36, 50, 48, 29, 57],
    color: '#0074d9'
  },
  {
    name: 'Turnover',
    data: [46, 35, 101, 98, 44, 55, 57, 56, 55, 34, 79, 46, 76],
    color: '#dc3545'
  },
  {
    name: 'In progress',
    data: [26, 35, 41, 78, 34, 65, 27, 46, 37, 65, 49, 23, 49],
    color: '#fd7e14'
  }
];

const Statusoptions: any = {
  legend: {
    position: 'top',
    horizontalAlign: 'left',

  },
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
};

export function OrderStatus() {

  return (

    <div id="chart">
      <ReactApexChart className="sales-bar mt-1" options={Statusoptions} series={Statusseries} type="bar" height={280} />
    </div>

  )
}

// USA MAP


//RECENT CUSTOMERS

//row#1

const rowSeries = [
  {
    data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
  }
];

const rowOption: any = {
  chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'line',
    height: 38,
    responsive: 'true',
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 10,
      bottom: 10,
      left: 50
    }
  },
  colors: ['#0a9ae1']
};


export function Samantha() {
  return (
    <div id="chart">
      <ReactApexChart options={rowOption} className="wd-100p" series={rowSeries} height={30} />
    </div>
  )
};

//row#2

const jimmySeries = [
  {
    data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
  }
];

const jimmyOption: any = {
  chart: {
    id: 'spark2',
    group: 'sparks',
    type: 'line',
    height: 38,
    responsive: 'true',
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    padding: {
      top: 10,
      bottom: 10,
      left: 50
    }
  },
  markers: {
    size: 0
  },
  colors: ['#ff516e']
};


export function Jimmy() {
  return (
    <div id="chart">
      <ReactApexChart options={jimmyOption} className="wd-100p" series={jimmySeries} height={30} />
    </div>
  )
};

//row#3

const GabeSeries = [
  {
    data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
  }
];

const GabeOption: any = {
  chart: {
    id: 'spark3',
    group: 'sparks',
    type: 'line',
    height: 38,
    responsive: 'true',
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 10,
      bottom: 10,
      left: 50
    }
  },
  colors: ['#28b98a'],
  xaxis: {
    crosshairs: {
      width: 1
    },
  }
};


export function Gabe() {
  return (
    <div id="chart">
      <ReactApexChart options={GabeOption} className="wd-100p" series={GabeSeries} height={30} />
    </div>
  )
};

//row#4

const ManuelSeries = [
  {
    data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
  }
];

const ManuelOption: any = {
  chart: {
    id: 'spark4',
    group: 'sparks',
    type: 'line',
    height: 38,
    responsive: 'true',
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 10,
      bottom: 10,
      left: 50
    }
  },
  colors: ['#f48846'],
  xaxis: {
    crosshairs: {
      width: 1
    },
  }
};


export function Manuel() {
  return (
    <div id="chart">
      <ReactApexChart options={ManuelOption} className="wd-100p" series={ManuelSeries} height={30} />
    </div>
  )
};

//row#5

const SharonSeries = [
  {
    data: [12, 25, 76, 35, 17, 43, 10, 26, 69, 31]
  }
];

const SharonOption: any = {
  chart: {
    id: 'spark5',
    group: 'sparks',
    type: 'line',
    height: 38,
    responsive: 'true',
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 10,
      bottom: 10,
      left: 50
    }
  },
  colors: ['#673ab7'],
  xaxis: {
    crosshairs: {
      width: 1
    },
  }
};


export function Sharon() {
  return (
    <div id="chart">
      <ReactApexChart options={SharonOption} className="wd-100p" series={SharonSeries} height={30} />
    </div>
  )
};

//Recent Order

export class RecentOrder extends React.Component<{}, { options: any, series: any }> {
  constructor(props) {
    super(props);

    this.state = {
      series: [83],
      options: {
        chart: {
          height: 305,
          type: "radialBar",
          responsive: 'true',
          offsetY: 10,
          offsetX: 0,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 30,
              },
              value: {
                offsetY: -16,
                fontSize: "22px",
                color: undefined,
                formatter: function (val: any) {
                  return val + "%";
                },
              },
            },
          },
        },
        colors: ['#0cacde'],
        fill: {
          type: "gradient",
          gradient: {
            shade: "gradient",
            type: "horizontal",
            shadeIntensity: .5,
            gradientToColors: ['#0165e7'],
            inverseColors: !0,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          dashArray: 4,
        },
        labels: [""],
      },
    };
  }

  render() {
    return (

      <div id="chart" className='recent_order'>
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={205} />
      </div>


    );
  }
}


//Map Data Source

