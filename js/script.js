const btn = document.getElementById('button');
const form = document.getElementById('form');
const lists = document.getElementById('lists');

function createelemntTodoitems(todo){
  let li = document.createElement('li');
  li = document.createAttribute('id','todo_'+ todo.id);
 
   
  let check = document.createElement('div');
  check.setAttribute('class','check');
  
  
   
  let input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.setAttribute('id','todo_check' + todo.id);
  if(todo.status == 'done'){
    input.cheched = true;
  }else{
    input.chekck = false;
  }
  check.appendChild(input);
  li.appendChild(check);
 

  let text = document.createElement('div');
  text.setAttribute('class','text');
  let matn = document.createElement('p')
  if(todo.status == 'done'){
    matn.style.textDecoration = 'line-through';
  }
  matn.innerHTML = todo.text;
  text.appendChild(matn);
  li.appendChild(text);
 
  let harkat = document.createElement('div');
  harkat.setAttribute('class','actions');
 
  let edite = document.createElement('i');
  edite.setAttribute('class','fa-solid fa-pen');
  let del = document.createElement('i');
  del.setAttribute('class','fa-solid fa-trash');
  harkat.appendChild(edite);
  harkat.appendChild(del);
  li.appendChild(harkat);

  lists.appendChild(li);



};

function setLocalStorge(arg){
    const data = localStorage.getItem('todo')? JSON.parse(localStorage.getItem('todo')) : [];
    let todo = {};
    todo.id = Date.now();
    todo.text = arg;
    todo.status = 'ative';
    data.push(todo);
    localStorage.setItem('todo',JSON.stringify(data));
   form.value = '';
    createelemntTodoitems(todo);
};

btn.addEventListener('click',function(){
    if(form.value){
      setLocalStorge(form.value);
    };
});

window.onload = function (){
  let data = localStorage.getItem('todo')? JSON.parse(localStorage.getItem('todo')) : [];
    if(data.lenght){
      data.forEach(todo=>{
       createelemntTodoitems(todo);
      })
    }

    let checkboxs = document.querySelectorAll("input['type=checkbox']");
    if (checkboxs.length){
      checkboxs.forEach(checkbox =>{
        checkbox.addEventListener('change',function(e){
          let element_id = checkbox.id.substring(10);
          checkbox.parentNode.nextSibling.childNodes[0];
            data = data.map(todo=>{
              if(todo.id==element_id){
                if(e.target.checked){
                  todo.status = 'done'
                }else{
                  todo.status = 'active'
                }
              }
              return todo;
            })
            localStorage.setItem('todo',JSON.stringify(data));
        })
      })
    }
}
