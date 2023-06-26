import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  selectedCity: string = 'Montgomery';
  // selectedCity: string = '';
  weatherData: any | null = null;
  airQualityData: any | null = null;
  cities: string[] = [];
  weatherProperties: any[] = [];
  lookupHistory: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fetchCities();
    this.getWeather();
    this.getAirQuality();
    this.fetchLookupHistory();
  }

  fetchCities() {
    this.weatherService.getCities().subscribe(
      (cities: string[]) => {
        this.cities = cities;
      },
      (error) => {
        console.log('An error occurred while fetching cities:', error);
      }
    );
  }

  fetchLookupHistory() {
    this.weatherService.getHistory().subscribe(
      (response) => {
        this.lookupHistory = response;
      },
      (error) => {
        console.error('Failed to fetch lookup history', error);
      }
    );
  }

  onCityChange() {
    this.getWeather();
    this.getAirQuality();
    this.fetchLookupHistory();
  }

  getWeather() {
    if (this.selectedCity) {
      this.weatherService.getWeatherData(this.selectedCity).subscribe(
        (data: any) => {
          this.weatherData = data;
          this.updateWeatherProperties();
        },
        (error) => {
          console.log('An error occurred while fetching weather data:', error);
        }
      );
    }
  }

  getAirQuality() {
    if (this.selectedCity) {
      this.weatherService.getAirQualityData(this.selectedCity).subscribe(
        (data: any) => {
          this.airQualityData = data;
        },
        (error) => {
          console.log(
            'An error occurred while fetching Air quality data:',
            error
          );
        }
      );
    }
  }

  updateWeatherProperties() {
    this.weatherProperties = [];

    if (this.weatherData && this.weatherData.current_weather) {
      const currentWeather = this.weatherData.current_weather;
      const formattedTime = this.datePipe.transform(
        currentWeather.time,
        'short'
      );

      this.weatherProperties.push({
        label: 'Time',
        value: formattedTime,
        description: `The current time in ${this.selectedCity}`,
        icon: 'fas fa-clock',
      });
      this.weatherProperties.push({
        label: 'Weather',
        value: this.decodeWeatherCode(currentWeather.weathercode).description,
        description: `The current weather conditions in ${this.selectedCity}`,
        icon: this.decodeWeatherCode(currentWeather.weathercode).icon,
      });
      this.weatherProperties.push({
        label: 'Day/Night',
        value: currentWeather.is_day ? 'Day' : 'Night',
        description: `${this.selectedCity} has daylight or not`,
        icon: currentWeather.is_day ? 'fas fa-sun' : 'fas fa-moon',
      });
      this.weatherProperties.push({
        label: 'Temperature',
        value: currentWeather.temperature + '°C',
        description: `The current temperature of ${this.selectedCity}`,
        icon: 'fas fa-thermometer-half',
      });
      this.weatherProperties.push({
        label: 'Wind Speed',
        value: currentWeather.windspeed + ' km/h',
        description: `The current Windspeed of ${this.selectedCity}`,
        icon: 'fas fa-wind',
      });
      this.weatherProperties.push({
        label: 'Wind Direction',
        value: currentWeather.winddirection + '°',
        description: `The current Wind Direction of ${this.selectedCity} 10 meters above the ground`,
        icon: 'fas fa-location-arrow',
      });
    }
  }

  decodeWeatherCode(code: number): { description: string; icon: string } {
    switch (code) {
      case 0:
        return { description: 'Clear sky', icon: 'fas fa-sun' };
      case 1:
      case 2:
      case 3:
        return {
          description: 'Mainly clear, partly cloudy, and overcast',
          icon: 'fas fa-cloud',
        };
      case 45:
      case 48:
        return {
          description: 'Fog and depositing rime fog',
          icon: 'fas fa-smog',
        };
      case 51:
      case 53:
      case 55:
        return {
          description: 'Drizzle: Light, moderate, and dense intensity',
          icon: 'fas fa-cloud-rain',
        };
      case 56:
      case 57:
        return {
          description: 'Freezing Drizzle: Light and dense intensity',
          icon: 'fas fa-cloud-rain',
        };
      case 61:
      case 63:
      case 65:
        return {
          description: 'Rain: Slight, moderate, and heavy intensity',
          icon: 'fas fa-cloud-showers-heavy',
        };
      case 66:
      case 67:
        return {
          description: 'Freezing Rain: Light and heavy intensity',
          icon: 'fas fa-cloud-showers-heavy',
        };
      case 71:
      case 73:
      case 75:
        return {
          description: 'Snowfall: Slight, moderate, and heavy intensity',
          icon: 'fas fa-snowflake',
        };
      case 77:
        return { description: 'Snow grains', icon: 'fas fa-snowflake' };
      case 80:
      case 81:
      case 82:
        return {
          description: 'Rain showers: Slight, moderate, and violent',
          icon: 'fas fa-cloud-showers-heavy',
        };
      case 85:
      case 86:
        return {
          description: 'Snow showers slight and heavy',
          icon: 'fas fa-snowflake',
        };
      case 95:
        return {
          description: 'Thunderstorm: Slight or moderate',
          icon: 'fas fa-bolt',
        };
      case 96:
      case 99:
        return {
          description: 'Thunderstorm with slight and heavy hail',
          icon: 'fas fa-bolt',
        };
      default:
        return {
          description: 'Unknown weather',
          icon: 'fas fa-question-circle',
        };
    }
  }
}
