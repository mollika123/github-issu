const allBtn = document.getElementById('AllBtn')
const openBtn = document.getElementById('openBtn')
const closeBtn = document.getElementById('closeBtn')



// const manageSpinner = (status) => {
//   if (status == true) {
//     document.getElementById('spinner').classList.remove('hidden')
//     document.getElementById('issue-container').classList.add('hidden');
   
//   }
//   else {
//        document.getElementById('spinner').classList.add('hidden')
//     document.getElementById('issue-container').classList.remove('hidden');
//   }

// }

// all
allBtn.addEventListener("click", () => {
  toggleStyle("AllBtn");
  LoadIssues();
});

// open filter
openBtn.addEventListener("click", () => {
  toggleStyle("openBtn");

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      const openIssues = data.data.filter(issue => issue.status === "open");
      displayIssue(openIssues);
    });
});

// close filter
closeBtn.addEventListener("click", () => {
  toggleStyle("closeBtn");

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      const closeIssues = data.data.filter(issue => issue.status === "closed");
      displayIssue(closeIssues);
    });
});
function toggleStyle(id) {
   
    allBtn.classList.add('bg-base-200', 'text-black')
    openBtn.classList.add('bg-base-200', 'text-black')
    closeBtn.classList.add('bg-base-200', 'text-black')

    allBtn.classList.remove('bg-blue-700', 'text-white')
    openBtn.classList.remove('bg-blue-700', 'text-white')
    closeBtn.classList.remove('bg-blue-700', 'text-white')

    let selected = document.getElementById(id)
    selected.classList.remove('bg-base-200', 'text-black')
    selected.classList.add('bg-blue-700', 'text-white')
}



const LoadIssues=() => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(Response => Response.json())
    .then(json => displayIssue( json.data ))
}

const displayIssue=(issues) => {
  console.log(issues);
  const issuCounter = document.getElementById('issu-counter');
  issuCounter.innerHTML = `${issues.length} Issues`;
    const getId=document.getElementById("issue-container")
    getId.innerHTML="";

    for(let issue of issues) {
      
      const addElement = document.createElement("div")
      
     
      addElement.innerHTML = `
             <div class="bg-base-100 shadow-md rounded-md h-full  p-5 space-y-4            ${issue.status === 'open' ? 'border-t-4 border-green-600' : 'border-t-4 border-purple-600'}">


            <div class="flex justify-end">
             <span class="text-right bg-orange-400 rounded-lg p-1">${issue.priority}</span>
            </div>
           <h2 class="text-2xl font-bold text-[#1F2937]">${issue.title}</h2>
        <h3 class="text-[#64748B]">${issue.description}</h3>
        <div class="flex flex-wrap gap-2">
            <span class="bg-red-400 rounded-md px-4 py-2">${issue.labels[0]}</span>
            <span class="bg-red-400 rounded-md px-4 py-2">${issue.labels[1]}</span>
        </div>
        <br>
        <hr class="border-gray-400">
        <div class="">
            <p class="text-[#64748B]">${issue.author}</p>
            <p class="text-[#64748B]">${issue.createdAt}</p>
        </div>
        </div>
        
        `;
    
  getId.appendChild(addElement);
    }

    
}

// allBtn.addEventListener('click', function () {
//   displayIssue(issues.issues);
//   console.log(issues);
// })


// modal use korar somy
// const loadIssues = (id) => {
//   manageSpinner(true);
//   const url = ` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       // remove all active class
//       removeActive();
//       const clickBtn = document.getElementById(`lesson-btn-${id}`);
//       // console.log(clickBtn);
//       // add active class
//   ;
//       displayLevelWord(data.data);
//     })

// };


LoadIssues()