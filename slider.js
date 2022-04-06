const api_films_url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=25";
const api_action_url = "http://localhost:8000/api/v1/titles/?genre=Action&sort_by=-imdb_score&page_size=25";
const api_fantasy_url = "http://localhost:8000/api/v1/titles/?genre=Fantasy&sort_by=-imdb_score&page_size=25";
const api_horror_url = "http://localhost:8000/api/v1/titles/?genre=Horror&sort_by=-imdb_score&page_size=25";


let dic_url = [api_films_url, api_action_url, api_fantasy_url, api_horror_url];
let dic_slide = [1, 1, 1, 1]

async function showSlides(dic_slide, api_url, i) {

    const response = await fetch(api_url);
    const data = await response.json();
    const { results } = data;

    let img_element = document.createElement("img");
    let img_elementpre = document.createElement("img");
    let img_elementnext = document.createElement("img");
    let img_elementpre2 = document.createElement("img");
    let img_elementnext2 = document.createElement("img");

    let title_element = document.createElement('div');
    
    img_element.src = results[dic_slide[i]-1].image_url;
    img_element.id = "movie";
    img_elementpre.id ="moviepre";
    img_elementnext.id = "movienext";
    img_elementpre2.id ="moviepre+2";
    img_elementnext2.id = "movienext+2";


    if (dic_slide[i]-3 == -1){
        img_elementpre2.src = results[results.length-1].image_url;
    }
    else if (dic_slide[i]-3 == -2){
        img_elementpre2.src = results[results.length-2].image_url;
    }
    else {
        img_elementpre2.src = results[dic_slide[i]-3].image_url;
    }


    if ( dic_slide[i]-2 < 0 ) {
        img_elementpre.src = results[results.length-1].image_url;
    }

    else {
        img_elementpre.src = results[dic_slide[i]-2].image_url;

    }



    if ( dic_slide[i] > results.length-1 ) {
        img_elementnext.src = results[0].image_url;
    }
    else {
        img_elementnext.src = results[dic_slide[i]].image_url;
    }



    if (dic_slide[i] == results.length-1){
        img_elementnext2.src = results[0].image_url;
    }
    else if (dic_slide[i] == results.length){
        img_elementnext2.src = results[1].image_url;
    }
    else {
        img_elementnext2.src = results[dic_slide[i]+1].image_url;
    }
    
    title_element.textContent = "(" + results[dic_slide[i]-1].title + ")";
    title_element.id = "title-best-movie";
    let div = document.getElementsByClassName(`showSlide${i+1}`);

    div[dic_slide[i]-1].appendChild(img_elementpre2);
    div[dic_slide[i]-1].appendChild(img_elementpre);
    div[dic_slide[i]-1].appendChild(img_element);
    div[dic_slide[i]-1].appendChild(img_elementnext);
    div[dic_slide[i]-1].appendChild(img_elementnext2);
    div[dic_slide[i]-1].appendChild(title_element);
}

for (let i = 0; i < 4;i++){
    showSlides(dic_slide, dic_url[i], i);
    displaySlides(dic_slide, i); 
}

function nextSlide(cursorSlide) { 
    displaySlides(dic_slide[0] += cursorSlide, 0);
    showSlides(dic_slide, api_films_url, 0);
}  
function nextSlide2(cursorSlide2) { 
    displaySlides(dic_slide[1] += cursorSlide2, 1);
    showSlides(dic_slide, api_action_url, 1);
}  
function nextSlide3(cursorSlide3) { 
    displaySlides(dic_slide[2] += cursorSlide3, 2);
    showSlides(dic_slide, api_fantasy_url, 2);
}  
function nextSlide4(cursorSlide4) { 
    displaySlides(dic_slide[3] += cursorSlide4, 3);
    showSlides(dic_slide, api_horror_url, 3);
}  
function displaySlides(cursorSlide, i) {  

    let slides = document.getElementsByClassName(`showSlide${i+1}`);  

    console.log(slides)
    if (cursorSlide > slides.length) { dic_slide[i] = 1 }  
    if (cursorSlide < 1) { dic_slide[i] = slides.length }  
    for (i = 0; i < slides.length; i++) {  
        slides[i].style.display = "none";  
    }  
    slides[dic_slide[i] - 1].style.display = "block";  
}