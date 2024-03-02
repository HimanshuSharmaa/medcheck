const  express  = require("express");

const path = require('path')


const app = express();


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})






app.listen(8080,()=>{
    console.log("from server")
})


var stringdata = ""


const puppeteer = require('puppeteer');


async function getdata(name){

    const medname = name

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.google.com');
    await page.waitForSelector('textarea[aria-label="Search"]',{visible:true})
    await page.type('textarea[aria-label="Search"]',medname +' uses');
    await page.keyboard.press('Enter');

    await page.waitForNavigation()
   


    const dataeng = await page.evaluate(function getdata(){
    

        var nodelist =  document.querySelectorAll('div[data-md="471"] span span')

        

        for(let i = 0 ; i < nodelist.length ; i++){
            if (nodelist[i].classList.contains("hgKElc")) {
              return (nodelist[i].textContent)
            }           
         }
        

    })
 
    console.log(dataeng)




    
    await page.waitForSelector('textarea[aria-label="Search"]',{visible:true})
    await page.evaluate(() => {
        document.querySelector('textarea[aria-label="Search"]').value = '';
      });

    await page.type('textarea[aria-label="Search"]',medname +' uses in hindi');
    await page.keyboard.press('Enter');

    await page.waitForNavigation()


    const datahindi = await page.evaluate(function getdata(){
    

        var nodelist =  document.querySelectorAll('div[data-md="471"] span span')


        for(let i = 0 ; i < nodelist.length ; i++){
            if (nodelist[i].classList.contains("hgKElc")) {
              return (nodelist[i].textContent)
            }           
         }
        

    })
 
    console.log(datahindi)


	await browser.close();

return {
    english:dataeng
    ,
    hindi:datahindi
};

};






// Create an API endpoint to serve the data
app.get('/getStringData/:parameter',async (req, res) => {
    
try{
    const parameter = req.params.parameter;
    const result = await getdata(parameter);
    res.send(result);
}catch(err){

    res.send(err.message)


}
  
  });




  app.use(express.static('public'));