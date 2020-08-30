const url = 'http://localhost:3000/dogs/'
const tableBody = document.querySelector('#table-body')
const editForm = document.querySelector('form#dog-form')
const inputName = document.getElementsByName('name')
const inputBreed = document.getElementsByName('breed')
const inputSex = document.getElementsByName('sex')

const idForm = document.createElement('input')
idForm.setAttribute("style", "display: none;")
idForm.setAttribute("id", "td-id")
idForm.setAttribute("value", "")
editForm.append(idForm)


getAllDogs()

function getAllDogs(){
fetch(url)
.then(response => response.json())
.then(dogsArray => dogsArray.forEach(dog => displayDog(dog)))
}

function displayDog(dog){
    const tr = document.createElement('tr')
    tableBody.append(tr)

    const tdName = document.createElement('td')
    tdName.innerText = dog.name
    
    const tdBreed = document.createElement('td')
    tdBreed.innerText = dog.breed

    const tdSex = document.createElement('td')
    tdSex.innerText = dog.sex

    const tdBtn = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.innerText = "Edit"
    tdBtn.append(editBtn)

    // const hiddenDogId = document.createElement('td')
    // hiddenDogId.setAttribute('id', "dog-id")
    // hiddenDogId.innerText = dog.id
    // hiddenDogId.setAttribute("style", "display: none;")

    tr.append(tdName, tdBreed, tdSex, tdBtn)

    editBtn.addEventListener('click', () => {
        
        idForm.value = dog.id
        inputName[0].value = dog.name
        inputBreed[0].value = dog.breed
        inputSex[0].value = dog.sex

    })

}


editForm.addEventListener('submit', () => {
    event.preventDefault()
    console.log(event.target)
    // const dogId = event.target[4].value
    
    editedName = inputName[0].value
    editedBreed = inputBreed[0].value
    editedSex = inputSex[0].value
    
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: editedName, breed: editedBreed, sex: editedSex})
    }

    fetch(url+idForm.value, configObj)
    .then(resp => resp.json())
    .then( updatedDog => {   
        tableBody.innerText = ""
        getAllDogs()
        editForm.reset()
    })
})


