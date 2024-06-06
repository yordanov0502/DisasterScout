import{ Component } from "react";
import ReactApexChart from "react-apexcharts";

export class PieChart extends Component {

    constructor(props) {
      super(props);

      this.state = {
      
        options: {
          chart: {
            width: '100%',
            height: '100%', 
            type: 'pie',
          },
        legend: {
          position: 'bottom',
          fontSize: '14px'
        },
          labels: ['Сеизмична активност', 'Метеорологични условия', 'Обществени условия', 'Пътни условия', 'Военни условия', 'Космическо явление'],
          colors: ['#8B4513', '#DC143C', '#FEB019', '#007FFF', '#4B5320', '#9932CC'], 
          dataLabels: {
            style: {
              fontSize: '14px', 
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        series: props.data,
      
      
      };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.setState({
            series: this.props.data 
          });
        }
      }

  

    render() {
      return (
           <div className="pie-chart" id="pie-chart" style={{ height: '100%', width: '100%' }} >
            <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} 
            type="pie" 
            width="100%" 
            height="100%" />
           </div>
      );
    }
  }