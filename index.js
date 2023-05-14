let arr = [];



savedata = () => {

  title = document.getElementById("title").value;
  description = document.getElementById("description").value;

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  if (!title.trim() || !description.trim()) {
    alert("Please fill out the details");
    return false;
  }
  if (localStorage.getItem("localData") == null) {
    arr.push([title, description]);
    localStorage.setItem("localData", JSON.stringify(arr));
  }
  else {
    let jsonArray = localStorage.getItem("localData");
    let data = JSON.parse(jsonArray);
    data.push([title, description]);
    localStorage.setItem("localData", JSON.stringify(data));
  }
  printdata();
}

printdata = () => {
  let displaydata = "", display = "";
  let input = document.getElementById("search").value.toUpperCase();
  if (input == "") {
    let jsonArray = localStorage.getItem("localData");
    let data = JSON.parse(jsonArray);
    displaydata = document.getElementById("displaydata");
    data.sort().forEach((element, index) => {
      display += `
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <button type="button" class="btn btn-default btn-sm" style="float:right" id="index" onclick="deletenotes(${index})">
                    <span class="glyphicon glyphicon-trash"></span> Delete   
                  </button>
                  <button type="button" class="btn btn-default btn-sm mx-3" style="float:right" id="index" onclick="editmotes(${index})">
                    <span class="glyphicon glyphicon-edit"></span> Edit   
                  </button>
                  <h5 class="card-title">${element[0]}</h5>
                  <p class="card-text">${element[1]}</p>
                </div>
              </div>
            </div>`;
    });
  }
  else {
    let jsonArray = localStorage.getItem("localData");
    let data = JSON.parse(jsonArray);
    displaydata = document.getElementById("displaydata");
    data.sort().forEach((element, index) => {
      if (element[0].toUpperCase().indexOf(input) > -1) {
        display += `
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${element[0]}</h5>
                  <p class="card-text">${element[1]}</p>
                </div>
              </div>
            </div>`;
      }
    });
    console.log(display);
  }
  displaydata.innerHTML = display;
}

deletenotes = (index) => {
  let jsonArray = localStorage.getItem("localData");
  let data = JSON.parse(jsonArray);
  if(confirm("Are you sure you want to delete this?"))
  {
    data.splice(index,1);
    localStorage.setItem("localData", JSON.stringify(data));
    printdata();
  }
}

editmotes = (index) => {
  let jsonArray = localStorage.getItem("localData");
  let data = JSON.parse(jsonArray);
  if(confirm("Are you sure you want to edit this?"))
  {
    let arr = data[index];
    document.getElementById("title").value = arr[0];
    document.getElementById("description").value = arr[1];
    deletenotes(index);
  }
}



document.addEventListener("load", printdata());

