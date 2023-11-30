import OpenAI from "openai";

const openai = new OpenAI({
    organization: process.env.REACT_APP_OPENAI_API_ORGANIZATION,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
export async function generateImage(prompt) {
    try{
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            size: "1024x1024",
            quality: "standard",
            n: 1
        });
        console.log(response.data);
        const image_url = response.data[0].url;
        return image_url;

    }catch(error){
        console.log(`Error: ${error}`);
    }
}

