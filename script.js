let endPoint = `https://uunoyalmreaywqwsrymh.supabase.co/rest/v1/todos`
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bm95YWxtcmVheXdxd3NyeW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczNzAsImV4cCI6MjA0MzkyMzM3MH0.t_yzEGMttCDR2oITWMF_YYLdibKrOcXbSnXE29-WHg8`

getTasks()

let task
let completed

async function getTasks() {

    let response = await fetch(endPoint, {
        method: 'GET',
        headers: {
            'apikey': token,
            'Authorization': token
        }
    })

    let data = await response.json()
    renderTasks(data)

}

function renderTasks(data) {

    let tableLayout = ` <tr>
                            <th>Task</th>
                            <th>Completed</th>
                            <th>Status</th>
                            <th>Delete</th>
                        <tr>`

    for (let i = 0; i < data.length; i++) {
        tableLayout += ` <tr>
                            <td>${data[i].task}</td>
                            <td>${data[i].completed}</td>
                            <td> <button onclick="patchTask(${data[i].id})" class="btn btn-warning"><i class="fa-solid fa-check"></i></button></td>
                            <td> <button onclick="deleteTask(${data[i].id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                        <tr> `

    }

    toDoTask.innerHTML = tableLayout

}

async function addTask() {

    event.preventDefault()

    let task = inputTask.value
    let completed = inputCompleted.value
    
    let jsonData = {
        task,
        completed
        
    }



    let response = await fetch(endPoint, {
        method: 'POST',
        headers: {
            'apikey': token,
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    if (response.ok) {
        console.log("Task created")
        getTasks()
    } else {
        let body = await response.json()
        console.log(body)
    }
}

async function patchTask(id) {

    
    let completed = true

    let url = `${endPoint}?id=eq.${id}`

    let jsonBody = {
        completed


    }
    console.log("patchTask")

    console.log(url)

    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'apikey': token,
            'Athorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })
    console.log(response.ok)

    if (response.ok) {
        console.log("Task has been updated")
        getTasks()

    } else {
        console.log("Task hasn t been updated")
        let responseBody = await response.json()
        console.log(responseBody)
    }
}

async function deleteTask(id) {

    let url = `${endPoint}?id=eq.${id}`

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'apikey': token,
            'Athorization': token
        }
    })

    if (response.ok) {
        console.log("Task has been deleted")
        getTasks()
    } else {
        let responseBody = await response.json()
        console.log("Error deleting task")
        console.log(responseBody)
    }

}