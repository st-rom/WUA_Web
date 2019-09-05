import {Spinner} from './spin.js';


const obls = ['Вінницька область', 'Волинська область', 'Дніпропетровська область', 'Донецька область', 'Житомирська область', 'Закарпатська область', 'Запорізька область', 'Івано-Франківська область', 'Київська область', 'Кіровоградська область', 'Луганська область', 'Львівська область', 'Миколаївська область', 'Одеська область', 'Полтавська область', 'Рівненська область', 'Сумська область', 'Тернопільська область', 'Харківська область', 'Херсонська область', 'Хмельницька область', 'Черкаська область', 'Чернівецька область', 'Чернігівська область',  'АР Крим' ]
// const koatuu = ['05', '07', '12', '14', '18', '21', '23', '26', ['32', '80'], '35', '44', '46', '48', '51', '53', '56', '59', '61', '63', '65', '68', '71', '73', '74', ['01', '85']]
const koatuu = ['05', '07', '12', '14', '18', '21', '23', '26', '32', '35', '44', '46', '48', '51', '53', '56', '59', '61', '63', '65', '68', '71', '73', '74', '01']
const obl_codes = [3663, 3601, 3669, 3575, 3593, 3607, 3673, 4410, [3643, 3767], 4374, 3573, 3605, 3661, 3595, 3651, 3603, 3581, 4404, 3571, 4033, 3609, 3647, 3611, 3583, [3681, 4412]]
const waste_code_explanations = ['Показник загального утворення відходів (ПЗУВ) - критерій обсягу утворення відходів, що розраховується за формулою Пзув = 5000 х М1 + 500 х М2 + 50 х М3 + 1 х М4, де М1, М2, М3, М4 - маса в тонах відходів 1, 2, 3 та 4 класів небезпеки відповідно',
    'Загальна сума кількості відходів в тоннах, незалежно від класу небезпеки','Надзвичайно небезпечні речовини','Високонебезпечні речовини','Помірно небезпечні речовини','Безпечні речовини']
const waste_explanation_ending = '. Клас небезпеки відходів встановлюється залежно від вмісту в них високотоксичних речовин розрахунковим методом або згідно з переліком відходів, наведених у Державному класифікаторі відходів. На всі види відходів розробляється технічний паспорт згідно з Міждержавним стандартом ДСТУ-2195-93, дія якого поширюється на 10 країн СНД. '
const years = ['2015', '2016', '2017', '2018', '2019']
const margin = 100;
const width = 1500 - 2 * margin;
const height = 800 - 2 * margin;

for (let i = 0; i < obls.length; i++) {
    if (typeof obl_codes[i] === 'object') {
        obl_codes[i].forEach(function (c) {
            d3.select('#path' + c.toString())
                .style('fill', 'white')
        })
    } else {
        d3.select('#path' + obl_codes[i].toString())
            .style('fill', 'white')
    }
}

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
var spinner = new Spinner(opts);
spinner.spin(target);

var dataset = d3.csv("data/all_gen_wyear.csv");

const colors = ['#00ffa3', '#3c6053']
// var c = document.getElementById("myGradient");
// var ctx = c.getContext("2d");
//
// var grd = ctx.createLinearGradient(0, 0, 290, 0);
// grd.addColorStop(0, colors[0]);
// grd.addColorStop(1, colors[1]);
//
// ctx.fillStyle = grd;
// ctx.fillRect(0, 0, 290, 70);

var color_width = 350
var color_height = 70
var color_margin = 5

let svg = d3.select(".svg__color-bar")
    .attr('width', color_width + (color_margin * 2))
    .attr('height', color_height * 2)

var grad = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'grad')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '0%');

grad.selectAll('stop')
    .data(colors)
    .enter()
    .append('stop')
    .style('stop-color', function(d){ return d; })
    .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
    })

svg.append('rect')
    .attr('width', color_width)
    .attr('height', 70)
    .attr('x', color_margin)
    .style('fill', 'url(#grad)')


    // .attr("y", 40)
    // .attr("dy", ".71em")
    // .style("text-anchor", "end")
    // .text("axis title");

let sel_waste = document.getElementById('waste-selector');
let sel_year = document.getElementById('year-selector');

let sel_waste_value = sel_waste.value;
let sel_year_values = function (){
    const d = d3.selectAll('.ss-value-text')
    let vals = []
    d.each(function () {
        vals.push(this.innerText)
    })
    return vals
}();


