const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let arrLinkedlist = [];
let arrCharts = [];
let modal = $('.modal');
let inputFullName = $('.input-full-name');
let inputPlace = $('.input-place');
let inputTime = $('.input-time');
let inputFile = $('.input-file');
let inputImg = $('.input-img');

// cài đặt node,ll và các chức năng
class ImageViewer {
    constructor(name, place, time, linkImg) {
      this.name = name;
      this.place = place;
      this.time = time;
      this.linkImg = linkImg;
      this.view = 0;
    }
  }
class LinkNode {
  constructor(data){
    this.data = data;
    this.next = null
  }

  }
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    }
    //thêm 1 node vào đầu
    insert(data){
      var node = new LinkNode(data); //khởi tạo một node
      var currNode; // lưu  trữ node hiện tại 
      
      //nếu node hiện tại mà trống
      //thêm luôn vào đầu 
      if (this.head == null)
        this.head = node;
      else {
        node.next = this.head;
        this.head = node;
      }
        this.size++;
      }

    // thêm node vào vị trí bất kì 
    insertAt(index, data) {
      let node = new LinkNode(data); // khởi tạo 1 node
      let i = 0;
      let currNode, prevNode;
      currNode = this.head;
           
      // thêm 1 node  vào đầu linkedlist
      if (index == 0) {
        node.next = this.head;
        this.head = node;
      }else {
        currNode = this.head

        // lặp qua các node trong ll cho đến khi đến vị trí chỉ định
        while (i < index) {
          prevNode = currNode;
          currNode = currNode.next;
          i++;
        }

          //thêm node vào ll
          prevNode.next = currNode;
          currNode.next = next;
      }
      this.size++;
    }

    //xóa một node với index chỉ định
    deleteFrom(index){
      let currNode, prevNode, i = 0;
      currNode = this.head;
      prevNode = currNode;

      //xóa cái node đầu tiên
      if(index == 0) {
        this.head = currNode;
      }else{

        // lặp qua ll cho đến khi tìm được node chỉ định
        while(i<index){
          i++
          prevNode = currNode;
          currNode = currNode.next;
        }

        //xóa node tại index được chỉ định
        prevNode.next = currNode.next;
      }
      this.size--;
    }


    //xóa node với data chỉ định (ERR)
    deleteData(data) {
      let currNode = this.head;
      let prevNode = null;

      //lặp qua ll cho đến khi tìm được node chỉ định
      while(currNode != null){
        // so sánh với phần tử hiện tại
        //nếu mà tìm được phần tử cần xóa
        //trả về true
        if(currNode.data === data){
          if (prevNode == null){
            this.head = currNode.next;
          }else {
            prevNode.next = currNode.next;
          }
          this.size--;
          return currNode.data; 
        }
      }
      prevNode = currNode;
      currNode = currNode.next;
    }

    //hiển thị node có index mà mình nhập
    printListNode(index){
      let currNode, prevNode, i = 0;
      currNode = this.head;
      prevNode = currNode;
      //nếu mà in node đầu tiên
      if(index == 0) {
        console.log(this.head);
      }else{
        //lặp qua ll đến cái node cần in ra
        while(i<index){
          i++
          prevNode = currNode;
          currNode = currNode.next;
        }
        console.log(prevNode.next);
      }
    }
    // tìm các element có địa điểm là
    findElement(value){
      let currNode = this.head;
      let placeArr = [];
      for(let i = 0; i< this.size; i++){
          if(value == currNode.data.place){
            placeArr.push(currNode.data);
            currNode = currNode.next;
          }else{
            currNode = currNode.next;
          }
      }
      console.log(placeArr);
    }

    //chuyển đổi linkedlist sang mảng
    traverse(){
      var currNode = this.head;
      var arr = [];
      while (currNode) {
        arr.push(currNode.data);
        currNode = currNode.next;
      }
      return arr;
    }
  }


