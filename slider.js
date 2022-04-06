const api_films_url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=25";
const api_action_url = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score&page_size=25";
const api_fantasy_url = "http://localhost:8000/api/v1/titles/?genre=Fantasy&sort_by=-imdb_score&page_size=25";
const api_horror_url = "http://localhost:8000/api/v1/titles/?genre=Horror&sort_by=-imdb_score&page_size=25";


let dic_url = [api_films_url, api_action_url, api_fantasy_url, api_horror_url];
let slide_index = [0, 0, 0, 0]


async function setImgs(nb_slide){

    for (i = 0; i < 4;i++){

        const response = await fetch(dic_url[i]);
        const data = await response.json();
        const { results } = data;

        for (n = 0; n < 25;n++ ){

            this["img_element"+n] = document.createElement("img");
            this["img_element"+n].src = results[slide_index[i] + n].image_url;
            document.getElementsByClassName(`showSlide${i+1}`)[slide_index[i]].appendChild(this["img_element"+n]);
            if((n  in [0,1,2,3,4]) == false){
                this["img_element"+n].style.display = "none";
            }

        }

}

}
setImgs()

function nextSlide(direction) { 
    displaySlides(slide_index[0] += direction, 0,direction);
}  
function nextSlide2(direction) { 
    displaySlides(slide_index[1] += direction, 1,direction);
}  
function nextSlide3(direction) { 
    displaySlides(slide_index[2] += direction, 2,direction);
}  
function nextSlide4(direction) { 
    displaySlides(slide_index[3] += direction, 3,direction);
}  

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function displaySlides(cursorSlide, nb_slide, direction) {
    let slides = document.getElementsByClassName(`showSlide${nb_slide+1}`); 
    let all_img = slides[0].getElementsByTagName('img')

    if(direction <0){
        slides[0].insertBefore(all_img[all_img.length-1],all_img[0])
    }else{
        insertAfter(all_img[0],all_img[all_img.length-1])
    }

    for (let i = 0; i < all_img.length; i++) { 
        if(i>=0 && i<5){
            all_img[i].style.display = "inline"; 
        }else{
            
        all_img[i].style.display = "none";   
        }
    } 
}