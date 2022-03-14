const puppeteer = require('puppeteer');
const fs = require('fs');
const rank = require('./rankFiis');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.fundsexplorer.com.br/ranking');

  //função executada no browser
  const fiiList = await page.evaluate(() => {
    //pegar tr
    const nodeList = document.querySelectorAll('#table-ranking tbody tr')
    //transformar node list em array
    const trArray = [...nodeList]

    return trArray.map( tr => ({
        Ticket: tr.cells[0].textContent,
        Setor: tr.cells[1].textContent,
        Preco: tr.cells[2].textContent,
        Liq: tr.cells[3].textContent,
        Dy: tr.cells[5].textContent,
        DyMed: tr.cells[11].textContent,
        Pvp: tr.cells[18].textContent
    }))
  });

  const fiiListRanked = rank.rankFiis(fiiList)
  
  // escrever os dados em um arquivo local (json)
  fs.writeFile('3srank.json', JSON.stringify(fiiListRanked, null, 2), err => {
      if(err) throw new Error('Something went wrong')

      console.log('well done!')
  })

  await browser.close();
})();