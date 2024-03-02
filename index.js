const puppeteer = require('puppeteer');


async function getdata(){

    const medname = "combiflame"

	const browser = await puppeteer.launch({headless:false});
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


};

getdata()



    
