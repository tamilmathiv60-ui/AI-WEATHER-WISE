/**
 * AI Service: Integrates Google Gemini AI (@google/genai)
 * Provides intelligent weather summaries and personalized activity/clothing recommendations
 */

let GoogleGenAI;
try {
  const genaiPkg = require('@google/genai');
  GoogleGenAI = genaiPkg.GoogleGenAI;
} catch (e) {
  // If @google/genai is not yet installed or different export
  GoogleGenAI = null;
}

const generateWeatherInsights = async (weatherData) => {
  const { city, temperature, humidity, condition } = weatherData;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here' && GoogleGenAI) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an AI Weather Advisor. 
Current weather in ${city}:
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Condition: ${condition}

Provide a concise, 1-2 sentence recommendation on what to wear and ideal outdoor activities.`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (error) {
      console.warn(`Gemini API call failed: ${error.message}. Using built-in intelligent advisory engine.`);
    }
  }

  // Ground-Truth Contextual Fallback (as per Project Demo)
  if (temperature >= 30) {
    return 'Hot weather alert: Stay hydrated, wear light cotton clothing, and avoid prolonged sun exposure between 12 PM and 3 PM.';
  } else if (condition.includes('rain') || humidity > 80) {
    return 'High humidity and rain expected: Keep an umbrella handy, wear waterproof footwear, and exercise caution while driving.';
  } else if (temperature <= 18) {
    return 'Chilly climate: Wear a warm jacket or sweater, and enjoy a warm outdoor beverage.';
  } else {
    return 'Stay hydrated, and wear light cotton clothes.';
  }
};

module.exports = { generateWeatherInsights };
