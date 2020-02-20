var svgWidth = 1000;
var svgHeight = 600;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data
d3.csv("data.csv").then(function(demodata) {

  // parse data
  demodata.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // xLinearScale function above csv import
  var xLinearScale = d3.scaleLinear()
    .domain([5, 25])
    .range([height, 0]);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, 28])
    .range([height, 0]);


  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(demodata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 15)
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // Add State abbr. text to circles.
    var circletextGroup = chartGroup.selectAll()
        .data(demodata)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .text(d => (d.abbr));  
          
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //   return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    // });      
    
    // append x axis
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("lacks healthcare (%)");

}).catch(function(error) {
  console.log(error);
});  