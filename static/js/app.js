function buildMetadata(sample) {

  // Using `d3.json` to fetch the metadata for a sample
  var metaDataUrl = `/metadata/${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(metaDataUrl).then(function(sample) {
        var sampleData = d3.select('#sample-metadata');
        // Clearing out any existing metadata
        sampleData.html('')
        // Adding each key/value pair to the panel
        Object.entries(sample).forEach(function([key, value]){
          var row = sampleData.append('h6');
          row.text(`${key}:${value}`)
        })

        var level = sample.WFREQ
        console.log(level)
      var degrees = 180 - (level * 20),
        radius = .7;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

      // Path: may have to change to create a better triangle
      var mainPath = "M -.0 -0.05 L .0 0.05 L ";
      pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
      var path = mainPath.concat(pathX, space, pathY, pathEnd);

      var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 28, color: '850000' },
        showlegend: false,
        name: 'Frequency',
        text: level,
        hoverinfo: 'text+name'
      },
      {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
          '1-2', '0-1', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['#84B589', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
            'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
            '#F4F1E4', '#F8F3EC', 'rgba(255, 255, 255, 0)',]
        },
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
          '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }];

      var layout = {
        shapes: [{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],

        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        xaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        },
        yaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        }
      };
      var gauge = document.getElementById('gauge');
      Plotly.newPlot(gauge, data, layout)

      })
};

function buildCharts(sample) {

  // Using `d3.json` to fetch the sample data for the plots
  var dataPlotUrl = '/samples/' + sample;

    d3.json(dataPlotUrl).then(function(data) {
      var x_axis = data.otu_ids;
      var y_axis = data.sample_values;
      var size = data.sample_values;
      var color = data.otu_ids;
      var text = data.otu_labels;
    
    // Building a Bubble Chart using the sample data
      var bubbleChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: 'markers',
        marker: {
          size: size,
          color: color,
          colorscale: 'Greens'
        }
      };

      var data = [bubbleChart];
      
      var layout = {
        title: 'Belly Button Bacteria',
        xaxis: {title: 'OTU ID'}
      };

      Plotly.newPlot('bubble', data, layout);

    // Building a Pie Chart
    d3.json(dataPlotUrl).then(function(data) {
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);

      var pieChart = [{
        values: values,
        labels: labels,
        hovertext: display,
        type: 'pie'
      }];

      Plotly.newPlot('pie', pieChart);
    });
  })
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
