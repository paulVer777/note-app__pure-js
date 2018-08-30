// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement('div')
    const a = document.createElement('a')
    const textEl = document.createElement('span')
    const button = document.createElement('button')



    // Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }


    a.appendChild(textEl)
    a.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(a)

    return noteEl
}

/// sorting function

const sortByFunction = (arr, choice) => {

    if (choice === 'byEdited') return arr.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1)
    else if (choice === 'byCreated') return arr.sort((a, b) => a.createdAt < b.updatedAt ? -1 : 1)
    else if (choice === 'alphabetically') return arr.sort((a, b) => a.title[0] < b.title[0] ? -1 : 1)
}

// Render application notes
const renderNotes = function (notes, filters) {
    note = sortByFunction(notes, filters.sortBy)

    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

//// function that calculates how many time passed since last edition of note

const getLastEditedTime = (since) => {

    const a = moment(since)
    const b = moment()

    return `Last edited ${a.from(b)}`


}