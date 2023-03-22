// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu and get sample data to add to drop-down
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
        
        let names = data.names;
        names.forEach((id) => {

            // Console.log to check id loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Console.log to check sample_one
        console.log(sample_one);

        // Create initial graphs
        createMetadata(sample_one);
        createBarChart(sample_one);
        createBubbleChart(sample_one);
        createGaugeChart(sample_one);

    });
};

// Function that creates metadata
function createMetadata(sample) {

    // Use D3 to retrieve data
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        // Filter based on sample value
        let value = metadata.filter(result => result.id == sample);

        // Console.log to check data
        console.log(value)

        // Get the first index
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the visual
        Object.entries(valueData).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Create bar chart
function createBarChart(sample) {

    // Use D3 to retrieve data
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;

        // Filter based on sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Console.log to check data
        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Set layout
        let layout = {
            title: "<b>Top 10 OTUs Present</b>",
            font: {color: "black", size: 15},
            width: 450, 
            height: 400
        };

        // Call Plotly 
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Create bubble chart
function createBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;

        // Filter based on sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set layout
        let layout = {
            title: "<b>Bacteria Per Sample</b>",
            font: {color: "black", size: 15},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };

        // Call Plotly
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


// Create function to update dashboard when test subject changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    createMetadata(value);
    createBarChart(value);
    createBubbleChart(value);
    createGaugeChart(value);
};

// Call the initialize function
init();