import axios, * as others from 'axios';

const subscriptionKey = process.env.REACT_APP_AZURE_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.REACT_APP_AZURE_VISION_ENDPOINT;

export function analyzeImage(imageUrl) {
    // Call Azure AI vision service here
    const uriBase = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption&language=en&gender-neutral-caption=False`;
    try {

        const headers = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        };
        return axios.post(uriBase, { url: imageUrl }, { headers })
            .then(response => {
                console.log(response.data);
                return response.data;
                })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // ...
}

