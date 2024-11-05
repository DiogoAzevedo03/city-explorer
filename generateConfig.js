const fs = require('fs');

// Configurações a partir das variáveis de ambiente
const configContent = `
    const myconfig = {
        MY_KEY: "${process.env.FLICKR_API_KEY}",
        MY_SECRET: "${process.env.FLICKR_API_SECRET}",
        MY_KEY_WEATHER: "${process.env.WEATHER_API_KEY}",
        GEONAMES_USERNAME: "${process.env.GEONAMES_USERNAME}"
    };
`;

// Salva o conteúdo no arquivo myconfig.js
fs.writeFileSync('./myconfig.js', configContent, (err) => {
    if (err) {
        console.error('Erro ao gerar myconfig.js:', err);
    } else {
        console.log('myconfig.js gerado com sucesso!');
    }
});

