"use client"

import React, { useState, useEffect } from "react"
import { Search, Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudSun, Wind, Droplets } from "lucide-react"
import "./App.css"

// Dados de exemplo para demonstração
const mockWeatherData = {
  current: {
    city: "São Paulo",
    country: "Brasil",
    temperature: 23,
    condition: "Parcialmente nublado",
    humidity: 65,
    windSpeed: 12,
    feelsLike: 24,
    uvIndex: 5,
    icon: "cloud-sun",
  },
  forecast: [
    { day: "Hoje", temp: { min: 19, max: 25 }, icon: "cloud-sun", condition: "Parcialmente nublado" },
    { day: "Amanhã", temp: { min: 18, max: 27 }, icon: "sun", condition: "Ensolarado" },
    { day: "Quarta", temp: { min: 20, max: 28 }, icon: "sun", condition: "Ensolarado" },
    { day: "Quinta", temp: { min: 21, max: 26 }, icon: "cloud-rain", condition: "Chuva leve" },
    { day: "Sexta", temp: { min: 19, max: 24 }, icon: "cloud-rain", condition: "Chuva" },
    { day: "Sábado", temp: { min: 18, max: 23 }, icon: "cloud", condition: "Nublado" },
    { day: "Domingo", temp: { min: 17, max: 22 }, icon: "cloud-lightning", condition: "Tempestade" },
  ],
  hourly: [
    { time: "Agora", temp: 23, icon: "cloud-sun" },
    { time: "13:00", temp: 24, icon: "cloud-sun" },
    { time: "14:00", temp: 25, icon: "sun" },
    { time: "15:00", temp: 25, icon: "sun" },
    { time: "16:00", temp: 24, icon: "cloud" },
    { time: "17:00", temp: 22, icon: "cloud" },
    { time: "18:00", temp: 21, icon: "cloud-moon" },
    { time: "19:00", temp: 20, icon: "cloud-moon" },
  ],
}

// Componente para renderizar o ícone do clima
const WeatherIcon = ({ icon, size = 24, className = "" }) => {
  switch (icon) {
    case "cloud":
      return <Cloud size={size} className={className} />
    case "cloud-rain":
      return <CloudRain size={size} className={className} />
    case "cloud-snow":
      return <CloudSnow size={size} className={className} />
    case "cloud-lightning":
      return <CloudLightning size={size} className={className} />
    case "sun":
      return <Sun size={size} className={className} />
    case "cloud-sun":
      return <CloudSun size={size} className={className} />
    default:
      return <Cloud size={size} className={className} />
  }
}

// Componente de Input personalizado
const Input = ({ placeholder, value, onChange, className }) => {
  return (
    <input type="text" placeholder={placeholder} value={value} onChange={onChange} className={`input ${className}`} />
  )
}

// Componente de Button personalizado
const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`button ${className}`}>
      {children}
    </button>
  )
}

// Componente de Card personalizado
const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>
}

// Componente de Tabs personalizado
const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Filtrar e modificar os filhos para passar o estado ativo
  const modifiedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsList || child.type === TabsContent) {
      return React.cloneElement(child, { activeTab, setActiveTab })
    }
    return child
  })

  return <div className={`tabs ${className}`}>{modifiedChildren}</div>
}

const TabsList = ({ children, activeTab, setActiveTab, className }) => {
  // Filtrar e modificar os filhos para passar o estado ativo
  const modifiedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsTrigger) {
      return React.cloneElement(child, { activeTab, setActiveTab })
    }
    return child
  })

  return <div className={`tabs-list ${className}`}>{modifiedChildren}</div>
}

