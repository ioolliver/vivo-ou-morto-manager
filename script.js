var sort = [];
var current_item = -1;

function get_sort_size() {
    let input = document.querySelector("input#size-input");
    return Number(input.value);
}

function random_number(min, max) {
    return Math.trunc(min + Math.random() * max);
}

function get_random_item() {
    let n = random_number(1, 100);
    if(n % 2 == 0) return 1;
    return 2;
}

function check_item(item, sort_list) {
    if(item != sort_list[sort_list.length-1]) return item;
    let sequence_equal = true;
    let last_items = sort_list.slice(-4);
    for(let i = 0; i < last_items.length; i++) {
        if(last_items[i+1] && last_items[i] != last_items[i+1]) {
            sequence_equal = false;
            break;
        } 
    }
    if(sequence_equal && item == 1) return 2;
    if(sequence_equal && item == 2) return 1;
    return item; 
}

function random_sort() {
    sort = [];
    let size = get_sort_size();

    for(let i = 0; i < size; i++) {
        sort.push(check_item(get_random_item(), sort));
    }
}

function get_sorted_order() {
    let final_order = "";
    for(let i = 0; i < sort.length; i++) {
        let item = sort[i];

        if(current_item == i) final_order += `<span class="current-item">`

        if(item == 1) {
            final_order += "Vivo";
        }else{
            final_order += "Morto";
        }

        if(current_item == i) final_order += `</span>`

        if(i < sort.length-1) final_order += ", "
    }
    return final_order;
}

function update_order() {
    let order_element = document.querySelector("#order");

    let sorted_order = get_sorted_order();

    order_element.innerHTML = `Ordem completa: ${sorted_order}`;
}

function add_vivo_item() {
    let next_list_element = document.querySelector(".sorting ol");

    next_list_element.innerHTML += `
    <li>
        <img src="img/standing.png" alt="Vivo">
        <p>Vivo</p>
    </li>
    `;
}

function add_morto_item() {
    let next_list_element = document.querySelector(".sorting ol");

    next_list_element.innerHTML += `
    <li>
        <img src="img/knee.png" alt="Morto">
        <p>Morto</p>
    </li>
    `;
}

function add_inicio_item() {
    let next_list_element = document.querySelector(".sorting ol");

    next_list_element.innerHTML += `
    <li>
        <p>Inicio da sequência</p>
    </li>
    `;
}

function add_fim_item() {
    let next_list_element = document.querySelector(".sorting ol");

    next_list_element.innerHTML += `
    <li>
        <p>Fim da sequência</p>
    </li>
    `;
}

function clear_next_items() {
    let next_list_element = document.querySelector(".sorting ol");

    next_list_element.innerHTML = ``;
}

function add_green_item_color(index=0) {
    let next_list_elements = document.querySelectorAll(".sorting ol li");
    next_list_elements[index].classList.add("current");
}

function add_normal_item(index) {
    if(sort[index] == 1) add_vivo_item()
    else add_morto_item();
}

function update_nexts() {
    
    clear_next_items();

    let green_index = 0;

    if(current_item == -1) {
        add_inicio_item();
        add_normal_item(current_item);
        add_normal_item(current_item+1);
    }else if(sort[current_item] && sort[current_item+1] === undefined) {
        add_normal_item(current_item-1);
        add_normal_item(current_item);
        add_fim_item();
        green_index = 1;
    }else if(sort[current_item] && sort[current_item+2] === undefined) {
        add_normal_item(current_item);
        add_normal_item(current_item+1);
        add_fim_item();
    }else if(sort[current_item] === undefined) {
        add_normal_item(current_item-2);
        add_normal_item(current_item-1);
        add_fim_item();
        green_index = 2;
        update_instructions(`<p>Sorteie uma nova sequência.</p>`);
    }else {
        add_normal_item(current_item);
        add_normal_item(current_item+1);
        add_normal_item(current_item+2);
    }

    add_green_item_color(green_index);

}

function update_instructions(text) {
    let instructions_element = document.querySelector(".instructions");

    instructions_element.innerHTML = text;
}

function new_sort() {
    current_item = -1;
    random_sort();
    update_order();
    update_nexts();
    update_instructions(`<p>Aperte em Continuar após bater palmas.</p>`);
}

function update_elimination_text() {
    if(sort[current_item] == 1) {
        update_instructions(`
        <p><img src="img/standing.png" alt="Vivo" class="icon">Pessoas em pé <span class="current-item">continuam</span>.</p>
        <p><img src="img/knee.png" alt="Morto" class="icon">Pessoas agachadas <span class="not-item">eliminadas</span>.</p>
        <p><br>Aperte em Continuar após bater palmas.</p>`);
    }else{
        update_instructions(`
        <p><img src="img/standing.png" alt="Vivo" class="icon">Pessoas em pé <span class="not-item">eliminadas</span>.</p>
        <p><img src="img/knee.png" alt="Morto" class="icon">Pessoas agachadas <span class="current-item">continuam</span>.</p>
        <p><br>Aperte em Continuar após bater palmas.</p>`);
    }
}

function continue_sort() {
    if(sort.length == 0) {
        alert('Sorteie uma sequência primeiro.');
        return;
    }
    if(current_item >= 0 && !sort[current_item]) {
        alert('A sequência já terminou. Sorteie uma nova');
        return;
    }

    current_item++;
    update_elimination_text();
    update_order();
    update_nexts();
}