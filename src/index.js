const url = 'http://localhost:3000/dogs/'
const tableBody = document.getElementById('table-body')
const editForm = document.querySelector('form#dog-form')
const inputName = document.getElementsByName('name')
const inputBreed = document.getElementsByName('breed')
const inputSex = document.getElementsByName('sex')

getAllDogs()

function getAllDogs(){
    fetch(url)
    .then(res => res.json())    
    .then(dogsArray => dogsArray.forEach(dog => displayDog(dog))) //we need to call display dog below

} 

function displayDog(dog){
    // <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> 
    // <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
    const tr = document.createElement('tr')
    tableBody.append(tr)

    const tdName = document.createElement('td')
    tdName.innerText = dog.name

    const tdBreed = document.createElement('td')
    tdBreed.innerText = dog.breed
    
    const tdSex = document.createElement('td')
    tdSex.innerText = dog.sex

    tdEdit = document.createElement('td')
    editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    tdEdit.append(editBtn)

    const hiddenDogId = document.createElement('td')
    hiddenDogId.setAttribute('id', 'dog_id')
    hiddenDogId.innerText = dog.id
    hiddenDogId.setAttribute('type', 'hidden')
    hiddenDogId.setAttribute('style', 'display: none')

    
    tr.append(tdName, tdBreed, tdSex, tdEdit, hiddenDogId)

    editBtn.addEventListener('click', () => {
        inputName[0].value = dog.name
        inputBreed[0].value = dog.breed
        inputSex[0].value = dog.sex
    })

    
}
        editForm.addEventListener('submit', () =>{
            event.preventDefault
            dogId = document.getElementById('dog_id').innerText
            editName = inputName[0].value 
            editBreed = inputBreed[0].value 
            editSex = inputSex[0].value
            
    
            const configObj = {
               method: "PATCH",
                 headers: {
                     "Content-Type": "application/json",
                     Accept: "application/json"
                   },
                 body: JSON.stringify({
                     name: editName,
                     breed: editBreed,
                     sex: editSex
        
                 })
             }
             fetch(url+dogId, configObj)
             .then(res => res.json())
             .then(updateDog => {
                 tableBody.innerText = ""
                 getAllDogs()
                 editForm.reset()
             }  )
    
        })