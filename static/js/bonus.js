// function buildGauge(wfreq) {

//     var dataPlotUrl = '/samples/' + sample;
//      d3.json(dataPlotUrl).then(function(data) {
//          var wfreq = data.WFREQ
//          var level = parseFloat(wfreq) * 20;

        

// //Enter the washing frequency between 0 and 180

// // Trig to calc meter point
// var degrees = 180 - (level - 1) * 45;
// alert(degrees);
// radius = .5;
// var radians = degrees * Math.PI / 180;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
//     pathX = String(x),
//     space = ' ',
//     pathY = String(y),
//     pathEnd = ' Z';
// var path = mainPath.concat(pathX, space, pathY, pathEnd);

// var data = [{
//     type: 'scatter',
//     x: [0], 
//     y: [0],
//     marker: { size: 28, color: '850000' },
//     showlegend: false,
//     name: 'Frequency',
//     text: level,
//     hoverinfo: 'text+name'
// },
// {
//     values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//     rotation: 90,
//     text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//     textinfo: "text",
//     textposition: "inside",
//     marker: {
//         colors: [
//             "rgba(0, 105, 11, .5)",
//             "rgba(10, 120, 22, .5)",
//             "rgba(14, 127, 0, .5)",
//             "rgba(110, 154, 22, .5)",
//             "rgba(170, 202, 42, .5)",
//             "rgba(202, 209, 95, .5)",
//             "rgba(210, 206, 145, .5)",
//             "rgba(232, 226, 202, .5)",
//             "rgba(240, 230, 215, .5)",
//             "rgba(255, 255, 255, 0)"
//         ]
//     },
//     labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
//     hoverinfo: 'label',
//     hole: .5,
//     type: 'pie',
//     showlegend: false
// }];

// var layout = {
//     shapes: [{
//         type: 'path',
//         path: path,
//         fillcolor: '850000',
//         line: {
//             color: '850000'
//         }
//     }],
//     title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
//     height: 500,
//     width: 600,
//     xaxis: {
//         type: 'category', 
//         zeroline: false, 
//         showticklabels: false,
//         showgrid: false, 
//         range: [-1, 1]
//     },
//     yaxis: {
//         type: 'category', 
//         zeroline: false, 
//         showticklabels: false,
//         showgrid: false, 
//         range: [-1, 1]
//     }
// };
//     var GAUGE = document.getElementById('gauge');
    
//     Plotly.newPlot(GAUGE, data, layout);
// })
// }