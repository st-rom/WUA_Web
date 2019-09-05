const obls = ['Вінницька область', 'Волинська область', 'Дніпропетровська область', 'Донецька область', 'Житомирська область', 'Закарпатська область', 'Запорізька область', 'Івано-Франківська область', 'Київська область', 'Кіровоградська область', 'Луганська область', 'Львівська область', 'Миколаївська область', 'Одеська область', 'Полтавська область', 'Рівненська область', 'Сумська область', 'Тернопільська область', 'Харківська область', 'Херсонська область', 'Хмельницька область', 'Черкаська область', 'Чернівецька область', 'Чернігівська область',  'АР Крим' ]
const koatuu = ['05', '07', '12', '14', '18', '21', '23', '26', ['32', '80'], '35', '44', '46', '48', '51', '53', '56', '59', '61', '63', '65', '68', '71', '73', '74', ['01', '85']]
const margin = 100;
const width = 1500 - 2 * margin;
const height = 800 - 2 * margin;
var dataset = d3.csv("data/all_gen.csv");

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
}

function wrap_axis(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
        while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(" "))
            if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(" "))
                line = [word]
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
            }
        }
    })
}

let sel_city = document.getElementById('city-selector');
let sel_waste = document.getElementById('waste-selector');
let inp_num = Array.from(document.getElementsByClassName("input_number"));
inp_num[0].value = 1;
inp_num[1].value = 10;

function ArOper(op, num) {
    inp_num[num].value = parseInt(inp_num[num].value) + op;
    inputNumber(num);
}


function inputNumber(num) {
    if (parseInt(inp_num[num].value) > parseInt(inp_num[num].max)) {
        inp_num[num].value = parseInt(inp_num[num].max);
    }
    else if (parseInt(inp_num[num].value) < parseInt(inp_num[num].min)) {
        inp_num[num].value = parseInt(inp_num[num].min);
    }
    if(parseInt(inp_num[1].value) - parseInt(inp_num[0].value) > 10){
        inp_num[Math.abs(num - 1)].value = parseInt(inp_num[num].value) + 10 + (num * -20)
    }
    else if(parseInt(inp_num[1].value) - parseInt(inp_num[0].value) < 1){
        inp_num[Math.abs(num - 1)].value = parseInt(inp_num[num].value) + 1 + (num * -2)
    }
    inp_num[0].click();
}
d3.select("#city-selector")
    .selectAll('option')
    .data(obls)
    .enter()
    .append('option')
    .text(d => d);


