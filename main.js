// Get Request
getTodos = () => {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/users/1/todos',
  //   params:{
  //     _limit: 2,

  //   }
    
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err));
  //Alternative of above
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2')
  .then(res => showOutput(res))
.catch(err => console.error(err));
}
//Post Reuest

addTodos = () => {
  // axios({
  //   method: 'post',
  //   url: 'https://jsonplaceholder.typicode.com/users/1/todos',
  // data:{
  //   title:"New Todos added",
  //   completed: true
  // }
    
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err));
//************** */Alternative
axios.post('https://jsonplaceholder.typicode.com/todos',{
  data:{
    title:"New Todos added",
    completed: true
  }

})
.then(res => showOutput(res))
.catch(err => console.log(err));
}
//pu/patch rerquest
updateTodos = () => {
  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    title: "Todos Updated",
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err));
}
//DELETE request
removeTodos = () => {
   axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))
  .catch(err => console.error(err));
}
//Simultaneosu Data
getData = () => {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
  ])
  .then(axios.spread((todos, posts) => showOutput(posts)))
.catch(err => console.error(err))
}
//COSTOME HEADERS
customeHeader = () => {
  const config = {
    headers : {
      'Content-Type':'application/json',
      Authorizaion: 'someToken'

    }
  };
axios.post('https://jsonplaceholder.typicode.com/todos',{
    title:"New Todos added",
    completed: true
  }, config
)
.then(res => showOutput(res))
.catch(err => console.log(err));

};

//INTERCEPTING REQUEST AND RESPONSE
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()}  request sent to ${config.url} at ${new Date().getTime()}`
);
return config;
}, 
error => {
  return Promise.reject(error);
}
);

// Show Output with Tailwind classes
showOutput = (res) => {
  document.getElementById('res').innerHTML = ` 
  <div class="bg-white p-4 rounded-lg shadow-md mb-4">
    <h5 class="text-lg font-medium">Status: ${res.status}</h5>
  </div>
<div class="bg-white rounded-lg shadow-md mt-3">
  <div class="bg-gray-100 px-4 py-3 border-b border-gray-200 rounded-t-lg">
    <h3 class="font-semibold text-gray-800">Header</h3>
  </div>
  <div class="p-4 overflow-x-auto">
    <pre class="text-sm text-gray-800 whitespace-pre-wrap">${JSON.stringify(res.headers, null, 2)}</pre>
  </div>
</div>
  <div class="bg-white rounded-lg shadow-md mt-3">
    <div class="bg-gray-100 px-4 py-3 border-b border-gray-200 rounded-t-lg">
      <h3 class="font-semibold text-gray-800">Data</h3>
    </div>
    <div class="p-4 overflow-x-auto">
      <pre class="text-sm text-gray-800 whitespace-pre-wrap">${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
   <div class="bg-white rounded-lg shadow-md mt-3">
    <div class="bg-gray-100 px-4 py-3 border-b border-gray-200 rounded-t-lg">
      <h3 class="font-semibold text-gray-800">Config</h3>
    </div>
    <div class="p-4 overflow-x-auto">
      <pre class="text-sm text-gray-800 whitespace-pre-wrap">${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
  `;
}

// Event Listener
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodos);
document.getElementById('update').addEventListener('click', updateTodos);
document.getElementById('delete').addEventListener('click', removeTodos);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customeHeader);