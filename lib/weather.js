const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function fetchWeather(url) {
  if (!API_KEY) {
    throw new Error("No se encontró la API KEY en .env");
  }

  const res = await fetch(url);

  const responseText = await res.text();

  console.log("HTTP STATUS:", res.status);
  console.log("RESPUESTA ORIGINAL:", responseText);

  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error("La API devolvió una respuesta que no es JSON");
  }

  if (!res.ok) {
    throw new Error(
      `Error ${res.status}: ${data.message || "Error desconocido de OpenWeatherMap"}`
    );
  }

  return data;
}

export async function getWeatherByCity(city) {
  const url =
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}` +
    `&units=metric&lang=es&appid=${API_KEY}`;

  return fetchWeather(url);
}

export async function getWeatherByCoords(lat, lon) {
  const url =
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}` +
    `&units=metric&lang=es&appid=${API_KEY}`;

  return fetchWeather(url);
}