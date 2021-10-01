const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

const PORT = 3000;

// //the guardian exemple
// const url = "https://www.theguardian.com/uk";
// axios(url)
//     .then(res => {
//         const html = res.data;
//         const $ = cheerio.load(html);
//         const dataAccumulator = [];

//         // the selectors to scrap the page are below and subject to change acording to the page being scraped
//         $(".fc-item__title", html).each(function () {
//             // dom element exemple to be scraped 
//             const title = $(this).text();
//             const link = $(this).find('a').attr('href');
//             dataAccumulator.push({
//                 title,
//                 link
//             });
//         });

//         console.log(dataAccumulator);
//     }).catch(err => console.log(err));



app.get("/", (req, res) => {
    const url = "https://sensoincomum.org/";

    axios(url)
        .then(res => {
            const html = res.data;
            const $ = cheerio.load(html);
            const dataAccumulator = [];

            // the selectors to scrap the page are below and subject to change acording to the page being scraped
            $(".vc_gitem-link", html).each(function () {
                const title = $(this).text();
                const link = $(this).attr('href');
                dataAccumulator.push({
                    title,
                    link
                });
            });
            console.log(dataAccumulator);
            return res.json(dataAccumulator);
        }).catch(err => console.log(err));
    return res.json(dataAccumulator);
});


app.listen(PORT, () => console.log(`server running on port ${PORT}`));