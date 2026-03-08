const allBtn = document.getElementById('AllBtn')
const openBtn = document.getElementById('openBtn')
const closeBtn = document.getElementById('closeBtn')



const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('issue-container').classList.add('hidden');
   
  }
  else {
       document.getElementById('spinner').classList.add('hidden')
    document.getElementById('issue-container').classList.remove('hidden');
  }

}

// all
allBtn.addEventListener("click", () => {
  toggleStyle("AllBtn");
  LoadIssues();
});

// open filter
openBtn.addEventListener("click", () => {
  toggleStyle("openBtn");
  manageSpinner(true);
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
  manageSpinner(true);
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



const LoadIssues = () => {
  manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(Response => Response.json())
    .then(json => displayIssue( json.data ))
}

// spinner
// modal use korar somy
const loadIssues = (id) => {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // remove all active class
      removeActive();
      const clickBtn = document.getElementById(`data-${id}`);
      // console.log(clickBtn);
      // add active class
  ;
      displayLevelWord(data.data);
    })

};
const loadIssuDetail = async(id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
   displayIssueDetails(details.data);
  console.log(details.data);
}

const displayIssueDetails = (issue) => {
  console.log(issue);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
  <div class="space-y-6">
          <h2 class="text-2xl font-semibold text-[#1F2937]">${issue.title}</h2>
          <div class="flex justify-start gap-5 items-center ">
            <p class="bg-green-500 rounded-full px-5 py-2">${issue.status}</p>
            <p class="text-[#64748B]">. Opened by${issue.author}</p>
            <p class="text-[#64748B]">. ${issue.createdAt}</p>

          </div>
          
  <div class="flex gap-2">
    ${issue.labels?.[0] ? `<span class="bg-red-200 text-pink-600 rounded-full px-4 py-2 border-pink-600">${issue.labels[0]}</span>` : ""}
    ${issue.labels?.[1] ? `<span class="bg-orange-200 text-orange-600 rounded-full px-4 py-2">${issue.labels[1]}</span>` : ""}
  </div>

          <h3 class="text-[#64748B]">${issue.description}</h3>
          <div class="bg-base-200 p-5 rounded-md">
            <div class="grid grid-cols-3 text-[#64748B] ">
              <div>Assignee</div>
              <div>Priority</div>
            </div>
            <div class="grid grid-cols-3">
              <div class="text-[#1F2937] font-semibold">${issue.assignee}</div>
              <span class=" rounded-full text-white w-20 text-center bg-red-500">${issue.priority}</span>
            </div>
          </div>
        </div>

  
  `;
  console.log(detailsBox);
  document.getElementById('word_modal').showModal();
}
const displayIssue=(issues) => {
  console.log(issues);
  const issuCounter = document.getElementById('issu-counter');
  issuCounter.innerHTML = `${issues.length} Issues`;
    const getId=document.getElementById("issue-container")
    getId.innerHTML="";

    for(let issue of issues) {
      
      const addElement = document.createElement("div")
      
     
addElement.addEventListener("click", () => loadIssuDetail(issue.id));
      addElement.innerHTML = `
             <div class="bg-base-100 shadow-md rounded-md h-full  p-5 space-y-4            ${issue.status === 'open' ? 'border-t-4 border-green-600' : 'border-t-4 border-purple-600'}">


            <div  class="flex justify-end">
           
             <span class="text-right bg-orange-200 text-orange-600 rounded-full px-4 py-2">${issue.priority}</span>
            </div>
           <h2 class="text-2xl font-bold text-[#1F2937]">${issue.title}</h2>
        <h3 class="text-[#64748B]">${issue.description}</h3>
       <div class="flex flex-wrap gap-2">
  ${issue.labels?.[0] ? `<span class="bg-[#FEECEC] text-[#EF4444] border border-[#FECACA] rounded-full px-4 py-2 font-medium">${issue.labels[0]}</span>` : ""}
  ${issue.labels?.[1] ? `<span class="bg-[#FFF8DB] text-[#D97706] rounded-full px-4 py-2 border border-[#FDE68A] font-medium">${issue.labels[1]}</span>` : ""}
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

  manageSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', () => {
 const input= document.getElementById('input-search');

  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter(word => word.title.toLowerCase().includes(searchValue));
      displayIssue(filterWords);
  })
})

LoadIssues();