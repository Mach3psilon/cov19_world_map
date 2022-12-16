# Covid_19_map_live_data

This is a project to show the live data of covid-19 cases in the countries by clicking through them in the map. 

## How to run

1. Clone the repository
2. npm install 
3. create and configure ./src/redux/secrets.json file with {
    
    "X-RapidAPI-Key" : {YOUR_API_KEY}},
    "X-RapidAPI-Host" : {YOUR_API_HOST}
}
4. npm start


## How to run dockerized image
1. docker pull mach3psilon/covid-19-map:cov19
2. docker run -p 3000:3000 mach3psilon/covid-19-map:cov19
