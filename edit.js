///// saves the uid from url

const uid = location.hash.substring(1, )
const now = moment().valueOf()
//// takes the arrayof notes from local storage

let notes = getSavedNotes()

/////Finds the object that matches uid and store its reference in variable 

let note = notes.find((value, index) => uid === value.id)

/// sets the value of input and textarea to properties from object (notes) 

const title = document.querySelector('#title')
title.value = note.title

const body = document.querySelector('#body')
body.value = note.body


////// Last edited

const span = document.querySelector('#lastEdited')
span.textContent = getLastEditedTime(note.updatedAt)




///////////////////////////   Edites the title of note

title.addEventListener('input', (e) => {

  note.title = e.target.value
  note.updatedAt = now
  span.textContent=getLastEditedTime(now)
  saveNotes(notes)
})

//////////////////////////    Edites body of note

body.addEventListener('input', (e) => {
  note.body = e.target.value
  note.updatedAt = now
  span.textContent=getLastEditedTime(now)
  saveNotes(notes)
})

//Removes note

document.querySelector('#remove').addEventListener('click', (e) => {

  const index = notes.findIndex((value, index) => value.id === uid)

  notes.splice(index, 1)
  saveNotes(notes)
  location.assign('index.html')
})


window.addEventListener('storage', (e) => {

  notes = JSON.parse(e.newValue)

  note = notes.find((value, index) => uid === value.id)

  title.value = note.title
  body.value = note.body
  span.textContent=getLastEditedTime(now)
  

})