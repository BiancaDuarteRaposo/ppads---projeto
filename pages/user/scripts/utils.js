const toggleAside = document.getElementById('toggleAside')

const redefineToken = () => {
  localStorage.setItem('bearerToken', '')
  alert('Você fez logout.')
  window.location.href = '../../index.html'
}

toggleAside.addEventListener('click', () => {
  asideTag.style.display = asideTag.style.display === 'block' ? 'none' : 'block'
})
