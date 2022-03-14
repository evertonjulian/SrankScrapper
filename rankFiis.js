module.exports = {
    rankFiis: rankFiis
}

function rankFiis(objectList){
    
    const objectListFormatted = objectList.map((item, index) => {
        return { 
          ...item, 
          Negociabilidade: calcularNegociabilidade(item.Preco, item.Liq),
          DyFormatado: formatarDyMedio(item.DyMed),
          PvpFormatado: formatarPvp(item.Pvp)
        }
    })
        
    return objectListFormatted.filter((fii) => {
        return fii.Negociabilidade > 199999 && fii.DyFormatado > 0
    }).sort((a, b) => {
        return b.DyFormatado - a.DyFormatado
    }).map((item, index) => {
        return { ...item, RankDy: index + 1}
    }).sort((a, b) => {
        return a.PvpFormatado - b.PvpFormatado
    }).map((item, index) => {
        return { 
          ...item, 
          RankPvp: index + 1,
          SRank: item.RankDy + index + 1
        }
    }).sort((a, b) => {
        return a.SRank - b.SRank
    })

    //aplicar calculo diferenca media e mediana nos dividendos
}

function calcularNegociabilidade(preco, liquidez){
    return formatarPreco(preco) * formatarLiquidez(liquidez)
}

function formatarPreco(preco){
    return parseFloat(preco.replace('N/A', '0').match(/[\d\,]+/g).join('').replace(',','.'))
}

function formatarLiquidez(liquidez){
    return parseFloat(liquidez.replace('N/A', '0'))
}

function formatarDyMedio(dyMed){
    return parseFloat(dyMed.replace('N/A','0').match(/[\d\,]+/g).join('').replace(',','.'))
}

function formatarPvp(pvp){
    return parseFloat(pvp.replace('N/A','0').replace(',','.'))
}