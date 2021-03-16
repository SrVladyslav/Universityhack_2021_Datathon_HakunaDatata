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
  // Sustiye en el ID del HTML plot1
  Plotly.newPlot('plot1', {
    data: traces,
    layout: layout,
    frames: frames,
    olor: 'white'
  });
});
// ###################### Fin de Relación Precio-Volumen de frutas y hortalizas #####################