let main = function () {
    spinner.spin(target)
    if((sel_waste_value !== sel_waste.value ) && (sel_waste_value !== '')){
        sel_waste_value = sel_waste.value;
        // sel_year_values = function (){
        //     const d = d3.selectAll('.ss-value-text')
        //     let vals = []
        //     d.each(function () {
        //         vals.push(this.innerText)
        //     })
        //     return vals
        // }();
    }
    else if(sel_waste_value !== sel_waste.value){
        sel_waste_value = sel_waste.value;
        // sel_year_values = function (){
        //     const d = d3.selectAll('.ss-value-text')
        //     let vals = []
        //     d.each(function () {
        //         vals.push(this.innerText)
        //     })
        //     return vals
        // }();
    }
    let cols = []
    let obls_sum = Array(obls.length).fill(0);
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
            .attr('title', function (d, i) {
                var res = waste_code_explanations[i]
                if (i > 1) {
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
            placeholder: 'Вибрано усі роки',
            onChange: () => {
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
        });
        sel_year_values = function (){
            const d = d3.selectAll('.ss-value-text')
            let vals = []
            d.each(function () {
                vals.push(this.innerText)
            })
            return vals
        }();
        d3.select('.title_graph')
            .text('Карта України розмальована за категорією: ' + sel_waste.options[sel_waste.selectedIndex].value);
        // console.log(sel_year_values)
        return Promise.all(value
                .map(function (results) {
                    let code = results["KOATUU"].slice(0, 2)
                    for (let i = 0; i < obls.length; i++) {
                        if (code === '80') {
                            code = '32'
                        } else if (code === '85') {
                            code = '01'
                        }
                        // if(code === '05' || code === '07'){
                        //     console.log(code)
                        // }
                        for (let j = 0; j < sel_year_values.length; j++) {
                            obls_sum[koatuu.indexOf(code)] += parseFloat(results[sel_year_values[j] + '_' + sel_waste.options[sel_waste.selectedIndex].value])
                        }
                    }
                })
            // .map(function (results, i) {
            //     return [results.Name, Math.round(results[sel_waste.options[sel_waste.selectedIndex].value] * 1000) / 1000, results.EDRPOU, results.KOATUU];
            // })

        )
    });


    coords.then(function (data) {
        spinner.stop(target)
        // obls_sum = obls_sum.map(d => Math.round(d * 1000) / 1000)
        // console.log(obls_sum)
        var linearScale = d3.scaleLinear()
            .domain([d3.min(obls_sum), d3.max(obls_sum)])
            .range(colors);

        var y = d3.scaleLinear()
            .range([0, color_width])
            .domain([d3.min(obls_sum) / 1000, d3.max(obls_sum) / 1000]);

        var yAxis = d3.axisBottom()
            .scale(y)
            .ticks(3);

        svg.select("g")
            .remove()

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", `translate(${color_margin}, ${color_height})`)
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")

        for (let i = 0; i < obls.length; i++) {
            if (typeof obl_codes[i] === 'object') {
                obl_codes[i].forEach(function (c) {
                    // console.log(sel_waste.options[sel_waste.selectedIndex].value.endsWith('ПЗУВ'))
                    d3.select('#path' + c.toString() + '>title')
                        .remove()
                    d3.select('#path' + c.toString())
                        .style('fill', linearScale(obls_sum[i]))
                        .append('title')
                        // .style('max-width', 50)
                        .text(() =>  sel_waste.options[sel_waste.selectedIndex].value.endsWith('ПЗУВ') ? obls[i] + ': ' + (Math.round(obls_sum[i] ) / 1000).toString()     : obls[i] + ': ' + (Math.round(obls_sum[i] ) / 1000).toString() + ' kтонн (* 10^3)');
                })
            } else {
                // console.log(Math.round(obls_sum[i] / 1000) / 1000, (Math.round(obls_sum[1] / 1000) / 1000).toString())
                d3.select('#path' + obl_codes[i].toString() + '>title')
                    .remove()
                d3.select('#path' + obl_codes[i].toString())
                    .style('fill', linearScale(obls_sum[i]))
                    .append('title')
                    // .call(console.log, 3)
                    .text(() =>  sel_waste.options[sel_waste.selectedIndex].value.endsWith('ПЗУВ') ? obls[i] + ': ' + (Math.round(obls_sum[i] ) / 1000).toString() : obls[i] + ': ' + (Math.round(obls_sum[i] ) / 1000).toString() + ' kтонн (* 10^3)');
                    // .text(() => obls[i] + ': ' + obls_sum[i])
            }
        }
    })
}


sel_waste.addEventListener("click", main)

sel_waste.click()

// let kl=23
// console.log(obls[kl], obl_codes[kl])
// console.log(linearScale(5))