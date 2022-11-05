(async() => {
    alert('testing');
    const response = await fetch('./srank.json')
    const data = await response.json();

    const htmlList = data
    .slice(0, 30)
    .map((fii, index) => `<tr>
            <td>${index + 1}</td>
            <td>${fii.Ticket}</td>
            <td>${fii.Preco}</td>
            <td>${fii.Liq}</td>
            <td>${fii.Dy}</td>
            <td>${fii.DyMed}</td>
            <td>${fii.Pvp}</td>
        </tr>`)
    .join('');

    document.querySelector('table tbody').innerHTML = htmlList;
})();