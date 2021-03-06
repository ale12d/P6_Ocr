const api_films_url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=25";
const api_action_url = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score&page_size=25";
const api_fantasy_url = "http://localhost:8000/api/v1/titles/?genre=Fantasy&sort_by=-imdb_score&page_size=25";
const api_horror_url = "http://localhost:8000/api/v1/titles/?genre=Horror&sort_by=-imdb_score&page_size=25";


let dic_url = [api_films_url, api_action_url, api_fantasy_url, api_horror_url];
let dic_attributes = ["title", "genres", "actors", "directors", "imdb_score", "votes"]
let dic_attributes2 = ["date_published", "duration", "description", "countries"]

let modal_container = document.getElementById("modal-container")
let modal = document.getElementById("modal")
let span = document.getElementsByClassName("close")[0];
let popup_content = document.getElementsByClassName("popup-content")

span.onclick = function() {
    modal_container.style.visibility = "hidden";
    modal.style.visibility = "hidden";

    document.querySelectorAll('.popup-content img').forEach(e => e.remove());
    document.querySelectorAll('.popup-content div').forEach(e => e.remove());

    popup_content = document.getElementsByClassName("popup-content")
}

async function getRequestModal(pointer) 
{
    let response_modal = await fetch("http://localhost:8000/api/v1/titles/" + pointer.srcElement.dataset["id"]);
    let data_modal =  await response_modal.json();

    pointer.srcElement.dataset.date_published = data_modal.date_published
    pointer.srcElement.dataset.duration = "Duration : " + data_modal.duration + " min"
    pointer.srcElement.dataset.description = "Description : " + data_modal.description
    pointer.srcElement.dataset.countries = "Countrie : " + data_modal.countries
}

async function setImgs(nb_slide){

    for (i = 0; i < 4;i++){

        const response = await fetch(dic_url[i]);
        const data = await response.json();
        const { results } = data;

        for (n = 0; n < 25;n++ ){


            img_element = document.createElement("img");
            img_element.src = results[n].image_url;
            img_element.id = "all-img"
            
            img_element.dataset.id = results[n].id;
            img_element.dataset.title = results[n].title;
            img_element.dataset.genres = results[n].genres;
            img_element.dataset.actors = "Actors : " +results[n].actors;
            img_element.dataset.directors = "Directors : " + results[n].directors;
            img_element.dataset.imdb_score = results[n].imdb_score;
            img_element.dataset.votes = results[n].votes + " votes";



            slide = document.getElementsByClassName(`showSlide${i+1}`)
            slide[0].appendChild(img_element);

            img_element.addEventListener('click', (pointer) => {

                getRequestModal(pointer).then(data_modal => {
                    
                    for (element=0; element<dic_attributes2.length; element++) {

                    this[dic_attributes2[element] + "_element"] = document.createElement("div");
                    this[dic_attributes2[element] + "_element"].textContent = pointer.srcElement.dataset[dic_attributes2[element]];
                    console.log(pointer.srcElement.dataset[dic_attributes2[element]])
                    this[dic_attributes2[element] + "_element"].id = dic_attributes2[element] + "-element"
                    
                    popup_content[0].appendChild(this[dic_attributes2[element] + "_element"])

                    }
                })


                img = document.createElement("img");
                img.src = pointer.srcElement.src
                img.id = "img-element"

                popup_content[0].appendChild(img)


                for (element=0; element<dic_attributes.length; element++) {
                    this[dic_attributes[element] + "_element"] = document.createElement("div");
                    this[dic_attributes[element] + "_element"].textContent = pointer.srcElement.dataset[dic_attributes[element]];
                    this[dic_attributes[element] + "_element"].id = dic_attributes[element] + "-element"
                    
                    popup_content[0].appendChild(this[dic_attributes[element] + "_element"])
                }

                

                modal_container.style.visibility = "visible";
                modal.style.visibility = "visible";
            });

            if((n  in [0,1,2,3,4,5,6]) == false){
                img_element.style.display = "none";
            }
        }
    }
}

setImgs()

function nextSlide(direction) { 
    displaySlides(0,direction);
}  
function nextSlide2(direction) { 
    displaySlides(1,direction);
}  
function nextSlide3(direction) { 
    displaySlides(2,direction);
}  
function nextSlide4(direction) { 
    displaySlides(3,direction);
}  

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function displaySlides(nb_slide, direction) {
    let slides = document.getElementsByClassName(`showSlide${nb_slide+1}`); 
    let all_img = slides[0].getElementsByTagName('img')

    if(direction <0){
        slides[0].insertBefore(all_img[all_img.length-1],all_img[0])
    }else{
        insertAfter(all_img[0],all_img[all_img.length-1])
    }

    for (let i = 0; i < all_img.length; i++) { 
        if(i>=0 && i<7){
            all_img[i].style.display = "inline"; 
        }
        else{
            
        all_img[i].style.display = "none";   
        }
    } 
}