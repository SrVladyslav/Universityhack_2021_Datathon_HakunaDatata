// ###################### Relación Precio-Volumen de frutas y hortalizas #####################
Plotly.d3.csv(undefined , function (err, a) {
  var lookup = {};
  
  // Defines como dato el dataset generado
  data = plo1

  function getData(time, product) {
    var byYear, trace;
    if (!(byYear = lookup[time])) {;
      byYear = lookup[time] = {};
    }
    if (!(trace = byYear[product])) {
      trace = byYear[product] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.time, datum.producto);
    trace.text.push(datum.producto);
    trace.id.push(datum.time);
    trace.x.push(datum.volumen);
    trace.y.push(datum.precio);
    trace.marker.size.push(datum.valor);
  }
  var periods = Object.keys(lookup);
  var firstYear = lookup[periods[0]];
  var products = Object.keys(firstYear);
  var traces = [];
  for (i = 0; i < products.length; i++) {
    var data = firstYear[products[i]];
    traces.push({
      name: products[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 100
      }
    });
  }
  var frames = [];
  for (i = 0; i < periods.length; i++) {
    frames.push({
      name: periods[i],
      data: products.map(function (product) {
        return getData(periods[i], product);
      })
    })
  }
  var sliderSteps = [];
  for (i = 0; i < periods.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: periods[i],
      args: [[periods[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    marker_color: 'white',
    title: 'Relación Precio-Volumen de frutas y hortalizas',
    plot_bgcolor: "#191820",
    paper_bgcolor: "#191820",
    font: {color: '#DDDDDD'},
    xaxis: {
      title: 'Volumen (Toneladas)',
      range: [0, 260000]
    },
    yaxis: {
      title: 'Precio (€)',
      range: [0, 6]
      //type: 'log'
    },
    hovermode: 'closest',
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 15},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 20000},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
    sliders: [{
      pad: {l: 150, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 12, color: 'white'}
      },
      steps: sliderSteps
    }]
  };
  var config = {responsive: true}
  // Sustiye en el ID del HTML plot1
  Plotly.newPlot('plot1', {
    data: traces,
    layout: layout,
    frames: frames,
    color: 'white',
    config: config
  });
});
// ###################### Fin de Relación Precio-Volumen de frutas y hortalizas #####################

// ###################### Gráfico descomposición Estacional Citricos ###############################

var data = [trace2016, trace2017, trace2018, trace2019,trace2020];

var layout = {
  marker_color: 'white',
  title: 'Gráfico de Estacionalidad de la Serie de Exportaciones de Cítricos en euros',
  plot_bgcolor: "#191820",
  paper_bgcolor: "#191820",
  font: {color: '#DDDDDD'},
  xaxis: {
    title: 'Meses'
  },
  yaxis: {
    title: 'Exportaciones en euros',
  }
};

var config = {resposive:true}

Plotly.newPlot('plotEstacionalidadCitricos', {
  data: data,
  layout: layout,
  config: config,
  color: 'white'
});
// ###################### FIN Gráfico descomposición Estacional Citricos ###############################

// ###################### Stl de citricos ###############################

var data = [citricos, trendCitricos, seasonalCitricos, residCitricos];

var layout = {
  marker_color: 'white',
  title: 'Descomposición STL (Seasonal and Trend decomposition using Loess) Serie Cítricos',
  plot_bgcolor: "#191820",
  paper_bgcolor: "#191820",
  font: {color: '#DDDDDD'},
  grid: {rows: 4, columns: 1, pattern: 'independent',  roworder: 'top to bottom'},
};

var config = {resposive:true}

Plotly.newPlot('stlCitricos', {
  data: data,
  layout: layout,
  config: config,
  color: 'white'
});

// ###################### FIN Stl de citricos ###############################

// ###################### Extraida componente estacional Citricos ###############################

let destacionalizada = {
  x: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'],
  y: [292947630.765625, 305785360.5572916, 270063594.0260416, 255398871.96354163, 256580566.65104163, 260517442.68229166, 255719170.55729166, 281139327.265625, 275162713.4739583, 291071787.1197917, 300358947.765625, 274073789.171875, 268174736.765625, 270421310.5572916, 253684996.02604166, 235841526.96354163, 261709696.65104163, 286436203.6822916, 276900309.5572916, 270724070.265625, 284829021.4739583, 293835161.1197917, 286999263.765625, 287380240.171875, 279033187.765625, 278966499.5572916, 279285596.0260416, 259733431.96354163, 284883590.6510416, 272514393.6822916, 267158787.55729166, 273896185.265625, 268082440.4739583, 247194785.1197917, 230931237.765625, 255852734.17187503, 259000230.765625, 248967182.55729166, 231581023.02604166, 261119226.96354163, 287686055.6510416, 293551843.6822916, 295898010.5572916, 271475544.265625, 273510439.4739583, 277879297.1197917, 297987681.765625, 301213713.171875, 313670051.765625, 322475311.5572916, 357761351.0260416, 369215088.9635416, 293870763.6510416, 277067540.6822916, 271754601.5572916, 287954228.265625, 303931697.4739583, 348614213.1197917, 296596483.765625, 311913256.171875],
  type: 'scatter',
  name: 'Extraida componente estacional'
  };

  var data = [destacionalizada];

  var layout = {
    marker_color: 'white',
    title: 'Serie de Exportaciones de Cítricos sin componente estacional',
    plot_bgcolor: "#191820",
    paper_bgcolor: "#191820",
    font: {color: '#DDDDDD'},
  };
  
  var config = {resposive:true}

  Plotly.newPlot('destacionalizadaCitricos', {
    data: data,
    layout: layout,
    config: config,
    color: 'white'
  });