const TabsTrigger = ({ value, activeTab, setActiveTab, children, className }) => {
  return (
    <button
      className={`tabs-trigger ${activeTab === value ? "active" : ""} ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, activeTab, children, className }) => {
  if (activeTab !== value) return null
  return <div className={`tabs-content ${className}`}>{children}</div>
}

function WeatherApp() {
  const [city, setCity] = useState("São Paulo")
  const [weatherData, setWeatherData] = useState(mockWeatherData)
  const [loading, setLoading] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState("day") // "day" ou "night"

  // Simula a busca de dados do clima
  const fetchWeather = (cityName) => {
    setLoading(true)
    // Aqui você conectaria com sua API de clima
    setTimeout(() => {
      setWeatherData({
        ...mockWeatherData,
        current: {
          ...mockWeatherData.current,
          city: cityName,
        },
      })
      setLoading(false)
    }, 1000)
  }

  // Define o período do dia para estilização
  useEffect(() => {
    const hours = new Date().getHours()
    setTimeOfDay(hours >= 6 && hours < 18 ? "day" : "night")
  }, [])

  // Determina a classe de fundo com base no clima atual e hora do dia
  const getBackgroundClass = () => {
    const icon = weatherData.current.icon

    if (timeOfDay === "night") {
      return "bg-night"
    }

    if (icon.includes("rain") || icon.includes("lightning")) {
      return "bg-rainy"
    } else if (icon.includes("snow")) {
      return "bg-snowy"
    } else if (icon.includes("cloud")) {
      return "bg-cloudy"
    } else {
      return "bg-sunny"
    }
  }

  return (
    <main className={`weather-app ${getBackgroundClass()}`}>
      {/* Elementos decorativos de fundo */}
      <div className="background-elements">
        {weatherData.current.icon.includes("rain") && (
          <div className="rain-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                }}
              >
                <Droplets size={16} className="text-blue-200" />
              </div>
            ))}
          </div>
        )}

        {weatherData.current.icon.includes("sun") && timeOfDay === "day" && <div className="sun-effect" />}

        {weatherData.current.icon.includes("cloud") && (
          <div className="cloud-container">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="cloud-element"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 40 + 5}%`,
                  transform: `scale(${Math.random() * 1 + 1.5})`,
                }}
              >
                <Cloud size={80} className="text-white" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        {/* Barra de pesquisa */}
        <div className="search-bar">
          <Input
            placeholder="Digite o nome da cidade..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <Button onClick={() => fetchWeather(city)} disabled={loading} className="search-button">
            {loading ? "Buscando..." : <Search size={18} />}
          </Button>
        </div>

        {/* Informações do clima atual */}
        <Card className="current-weather-card">
          <div className="current-weather-content">
            <div className="current-weather-icon">
              <WeatherIcon icon={weatherData.current.icon} size={160} className="text-white" />
            </div>

            <div className="current-weather-info">
              <div className="location-info">
                <h1 className="city-name">{weatherData.current.city}</h1>
                <p className="country-name">{weatherData.current.country}</p>

                <div className="temperature-display">
                  <WeatherIcon icon={weatherData.current.icon} size={48} className="text-white" />
                  <div>
                    <p className="temperature">{weatherData.current.temperature}°C</p>
                    <p className="condition">{weatherData.current.condition}</p>
                  </div>
                </div>
              </div>

              <div className="weather-details">
                <div className="weather-detail-item">
                  <Droplets size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Umidade</p>
                    <p className="detail-value">{weatherData.current.humidity}%</p>
                  </div>
                </div>

                <div className="weather-detail-item">
                  <Wind size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Vento</p>
                    <p className="detail-value">{weatherData.current.windSpeed} km/h</p>
                  </div>
                </div>

                <div className="weather-detail-item">
                  <div className="detail-icon-text">ST</div>
                  <div>
                    <p className="detail-label">Sensação</p>
                    <p className="detail-value">{weatherData.current.feelsLike}°C</p>
                  </div>
                </div>

                <div className="weather-detail-item">
                  <div className="detail-icon-text">UV</div>
                  <div>
                    <p className="detail-label">Índice UV</p>
                    <p className="detail-value">{weatherData.current.uvIndex}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Previsão por hora e por dia */}
        <Tabs defaultValue="hourly" className="forecast-tabs">
          <TabsList className="forecast-tabs-list">
            <TabsTrigger value="hourly">Previsão por Hora</TabsTrigger>
            <TabsTrigger value="daily">Próximos Dias</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly">
            <Card className="hourly-forecast-card">
              <div className="hourly-forecast-scroll">
                <div className="hourly-forecast-items">
                  {weatherData.hourly.map((hour, index) => (
                    <div key={index} className="hourly-forecast-item">
                      <p className="hour-time">{hour.time}</p>
                      <WeatherIcon icon={hour.icon} size={32} className="hour-icon" />
                      <p className="hour-temp">{hour.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="daily">
            <Card className="daily-forecast-card">
              <div className="daily-forecast-items">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="daily-forecast-item">
                    <div className="day-name">
                      <p className={index === 0 ? "today" : ""}>{day.day}</p>
                    </div>
                    <div className="day-condition">
                      <WeatherIcon icon={day.icon} size={24} className="day-icon" />
                      <p className="condition-text">{day.condition}</p>
                    </div>
                    <div className="day-temperature">
                      <p className="min-temp">{day.temp.min}°</p>
                      <div className="temp-bar-container">
                        <div
                          className="temp-bar-fill"
                          style={{ width: `${((day.temp.max - day.temp.min) / 15) * 100}%` }}
                        ></div>
                      </div>
                      <p className="max-temp">{day.temp.max}°</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default WeatherApp