let llImg = new LinkedList(new LinkNode(new ImageViewer()));
//doi tuong validator
function Validator(options) {

  let selectorRules = {};

  // Hàm thực hiện validate
  let validate = (inputElement, rule)=> {
      let errMessage;
      let errElement = inputElement.parentElement.querySelector(options.errSelector);
     
     // lấy qua các rule
      let rules = selectorRules[rule.selector];
      
      //lặp qua rule và check
      for(let i = 0; i < rules.length; ++i){
          errMessage = rules[i](inputElement.value);
          if(errMessage) break;
      }

      if(errMessage) {
          errElement.innerText = errMessage;
          errElement.parentElement.classList.add('invalid');
      }else {
          errElement.innerText = '';
          errElement.parentElement.classList.remove('invalid');
      }
      return !errMessage;
  }
  
  // lấy element của form cần validate
  let formElement = document.querySelector(options.form);
  
  if (formElement) {
      formElement.onsubmit = (e)=> {
          e.preventDefault();
          
          let isFormValid = true;
          
          //lặp qua từng rule và validate
          options.rules.forEach((rule) => {
            let inputElement = formElement.querySelector(rule.selector);
            let isValid = validate(inputElement, rule);
            if(!isValid){
              isFormValid = false;
            }
          });
          
          if(isFormValid){
            if(typeof options.onSubmit === 'function'){

              let enableInputs = formElement.querySelectorAll('[name]');
              let formValues = Array.from(enableInputs).reduce((values, input)=>{
                switch(input.type){
                  case 'file':
                    values[input.name] = input.files;
                    break;
                    default:
                      values[input.name] = input.value;
                    }
                    
                    return values;
                  },{});
                  
                  options.onSubmit(formValues);
                }
              }
      }

      //lặp qua mỗi rule và xử lý (lắng nghe sự kiện)

      options.rules.forEach((rule) => {
          //lưu lại các rule trong ô input
          if(Array.isArray(selectorRules[rule.selector])){
              selectorRules[rule.selector].push(rule.test);
          }else {
              selectorRules[rule.selector] = [rule.test];
          }

          let inputElement = formElement.querySelector(rule.selector);
         
          if(inputElement){
              inputElement.onblur = ()=> {
                 validate(inputElement, rule);
              }

              //mỗi khi người dùng nhập vào input
              inputElement.oninput = ()=> {
                  let errElement = inputElement.parentElement.querySelector(options.errSelector);
                  errElement.innerText = '';
                  errElement.parentElement.classList.remove('invalid');
              };
          }    
      }); 
  }
  
}

// định nghĩa
//nguyên tắc của các rules:
// 1. Khi có lỗi: => trả ra messae lỗi
// 2. khi không hợp lệ => undefined
Validator.isRequired = (selector)=> {
  return {
      selector: selector,
      test: (value) => {
          return value.trim() ? undefined : 'Bro chưa nhập gì vào đây';
      }
  };
}

// Validator.isEmail = (selector) => {
//   return {
//       selector: selector,
//       test: (value) => {
//           let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//           return regex.test(value) ? undefined : 'Bro phải nhập email vào đây';
//       }
//   };
// }


//thêm một element

google.load("visualization", "1", {packages:["corechart"]});

function drawCharts() {
  let jan = 10;
  let feb = 10;
  let mar = 10;
  let apr = 10;
  let may = 10;
  let jun = 10;
  let jul = 10;
  let aug = 10;
  let sep = 10;
  let oct = 10;
  let nov = 10;
  let dec = 10;
  arrCharts.forEach(element=>{
    switch(element){
      case'2023-01': 
        jan ++;
        break;              
      case'2023-02': 
        feb ++;
        break;
      case'2023-03': 
        mar ++;
        break;
      case'2023-04': 
        apr ++;
        break;
      case'2023-05': 
        may ++;
        break;
      case'2023-06': 
        jun ++;
        break;
      case'2023-07': 
        jul ++;
        break;
      case'2023-08': 
        aug ++;
        break;
      case'2023-09': 
        sep ++;
        break;
      case'2023-10': 
        oct ++;
        break;
      case'2023-11': 
        nov ++;
        break;
      case'2023-12': 
        dec ++;
        break;
    }
  })
  // BAR CHART
  var barData = google.visualization.arrayToDataTable([
    ['month', 'Page Views'],
    ['Jan',  jan],
    ['Feb',  feb],
    ['Mar',  mar],
    ['Apr',  apr],
    ['May',  may],
    ['Jun',  jun],
    ['Jul',  jul],
    ['Aug',  aug],
    ['Sep',  sep],
    ['Oct',  oct],
    ['Nov',  nov],
    ['Dec',  dec],
  ]);
  // set bar chart options
  var barOptions = {
    focusTarget: 'category',
    backgroundColor: 'transparent',
    colors: ['cornflowerblue', 'tomato'],
    fontName: 'Open Sans',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%'
    },
    bar: {
      groupWidth: '80%'
    },
    hAxis: {
      textStyle: {
        fontSize: 11
      }
    },
    vAxis: {
      minValue: 0,
      maxValue: 20,
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 4
      },
      textStyle: {
        fontSize: 11
      }
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12
      }
    },
    animation: {
      duration: 1200,
      easing: 'out',
      startup: true
    }
  };
  // draw bar chart twice so it animates
  var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
  //barChart.draw(barZeroData, barOptions);
  barChart.draw(barData, barOptions);
  
}



