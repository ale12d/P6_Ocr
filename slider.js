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

function nextSlide(cursorSlide) { 
    displaySlides(slide_index[0] += cursorSlide, 0);
}  
function nextSlide2(cursorSlide2) { 
    displaySlides(slide_index[1] += cursorSlide2, 1);
}  
function nextSlide3(cursorSlide3) { 
    displaySlides(slide_index[2] += cursorSlide3, 2);
}  
function nextSlide4(cursorSlide4) { 
    displaySlides(slide_index[3] += cursorSlide4, 3);
}  


function displaySlides(cursorSlide, nb_slide) {  

    console.log("-----");

    let slides = document.getElementsByClassName(`showSlide${nb_slide+1}`);  
    let all_img = slides[0].getElementsByTagName('img')

    if (cursorSlide > all_img.length) { slide_index[nb_slide] = 0 }  
    if (cursorSlide < 1) { slide_index[nb_slide] = all_img.length-1 }  
    console.log({slide_index:slide_index[nb_slide]})


    for (i = 0; i < all_img.length; i++) {  
        all_img[i].style.display = "none";  
    }  

    for (i = 0; i < 5;i++){
        console.log("-----");

        if (slide_index[nb_slide]  + i > 24){


            all_img[slide_index[nb_slide] + i - 25].style.display = "inline";  
            console.log({all_img_index : slide_index[nb_slide]  + i -25});
        }

        else{
            all_img[slide_index[nb_slide] +i].style.display = "inline";  
            console.log({all_img_index : slide_index[nb_slide]  + i});
        }
        console.log("-----");
    }
    console.log("-----");

}