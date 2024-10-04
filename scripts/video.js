function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  let minute = parseInt(remainingSecond / 60);
  remainingSecond = parseInt(remainingSecond % 60);
  return `${hour} hour ${minute} minute ago`;
}
// console.log(getTime(4326));

/**
 * 1.Fetch ,Load and Show Categories
 */

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (const btn of buttons) {
        btn.classList.remove("active")
    }
    
}
// Create Load Catagories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Load Videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  //   alert(id);
  //fetch
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

        //remove active color class 
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
       
        
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) =>{
console.log(videoId);
const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
const res = await fetch(uri)
const data = await res.json()
displayDetails(data.video)

}

const displayDetails = (video) =>{
console.log(video);
const detailContainer = document.getElementById("modal-content");
detailContainer.innerHTML =`
<img src= ${video.thumbnail}/>
<p>${video.description}
`;

// document.getElementById("showModalData").click();

document.getElementById("customModal").showModal();

}

//DIsplay Videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class ="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <h2 class ="text-center text-xl font-bold">NO CONTENT HERE IN THIS CATAGORY</h2>
    <img src ="assets/Icon.png"/>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video);

    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail} 
      class = "h-full w-full object-cover"/>
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 text-white text-xs bg-black rounded p-1">${getTime(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
   <img class="w-10 h-10 rounded-full object-cover " src=${
     video.authors[0].profile_picture
   } />
   </div>
   <div>
  <h2 class="font-bold">${video.title}</h2>
  <div class="flex items-center">
  <p >${video.authors[0].profile_name}</p>
 ${
   video.authors[0].verified == true
     ? ` <img class ="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`
     : ""
 }
  </div>
  <p><button onclick="loadDetails('${video.video_id}')" class= "btn btn-sm btn-error">Details</button></P>
  <div class='flex'>
  <p>${video.others.views} </p>
  <p>views</p>
  </div>
   </div>
  </div>
        `;
    videoContainer.append(card);
  });
};

// Display Load Catagories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // Create button
    const buttonContainer = document.createElement("div");
    // console.log(item);

    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;

    //add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadVideos();
