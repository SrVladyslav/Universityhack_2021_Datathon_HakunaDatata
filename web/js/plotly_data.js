
// Pie Chart
var data = [{
    values: [19, 26, 55],
    labels: ['Hortalizas Este', 'Hortalizas Norte', 'Hortalizas Sur'],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 400
  };
  
  Plotly.newPlot('pie_chart', data, layout);


  // Europe Map
  var data1 = [{
    type: 'scattergeo',
    mode: 'markers',
    locations: ['FRA', 'DEU', 'RUS', 'ESP', 'ITA', 'UKR', 'POL'],
    marker: {
        size: [20, 30, 15, 20, 50, 15, 10],
        color: [10, 20, 40, 5, 2, 50, 2],
        cmin: 0,
        cmax: 100,
        colorscale: 'Blues',
        colorbar: {
            title: 'Some rate',
            ticksuffix: '%',
            showticksuffix: 'last'
        },
        line: {
            color: 'black'
        }
    },
    name: 'europe data'
}];

var layout1 = {
    'geo': {
        'scope': 'europe',
        'resolution': 50
    }
};

Plotly.newPlot('map_l', data1, layout1);