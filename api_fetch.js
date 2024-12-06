/ Importation de la biblioth  que node-fetch (assurez-vous qu'elle est install  e)
// Importation de la biblioth  que Axios
const axios = require('axios');


// Fonction principale pour envoyer la requ  te
const fetchInterpolData = async (forename, name) => {
    const url = `https://ws-public.interpol.int/notices/v1/red?forename=${forename}&name=${name}`;
    try {
        // Envoi de la requ  te GET avec Axios
        const response = await axios.get(url, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'max-age=0',
                'Priority': 'u=0, i',
                'Sec-CH-UA': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'Sec-CH-UA-Mobile': '?0',
                'Sec-CH-UA-Platform': '"macOS"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            }
        });

        // Affichage des r  sultats
        console.log('R  sultats de la recherche :', JSON.stringify(response.data, null, 2));
    } catch (error) {
        // Gestion des erreurs
        if (error.response) {
            // Erreur renvoy  e par le serveur (statut HTTP)
            console.error(`Erreur HTTP : ${error.response.status} - ${error.response.statusText}`);
        } else {
            // Erreur de configuration ou de r  seau
            console.error('Erreur lors de la requ  te :', error.message);
        }
    }
};

exports.fetchInterpolData = fetchInterpolData

// Ex  cution de la fonction
fetchInterpolData("Mohamed", "Mustermann");

