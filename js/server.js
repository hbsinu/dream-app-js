    import  * as dotenv from 'dotenv'; 
    dotenv.config();

    // import { Configuration, OpenAIApi, OpenAI } from 'openai';     
    import { OpenAI } from 'openai';     

/*     const configuration = new Configuration ({
        apiKey: process.env.OPENAI ,
    });

    const openai = new OpenAIApi(configuration); */
    const openai = new OpenAI({
        apiKey:  process.env.OPENAI // This is also the default, can be omitted
   });

    import express from 'express'; 
    import cors from 'cors';
    
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.post('/dream' , async (req, res) => {

        const prompt = req.body.prompt ; 

        /* const aiResponse = await openai.createImage({
            model: "dall-e-3",
            prompt, 
            n:1,
            size: '1024x1024',
        }); */
        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt, 
            n:1,
            size: '1024x1024',
        });
        const image = aiResponse.data.data[0].url;

        res.send({ image });
    });

    app.listen(8080, ()=> console.log('make art in http://localhost:8080/dream'));