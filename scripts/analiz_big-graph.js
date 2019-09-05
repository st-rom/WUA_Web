// import SlimSelect from "slim-select";
import {Spinner} from './spin.js';
//TODO: Spinner import


const obls = ['Всі області', 'Вінницька область', 'Волинська область', 'Дніпропетровська область', 'Донецька область', 'Житомирська область', 'Закарпатська область', 'Запорізька область', 'Івано-Франківська область', 'Київська область', 'Кіровоградська область', 'Луганська область', 'Львівська область', 'Миколаївська область', 'Одеська область', 'Полтавська область', 'Рівненська область', 'Сумська область', 'Тернопільська область', 'Харківська область', 'Херсонська область', 'Хмельницька область', 'Черкаська область', 'Чернівецька область', 'Чернігівська область',  'АР Крим' ]
const koatuu = ['', '05', '07', '12', '14', '18', '21', '23', '26', ['32', '80'], '35', '44', '46', '48', '51', '53', '56', '59', '61', '63', '65', '68', '71', '73', '74', ['01', '85']]
const waste_code_explanations = ['Показник загального утворення відходів (ПЗУВ) - критерій обсягу утворення відходів, що розраховується за формулою Пзув = 5000 х М1 + 500 х М2 + 50 х М3 + 1 х М4, де М1, М2, М3, М4 - маса в тонах відходів 1, 2, 3 та 4 класів небезпеки відповідно',
    'Загальна сума кількості відходів в тоннах, незалежно від класу небезпеки','Надзвичайно небезпечні речовини','Високонебезпечні речовини','Помірно небезпечні речовини','Безпечні речовини']
const waste_explanation_ending = '. Клас небезпеки відходів встановлюється залежно від вмісту в них високотоксичних речовин розрахунковим методом або згідно з переліком відходів, наведених у Державному класифікаторі відходів. На всі види відходів розробляється технічний паспорт згідно з Міждержавним стандартом ДСТУ-2195-93, дія якого поширюється на 10 країн СНД. '
const years = ['2015', '2016', '2017', '2018', '2019']
const margin = 100;
const width = 1500 - 2 * margin;
const height = 800 - 2 * margin;
var nx = 0;
var dataLength;
var dataset = d3.csv("data/all_gen_wyear.csv");


var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: 'black', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'fixed' // Element positioning
};

var target = document.getElementById('spinner');
var spinner = new Spinner(opts).spin(target);

// new SlimSelect({
//     select: '#single-optgroups',
//     placeholder: 'Placeholder Text Here',
//     showSearch: false, // shows search field
//     searchText: 'Sorry couldnt find anything',
//     beforeOnChange: (info) => {
//         console.log(info)
//         return false // this will stop propagation
//     },
//     onChange: (info) => {
//         console.log(info)
//     }
// })
//(i + 1).toString() +


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

function clearInputFunction(d) {
    var div = document.getElementsByClassName("name_search")[0];
    var a = div.getElementsByTagName("a")//.nodes().forEach(function (s) {
    // for (var i = 0; i < a.length; i++) {
    //     a[i].style.display = "none";
    // }
    d.style.display = "none";
    filterInputFunction()
    //         s.style.display = "none";
    //     });ґ
}

function filterInputFunction() {
    var input, filter, a, i, div, txtValue;
    input = document.getElementsByClassName("name_search__field")[0];
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("name_search")[0];
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && input.value !== '') {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
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
                if(lineNumber > 6){
                    word += '...'
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
                    break
                }
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
            }
        }
    })
}

let sel_city = document.getElementById('city-selector');
let sel_waste = document.getElementById('waste-selector');

let inp_num = Array.from(document.getElementsByClassName("input_number"));
let sel_city_value = sel_city.value;
let sel_waste_value = sel_waste.value;
let sel_year_values = function (){
    const d = d3.selectAll('.ss-value-text')
    let vals = []
    d.each(function () {
        vals.push(this.innerText)
    })
    return vals
}();
// let sel_year_value = [];
// d3.selectAll('.ss-value-text').each(function () {
//     sel_year_value.push(this.innerText)
// })


inp_num[0].value = 1;
inp_num[1].value = 10;