let add = (() => {
  let writeSt = $('.wrt-st-in-here');
  let onClickMostView = $('.most-viewed');
  let submiOnMobTab = $('.add-btn-on-mob-tab');
  let modalClose = $('.modal-close');
  let formElement = $('#form-1');
  let viewList = $$('.viewed-list');
  let view0 = $$('.viewed-item-view0')
    return {

        render(){
          let imageHtml = arrLinkedlist.map((arrImg,index) => `
          <div class="post">
            <div class="post-header">
              <div class ="st-in-post-header">
                <img src="./assets/img/anh-dai-dien-dep.jpg" alt="" class="avatar">
                <div class="post-in4">
                  <div class="person-name">${arrImg.name}</div>
                  <div class="post-place ">
                    <i class="fa-solid fa-location-dot place-icon"></i>
                    ${arrImg.place}
                    <span class="post-time">
                      <i class="fa-solid fa-calendar-days time-icon"></i>
                      ${arrImg.time}
                    </span>
                  </div>
                </div>
              </div>
              <span class="delete-icon"  data-index="${index}">&times</span>  
            </div>
            <div class="post-body">
              <div class="contain-img">
                <img src="${arrImg.linkImg}" alt="" class="post-img" data-index = "${index}">
              </div>
              <div class="funtion-bar">
                <i class="bar-view ti-eye">
                  <span class="view-text">${arrImg.view}</span>
                </i>
                <i class="bar-heart ti-heart" onclick="clickHeart()"></i>
                <i class="bar-share fa-solid fa-share"></i>
              </div>
            </div> 
          </div>           
          `)
          .join('');
          
          writeSt.innerHTML = imageHtml;
        },

        handleWithImg(e) {
          let deleteBtn = e.target.closest('.delete-icon');
          let viewBtn = e.target.closest('.post-img');
          if (deleteBtn) {
            let index = deleteBtn.dataset.index;
            arrLinkedlist.splice(index);
            llImg.deleteFrom(index);
            this.render();
          };
          if(viewBtn){;
            let index = viewBtn.dataset.index;
            arrLinkedlist[index].view++;
            this.render();
          }

          this.getMaxView(arrLinkedlist);

            
        },

        //lấy ra ảnh có số lượt xem lớn nhất
        //nếu chưa có ảnh nào được xem thì trả về ảnh không có gì
        getMaxView(arr){
           //Giả định view lớn nhất là 0
          let max = 0;
          let checkMaxView = true 
          let maxView = [];
          /*So sánh từng số trong obj với giá trị 0 để tìm ra giá trị lớn nhất*/
          arr.forEach(element => {
            if (element.view > max) { //Thay đổi giá trị lớn nhất nếu tìm ra số lớn hơn
              max = element.view;
              maxView.push(element);
              checkMaxView = true;
            }else{
              checkMaxView = false;
            }
          });

          if(checkMaxView){
            view0.forEach(element=>{
              element.classList.remove('active');
            })
            let maxViewHtml = maxView.map((arrMaxView) => `
              <div class="post">
                <div class="post-header">
                  <div class ="st-in-post-header">
                    <img src="./assets/img/anh-dai-dien-dep.jpg" alt="" class="avatar">
                    <div class="post-in4">
                      <div class="person-name">${arrMaxView.name}</div>
                      <div class="post-place ">
                        <i class="fa-solid fa-location-dot place-icon"></i>
                        ${arrMaxView.place}
                        <span class="post-time">
                          <i class="fa-solid fa-calendar-days time-icon"></i>
                          ${arrMaxView.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="post-body">
                  <div class="contain-img">
                    <img src="${arrMaxView.linkImg}" alt="" class="post-img">
                  </div>
                  <div class="funtion-bar">
                    <i class="bar-view ti-eye">
                      <span class="view-text">${arrMaxView.view}</span>
                    </i>
                    <i class="bar-heart ti-heart" onclick="clickHeart()"></i>
                    <i class="bar-share fa-solid fa-share"></i>
                  </div>
                </div> 
              </div>           
              `)
              .join(''); 
                viewList.forEach(viewListItem =>{
                  
                  viewListItem.innerHTML  = maxViewHtml;
                })
                
          }
        },

        init () {
            modalClose.onclick = () => {
              modal.classList.remove('active');
            }

            // xử lí khi bấm nút submit
              formElement.querySelector('.form-submit').onclick = ()=> {
                let enableInputs = formElement.querySelectorAll('[name]');
                let formValues = Array.from(enableInputs).reduce((values, input)=>{
                  switch(input.type){
                    
                    case 'file':
                      values[input.name] = input.files;
                      break;
                      default:
                        values[input.name] = input.value;
                  }
                    
                    return values;
                },{});
                let val = new ImageViewer(formValues.fullname,formValues.place,formValues.time,formValues.formImg);
                llImg.insert(val);
                arrLinkedlist = llImg.traverse();
                  arrCharts.push(formValues.time.slice(0,7));
                google.setOnLoadCallback(drawCharts);
                // arrLinkedlist.forEach((arr1) =>{

                //   arr1.time.slice(7,11);
                //   console.log(arr1);
                // })
                modal.classList.remove('active');
                this.getMaxView(arrLinkedlist);
                  
                  writeSt.onclick =  this.handleWithImg.bind(this);
                  this.render(); 
                }
                // writeSt.onclick =()=>{

                //   this.getMaxView(arrLinkedlist);
                // }
            
            this.render(); 
        }
    }
  })();

add.init();

let funtionLinkedList = (() => {
  return{
    showFnLl(){
      add.init();
      console.log(llImg); 
    }

  }
})();

funtionLinkedList.showFnLl();

