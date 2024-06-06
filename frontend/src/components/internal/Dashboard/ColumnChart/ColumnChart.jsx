import Chart from 'react-apexcharts';
import{ Component } from "react";

export class ColumnChart extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
              toolbar: {
                show: false
              }
            },
            xaxis: {
                categories: ['Благоевград', 'Бургас', 'Варна', 'В. Търново', 'Видин', 'Враца', 'Габрово', 'Добрич','Кърджали', 'Кюстендил', 'Ловеч', 'Монтана', 'Пазарджик', 'Перник', 'Плевен', 'Пловдив', 'Разград', 'Русе', 'Силистра', 'Сливен', 'Смолян', 'Софийска обл.', 'София-град', 'Стара Загора', 'Търговище', 'Хасково', 'Шумен', 'Ямбол'],
                labels: {
                  rotate: -90, 
                  rotateAlways: true,
                  style: {
                    fontSize: '13px'
                  }
                }
              },
            plotOptions: {
                bar: {
                  distributed: true, //? Distribute colors to each bar
                  dataLabels: {
                    position: 'top', 
                  }
                }
              },
              legend: {
                show: false 
              },
              colors: [
                '#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', '#546E7A', '#26a69a', '#D10CE8',
                '#FF6347', '#7CFC00', '#4169E1', '#FFD700', '#9400D3', '#708090', '#20B2AA', '#FF1493',
                '#32CD32', '#FF4500', '#1E90FF', '#FF69B4', '#8A2BE2', '#00CED1', '#ADFF2F', '#DC143C',
                '#FF8C00', '#8B0000', '#4B0082', '#006400'
              ] 
          },
          series: [
            {
              name: "Брой активни бедствия и аварии",
              data: props.data
            }
          ]
        };
      }

      componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.setState({
            series: [
              {
                name: "Брой активни бедствия и аварии",
                data: this.props.data
              }
            ]
          });
        }
      }
    
      render() {
        return (
          <div className="column-chart" id="columnChart" style={{ height: '100%', width: '100%' }}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%" 
              height="100%"
            />
          </div>
        );
      }
}