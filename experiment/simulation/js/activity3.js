function activity3() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <p>Learning Objective: Calculate c<sub>d</sub> by using given data </p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act3();' id='temp-btn-3' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML += text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function start_act3() {
    let temp_btn = document.getElementById('temp-btn-3');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Calculate a1 and a2 and table", "tb3-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb3-box'>

        <h5>A horizontal venturimeter inlet & throat diameter are ${d1} cm and ${d2} cm respectively. The manometric fluid is mercury. Water is flowing through pipe. </h5>


        <p style='text-align: center;'> 
            <span style='display: inline-block;' >
                $$ Q = c_d \\times \\frac{a_1a_2}{\\sqrt{a_1^2 - a_2^2}} \\times \\sqrt{2gh} $$
            </span>
            <br>
            <span style='display: inline-block;' >
                $$ h = h_m(\\frac{s_m}{s_f} - 1) $$
            </span>
            <br>
            <span style='display: inline-block;' >
                $$ a_1 = \\frac{\\pi}{4} d_1^2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal31-inp' > <span id='cal31-val-sp'></span> m<sup>2</sup>
            <br>
            <span style='display: inline-block;' >
                $$ a_2 = \\frac{\\pi}{4} d_2^2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal32-inp' > <span id='cal32-val-sp'></span> m<sup>2</sup>

            <br>


            <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify4();'  id='temp-btn-300' >Verify</button></div>
        </p>

        <div id='a3-2' style='display: none;'>

            <h5>Following reading of diffenctial manometric head were taken by varying find the coefficient of discharge of venturimeter.</h5>

            <div id='a3-table' ></div>

        </div>
   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations3();
    setTimeout(() => { show_step('tb3-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function internal_calculations3() {
    a1 = (Math.PI / 4) * (Math.pow((d1 / 100), 2));
    a2 = (Math.PI / 4) * (Math.pow((d2 / 100), 2));
    sm = 13.6;
    sf = 1;
    //generate data for table 
    let temp_hm = 20;
    for (let i = 0; i < 9; i++) {
        let cd = parseFloat((Math.random() * 0.04 + 0.94).toFixed(2));
        H.push((temp_hm * ((sm / sf) - 1)) / 100);
        Hm.push(temp_hm);
        Q_actual.push(cd * ((a1 * a2) / Math.sqrt(Math.pow(a1, 2) - Math.pow(a2, 2))) * Math.sqrt(2 * g * H[i]));
        table_data.push([Q_actual[i], Hm[i], H[i]]);
        sqrt_h.push(Math.sqrt(H[i]));
        temp_hm += 2;
    }
    console.log(`H => `, H);
    console.log(`Hm => `, Hm);
    console.log(`Q => `, Q_actual);
}
function verify4() {
    let btn = document.getElementById('temp-btn-300');
    console.log(`a1 => ${a1}, a2 => ${a2}`);
    let inp = document.getElementById('cal31-inp');
    let sp = document.getElementById('cal31-val-sp');
    let inp1 = document.getElementById('cal32-inp');
    let sp1 = document.getElementById('cal32-val-sp');
    if (!verify_values(parseFloat(inp.value), a1)) {
        alert('a1 is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp1.value), a2)) {
        alert('a2 is incorrect, calculate again.');
        return;
    }
    alert('You have entered correct values');
    btn.remove();
    inp.remove();
    sp.innerText = `${a1.toFixed(3)}`;
    inp1.remove();
    sp1.innerText = `${a2.toFixed(3)}`;
    let d = document.getElementById('a3-2');
    d.style.display = 'block';
    //load a3 table
    load_a3_table();
}
function load_a3_table() {
    let ele = document.getElementById('a3-table');
    let header = ['Q<sub>actual</sub>', 'h<sub>m</sub> (cm)', 'h (m)'];
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, table_data, [0, 1, 2], [[2], [2], [2]], '', ele, true, true, () => {
        alert('You have entered correct values');
        a3_plot();
    }, 4);
    tab.load_table();
}
function a3_plot() {
    let btn_text = get_collapse_btn_text("Plot", "plot-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='plot-box'>

        <canvas id='a3-graph' ></canvas>

        <br>
        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act4();' id='temp-btn-8' >Next</button>
   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations4();
    setTimeout(() => { show_step('plot-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    plot();
}
function internal_calculations4() {
    let slope = regression_linear_1variable(sqrt_h, Q_actual);
    console.log(`slope => ${slope}`);
    for (let x of sqrt_h) {
        let res = slope * x;
        Y.push(res);
    }
    console.log(`Y => `, Y);
}
function plot() {
    var ctx = document.getElementById('a3-graph');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: sqrt_h,
            datasets: [
                {
                    label: 'Actual Discharge',
                    data: Q_actual,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: false
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'Regression',
                    data: Y,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Actual Discharge (liter/sec)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'square root of h',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Discharge vs square root of h`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
    //root.appendChild(ctx);
}
//# sourceMappingURL=activity3.js.map