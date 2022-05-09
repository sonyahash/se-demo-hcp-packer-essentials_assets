import { confetti } from './confetti.min.js';

const start = () => {
    setTimeout(function () {
        confetti.start()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  Stop

const stop = () => {
    setTimeout(function () {
        confetti.stop()
    }, 2000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

async function getFormStatus(form_name) {
    const stat_url = `/get_form_status?form_name=${form_name}`
    const response = await fetch(stat_url);
    const jsonbody = await response.json();
    return jsonbody
}

window.onload = function () {
    const hcp_form = document.getElementById("hcp-form");
    const hcp_form_display = document.getElementById("hcp-form-display");
    const hcp_form_results = document.getElementById("hcp-form-results");

    getFormStatus('hcp_form').then(jsonbody => {
        const form_status = jsonbody["ready"];

        if (form_status) {
            hcp_form_display.removeChild(hcp_form);
            hcp_form_results.style.display = "block";

            // const result_divs = [].slice.call(hcp_form_results.getElementsByTagName('div'));
            const result_divs = [].slice.call(document.querySelectorAll("[data-text-private='true']"));

            result_divs.forEach(element => {
                const string = element.innerHTML;
                const trimmedString = string.length > 10 ? string.substring(0, 10 - 3) + "..." : string
                element.innerHTML = trimmedString

                start();
                stop();
            });
        }
    });
}

