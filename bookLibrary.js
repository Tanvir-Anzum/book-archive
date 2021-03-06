// necessary variables
const show = document.getElementById('show')
const displaySpinner = document.getElementById('display-spinner')
const showTextOutput = document.getElementById('show-text-output')
let book = document.getElementById('book')
let author = document.getElementById('author')

// function for loading data
const loadData = () => {
  let searchResult = document.getElementById('search')
  let result = searchResult.value
  show.innerText = ''
  displaySpinner.style.display = 'block'
  showTextOutput.style.display = 'none'
  if (result === '') {
    showTextOutput.innerHTML = `<h2>Search field can't be empty</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }

  // fectching data
  fetch(`https://openlibrary.org/search.json?q=${result}`)
    .then((res) => res.json())
    .then((data) => display(data.docs, result))
  // .then((data) => console.log(data.docs))

  searchResult.value = ''
}

// display function
const display = (inputArray, inputValue) => {
  // checking if any result is found
  if (inputArray.length === 0 && inputValue !== '') {
    showTextOutput.innerHTML = `<h2>No results found</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }

  // checking how many results matched with search input
  if (inputArray.length !== 0 && inputValue !== '') {
    showTextOutput.innerHTML = `<h2>${inputArray.length} results found</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }
  let i = 0

  // using forEach loop to loop through array elements
  inputArray.forEach((input) => {
    i++

    // showing seven(7) results
    if (i < 8) {
      const div = document.createElement('div')

      // use of try - cacth block
      try {
        div.innerHTML = `<div class="col mt-3">
     <div class='card' style='width: 21rem;height: 532px; border: 2px solid black'>
     <img  height="410px" src='https://covers.openlibrary.org/b/id/${input.cover_i}-M.jpg' class='card-img-top' alt='...' />
       <div class='card-body'>
     <div class="d-flex">
         <h6 id="firstOutput" class='card-title me-4'>book name: ${input.title}</h6>
         <h6 id="secondOutput" class='card-title me-4'>author name: ${input.author_name[0]}</h6>
       </div>
        <h6 class='card-title me-4'>published in: ${input.publish_year[0]}
       </div>
     </div>
     </div>
    `
      } catch {
        try{
        div.innerHTML = `<div class="col mt-3">
       <div class='card' style='width: 21rem;height: 520px; border: 2px solid black'>
       <img  height="410px" src='https://covers.openlibrary.org/b/id/${input.cover_i}-M.jpg' class='card-img-top' alt='...' />
       <div class='card-body'>
        <div class="d-flex">
         <h6 id="firstOutput" class='card-title me-4'>book name: ${input.title}</h6>
         <h6 id="secondOutput" class='card-title me-4'>author name: ${input.author_name[0]}</h6>
        </div>
         <h6 id="secondOutput" class='card-title me-4'>published year: unavailable</h6>
       </div>
       </div>
     </div>
     </div>
    `}
    catch{
      div.innerHTML = `<div class="col mt-3">
     <div class='card' style='width: 21rem;height: 520px; border: 2px solid black'>
     <img  height="410px" src='https://covers.openlibrary.org/b/id/${input.cover_i}-M.jpg' class='card-img-top' alt='...' />
       <div class='card-body'>
     <div class="d-flex">
         <h6 id="firstOutput" class='card-title me-4'>book name: ${input.title}</h6>
        <h6 class='card-title me-4'>author name: ${input.publish_year[0]}
        </div>
         
     </div>
     </div>
    `
    }
      }
      show.appendChild(div)
    }
  })
}
