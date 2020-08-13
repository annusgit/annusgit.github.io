
var change_images_folder_list = ["abbottabad", "battagram", "chitral", "haripur", "kohistan", "lower_dir", "mansehra", "shangla", "swat", "torghar", "upperdir"];

var all_images_folder_list = ["abbottabad", "chitral", "kohistan", "lower_dir", "mansehra", "shangla", "swat", "torghar", "upperdir"];

var forest_data = {
    "Hangu":      [0.72,6.56,1.66,1.28,0.2],
    "Battagram":  [34.55,33.28,35.6,40.28,43.04],
    "Abbottabad": [10.8,39.25,9.14,18.73,23.15],
    "Haripur":    [1.18,30.64,0.39,4.53,8.82],
    "Kohistan":   [27.79,37.74,27.94,34.32,30.42],
    "Tor_Ghar":   [16.11,29.93,9.31,20.54,16.99],
    "Mansehra":   [32.84,31.21,30.34,33.63,35.5],
    "Buner":      [2.95,32.84,1.89,14.53,11.13],
    "Chitral":    [32.22,9.71,33.32,42.29,36.55],
    "Lower_Dir":  [3.54,20.09,13.13,19.16,12.95],
    "Malakand":   [0.44,15.9,0.11,5.29,1.76],
    "Shangla":    [25.67,39.74,21.8,47.26,36.59],
    "Swat":       [17.67,24.64,19.4,30.4,29.96],
    "Upper_Dir":  [24.92,21.08,33.07,40.47,36.44]
};

function generate_2014_2018_series_of_images() {
    for (let i=0; i<all_images_folder_list.length; i++) {
        let dist = all_images_folder_list[i];
        document.getElementById("forest-cover-2014-2018-series").innerHTML += `
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <img src="../resources/${dist}/${dist}_2014.png" alt="" style="width:100%">
                </div>
                <div class="col-md-2">
                    <img src="../resources/${dist}/${dist}_2015.png" alt="" style="width:100%">
                </div>
                <div class="col-md-2">
                    <img src="../resources/${dist}/${dist}_2016.png" alt="" style="width:100%">
                </div>
                <div class="col-md-2">
                    <img src="../resources/${dist}/${dist}_2017.png" alt="" style="width:100%">
                </div>
                <div class="col-md-2">
                    <img src="../resources/${dist}/${dist}_2018.png" alt="" style="width:100%">
                </div>
            </div>
            <div class="caption">
                <p>${dist} forest cover change from 2014 (left-most) to 2018 (right most).</p>
            </div>
        </div>`;
    }
    return;
}

function generate_2014_2018_change_maps() {
    for (let i=0; i<change_images_folder_list.length; i++) {
        // console.log(change_images_folder_list[i]);
        let dist = change_images_folder_list[i];
        document.getElementById("forest-cover-2014-2018-change").innerHTML += `
            <div class="row">
                <div class="col-md-4">
                    <img src="../resources/${dist}/${dist}_2014.png" alt="" style="width:100%">
                    </div>
                    <div class="col-md-4">
                        <img src="../resources/${dist}/${dist}_2018.png" alt="" style="width:100%">
                    </div>
                    <div class="col-md-4">
                        <img src="../resources/${dist}/${dist}_2018_2014.png" alt="" style="width:100%">
                    </div>
                </div>
            </div>
            <div class="caption">
                <p> ${dist} forest cover change from 2014 (left-most) to 2018 (right most).</p>
            </div>
        `;
    }
    return;
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
        // console.log(dist);
        let this_color = getRandomColor();
        let newDataset = {
            label: dist,
            backgroundColor: this_color,
            borderColor: this_color,
            data: forest_data[dist],
            fill: false
        };
        config_object.data.datasets.push(newDataset);    
    }
    // window.myLine.update();[i]
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

generate_2014_2018_series_of_images();
generate_2014_2018_change_maps();
generate_2014_2018_change_graphs();