inp_num.concat([sel_waste, sel_city]).forEach(function(elem) {
    elem.addEventListener("click", function () {
        sel_city = document.getElementById('city-selector');
        sel_waste = document.getElementById('waste-selector');
        inp_num = document.getElementsByClassName("input_number");


        let cols = []
        var coords = dataset.then(function (value) {
            d3.entries(value[0]).forEach(function (el, i) {
                if (i > 4) {
                    cols.push(el.key);
                }
            })
            d3.select("#waste-selector")
                .selectAll('option')
                .data(cols)
                .enter()
                .append('option')
                .text(d => d);
            return Promise.all(value.filter(function(results){
                    var counter = 0;
                    if (typeof koatuu[sel_city.selectedIndex] === 'object' && (results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex][0]) || results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex][1]))) {
                        return true
                    }
                    return results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex]);
                })
                    .map(function (results, i) {
                        return [(i + 1).toString() + ". " + results.Name, Math.round(results[sel_waste.options[sel_waste.selectedIndex].value] * 1000) / 1000, results.EDRPOU, results.KOATUU];
                    })
                    .sort(function(a, b){
                        return b[1]-a[1]
                    })
                    .filter(function (r, i) {
                        d3.select('.input_number__first')
                            .attr("max", `${i}`)
                        d3.select('.input_number__second')
                            .attr("max", `${i + 1}`)
                        return parseInt(inp_num[0].value) - 1 <= i  && i <= parseInt(inp_num[1].value) - 1;
                    })
            )});

        coords.then(function (data) {

            var yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data.map((s) => parseFloat(s[1])))]);

            var xScale = d3.scaleBand()
                .range([0, width])
                .domain(data.map((s) => s[0]))
                .padding(0.2);

            var svg = d3.select('svg')
            svg.selectAll("*").remove();
            const chart = svg.append('g')
                .attr('transform', `translate(${margin}, ${margin})`);

            const makeYLines = () => d3.axisLeft()
                .scale(yScale)

            chart
                .append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(xScale))
                .selectAll('.tick text')
                // .attr('text-anchor', 'middle')
                .call(wrap_axis, xScale.bandwidth());

            chart
                .append('g')
                .call(d3.axisLeft(yScale));

            chart.append('g')
                .attr('class', 'grid')
                .call(makeYLines()
                    .tickSize(-width, 0, 0)
                    .tickFormat(''));

            const barGroups = chart.selectAll()
                .data(data)
                .enter()
                .append('g');

            barGroups
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (s) => xScale(s[0]))
                .attr('y', (s) => yScale(s[1]))
                .attr('height', (s) => height - yScale(s[1]))
                .attr('width', xScale.bandwidth())

            barGroups
                .on('mouseenter', function (actual, i) {
                    d3.selectAll('.value')
                        .attr('opacity', 0)

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr('x', (a) => xScale(a[0]) - 5)
                        .attr('width', xScale.bandwidth() + 10)
                        .select(".bar")
                        .attr('opacity', 0.6)

                    const y = yScale(actual[1])

                    line = chart.append('line')
                        .attr('class', 'bar__limit')
                        .attr('x1', 0)
                        .attr('y1', y)
                        .attr('x2', width)
                        .attr('y2', y)

                    barGroups.append('text')
                        .attr('class', 'divergence')
                        .attr('x', (a) => xScale(a[0]) + xScale.bandwidth() / 2)
                        .attr('y', (a) => yScale(a[1]) + 30 > height ? yScale(a[1]) - 5 : yScale(a[1]) + 30)
                        .attr('text-anchor', 'middle')
                        .text((a, idx) => {
                            const divergence = (a[1] - actual[1]).toFixed(3)
                            let text = ''
                            if (divergence > 0) text += '+'
                            text += `${divergence}`

                            return idx !== i ? text : "ЄДРПОУ: " + a[2] + "  КОАТУУ: " + a[3];
                        })
                        .call(wrap, xScale.bandwidth() * 0.8)

                    d3.select(this)
                        .selectAll(".divergence > *")
                        .attr('y', (a) => yScale(a[1]) + 60 > height ? yScale(a[1]) - 48 : yScale(a[1]) + 25)

                })
                .on('mouseleave', function () {
                    d3.selectAll('.value')
                        .attr('opacity', 1);

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr('x', (a) => xScale(a[0]))
                        .attr('width', xScale.bandwidth())
                        .select(".bar")
                        .attr('opacity', 1);


                    chart.selectAll('.bar__limit').remove();
                    chart.selectAll('.divergence').remove()
                });

            barGroups
                .append('text')
                .attr('class', 'value')
                .attr('x', (a) => xScale(a[0]) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a[1]) + 30 > height ? yScale(a[1]) - 5 : yScale(a[1]) + 30)
                .attr('text-anchor', 'middle')
                .text((a) => `${a[1]}`)

            svg.append('text')
                .attr('class', 'label')
                .attr('x', -(height / 2) - margin)
                .attr('y', margin / 2.4 - 5)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text(sel_waste.options[sel_waste.selectedIndex].value.endsWith("класу") ? sel_waste.options[sel_waste.selectedIndex].value + ", тонн": sel_waste.options[sel_waste.selectedIndex].value)

            svg.append('text')
                .attr('class', 'title')
                .attr('x', width / 2 + margin)
                .attr('y', 40)
                .attr('text-anchor', 'middle')
                .text('Найбільші генератори відходів: ' + sel_city.options[sel_city.selectedIndex].value)
            return svg
        });
    });
});


sel_waste.click();