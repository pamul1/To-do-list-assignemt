let endPoint = `https://uunoyalmreaywqwsrymh.supabase.co/rest/v1/todos`
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bm95YWxtcmVheXdxd3NyeW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczNzAsImV4cCI6MjA0MzkyMzM3MH0.t_yzEGMttCDR2oITWMF_YYLdibKrOcXbSnXE29 - WHg8`

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
                        <tr>`

    for (let i = 0; i < data.length; i++) {
        tableLayout += ` <tr>
                            <td>${data[i].task}</td>
                            <td>${data[i].completed}</td>
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
    if(response.ok){
        console.log("Task created")
    }else{
        let body = await response.json()
        console.log(body)
    }
}