# USAweather

This repository contains two folders: `API` and `weather-app`. The `API` folder contains the Node.js API, and the `weather-app` folder contains the Angular weather app. Follow the instructions below to set up and run the projects.

## API Setup

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/your-repo.git

2. Node Project Setup
    1. Navigate to the API folder:
       cd API
    2. Install dependencies
        npm install
    3. Start the API
       npm start
   
   The API will run on http://localhost:3000.
   The OpenAPI documentation can be found on http://localhost:3000/api-docs/

4. Weather App Setup
    1. Install Angular CLI
       npm install -g @angular/cli
    2. Navigate to the weather-app folder:\
       cd weather-app
    3. Install dependencies
       npm install
    4. Start the development server
       ng serve
       The weather app will be accessible at http://localhost:4200.
    
===================================================================================================

  USA Weather Explorer: Capitals Edition

1. The app allows the user to select weather information for the capital cities in USA.
2. The user can select the capital city of his choice to see the weather information
3. By default on applciation load, it shows the weather for city 'Montgomery'
4. Current weather information is shown with the corresponding icons changed based on the weather type (eg clear sky, rainfall etc.)
5. Weather forecast for 1 day is shown by default. But user can select the dropdown to select the number of forecast days
6. Air quality information for the city is shown for 5 days by deafult.
7. History of weather data lookup shows the searched cities and the time they are searched.
8. The history is shown in a tabular format paginated with 10 entires per page.
