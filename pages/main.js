
var change_images_folder_list = ["Abbottabad", "Battagram", "Chitral", "Haripur", "Kohistan", "Lower Dir", "Mansehra", "Shangla", "Swat", "Tor Ghar", "Upper Dir"];

var all_images_folder_list = ["Abbottabad", "Chitral", "Kohistan", "Lower Dir", "Mansehra", "Shangla", "Swat", "Tor Ghar", "Upper Dir"];

var forest_data = {
    "Hangu":      ["red",       [0.72,6.56,1.66,1.28,0.2]],
    "Battagram":  ["magenta",   [34.55,33.28,35.6,40.28,43.04]],
    "Abbottabad": ["purple",    [10.8,39.25,9.14,18.73,23.15]],
    "Haripur":    ["pink",      [1.18,30.64,0.39,4.53,8.82]],
    "Kohistan":   ["lightgreen", [27.79,37.74,27.94,34.32,30.42]],
    "Tor Ghar":   ["orange", [16.11,29.93,9.31,20.54,16.99]],
    "Mansehra":   ["lightpink", [32.84,31.21,30.34,33.63,35.5]],
    "Buner":      ["violet", [2.95,32.84,1.89,14.53,11.13]],
    "Chitral":    ["chocolate", [32.22,9.71,33.32,42.29,36.55]],
    "Lower Dir":  ["crimson", [3.54,20.09,13.13,19.16,12.95]],
    "Malakand":   ["darkred", [0.44,15.9,0.11,5.29,1.76]],
    "Shangla":    ["blue", [25.67,39.74,21.8,47.26,36.59]],
    "Swat":       ["greenyellow", [17.67,24.64,19.4,30.4,29.96]],
    "Upper Dir":  ["indigo", [24.92,21.08,33.07,40.47,36.44]],
    "Average":    ["darkgreen", [16.53, 26.615, 16.94, 25.19, 23.11]]
};

function generate_2014_2018_series_of_images(first_caption) {
    let cap_count = first_caption;
    for (let i=0; i<all_images_folder_list.length; i++) {
        let dist = all_images_folder_list[i];
        document.getElementById("forest-cover-2014-2018-series").innerHTML += `
        <div class="forest-cover-2014-2018-series-single-district">
            <div class="forest-cover-2014-2018-series-single-district-images-holder">
                <div class="forest-cover-single-year">
                    <img src="../resources/${dist}/${dist}_2014.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-single-year">
                    <img src="../resources/${dist}/${dist}_2015.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-single-year">
                    <img src="../resources/${dist}/${dist}_2016.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-single-year">
                    <img src="../resources/${dist}/${dist}_2017.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-single-year">
                    <img src="../resources/${dist}/${dist}_2018.png" alt="" style="width:100%">
                </div>
            </div>
            <div class="caption">
                <p>Figure-${cap_count}: ${dist} forest cover change from 2014 (left-most) to 2018 (right most).</p>
            </div>
        </div>`;
        cap_count++;
    }
    return cap_count;
}

function generate_2014_2018_change_maps(first_caption) {
    let cap_count = first_caption;
    for (let i=0; i<change_images_folder_list.length; i++) {
        // console.log(change_images_folder_list[i]);
        let dist = change_images_folder_list[i];
        document.getElementById("forest-cover-2014-2018-change").innerHTML += `
        <div class="forest-cover-2014-2018-change-single-district">
            <div class="forest-cover-2014-2018-change-single-district-images-holder">
                <div class="forest-cover-change-single-year">
                    <img src="../resources/${dist}/${dist}_2014.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-change-single-year">
                    <img src="../resources/${dist}/${dist}_2018.png" alt="" style="width:100%">
                </div>
                <div class="forest-cover-change-single-year">
                    <img src="../resources/${dist}/${dist}_2018_2014.png" alt="" style="width:100%">
                </div>
            </div>
            <div class="caption">
                <p>Figure-${cap_count}: ${dist} forest cover change from 2014 (left-most) to 2018 (right most).</p>
            </div>
        </div>`;
        cap_count++;
    }
    return cap_count;
}

function generate_2014_2018_change_graphs() {
    let graph_canvas = document.getElementById("forest-cover-2014-2018-graphs").getContext('2d');
    var config = {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            datasets: [] // fill the data using another function
        },
        // Configuration options go here
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Billion Tree Tsunami Forest Cover Change Statistics 2014-2018'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage Forest Cover by Land Area (%)'
                    }
                }]
            }
        }
    };

    fill_graph_data_to_canvas(config);
    
    window.onload = function() {
        window.myLine = new Chart(graph_canvas, config);
    };
}

function fill_graph_data_to_canvas(config_object) {
    for(let dist in forest_data) {
        let this_color = forest_data[dist][0]; // getRandomColor();
        let newDataset = {
            label: dist,
            backgroundColor: this_color,
            borderColor: this_color,
            data: forest_data[dist][1],
            pointStyle: "circle",
            pointRadius: "3",
            stepped: true,
            fill: false
        };
        if(dist=="Average") {
            newDataset.pointStyle = "crossRot";
            newDataset.pointRadius = "10";
        }
        config_object.data.datasets.push(newDataset);    
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let this_caption = generate_2014_2018_series_of_images(6);
this_caption = generate_2014_2018_change_maps(this_caption);
generate_2014_2018_change_graphs();