const usernameTextField = document.getElementById(`userName`);
const addUserBtn = document.getElementById(`addUserBtn`);
const btnText = addUserBtn.innerText;
const recordsDisplay = document.getElementById(`records`);

let userArray = [];

let edit_id = null;

let objStr = localStorage.getItem('users');

if(objStr != null)
{
    userArray = JSON.parse(objStr);
}

displayInfo();



addUserBtn.onclick = () => {
    if(usernameTextField.value != ""){
        const name = usernameTextField.value;
    
        if(edit_id != null)
        {
            //edit
            userArray.splice(edit_id,1,{'name':name});
            edit_id = null;
        }
        else{
            //insert
            userArray.push({'name':name});
        }
            
       saveInfo(userArray);
       usernameTextField.value = '';
       addUserBtn.innerText = btnText;
    
    }
    else{
        alert("Enter a User Name To Add In List")
    }
   
}


function saveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    displayInfo();
}


function displayInfo(){
    let statement = '';
    userArray.forEach((user,i) => {
        statement += `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${user.name}</td>
        
            <td>
                <span>
                    <i class="btn fa-solid fa-edit btn-info mx-3"  onclick='editInfo(${i})'></i>
                    <i class="btn btn-danger fa-solid fa-trash" onclick='deleteInfo(${i})' ></i>
                    
                </span>
            </td>
        </tr>
        `;

    })

    recordsDisplay.innerHTML = statement;
}

function editInfo(id){
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save Changes';
}

function deleteInfo(id){
    userArray.splice(id,1);
    saveInfo(userArray);
   
}

