// Create gauge chart
function createGaugeChart(sample) {

    // Use D3 to get data
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        // Filter sample value
        let value = metadata.filter(result => result.id == sample);

        // Console.log to check for value
        console.log(value)

        // Get the first index 
        let valueData = value[0];

        // Use Object. to get key/value pairs
        let washFrequency = Object.values(valueData)[6];
        
        // Set the trace for gauge chart
        let trace2 = {
            domain: {x: [0,1], y: [0,1]},
            value: washFrequency,
            title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            text: ['0-1', '1-2', '2-3', '3-4', '5-6', '6-7', '7-8', '8-9'],
            textposition: 'inside',
            
            gauge: {
                axis: {range: [0,10], tickmode: "linear"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                ]
            } 
        };

        // Set Layout
        let layout = {
            width: 450, 
            height: 400
        };

        // Call Plotly 
        Plotly.newPlot("gauge", [trace2], layout)
    });
};

// Call the initialize function
init();