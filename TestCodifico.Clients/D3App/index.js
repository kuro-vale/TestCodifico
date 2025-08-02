import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

function getChart(data) {
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black"];

    // Declare the y scale
    const y = d3.scaleBand()
        .domain(d3.groupSort(data, ([d]) => d, (d) => d))
        .range([marginTop, height - marginBottom])
        .padding(0.1);

    // Declare the x scale
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d)])
        .range([marginLeft, width - marginRight]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each bar.
    svg.append("g")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("fill", (d) => colors[d % colors.length])
        .attr("x", x(0))
        .attr("y", (d) => y(d))
        .attr("width", (d) => x(d) - x(0))
        .attr("height", y.bandwidth())

    // Add text labels
    svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .selectAll()
        .data(data)
        .join("text")
        .attr("x", d => x(d) - 50)
        .attr("y", d => y(d) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d);

    return svg.node();

}

export function updateData() {
    const input = document.getElementById('dataInput').value;
    const values = input.split(',').map(Number);

    const container = document.getElementById('container');
    container.replaceChildren(getChart(values))
}

const update = document.getElementById('update');
update.addEventListener('click', updateData);

updateData();