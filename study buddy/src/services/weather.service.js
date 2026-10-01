/**
 * Weather Service: Ingests live data from OpenWeatherMap API
 * Features a resilient fallback mode (returns mock data if no API key or network failure)
 */

const getWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (apiKey && apiKey !== 'your_openweathermap_api_key_here') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          city: data.name.toLowerCase(),
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
          condition: data.weather[0].main.toLowerCase(),
          isMock: false
        };
      }
    } catch (err) {
      console.warn(`External API error: ${err.message}. Falling back to resilient mock mode.`);
    }
  }

  // Resilient Mock Fallback Mode (Matching Project Ground Truth)
  const mockConditions = ['cloudy', 'sunny', 'rainy', 'partly cloudy', 'clear'];
  const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    city: city.toLowerCase(),
    temperature: 20 + (hash % 15),
    humidity: 50 + (hash % 35),
    windSpeed: 8 + (hash % 12),
    condition: mockConditions[hash % mockConditions.length],
    isMock: true
  };
};

module.exports = { getWeatherData };
