const fs = require('fs');

// Configurações a partir das variáveis de ambiente
const configContent = `
    const myconfig = {
        MY_KEY: "${process.env.FLICKR_API_KEY}",
        MY_SECRET: "${process.env.FLICKR_API_SECRET}",
        MY_KEY_WEATHER: "${process.env.WEATHER_API_KEY}",
        GEONAMES_USERNAME: "${process.env.GEONAMES_USERNAME}"
    };
    export default myconfig;
`;

// Salva o conteúdo no arquivo config.js
fs.writeFileSync('./config.js', configContent, (err) => {
    if (err) {
        console.error('Erro ao gerar config.js:', err);
    } else {
        console.log('config.js gerado com sucesso!');
    }
});
