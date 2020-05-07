//Search params
const searchParams = new URLSearchParams(window.location.search)
const groupID = searchParams.get('id') 
const userID = searchParams.get('user') 

//Post content form

const postFormUserID = document.getElementById('post-content-user-id')
postFormUserID.value = userID 
const postFormGroupID = document.getElementById('post-content-group-id')
postFormGroupID.value = groupID 

//Nav bar

const homeButton = document.getElementById('home-button')
homeButton.innerHTML = `<a href="http://localhost:3001/show.html?user=${userID}">Home</a>`

//Add user form

const addUserGroupId = document.getElementById('add-user-group-id')
addUserGroupId.value = groupID 
const addUserCurrentUser = document.getElementById('current-user')
addUserCurrentUser.value = userID 

//Remove self from group form

const removeSelfGroupID = document.getElementById('remove-self-group-id')
removeSelfGroupID.value = groupID
const removeSelfUserID = document.getElementById('remove-self-user-id')
removeSelfUserID.value = userID

//fetch for add users to group form

fetch('http://localhost:3000/users')
    .then(resp =>resp.json())
    .then(addUsers)

const addUserForm = document.getElementById('add-user')

function addUsers(users) {
    users.forEach(user=> {
        addUser(user)})
}

function addUser(user){
    const $li = document.createElement('li')
    $li.innerHTML = `
    <input type="checkbox" id=${user.name} name="user_id" value=${user.id}>
    <label for=${user.name}>${user.name}</label>
    <input type="hidden" name="group_id" value=${groupID}>`
    addUserForm.append($li)
}

//fetch for group show page content

fetch(`http://localhost:3000/groups/${groupID}`)
    .then(resp => resp.json())
    .then(group => handleGroup(group))

const $mainSection = document.getElementById('main-section')
const memberList = document.getElementById('member-list')

function handleGroup(group){
    displayGroupName(group)
    displayUsers(group.users)
    displayContent(group)
}

function displayGroupName(group){
    const groupName = document.querySelector('#welcome')
    groupName.innerText = group.name 
}

function displayUsers(users){
    users.forEach(user => {
    displayUser(user)       
    })
}

function displayUser(user){
    const member = document.createElement('li')
    member.innerText = user.name
    memberList.append(member)
}

function displayContent(group){
    group.contents.forEach(content => {
       makeContent(content, group.users)
    })
}

function makeContent(content, users){
    const $div = document.createElement('div')
        if (content.message) {
            $div.innerHTML = `<h3>${content.message}</h3>`
        } else {
            $div.innerHTML = `<div>${content.image}</div>`
        }
        const foundUser = users.find(user => user.id == content.user_id)
        const creatorElement = document.createElement('p')
        creatorElement.innerText = `created by ${foundUser.name}`
        $div.append(creatorElement)
        const statusInfo = stateList(users, content)
        $div.append(statusInfo)
        $mainSection.append($div)
}

// (DONE) 1. add all members to the bottom of each piece of content
// 2. for every create content form submitted, submit a POST create form to states controller w/ status of "not started" for every member of the group.
// 3. for each user, create an update form w/ pre-populated dropdown options "in progress" and "completed".

// fetch('http://localhost:3000/states')
//     .then(resp =>resp.json())
//     .then(updateStatus)

// function updateStatus() {

// }

function createStatesForm(user, content) {
    const statesForm = document.createElement('form')
    statesForm.setAttribute("id", "create-status-form")
    statesForm.setAttribute("action", "http://localhost:3000/states")
    statesForm.setAttribute("method", "POST")
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    const select = document.createElement('select')
    const option1 = document.createElement('option')
    const option2 = document.createElement('option')
    const option3 = document.createElement('option')
    const submitButton = document.createElement('input')
    // const inputs = [input1, input2, input3]
    input1.setAttribute("type", "hidden")
    input1.setAttribute("name", "user_id")
    input1.setAttribute("value", `${user.id}`)
    input2.setAttribute("type", "hidden")
    input2.setAttribute("name", "content_id")
    input2.setAttribute("value", `${content.id}`)
    select.setAttribute("name", "status")
    option1.setAttribute("value", "Not Started")
    option1.innerText = 'Not Started'
    option2.setAttribute("value", "In Progress")
    option2.innerText = 'In Progress'
    option3.setAttribute("value", "Completed")
    option3.innerText = 'Completed'
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("value", "submit")
    select.append(option1, option2, option3)
    statesForm.append(input1, input2, select, submitButton)
    // createStatesFormInputs(user)

    statesForm.append(displayMemberStatus(user, content))
    return statesForm
}

// function createStatesFormInputs(user) {
//     const $input = document.createElement('input')
//     $input.setAttribute("type", "text")
//     $input.setAttribute("name", "status")
//     $input.setAttribute("value", "Not Started")
//     statesForm.append($input)
//     console.log('statesw/inputs', statesForm)
// }

function stateList(users, content) {
    const userStatus = document.createElement('p')
    users.forEach(user => {
        const thingToAppend = createStatesForm(user, content)
        userStatus.append(thingToAppend)      
        })
    return userStatus
}

function displayMemberStatus(user, content){ 

    const member = document.createElement('li')
    fetchStates()
    // const states = content.states
    console.log(fetchStates())
    // const foundState = states.find(state => state.user_id == user.id)
    // member.innerHTML = `${user.name}: ${foundStatus.status}`
    return member
}

function fetchStates(){
    fetch('http://localhost:3000/states')
    .then(response => response.json())
    .then(states => returnStates(states))
}

function returnStates(states){
    console.log(states)
    // return states
}