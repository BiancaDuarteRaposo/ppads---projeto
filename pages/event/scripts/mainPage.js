const insertInEventRoot = document.getElementById('eventRoot')
const filterByQuickSearch = document.getElementById('quickSearch')
const asideTag = document.getElementById('asideTag')
let res = null;

const requestData = async () => {
  try {
    const response = await fetch('https://happens-here.onrender.com/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const main = async (filt) => {
  if (res === null)
    res = await requestData();
  const filteredData = res.body.filter((val) => {
    console.log(val.title.toLowerCase().includes(filt))
    
    return filt
    ? val.title.toLowerCase().includes(filt.toLowerCase()) 
    || val.address.city.name.toLowerCase().includes(filt.toLowerCase()) 
    || val.address.city.state.uf.toLowerCase().includes(filt.toLowerCase()) 
    : val
  })
  
  let content = '';
  
  filteredData.forEach((val) => {
    const startsAt = new Date(val.eventStartsAt);
    content += `
    <a href="./pages/event/toView.html?id=${val.id}" class="eventCard" style="background-image: url(${val.poster});">
      <div class="info">
        <p>
          ${startsAt.toLocaleDateString('pt-BR', {year: 'numeric', month: 'long', day: 'numeric'})}
        </p>
        <h2>${val.title}</h2>
        <p>
          ${val.address.city.name} 
          - 
          ${val.address.city.state.uf}
        </p>
      </div>
    </a>
    `
  })
  
  insertInEventRoot.innerHTML = content
}

filterByQuickSearch.addEventListener('input', (event) => {
  main(event.target.value)
})

main();