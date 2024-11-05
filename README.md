# City Explorer

City Explorer é uma aplicação web que permite ao utilizador explorar informações detalhadas sobre cidades, exibindo clima, dados do país, coordenadas geográficas, mapa interativo e fotos. O projeto faz uso de várias APIs REST para fornecer uma experiência informativa e visualmente apelativa.

## Índice

- [City Explorer](#city-explorer)
  - [Índice](#índice)
  - [Descrição](#descrição)
  - [Objetivo e Motivação](#objetivo-e-motivação)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias e Bibliotecas](#tecnologias-e-bibliotecas)
  - [APIs Utilizadas](#apis-utilizadas)
  - [Pré-requisitos e Configuração](#pré-requisitos-e-configuração)
  - [Como Usar](#como-usar)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Estilos e Animações](#estilos-e-animações)
  - [Erros e Tratamento](#erros-e-tratamento)
  - [Autores e Repositório](#autores-e-repositório)

## Descrição

City Explorer é uma aplicação que combina dados de várias APIs para exibir informações relevantes sobre qualquer cidade do mundo. Ao introduzir o nome de uma cidade, o utilizador recebe:
- **Clima Atual**: Temperatura e descrição do clima.
- **Informações do País**: Detalhes sobre o país da cidade, como capital, população, idioma e moeda.
- **Coordenadas Geográficas**: Latitude e longitude da cidade.
- **Mapa Interativo**: Visualização da localização geográfica da cidade.
- **Fotos da Cidade**: Galeria de imagens relacionadas com a cidade.

## Objetivo e Motivação

O objetivo do projeto é demonstrar a integração de múltiplas APIs REST em uma aplicação coesa e informativa. Este projeto serve como uma referência para explorar o uso de APIs em JavaScript e oferece um recurso valioso para visualizar dados geográficos.

## Funcionalidades

- **Pesquisa de Cidade**: Permite ao utilizador pesquisar qualquer cidade.
- **Clima**: Exibe a temperatura e a descrição do clima.
- **Informações do País**: Fornece detalhes sobre o país da cidade.
- **Coordenadas Geográficas**: Exibe latitude e longitude.
- **Mapa Interativo**: Localização da cidade exibida com marcador no mapa.
- **Fotos da Cidade**: Galeria de fotos relacionadas com a cidade pesquisada.
- **Mensagens de Erro**: Mostra mensagens de erro detalhadas caso a cidade não seja encontrada.

## Tecnologias e Bibliotecas

- **HTML5 e CSS3**: Estrutura e estilização.
- **JavaScript**: Lógica e integração com APIs.
- **Leaflet.js**: Biblioteca para exibição de mapas interativos.
- **Node.js com http-server**: Servidor para hospedar a aplicação localmente.

## APIs Utilizadas

- **Flickr API**: Fornece fotos relacionadas à cidade.
- **OpenWeatherMap API**: Fornece dados climáticos da cidade.
- **GeoNames API**: Fornece coordenadas geográficas da cidade.
- **RestCountries API**: Fornece dados sobre o país da cidade.
- **OpenStreetMap/Leaflet**: Exibe um mapa interativo para a localização da cidade.

## Pré-requisitos e Configuração

1. **Instalar Node.js**:
   - Baixe e instale o Node.js: [Node.js download](https://nodejs.org/).
   - Instale `http-server` com:
     ```bash
     npm install http-server
     ```

2. **Configuração das Chaves de API (Ambiente de Produção)**:
   - **Render.com**: Se você estiver hospedando no Render, configure as chaves de API como variáveis de ambiente:
     - `FLICKR_API_KEY`, `FLICKR_API_SECRET`, `WEATHER_API_KEY`, `GEONAMES_USERNAME`
   - As variáveis de ambiente são configuradas automaticamente no `generateConfig.js` para gerar o arquivo `config.js` usado na aplicação.

3. **Configuração das Chaves de API (Ambiente Local)**:
   - Para testes locais, crie um arquivo `myconfig.js` na pasta do projeto com o seguinte conteúdo:
     ```javascript
     const myconfig = {
       MY_KEY: "SUA_CHAVE_FLICKR",
       MY_SECRET: "SEU_SECRET_FLICKR",
       MY_KEY_WEATHER: "SUA_CHAVE_OPENWEATHER",
       GEONAMES_USERNAME: "SEU_USERNAME_GEONAMES"
     };
     ```
   - **Nota**: Inclua `myconfig.js` no `.gitignore` para proteger suas chaves e evitar que sejam enviadas ao repositório.

4. **Script de Build e Instalação**:
   - No seu `package.json`, já incluímos o script `start` para inicializar o servidor com `http-server`. A execução do projeto pode ser feita com:
     ```bash
     npm start
     ```
   - O comando acima inicia o servidor na porta `8080`, permitindo acesso local à aplicação.

5. **Executando o Projeto**:
   - Na pasta do projeto, execute o comando:
     ```bash
     npm start
     ```
   - Acesse `http://localhost:8080` no navegador para ver a aplicação.

## Como Usar

1. Digite o nome de uma cidade na barra de pesquisa e clique em "Pesquisar".
2. As informações sobre a cidade, incluindo clima, país, coordenadas, mapa e fotos, serão carregadas e exibidas.

## Estrutura do Projeto

- `index.html`: Estrutura do HTML da aplicação.
- `style.css`: Estilos e animações.
- `cityExplorer.js`: Script principal que integra as APIs e manipula os dados.
- `generateConfig.js`: Script para gerar o arquivo `config.js` com as chaves de API a partir das variáveis de ambiente.
- `config.js`: Arquivo gerado dinamicamente com as chaves de API (no ambiente de produção).
- `myconfig.js`: Contém as chaves de API para uso local (não incluir no GitHub).
- `package.json`: Dependências e scripts.

## Estilos e Animações

- **Cards e Galeria de Fotos**: Design estilizado para melhor visualização.
- **Loading Spinner**: Indicador de carregamento.
- **Animação de Título nas Fotos**: Efeito de borda animada.

## Erros e Tratamento

- **Mensagens de Erro Personalizadas**: Mostra mensagens específicas quando a cidade não é encontrada ou ocorre erro de rede.
- **Tratamento de Erros de Rede**: Captura erros de rede e notifica o utilizador.

## Autores e Repositório

- **Autores**: Diogo Azevedo, Letícia Loureiro
- **Repositório GitHub**: [link_do_repositorio]
- **Endereço da Aplicação**: [link_para_render.com]
