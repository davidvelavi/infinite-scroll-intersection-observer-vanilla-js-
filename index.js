const list = document.getElementById('List');

const API_URL = 'https://rickandmortyapi.com/api/character/?page={}'

const characters = [];
let page = 1

let options = {
  root: list,
  rootMargin: '5px',
}

const getNewCharacters = (entries)=>{
  if(entries[0].isIntersecting){
    debugger
    page +=1;
    getCharacters(page)
  }
}

let observer = new IntersectionObserver(getNewCharacters, options);

const getCharacters = (page = 1) =>{
  fetch(API_URL.replace('{}', page))
  .then(resp => resp.json())
  .then(({results}) => {
    results.forEach(element => {
        const items = `<li>${element.id} - ${element.name}</li>`
        characters.push(items)
    });
    list.innerHTML = characters
    observer.observe(list.lastChild)
  })
}

getCharacters()

