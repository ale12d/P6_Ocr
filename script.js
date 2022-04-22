const api_url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"

async function getBestMovie() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { results } = data;

  let elementmvInfo = document.getElementById('mvInfo');
  let elementtitle = document.createElement('div');
  let elementimg = document.createElement('img');
  elementtitle.id = "title-best-movie";

  elementimg.id = "img-best-movie";
  elementimg.src = results[0].image_url;
  elementtitle.textContent = "(" + results[0].title + ")";

  elementmvInfo.append(elementimg, elementtitle);
  }

getBestMovie();
