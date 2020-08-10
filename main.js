function AgeInDays() {
    if(document.getElementById("ageindays")) {
        Reset();
    }
    let name = prompt("What is your name, human?");
    console.log("His name is " + name);
    let year = prompt("What year were you born in, " + name + "?");
    console.log("He was born in " + year);
    let this_many_days = (2020-year)*365;
    console.log("His age in days is: " + this_many_days);
    let answer_h1 = document.createElement("h1");
    answer_h1.id = "ageindays";
    answer_h1.innerText = "Your are "+this_many_days+" days old";
    document.getElementById("flex-box-result").appendChild(answer_h1);
    return;
}

function Reset() {
    document.getElementById("ageindays").remove();
}

var total_dua_lipa = 0;

function Generate() {
    let new_image = document.createElement("img");
    new_image.src = "https://i.pinimg.com/originals/25/f9/56/25f95605dbf85071eb5f649134293d69.gif";
    new_image.alt = "What?";
    new_image.width = 200;
    // new_image.height = 300;
    new_image.id = "dua-lipa-no-"+total_dua_lipa;
    total_dua_lipa++;
    document.getElementById("dua-lipa-image-container").appendChild(new_image);
}

function Delete() {
    if(total_dua_lipa>0) {
        total_dua_lipa--;    
        document.getElementById("dua-lipa-no-"+total_dua_lipa).remove();
    } else {
        alert("No More Dua Lipa to Remove");
    }
}

var decision_made = false;
function rps_clicked(this_option) {
    if(decision_made) { return; }
    let all_options = ['rock', 'paper', 'scissors'];
    let bot_selection = all_options[Math.floor(Math.random() * all_options.length)];
    let human_selection = this_option.id;
    console.log("Human Selected: " + human_selection);
    console.log("Computer Selected: " + bot_selection);
    let decision = decide_winner(human_selection, bot_selection);
    decision_made = true;
    console.log("Decision: " + decision);
    /* Now we shall display this decision nicely */
    clear_rps_panel();
    display_decision(human_selection, bot_selection, decision);
}

function decide_winner(human_move, bot_move) {
    if(human_move=="rock") {
        switch(bot_move) {
            case "rock":
                return "draw";
            case "paper":
                return "bot";
            case "scissors":
                return "human";
        }
    } else if(human_move=="paper") {
        switch(bot_move) {
            case "rock":
                return "human";
            case "paper":
                return "draw";
            case "scissors":
                return "bot";
        }
    } else if(human_move=="scissors") {
        switch(bot_move) {
            case "rock":
                return "bot";
            case "paper":
                return "human";
            case "scissors":
                return "draw";
        }
    } else {
        // some bad input was received
        return -1;
    }
}

function create_rps_element(this_choice) {
    // this choice should be either "rock", "paper" or "scissors"
    let new_rps_element = document.createElement("img");
    new_rps_element.src = "images/"+this_choice+".jpg";
    new_rps_element.alt = this_choice;
    new_rps_element.id = this_choice;
    new_rps_element.setAttribute("onclick", "rps_clicked(this)");
    return new_rps_element;
}

function create_decision_string(decision) {
    let decision_string_div = document.createElement("div");
    let decision_string = document.createElement("h1");
    decision_string.setAttribute("class", "decision-string");
    switch(decision) {
        case "human":
            decision_string.innerText = "You Won!";
            decision_string.id = "win";
            break;
        case "bot":
            decision_string.innerText = "You Lost!";
            decision_string.id = "loss";
            break;
        case "draw":
            decision_string.innerText = "It's a draw!";
            decision_string.id = "draw";
            break;
    }
    decision_string_div.appendChild(decision_string);
    return decision_string_div;
}

function reset_game() {
    clear_rps_panel(); 
    decision_made = false;
    let parent_node = document.getElementById("flex-box-container-3-images-holder");
    if(!document.getElementById("rock")) {
        parent_node.appendChild(create_rps_element("rock"));
    }
    if(!document.getElementById("paper")) {
        parent_node.appendChild(create_rps_element("paper"));
    }
    if(!document.getElementById("scissors")) {
        parent_node.appendChild(create_rps_element("scissors"));
    }
}

function clear_rps_panel() {
    let parent_node = document.getElementById("flex-box-container-3-images-holder");
    while(parent_node.firstChild) {
        parent_node.firstChild.remove();
    }
}

function display_decision(human_choice, computer_choice, decision) {
    // show human's choice on the left, computer's choice on the right
    let parent_node = document.getElementById("flex-box-container-3-images-holder");
    let decision_indicator = create_decision_string(decision);
    let human_move = create_rps_element(human_choice);
    let computer_move = create_rps_element(computer_choice);
    switch(decision) {
        case "human":
            human_move.setAttribute("class", "won");
            computer_move.setAttribute("class", "lost");
            break;
        case "bot":
            human_move.setAttribute("class", "lost");
            computer_move.setAttribute("class", "won");
            break;
        case "draw":
            human_move.setAttribute("class", "draw");
            computer_move.setAttribute("class", "draw");
            break;
    }
    parent_node.appendChild(human_move);
    parent_node.appendChild(decision_indicator);
    parent_node.appendChild(computer_move);
}