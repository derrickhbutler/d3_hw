var margin = { top: 60, right: 60, bottom: 60, left: 60 },
   svg_width = 800 ,
   svg_height = 500
   chart_height = svg_height - margin.top - margin.bottom,
   chart_width = svg_width - margin.right - margin.left ;

var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svg_width)
            .attr("height", svg_height)
            .style("width", svg_width)
            .style("height", svg_height)

var chartGroup = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xSelect = 'healthcare'
var ySelect = 'poverty'


d3.csv('assets/data.csv').then( data => {
    console.log(data)
    var ymax =d3.max(data.map(d => parseFloat(d[ySelect])))
    var ymin =d3.min(data.map(d => parseFloat(d[ySelect])))

    var yScale = d3.scaleLinear()
        .domain([ymin, ymax])
        .range([chart_height, 0])

    var xmax = d3.max(data.map(d => parseFloat(d[xSelect])))
    var xmin = d3.min( data.map(d => parseFloat(d[xSelect])))

    var xScale = d3.scaleLinear()
        .domain([xmin - 1, xmax])
        .range([0, chart_width])

    var xscaleaxis = d3.axisBottom(xScale)
    var yscaleaxis = d3.axisLeft(yScale)


chartGroup.append('g') 
        .classed('x-axis', true)
        .attr('transform', `translate(0, ${chart_height})`)
        .call(xscaleaxis)

chartGroup.append('g')
        .classed('y-axis', true)
        .attr('transform', `translate(0, 0)`)
        .call(yscaleaxis)

chartGroup.append('g')
    .selectAll('dots')
    .data(data)
    .enter()
        .append('circle')
        .attr('cx', d => xScale(parseFloat(d[xSelect])))
        .attr('cy', d => yScale(parseFloat(d[ySelect])))
        .attr('r', 10)
        .style('fill', 'blue')
    })


