function start_act4() {
    let temp_btn = document.getElementById('temp-btn-8');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("calcualte cd", "tb4-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb4-box'>

        <h5>Note: You can calculate slope by observing (hovering or clicking on points) respective x and y points on the plot. </h5>


        <p style='text-align: center;'> 
            Slope (from above plot)
            <span style='display: inline-block;' >
                $$  = \\frac{y_1 - y_2}{x_1 - x_2} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal41-inp' > <span id='cal41-val-sp'></span> 
            <br>
            <span style='display: inline-block;' > 
                Slope 
                $$ = c_d \\times \\frac{a_1 a_2}{\\sqrt{a_1^2 - a_2^2}} \\times \\sqrt{2g} $$
            </span>
            <br>
            <span style='display: inline-block;' >
                $$ c_d \\ = \\ \\frac{Slope}{a_1 a_2} \\times \\sqrt{\\frac{a_1^2 - a_2^2}{2g}} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal42-inp' > <span id='cal42-val-sp'></span>

            <br>


            <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify5();'  id='temp-btn-400' >Verify</button></div>
        </p>

   
    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations5();
    setTimeout(() => { show_step('tb4-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    plot();
}
function internal_calculations5() {
    slope = (Y[Y.length - 1] - Y[0]) / (sqrt_h[sqrt_h.length - 1] - sqrt_h[0]);
    calculated_cd = (slope / (a1 * a2)) * Math.sqrt(((Math.pow(a1, 2)) - (Math.pow(a2, 2))) / (2 * g));
}
function verify5() {
    let btn = document.getElementById('temp-btn-400');
    console.log(`slope => ${slope}, cd => ${calculated_cd}`);
    let inp = document.getElementById('cal41-inp');
    let sp = document.getElementById('cal41-val-sp');
    let inp1 = document.getElementById('cal42-inp');
    let sp1 = document.getElementById('cal42-val-sp');
    if (!verify_values(parseFloat(inp.value), slope)) {
        alert('slope is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp1.value), calculated_cd)) {
        alert('cd is incorrect, calculate again.');
        return;
    }
    alert('You have entered correct values');
    btn.remove();
    inp.remove();
    sp.innerText = `${slope.toFixed(3)}`;
    inp1.remove();
    sp1.innerText = `${calculated_cd.toFixed(3)}`;
    maindiv.innerHTML = `<br><br><h3 style='text-align: center;'>Experiment Completed Successfully!!</h3>`;
}
//# sourceMappingURL=activity4.js.map