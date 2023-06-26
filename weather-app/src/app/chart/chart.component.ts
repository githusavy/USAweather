import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() hourlyData: any;
  @Input() airQualityData: any;
  @Input() selectedCity: any;

  constructor(private weatherService: WeatherService) {}
  forecastDays = [1, 2, 3, 4, 5];
  selectedDay = 1;
  selectedDate = '1';

  lineChartData: ChartDataset[] = [
    { data: [], label: 'Temperature (°C)', borderDash: [] },
    { data: [], label: 'Relative Humidity (%)', borderDash: [] },
    { data: [], label: 'Wind Speed (km/h)', borderDash: [] },
  ];

  lineChartDataAirQuality: ChartDataset[] = [
    { data: [], label: 'Carbon Monoxide (μg/m³)', borderDash: [] },
    { data: [], label: 'Dust (μg/m³)', borderDash: [] },
    {
      data: [],
      label: 'United States Air Quality Index (USAQI)',
      borderDash: [],
    },
  ];
  lineChartLabels: string[] = [];
  lineChartLabelsAirQuality: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  ngOnInit() {
    this.selectedDate = `${this.selectedDay} day`;
  }

  onForecastChange() {
    if (this.selectedDay) {
      this.weatherService
        .getWeatherData(this.selectedCity, this.selectedDay)
        .subscribe(
          (data: any) => {
            this.hourlyData = data.hourly;
            this.selectedDate =
              this.selectedDay === 1
                ? `${this.selectedDay} day`
                : `${this.selectedDay} days`;
            this.ngOnChanges();
          },
          (error) => {
            console.log(
              'An error occurred while fetching weather data:',
              error
            );
          }
        );
    }
  }
  ngOnChanges(): void {
    if (this.hourlyData) {
      const temperatureData = this.hourlyData.temperature_2m;
      const relativeHumidityData = this.hourlyData.relativehumidity_2m;
      const windsSpeedData = this.hourlyData.windspeed_10m;

      const formattedTimes = this.hourlyData.time.map((datetimeString: any) => {
        const dateTime = new Date(datetimeString);
        const time = dateTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return time;
      });

      const timestamps = formattedTimes;

      this.lineChartData[0].data = temperatureData;
      this.lineChartData[1].data = relativeHumidityData;
      this.lineChartData[2].data = windsSpeedData;
      this.lineChartLabels = timestamps;
    }
    if (this.airQualityData) {
      const carbonMonoxideData = this.airQualityData.carbon_monoxide;
      const dustData = this.airQualityData.dust;
      const usAQIndexData = this.airQualityData.us_aqi;

      const formattedTimes = this.airQualityData.time.map(
        (datetimeString: any) => {
          const dateTime = new Date(datetimeString);
          const date = dateTime.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const time = dateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return `${date} ${time}`;
        }
      );

      const timestamps = formattedTimes;

      this.lineChartDataAirQuality[0].data = carbonMonoxideData;
      this.lineChartDataAirQuality[1].data = dustData;
      this.lineChartDataAirQuality[2].data = usAQIndexData;
      this.lineChartLabelsAirQuality = timestamps;
    }
  }
}
