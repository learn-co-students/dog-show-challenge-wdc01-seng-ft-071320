document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/dogs/"
    const tableBody = document.querySelector("#table-body")
    const form = document.querySelector("#dog-form")
    
    fetch(url)
    .then(res => res.json())
    .then(dogsData => postDogs(dogsData))

    function postDogs(dogsData){
        dogsData.forEach(dog => addDog(dog))
    }

    function addDog(dog){
        let dogRow = document.createElement("tr")

        let tdName = document.createElement("td")
        tdName.innerText = dog.name
        let tdBreed = document.createElement("td")
        tdBreed.innerText = dog.breed
        let tdSex = document.createElement("td")
        tdSex.innerText = dog.sex
        let tdEdit = document.createElement("td")
        let btn = document.createElement("button")
        btn.innerText = "Edit"
        tdEdit.append(btn)
    
        dogRow.append(tdName, tdBreed, tdSex, tdEdit)
        tableBody.append(dogRow)

        btn.addEventListener("click", ()=> {
            form.children[0].value = dog.name
            form.children[1].value = dog.breed
            form.children[2].value = dog.sex
        })
    }    

    form.addEventListener("submit", () => {
        event.preventDefault()
        config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target[0].value,
                breed: event.target[1].value,
                sex: event.target[2].value
            })
        }
        fetch(url+`${dog.id}`, config)
        .then(res => res.json())
        .then(updatedDog => {
            dog = updatedDog
        })
    })
    
})