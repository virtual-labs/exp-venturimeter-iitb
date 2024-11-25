let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Flow Through Venturimeter</h5>
        <p>Learning Objective: Calculate the discharge rate</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate Q", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>

        <h5>A horizontal venturimeter inlet & throat diameter are ${d1} cm and ${d2} cm respectively. The hm = ${hm} cm. The manometer fluid is mercury. Take c<sub>d</sub> = 0.98. water is flowing through pipe find discharge.</h5>

        <br>

        <div style='text-align: center;'><img style='width: 30%;' src='./images/dia.png'></div>

        <br>

        <p style='text-align: center;'> 
            <span style='display: inline-block;' >
                $$ a_1 = \\frac{\\pi}{4} d_1^2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal01-inp' > <span id='cal01-val-sp'></span> m<sup>2</sup>
            <br>
            <span style='display: inline-block;' >
                $$ a_2 = \\frac{\\pi}{4} d_2^2 $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal02-inp' > <span id='cal02-val-sp'></span> m<sup>2</sup>
        </p>
        <br>
        <h5>Pressure head difference</h5>
        <p style='text-align: center;'>
            <span style='display: inline-block;' >
               $$ h = h_m \\times (\\frac{S_m}{S_j} - 1) $$
            </span>
            <br>
            <span style='display: inline-block;' >
               $$ S_m $$ 
            </span>
            => specific gravity of mercury (heavier liquid).
            <br>
            <span style='display: inline-block;' >
            $$ S_f $$ 
            </span>
            => specific gravity of water (lighter liquid).
            <br>
            <span style='display: inline-block;' >
                $$ h $$
             </span>
             = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal03-inp' > <span id='cal03-val-sp'></span> cm
             = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal04-inp' > <span id='cal04-val-sp'></span> m
        </p>



        <h5>Discharge</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ Q = C_d \\times \\frac{a_1 a_2}{\\sqrt{a1^2 - a_2^2}} \\times \\sqrt{2 g h} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal05-inp' > <span id='cal05-val-sp'></span> m<sup>3</sup>/s x 1000
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal06-inp' > <span id='cal06-val-sp'></span> liters/sec
            <br>
            <span style='display: inline-block;' >
                    take g = 9.81 m/sec<sup>2</sup>
            </span>
        </p>


    <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify0();'  id='temp-btn-0' >Verify</button></div>


    </div>

    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    internal_calculations();
}
function internal_calculations() {
    a1 = (Math.PI / 4) * (Math.pow((d1 / 100), 2));
    a2 = (Math.PI / 4) * (Math.pow((d2 / 100), 2));
    h = hm * ((sm / sf) - 1);
    discharge = cd * (a1 * a2 / Math.sqrt((Math.pow(a1, 2)) - (Math.pow(a2, 2)))) * Math.sqrt(2 * g * h / 100);
}
function verify0() {
    let btn = document.getElementById('temp-btn-0');
    console.log(`a1 => ${a1} \n a2 => ${a2} \n h => ${h} \n  h in meter => ${h / 100} \n Q => ${discharge} \n Q in liter/sec => ${discharge * 1000} `);
    let inp1 = document.getElementById('cal01-inp');
    let sp1 = document.getElementById('cal01-val-sp');
    let inp2 = document.getElementById('cal02-inp');
    let sp2 = document.getElementById('cal02-val-sp');
    let inp3 = document.getElementById('cal03-inp');
    let sp3 = document.getElementById('cal03-val-sp');
    let inp4 = document.getElementById('cal04-inp');
    let sp4 = document.getElementById('cal04-val-sp');
    let inp5 = document.getElementById('cal05-inp');
    let sp5 = document.getElementById('cal05-val-sp');
    let inp6 = document.getElementById('cal06-inp');
    let sp6 = document.getElementById('cal06-val-sp');
    if (!verify_values(parseFloat(inp1.value), a1)) {
        alert('a1 is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp2.value), a2)) {
        alert('a2 is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp3.value), h)) {
        alert('h in cm is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp4.value), h / 100)) {
        alert('h in meters is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp5.value), discharge)) {
        alert('discharge in m^3/sec is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp6.value), discharge * 1000)) {
        alert('discharge in liters/sec is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp1.remove();
    sp1.innerText = `${(a1).toFixed(4)}`;
    inp2.remove();
    sp2.innerText = `${(a2).toFixed(4)}`;
    inp3.remove();
    sp3.innerText = `${(h).toFixed(4)}`;
    inp4.remove();
    sp4.innerText = `${(h / 100).toFixed(4)}`;
    inp5.remove();
    sp5.innerText = `${(discharge).toFixed(4)}`;
    inp6.remove();
    sp6.innerText = `${(discharge * 1000).toFixed(4)}`;
    alert('Your entered values are correct!!');
    btn.style.display = 'none';
    activity2();
}
activity1();
//# sourceMappingURL=activity1.js.map