// ###################### FIN Extraida componente estacional Citricos ###############################

  // ###################### Gráfico descomposición Estacional Hueso ###############################

var data = [trace2016Hueso, trace2017Hueso, trace2018Hueso, trace2019Hueso,trace2020Hueso];

var layout = {
  marker_color: 'white',
  title: 'Gráfico de Estacionalidad de la Serie de Exportaciones de Frutas de Hueso en euros',
  plot_bgcolor: "#191820",
  paper_bgcolor: "#191820",
  font: {color: '#DDDDDD'},
  xaxis: {
    title: 'Meses'
  },
  yaxis: {
    title: 'Exportaciones en euros',
  }
};

var config = {resposive:true}

Plotly.newPlot('plotEstacionalidadHueso', {
  data: data,
  layout: layout,
  config: config,
  color: 'white'
});
  // ###################### FIN Gráfico descomposición Estacional Hueso ###############################

// ###################### Stl de F. de hueso ###############################

var data = [fhueso, trendHueso, seasonalHueso, residHueso];

var layout = {
  marker_color: 'white',
  title: 'Descomposición STL (Seasonal and Trend decomposition using Loess) de la serie Frutas de Hueso',
  plot_bgcolor: "#191820",
  paper_bgcolor: "#191820",
  font: {color: '#DDDDDD'},
  grid: {rows: 4, columns: 1, pattern: 'independent',  roworder: 'top to bottom'},
};

var config = {resposive:true}

Plotly.newPlot('stlHueso', {
  data: data,
  layout: layout,
  config: config,
  color: 'white'
});
// ###################### FIN Stl de F. de hueso ###############################


// ###################### Extraida componente estacional F. Hueso ###############################

let destacionalizadaHueso = {
  x: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'],
  y: [93796847.75, 93293530.52083333, 93074726.19791667, 97413817.17708333, 62961121.625000015, 67853730.63541669, 97514124.63541667, 99622903.05208333, 96361219.36458334, 96919288.98958334, 93537563.55208333, 93474253.5, 93756441.75, 93902260.52083333, 93624474.19791667, 90675891.17708333, 111410978.62500001, 89192624.63541669, 74956678.63541667, 75032790.05208333, 89138222.36458334, 83259753.98958334, 89279422.55208333, 93166081.5, 93848861.75, 93942572.52083333, 93541745.19791667, 83236225.17708333, 68808886.62500001, 82572593.63541669, 96162990.63541667, 114371264.05208333, 84162974.36458334, 93788990.98958334, 90144784.55208333, 92442771.5, 93844559.75, 93184125.52083333, 93456972.19791667, 88688395.17708333, 71592891.62500001, 81907764.63541669, 96047207.63541667, 75693134.05208333, 95121458.36458334, 91378207.98958334, 95301460.55208333, 93647407.5, 93797247.75, 94231282.52083333, 93667772.19791667, 110317591.17708333, 120065089.62500001, 117964549.63541669, 107801633.63541667, 89650516.05208333, 83070951.36458334, 77260890.98958334, 88229812.55208333, 93014469.5],
  type: 'scatter',
  name: 'Extraida componente estacional'
  };

  var data = [destacionalizadaHueso];

  var layout = {
    marker_color: 'white',
    title: 'Serie de Exportaciones de Frutas de Hueso sin componente estacional',
    plot_bgcolor: "#191820",
    paper_bgcolor: "#191820",
    font: {color: '#DDDDDD'},
  };
  
  var config = {resposive:true}

  Plotly.newPlot('destacionalizadaHueso', {
    data: data,
    layout: layout,
    config: config,
    color: 'white'
  });
// ###################### FIN Extraida componente estacional F. Hueso ###############################

// ###################### Frutas y Hortalizas Exports en euros ###############################

var data = [hortalizas, frutas];
  
var layout = {
  marker_color: 'white',
  title: 'Exportaciones de Frutas y Hortalizas en euros',
  plot_bgcolor: "#191820",
  paper_bgcolor: "#191820",
  font: {color: '#DDDDDD'},
};

var config = {resposive:true}

Plotly.newPlot('FrutasVSHortalizasExport', {
  data: data,
  layout: layout,
  config: config,
  color: 'white'
});


// ###################### CHoropleth Map #######################
/*Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv', function(err, rows){
                function unpack(rows, key) {
return rows.map(function(row) { return row[key]; });
}
var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: unpack(rows, 'Postal'),
    z: unpack(rows, 'Population'),
    text: unpack(rows, 'State'),
    autocolorscale: true
}];

var layout = {
title: '2014 US Popultaion by State',
    geo:{
        scope: 'usa',
        countrycolor: 'rgb(255, 255, 255)',
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        showlakes: true,
        lakecolor: 'rgb(255, 255, 255)',
        subunitcolor: 'rgb(255, 255, 255)',
        lonaxis: {},
        lataxis: {}
    }
};
Plotly.newPlot("plot2", data, layout, {showLink: false});
}); */