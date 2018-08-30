let notes = getSavedNotes()


const filters = {
    searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
  
    const now=moment().valueOf()

    notes.push({
        id: uuidv4(),
        title: '',
        body: '',
        createdAt:now,
        updatedAt:null
    })
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/edit.html#${notes[notes.length-1].id}`)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    console.log(e.target.value)
})


window.addEventListener('storage',(e)=>{

  notes = JSON.parse(e.newValue)
  renderNotes(notes,filters)


})