function ArOper(op, num) {
    if (num === 2){
        num = 0;
        op *= 10
    }
    inp_num[num].value = parseInt(inp_num[num].value) + op;
    if (parseInt(inp_num[num].value) > parseInt(inp_num[num].max)) {
        inp_num[num].value = parseInt(inp_num[num].max);
    }
    else if (parseInt(inp_num[num].value) < parseInt(inp_num[num].min)) {
        inp_num[num].value = parseInt(inp_num[num].min);
    }
    // if(op === 1 && num === 0 && parseInt(inp_num[0].value) + parseInt(inp_num[1].value) - 1 > inp_num[0].max){
    //     inp_num[1] -= 1;
    // }
    // if(parseInt(inp_num[0].value) - parseInt(inp_num[1].value) > 10){
    //     inp_num[Math.abs(num - 1)].value = parseInt(inp_num[num].value) + 10 + (num * -20)
    // }
    // else if(parseInt(inp_num[1].value) - parseInt(inp_num[0].value) < 1){
    //     inp_num[Math.abs(num - 1)].value = parseInt(inp_num[num].value) + 1 + (num * -2)
    // }
    var displayedBackward = d3.scaleBand()
        .domain(d3.range(dataLength))
        .range([0, width]);
    nx = displayedBackward(inp_num[0].value - 1)
    inp_num[0].click();
}


d3.select("#city-selector")
    .selectAll('option')
    .data(obls)
    .enter()
    .append('option')
    .text(d => d);



d3.selectAll('a').nodes().forEach(function (elem) {
    elem.addEventListener("click", function () {
        d3.select('.name_search__field')
            .value = this.text;
    })
})


var display_buttons = d3.selectAll('.stat-selector__button')

display_buttons.nodes().forEach(function (elem) {
    elem.addEventListener("click", function () {
        d3.select(".stat-selector__button__selected")
            .attr("class", "stat-selector__button");
        this.className = "stat-selector__button stat-selector__button__selected";
    })
})

