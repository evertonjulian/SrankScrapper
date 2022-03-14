const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');
  //await page.screenshot({ path: 'example.png' });

  const imgList = await page.evaluate(() => {
    //função executada no browser

    //pegar imagens que estao na parte de posts
    const nodeList = document.querySelectorAll('article img')
    //transformar node list em array
    const imgArray = [...nodeList]

    //transformar nodes (elementos html) em objetos js
    const imgList = imgArray.map( ({src}) => ({
        src
    }))
    
    //colocar pra fora da função
    return imgList
  });

  // escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('Something went wrong')

      console.log('well done!')
  })

  await browser.close();
})();