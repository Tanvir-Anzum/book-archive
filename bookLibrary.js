const show = document.getElementById('show')
const displaySpinner = document.getElementById('display-spinner')
const showTextOutput = document.getElementById('show-text-output')

const loadData = () => {
  let searchResult = document.getElementById('search')
  let result = searchResult.value
  show.innerText = ''
  displaySpinner.style.display = 'block'
   showTextOutput.style.display = 'none'
   if(result === ''){
    showTextOutput.innerHTML = `<h2>Search field can't be empty</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }  
  // show.appendChild(displaySpinner)
  fetch(`https://openlibrary.org/search.json?q=${result}`)
    .then((res) => res.json())
    .then((data) => display(data.docs, result))

  searchResult.value = ''
}
const display = (inputArray, inputValue) => {
   
  console.log(inputArray)
  if (inputArray.length === 0 && inputValue !== '') {
    showTextOutput.innerHTML = `<h2>No results found</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }
  if (inputArray.length !== 0 && inputValue !== '') {
    showTextOutput.innerHTML = `<h2>${inputArray.length} results found</h2>`
    showTextOutput.style.display = 'block'
    displaySpinner.style.display = 'none'
  }
  let i = 0
  inputArray.forEach(input => {
    i++
    if(i<8){
    const div = document.createElement('div')
    div.innerHTML = `<div class="col mt-3">
    <div class='card' style='width: 21rem;height: 520px; border: 2px solid black'>
    <img  height="410px" src='https://covers.openlibrary.org/b/id/${input.cover_i}-M.jpg' class='card-img-top' alt='...' />
      <div class='card-body'>
      <div class="d-flex">
        <h6 id="firstOutput" class='card-title me-4'>book name: ${input.title}</h6>
        <h6 id="secondOutput" class='card-title'>author: ${input.author_name[0]}</h6>
      </div>  
      
      </div>
    </div>
    </div>
    `
  show.appendChild(div)
  }
    
  })
}