let main = function () {
    spinner.spin(target)
    // var numBars = parseInt(inp_num[1].value) - parseInt(inp_num[0].value) + 1;
    // console.log(sel_city_value !== sel_city.value || sel_waste_value !== sel_waste.value, sel_city_value !== '', sel_city_value, sel_city.value , sel_waste_value, sel_waste.value, sel_waste_value !== ''   )
    if((sel_city_value !== sel_city.value || sel_waste_value !== sel_waste.value ) && (sel_city_value !== '' && sel_waste_value !== '')){
        nx = 0;
        sel_city_value = sel_city.value;
        sel_waste_value = sel_waste.value;
        inp_num[0].value = 1;
        inp_num[1].value = 10;
    }
    else if(sel_city_value !== sel_city.value || sel_waste_value !== sel_waste.value){
        sel_city_value = sel_city.value;
        sel_waste_value = sel_waste.value;
    }
    // sel_city = document.getElementById('city-selector');
    //     sel_waste = document.getElementById('waste-selector');
    //     inp_num = document.getElementsByClassName("input_number");

    let cols = []
    var coords = dataset.then(function (value) {
        d3.entries(value[0]).forEach(function (el, i) {
            if (i > 4 && i < 11) {
                cols.push(el.key);
            }
        })
        d3.select("#waste-selector")
            .selectAll('option')
            .data(cols)
            .enter()
            .append('option')
            .text(d => d)
            .attr('class', 'option_with_hint')
            .attr('title', function(d, i) {
                var res = waste_code_explanations[i]
                if(i > 1){
                    res += waste_explanation_ending
                }
                return res;
            });
        d3.select('#year-selector')
            .selectAll('option')
            .data(years)
            .enter()
            .append('option')
            .text(d => d)
            .attr('selected', '');

        new SlimSelect({
            select: '#year-selector',
            placeholder: 'Оберіть рік/роки',
            onChange: () => {
                console.log(999)
                sel_year_values = function (){
                    const d = d3.selectAll('.ss-value-text')
                    let vals = []
                    d.each(function () {
                        vals.push(this.innerText)
                    })
                    return vals
                }();
                main();
            }
        })

        sel_year_values = function (){
            const d = d3.selectAll('.ss-value-text')
            let vals = []
            d.each(function () {
                vals.push(this.innerText)
            })
            return vals
        }();

        return Promise.all(value
            .filter(function(results){
                if (typeof koatuu[sel_city.selectedIndex] === 'object' && (results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex][0]) || results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex][1]))) {
                    return true
                }
                return results["KOATUU"].startsWith(koatuu[sel_city.selectedIndex]);
            })
            // .filter(function (results) {
            //     if
            // })
            .map(function (results) {
                let by_year_sum = 0
                for (let j = 0; j < sel_year_values.length; j++) {
                    // console.log(typeof Math.round(results[sel_year_values[j] + '_' + sel_waste.options[sel_waste.selectedIndex].value] * 1000))
                    by_year_sum += parseFloat(results[sel_year_values[j] + '_' + sel_waste.options[sel_waste.selectedIndex].value])
                }
                return [results.Name, Math.round(by_year_sum * 1000) / 1000, results.EDRPOU, results.KOATUU];

            })
            .sort(function(a, b){
                return b[1]-a[1]
            })
        )});

    coords.then(function (data) {
        spinner.stop(target)
        dataLength = data.length;
        d3.select('.input_number__first')
            .attr("max", `${data.length - parseInt(inp_num[1].value)}`)
        // d3.select('.input_number__second')
        //     .attr("max", `${data.length}`)

        var displayed = d3.scaleQuantize()
            .domain([0, width])
            .range(d3.range(data.length));

        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data.map((s) => parseFloat(s[1])))]);

        var xScale = d3.scaleBand()
            .range([0, width])
            // .domain(data.slice(parseInt(inp_num[0].value) - 1, parseInt(inp_num[0].value) - 1 + parseInt(inp_num[1].value)).map((s) => s[0]))
            .domain(data.slice(parseInt(inp_num[0].value) - 1, parseInt(inp_num[0].value) - 1 + parseInt(inp_num[1].value)).map((s, i) => (parseInt(inp_num[0].value) + i).toString() + '. ' + s[2]))
            .padding(0.2);

        d3.select(".scroller_text")
            .text(inp_num[0].value + '-' + (parseInt(inp_num[0].value) + parseInt(inp_num[1].value) - 1).toString() + ' з ' + (parseInt(inp_num[0].max) + 9).toString())

        d3.select('.name_search__list')
            .selectAll("*")
            .remove()
        // .data(data.map(s => s[0].split(".").shift().join(".").substr(1)))ґ
        d3.select('.name_search__list')
            .selectAll()
            .data(data.map((s, i) => [s[0], i]))
            .enter()
            .append('a')
            .style('display', 'none')
            .text(d => d[0])
            // .text((s, i) => (parseInt(inp_num[0].value) + i).toString() + '. ' + s[0])
            // .attr("href", d => "#" + parseInt(d[1]));
            .attr("id", d => d[1])
            .attr("title", d => d[0]);



        d3.selectAll('a').nodes().forEach(function (elem) {
            elem.addEventListener("click", function () {
                document.getElementsByClassName('name_search__field')[0].value = this.text;
                // console.log(d3.select('.name_search__field').value, this.text)
                filterInputFunction();
                this.style.display = "none";

                // clearInputFunction(this);
                let input = document.getElementsByClassName("name_search__field")[0];
                let filter = input.value.toUpperCase();
                let txtValue = this.textContent || this.innerText;
                // console.log(txtValue.indexOf(filter))
                // if (txtValue.indexOf(filter)){
                //
                // }
                // var c;
                // for (var i = 0; i < data.length; i++) {
                //     // console.log(data.map(d => d[0])this.text))
                //     if (data.map(d => d[0])[i].indexOf(this.text) > -1){
                //         c = i;
                //     }
                // }
                inp_num[0].value = parseInt(this.id) + 1;
                sel_waste.click();
            })
        })


        var svg = d3.select('svg');
        svg.selectAll("*").remove();
        const chart = svg.append('g')
        // .attr('transform', `translate(${margin}, ${margin})`);
            .attr('transform', `translate(${margin}, 0)`);

        const makeYLines = () => d3.axisLeft()
            .scale(yScale)

        chart
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('.tick text')

            // .attr('title', d => d[0])
            // .attr('class', 'middle')
            .call(wrap_axis, xScale.bandwidth())
            .append('title')
            .text(d => d);

        chart
            .append('g')
            .call(d3.axisLeft(yScale));

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat(''));

        const barGroups = chart.append('g')
            .attr("class", "bars_grouper")
            .selectAll()
            .data(data.slice(parseInt(inp_num[0].value) - 1, parseInt(inp_num[0].value) - 1 + parseInt(inp_num[1].value)))
            .enter()
            .append('g');

        barGroups
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (s, i) => xScale((parseInt(inp_num[0].value) + i).toString() + '. ' + s[2]))
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
                    .attr('x', (s, i) => xScale((parseInt(inp_num[0].value) + i).toString() + '. ' + s[2]) - 5)
                    .attr('width', xScale.bandwidth() + 10)
                    .select(".bar")
                    .attr('opacity', 0.6)

                const y = yScale(actual[1])

                var line = chart.append('line')
                    .attr('class', 'bar__limit')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', width)
                    .attr('y2', y);

                barGroups.append('text')
                    .attr('class', 'divergence')
                    .attr('x', (s, i) => xScale((parseInt(inp_num[0].value) + i).toString() + '. ' + s[2]) + xScale.bandwidth() / 2)
                    .attr('y', (a) => yScale(a[1]) + 30 > height ? yScale(a[1]) - 5 : yScale(a[1]) + 30)
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                        const divergence = (a[1] - actual[1]).toFixed(3)
                        let text = ''
                        if (divergence > 0) text += '+'
                        text += `${divergence}`

                        return idx !== i ? text : "ЄДРПОУ: " + a[0] + "  КОАТУУ: " + a[3];
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
                    .attr('x', (a, i) => xScale((parseInt(inp_num[0].value) + i).toString() + '. ' + a[2]))
                    .attr('width', xScale.bandwidth())
                    .select(".bar")
                    .attr('opacity', 1);


                chart.selectAll('.bar__limit').remove();
                chart.selectAll('.divergence').remove()
            });

        barGroups
            .append('text')
            .attr('class', 'value')
            .attr('x', (a, i) => xScale((parseInt(inp_num[0].value) + i).toString() + '. ' + a[2]) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a[1]) + 30 > height ? yScale(a[1]) - 5 : yScale(a[1]) + 30)
            .attr('text-anchor', 'middle')
            .text((a) => `${a[1]}`)

        svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 8)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text(sel_waste.options[sel_waste.selectedIndex].value.endsWith("класу") ? sel_waste.options[sel_waste.selectedIndex].value + ", тонн": sel_waste.options[sel_waste.selectedIndex].value)

        d3.select('.title_graph')
            .text('Рейтинг найбільших генераторів відходів: ' + sel_city.options[sel_city.selectedIndex].value);

        // Нижній скролл!!!!!!!!!!
        // var heightOverview = 90;
        // const subX = 100;
        // const subY = 40;
        // var xOverview = d3.scaleBand()
        //     .domain(data.map((s) => s[0]))
        //     .range([0, width])
        //     .padding(0.2);
        // var yOverview = d3.scaleLinear()
        //     .range([heightOverview, 0])
        //     // .domain(yScale.domain())
        //     .domain([0, Math.log(yScale.domain()[1])]);
        // // .domain([0, (yScale.domain()[1] > Math.E ? Math.log(yScale.domain()[1]) : Math.log(yScale.domain()[1]) + yScale.domain()[1])]);
        //
        // var subBars = svg
        //     .append("g")
        //     .attr("class", "scroll_bar")
        //     .attr("transform", 'translate(' + subX.toString() + ', ' + subY.toString() + ')');
        //
        // subBars
        //     .selectAll('.subBar')
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .classed('subBar', true)
        //     .attr('height', function(d) {
        //         // console.log(heightOverview, yOverview(Math.log(d[1])))
        //         // console.log(yOverview.domain())
        //         return  d[1] > Math.E ? heightOverview - yOverview(Math.log(d[1])) : heightOverview - yOverview(1);
        //         // return heightOverview - yOverview(d[1]);
        //     })
        //     .attr('width', function(d) {
        //         return xOverview.bandwidth()
        //     })
        //     .attr('x', function(d) {
        //         return xOverview(d[0]);
        //     })
        //     .attr('y', function(d) {
        //         // return height + heightOverview + yOverview(d[1])
        //         return d[1] > Math.E ? height + heightOverview + yOverview(Math.log(d[1])) : height + heightOverview + yOverview(1);
        //     });
        //
        // subBars.append('line')
        //     .attr('class', 'scroll_bar__line')
        //     .attr('x1', 0)
        //     .attr('y1', height + heightOverview * 2)
        //     .attr('x2', width)
        //     .attr('y2', height + heightOverview * 2);
        //
        // svg.append("rect")
        // // .attr("transform", "translate(0, " + (d3.select(".subBar").attr('y')) + ")")
        //     .attr("transform", "translate(" + subX.toString() + ", "+ (parseFloat(d3.select(".subBar").attr('y')) + subY).toString() + ")")
        //     .attr("class", "mover")
        //     .attr("x", nx)
        //     .attr("y", 0)
        //     .attr("height", heightOverview)
        //     .attr("width", Math.round(parseFloat(parseInt(inp_num[1].value) * width) / data.length))
        //     .attr("pointer-events", "all")
        //     .attr("cursor", "ew-resize")
        //     .call(d3.drag().on("drag", display));
        //
        // function display () {
        //     var x = parseInt(d3.select(this).attr("x"));
        //     var w = parseInt(d3.select(this).attr("width"));
        //     nx = x + d3.event.dx;
        //
        //     if ( nx <= 0 || nx + w > width ) return;
        //     d3.select(this).attr("x", nx);
        //     var nf = displayed(nx);
        //
        //     if ( displayed(x) === nf ) return;
        //     inp_num[0].value = nf + 1;
        //
        //     sel_waste.click();
        // };
        return svg
    });
}


inp_num.concat([sel_waste, sel_city]).forEach(function(elem) {
    elem.addEventListener("click", main);
});


sel_waste.click();

export { ArOper, filterInputFunction };
