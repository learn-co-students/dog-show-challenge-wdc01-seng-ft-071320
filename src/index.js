document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/dogs/"
    const dogTable = document.querySelector('#table-body')
    const dogForm = document.querySelector("#dog-form")
    const nameInput = document.querySelector('input[name="name"]')
    const breedInput = document.querySelector('input[name="breed"]')
    const sexInput = document.querySelector('input[name="sex"]')
    const dogIdInput = document.createElement('INPUT')
    dogIdInput.setAttribute("type", "hidden")
    dogIdInput.setAttribute("name","dogId")
    dogForm.append(dogIdInput)


    fetch(url)
    .then(res => res.json())
    .then(dogs => addAllDogs(dogs))

    function addOneDog(dog){
        let tableRow = document.createElement("TR")


        let tableDataName = document.createElement("TD")
        tableDataName.innerText = dog.name


        let tableDataBreed = document.createElement("TD")
        tableDataBreed.innerText = dog.breed


        let tableDataGender = document.createElement("TD")
        tableDataGender.innerText = dog.sex


        let editBtn = document.createElement("BUTTON")
        editBtn.innerText = "Edit"

        tableRow.append(tableDataName, tableDataBreed, tableDataGender, editBtn)
        
        dogTable.append(tableRow)

        editBtn.addEventListener("click", function(e){
            e.preventDefault

            nameInput.value = dog.name
            breedInput.value = dog.breed 
            sexInput.value = dog.sex
            dogIdInput.value = dog.id

        })
    }


    function addAllDogs(dogs){
        dogTable.innerHTML = ""
        dogs.forEach(dog => {
            addOneDog(dog)
        })
    }

    dogForm.addEventListener("submit",function(e){
        e.preventDefault()

        fetch(url + dogIdInput.value, {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                breed:breedInput.value,
                sex: sexInput.value
            })
        })
        .then(res => res.json())
        .then(function(){
            
            
            fetch(url)
            .then(res => res.json())
            .then(dogs => addAllDogs(dogs))

            dogForm.reset()
        })
        
    })
})