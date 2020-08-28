document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/dogs/"
    const tableBody = document.querySelector("#table-body")
    const form = document.querySelector("#dog-form")
    
    //create hidden Id field for the form
    let hiddenId = document.createElement("input")
    hiddenId.setAttribute("type", "hidden")
    hiddenId.setAttribute("value", "")
    form.append(hiddenId)

    //function to populate table with dog data
    function fetchDogData(){
        fetch(url)
        .then(res => res.json())
        .then(dogsData => postDogs(dogsData))
    }


    fetchDogData()

    //function to iterate through dog Data
    function postDogs(dogsData){
        dogsData.forEach(dog => {
            addDog(dog)
            
        })
    }
    //function to add each dog to table
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
        
        //click on edit button to populate form
        btn.addEventListener("click", ()=> {
            form.children[0].value = dog.name
            form.children[1].value = dog.breed
            form.children[2].value = dog.sex
            form.children[4].value = dog.id
            debugger;
        })
    }

    //submit form and update the database with edited values and repopulate form
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
        fetch(url+`${parseInt(event.target[4].value)}`, config)
        .then(res => res.json())
        .then(dog => {
            tableBody.innerHTML = ""
            fetchDogData()
            form.reset();
        })
    })
})
    
