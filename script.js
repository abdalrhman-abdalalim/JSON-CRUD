let userName = document.getElementById("Name");
let userPosition = document.getElementById("Position");
let userFinance = document.querySelectorAll("input");
let Salary = userFinance[2];
let Tax = userFinance[3];
let Bonus = userFinance[4];
let Transport = userFinance[5];
let Total = userFinance[6];
let Department = document.getElementById("Department");
let Counter = document.getElementById("counter");
let SubBtn = document.getElementById("SubBtn");
let TheTd = document.getElementsByTagName("table")[0];
let theBody = document.getElementsByTagName("tbody")[1];
let numEmp = document.getElementById("NumEmp");
let btnDel = document.getElementById("DelBtn");
let theSalary = 0;
let theId = 1;
let globalId = 1;
let EditMode = false;
let theEle = -1;
let theDiv = document.getElementById("theDiv");

Salary.addEventListener("keyup", () => {
  Total.value = +Salary.value;
  theSalary = Total.value;
});

Tax.addEventListener("keyup", () => {
  Total.value = +Salary.value - (+Tax.value / 100) * +Salary.value;
  theSalary = Total.value;
});

Transport.addEventListener("keyup", () => {
  Total.value = theSalary - +Transport.value;
});

Bonus.addEventListener("keyup", () => {
  Total.value = +theSalary + parseInt(Bonus.value);
});

let emps;
if (localStorage.employees == null) {
  emps = [];
} else {
  emps = JSON.parse(localStorage.employees);
}

let getNumOfEmp = () => {
  numEmp.innerHTML = emps.length;
  if (emps.length == 0) {
    btnDel.classList.add("disappear");
  } else {
    btnDel.classList.remove("disappear");
  }
};
getNumOfEmp();

btnDel.addEventListener("click", () => {
  localStorage.clear();
  emps.splice(0);
  showData();
  getNumOfEmp();
});
let edit = true;

SubBtn.addEventListener("click", () => {
  let NewEmployee = document.createElement("tr");

  createObj();

  getNumOfEmp();

  showData();

  clearData();

  localStorage.setItem("employees", JSON.stringify(emps));
});

let createObj = () => {
  if (!EditMode) {
    let emp = {
      Id: globalId,
      name: userName.value,
      position: userPosition.value,
      salary: Salary.value,
      tax: Tax.value,
      bonus: Bonus.value,
      transport: Transport.value,
      total: Total.value,
      department: Department.value,
    };
    emps.push(emp);
  } else {
    emps[theEle].name = userName.value;
    emps[theEle].position = userPosition.value;
    emps[theEle].salary = Salary.value;
    emps[theEle].tax = Tax.value;
    emps[theEle].bonus = Bonus.value;
    emps[theEle].transport = Transport.value;
    emps[theEle].total = Total.value;
    emps[theEle].department = Department.value;
  }
  EditMode = false;
};

let clearData = () => {
  userName.value = "";
  userPosition.value = "";
  Salary.value = "";
  Tax.value = "";
  Transport.value = "";
  Bonus.value = "";
  Total.value = "";
  Department.value = "Department";
  SubBtn.value = "Add New Empolyee";
};

let showData = () => {
  let tr = "";
  let ShowIcon = document.createElement("i");
  ShowIcon.classList.add("fa-solid", "fa-eye", "showIc");
  let EditIcon = document.createElement("i");
  EditIcon.classList.add("fa-solid", "fa-pen-to-square", "EditIcon");
  let DelIcon = document.createElement("i");
  DelIcon.classList.add("fa-solid", "fa-trash", "DelIcon");
  for (let i = 0; i < emps.length; i++) {
    tr += `<tr>
        <td>${i + 1}</td>
        <td>${emps[i].name}</td>
        <td>${ShowIcon.outerHTML}</td>
        <td>${EditIcon.outerHTML}</td>
        <td>${DelIcon.outerHTML}</td>
    </tr>`;
  }
  theBody.innerHTML = tr;
  let deleteButtons = document.querySelectorAll(".DelIcon");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      emps.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(emps));
      showData();
      getNumOfEmp();
    });
  });
  let editButton = document.querySelectorAll(".EditIcon");
  editButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      SubBtn.value = "Update the Employee";
      userName.value = emps[index].name;
      userPosition.value = emps[index].position;
      Salary.value = emps[index].salary;
      Tax.value = emps[index].tax;
      Transport.value = emps[index].transport;
      Bonus.value = emps[index].bonus;
      Total.value = emps[index].total;
      Department.value = emps[index].department;
      EditMode = true;
      theEle = index;
      showData();
      getNumOfEmp();
    });
  });
  let showButton = document.querySelectorAll(".showIc");
  showButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      theDiv.classList.add("ShowData");
      theDiv.style.display="block";
      theDiv.innerHTML = ""; // Clear previous content

      let nameElement = document.createElement("div");
      let nameText = document.createElement("span");
      nameText.textContent = "The name is : ";
      nameElement.appendChild(nameText);
      nameElement.innerHTML += emps[index].name;

      let departmentElement = document.createElement("div");
      let departmentText = document.createElement("span");
      departmentText.textContent = "The department is : ";
      departmentElement.appendChild(departmentText);
      departmentElement.innerHTML += emps[index].department;

      let taxElement = document.createElement("div");
      let taxText = document.createElement("span");
      taxText.textContent = "The tax is : ";
      taxElement.appendChild(taxText);
      taxElement.innerHTML += emps[index].tax;

      let salaryElement = document.createElement("div");
      let salaryText = document.createElement("span");
      salaryText.textContent = "The salary is : ";
      salaryElement.appendChild(salaryText);
      salaryElement.innerHTML += emps[index].salary;

      let bonusElement = document.createElement("div");
      let bonusText = document.createElement("span");
      bonusText.textContent = "The bonus is : ";
      bonusElement.appendChild(bonusText);
      bonusElement.innerHTML += emps[index].bonus;

      let positionElement = document.createElement("div");
      let positionText = document.createElement("span");
      positionText.textContent = "The position is : ";
      positionElement.appendChild(positionText);
      positionElement.innerHTML += emps[index].position;

      theDiv.appendChild(nameElement);
      theDiv.appendChild(positionElement);
      theDiv.appendChild(departmentElement);
      theDiv.appendChild(taxElement);
      theDiv.appendChild(salaryElement);
      theDiv.appendChild(bonusElement);
    });
  });

  theDiv.addEventListener("click", () => {
    theDiv.classList.remove("ShowData");
    theDiv.style.display="none";
  });
};
showData();
