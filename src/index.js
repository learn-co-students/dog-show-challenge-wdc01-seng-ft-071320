document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/dogs"
    const table = document.querySelector("tbody#table-body")

    const form = document.querySelector("form#dog-form")
    const newInput = document.createElement("input")
    newInput.setAttribute("type", "hidden")
    form.append(newInput)

    fetch(url)
    .then(res => res.json())
    .then(dogs => dogList(dogs))

    function dogList(dogs) {
        dogs.forEach(dog => eachDog(dog))
    }

    function eachDog(dog) {
        const trow = document.createElement("tr")
            trow.setAttribute("data-id", dog.id)
        const td1 = document.createElement("td")
            td1.innerText = dog.name
            td1.className = "padding center"
        const td2 = document.createElement("td")
            td2.innerText = dog.breed
            td2.className = "padding center"
        const td3 = document.createElement("td")
            td3.innerText = dog.sex
            td3.className = "padding center"
        const td4 = document.createElement("td")
            td4.className = "padding center"
        const btn = document.createElement("button")
            btn.innerText = "Edit"
            btn.className = "padding center"

            btn.addEventListener("click", (e) => {
                form[0].value = dog.name 
                form[1].value = dog.breed 
                form[2].value = dog.sex  
                form[4].value = dog.id
            })
            td4.append(btn)
            trow.append(td1, td2, td3, td4)
            table.append(trow)
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        let name = e.target[0].value 
        let breed = e.target[1].value 
        let sex = e.target[2].value
        let id = e.target[4].value 

        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                breed: breed,
                sex: sex
            })
        })
        .then(res => res.json())
        .then(updateDog => {
            const trs = document.querySelector(`tr[data-id="${updateDog.id}"]`)
            trs.children[0].innerText = updateDog.name 
            trs.children[1].innerText = updateDog.breed 
            trs.children[2].innerText = updateDog.sex 
            form.reset()
        })
    })


})

