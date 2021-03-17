var consumo_2018 = [['PATATAS FRESCAS', 'NARANJAS', 'TOMATES', 'PLATANOS','OTR.HORTALIZAS/VERD.'],
                    [156231.386, 129992.452, 100855.435, 89671.086, 77045.348],
                    [0.777, 1.061, 1.646, 1.598, 2.181],
                    [120802.189, 131044.167, 161276.85, 142089.632, 161606.525],
                    [63.026, 48.562, 75.39, 75.594, 74.403],
                    [1.72, 1.496, 1.04, 0.997, 0.827]]

var layout = {
    title: 'Relación Precio-Volumen de frutas y hortalizas',
    plot_bgcolor: "#191820",
    paper_bgcolor: "#191820",
    font: {color: '#DDDDDD'}
}
var config = {responsive: true}

var data_2018 = [{
    type: 'table',
    header: {
    values: [["<b>PRODUCTO</b>"],
                ["<b>VOLUMEN</b>"], ["<b>PRECIO</b>"], 
                ["<b>VALOR</b>"], ["<b>PENETRACION</b>"],
                ["<b>CONS. PER CAPITA</b>"]],
    align: "center",
    line: {width: 1, color: '#2458A7'},
    fill: {color: "#2458A7"},
    font: {family: "Arial", size: 11, color: "white"}
    },
    cells: {
        values: consumo_2018,
        align: "center",
        line: {color: "#2458A7", width: 1},
        font: {family: "Arial", size: 11, color: ["white"]},
        fill: {color: '#191820'},
        color: '#DDDDDD' 
    }
}]
//const config = {responsive: true}
//Plotly.newPlot('plot_cons_cap_2018', data_2018, layout, config);