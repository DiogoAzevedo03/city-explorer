// Chaves das APIs (obtidas do ficheiro myconfig.js)
const mykey = myconfig.MY_KEY;  // Chave do FlickR
const secretkey = myconfig.MY_SECRET;
const mykeyWeather = myconfig.MY_KEY_WEATHER;  // OpenWeatherMap
const geonamesUsername = myconfig.GEONAMES_USERNAME;  // GeoNames
const numberOfPhotos = 22;  // Número de fotos


document.getElementById('searchBtn').addEventListener('click', searchAll, false);

// Obter o container das fotos
const photosContainer = document.getElementById('photos');
photosContainer.addEventListener('click', showPhoto, false);

let map;

function initializeMap(lat, lng) {
    if (map) {
        map.remove();
    }

    map = L.map('geo').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

// Função para mostrar as fotos em tamanho maior
function showPhoto(event) {
    if (event.currentTarget === event.target) return;

    const fullPhotoUrl = event.target.getAttribute('data-fullPhotoUrl');
    const existingFullPhotoDiv = document.querySelector('.full-photo');
    if (existingFullPhotoDiv) {
        existingFullPhotoDiv.remove();
    }

    const fullPhotoDiv = document.createElement('div');
    fullPhotoDiv.className = 'full-photo';
    fullPhotoDiv.style.backgroundImage = `url(${fullPhotoUrl})`;
    fullPhotoDiv.style.display = 'none';
    document.body.appendChild(fullPhotoDiv);
    fullPhotoDiv.style.display = 'block';

    fullPhotoDiv.addEventListener('click', () => {
        fullPhotoDiv.remove();
    });
}

// Função para exibir mensagens de erro

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-message');
    
    if (errorContainer) { // Verifica se o contêiner existe
        errorContainer.innerHTML = `
            <div class="error-message">
                <span class="error-icon">⚠️</span> ${message}
            </div>
        `;
        errorContainer.style.display = 'block';
    } else {
        console.error("Contêiner de erro não encontrado no HTML.");
    }
}


// Função para limpar mensagens de erro (chamada no início de cada pesquisa)
function clearErrorMessages() {
    const errorMessagesContainer = document.getElementById('error-messages');
    errorMessagesContainer.innerHTML = ''; // Limpa todas as mensagens de erro anteriores
}

// Função para pesquisar fotos no FlickR
function searchPhotos(city) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${mykey}&text=${city}&format=json&nojsoncallback=1&per_page=${numberOfPhotos}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.photo.length > 0) {
                displayPhotos(data.photos.photo);
                const photosTitle = document.getElementById('photosTitle');
                photosTitle.style.display = 'block';
                photosTitle.textContent = `Fotos da cidade: ${city}`;
                photosTitle.classList.add('loaded');
            } else {
                throw new Error('Nenhuma foto encontrada para esta cidade.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar as fotos:', error);
            displayErrorMessage(error.message);
            document.getElementById('photos').innerHTML = `<p>Erro ao carregar as fotos</p>`;
        });
}

// Função para exibir fotos
function displayPhotos(photos) {
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; // Limpa as fotos anteriores

    photos.forEach(photo => {
        const bgPhotoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
        const fullPhotoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo';
        photoDiv.setAttribute("data-fullPhotoUrl", fullPhotoUrl);

        // Criar uma nova imagem para verificar se o URL é válido
        const img = new Image();
        img.src = bgPhotoUrl;

        img.onload = function () {
            photoDiv.style.backgroundImage = `url(${bgPhotoUrl})`;
            photosContainer.appendChild(photoDiv); // Adicionar à página
        };

        img.onerror = function () {
            console.error(`Erro ao carregar a imagem ${bgPhotoUrl}. A imagem será ignorada.`);
        };
    });
}

// Função para pesquisar o clima (OpenWeatherMap)
// Adicione chamadas para `displayErrorMessage` onde ocorrerem erros
function searchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykeyWeather}&units=metric&lang=pt`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada no sistema de clima.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            const countryCode = data.sys.country;
            searchCountryInfo(countryCode);
        })
        .catch(error => {
            console.error('Erro ao buscar o clima:', error);
            displayErrorMessage(error.message);
            document.getElementById('weather').innerHTML = `<p>Erro ao carregar o clima</p>`;
        });
}
// Função para buscar dados do país (RestCountries API)
function searchCountryInfo(countryCode) {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do país.");
            }
            return response.json();
        })
        .then(data => displayCountryInfo(data[0]))
        .catch(error => {
            console.error('Erro ao buscar dados do país:', error);
            displayErrorMessage(error.message);
        });
}

// Função para buscar dados geográficos (GeoNames API)
function searchGeoInfo(city) {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUsername}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada no sistema de dados geográficos.');
            }
            return response.json();
        })
        .then(data => {
            if (data.geonames && data.geonames.length > 0) {
                const geo = data.geonames[0];
                displayMap(geo.lat, geo.lng);
            } else {
                throw new Error('Cidade não encontrada no sistema de dados geográficos.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados geográficos:', error);
            displayErrorMessage(error.message);
            document.getElementById('geo').innerHTML = `<p>Erro ao carregar o mapa</p>`;
        });
}


// Função para exibir o mapa
function displayMap(lat, lng) {
    document.getElementById('geo').innerHTML = ""; // Limpa o conteúdo anterior
    initializeMap(lat, lng);

    const coordinatesContainer = document.getElementById('coordinates');
    coordinatesContainer.innerHTML = `
        <h3>Coordenadas da cidade</h3>
        <p><strong>Latitude:</strong> ${lat}</p>
        <p><strong>Longitude:</strong> ${lng}</p>
    `;
}

// Função para exibir os dados do país
// Função para exibir os dados do país
function displayCountryInfo(country) {
    const countryContainer = document.getElementById('country');
    countryContainer.innerHTML = '';  // Limpa o conteúdo anterior

    const flagUrl = country.flags.png;
    const population = country.population;
    let capital = country.capital[0];
    let language = Object.values(country.languages)[0];
    const currency = Object.values(country.currencies)[0].name;

    // Verificação para Portugal
    if (country.name.common === "Portugal") {
        capital = "Lisboa";
        language = "Português";
    }

    countryContainer.innerHTML = `
        <h3>Informações sobre o país: ${country.name.common}</h3>
        <img src="${flagUrl}" alt="Bandeira de ${country.name.common}" width="100px">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>População:</strong> ${population.toLocaleString()}</p>
        <p><strong>Idioma:</strong> ${language}</p>
        <p><strong>Moeda:</strong> ${currency}</p>
    `;
}


// Função para exibir o clima
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = '';

    const city = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;

    weatherContainer.innerHTML = `
        <h3>Clima em ${city}</h3>
        <p>Temperatura: ${temp}°C</p>
        <p>Descrição: ${description}</p>
    `;
}

// Função para pesquisar fotos, clima, país e dados geográficos ao mesmo tempo
function searchAll() {
    const query = document.getElementById('searchInput').value;
    
    clearErrorMessages(); // Limpa as mensagens de erro antes de iniciar uma nova pesquisa
    
    searchPhotos(query);
    searchWeather(query);
    searchGeoInfo(query);
}

