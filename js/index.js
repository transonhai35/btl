const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// cài đặt node,ll và các chức năng
{
class ImageViewer {
    constructor(name, place, time ) {
      this.name = name;
      this.place = place;
      this.time = time;
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
    //thêm 1 node vào cuối danh sách
    insert(data){
      var node = new LinkNode(data); //khởi tạo một node
      var currNode; // lưu  trữ node hiện tại 
      
      //nếu node hiện tại mà trống
      //thêm luôn vào đầu 
      if (this.head == null)
        this.head = node;
      else {
        currNode = this.head;

          // lặp qua các node cho đến node cuối cùng
          while (currNode.next) {
            currNode = currNode.next;
          }
          //thêm node
        currNode.next = node;
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

    printList(){
      var curr = this.head;
      var str = [];
      while (curr) {
        str.push(curr.data);
        curr = curr.next;
      }
      console.log(str);
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
    //hiển thị node có data mà mình nhập (ERR)
    printIndexOf(data){
      let currNode = this.head;
      let prevNode = null;

      //lặp qua ll cho đến khi tìm được node chỉ định
      while(currNode != null){
        // so sánh với phần tử hiện tại
        //nếu mà tìm được phần tử cần hiển thị
        //trả về true
        if(currNode.data === data){
          console.log(currNode.next);
          return currNode.data;
        }
      }
    }
  }
  let llImg = new LinkedList(new LinkNode(new ImageViewer()));
  let val = new ImageViewer(1,2,3);
  let val1 = new ImageViewer(2,4,3);
  let val2 = new ImageViewer(6,4,8);
  llImg.insert(val);
  llImg.insert(val1);
  llImg.insert(val2);
  llImg.printListNode(1);
  // llImg.deleteData(val1);
  llImg.printList();

}
 
//thao thêm một element
{
    let add = (() => {
    let submit = $('.navbar-add');
    let modalClose = $('.modal-close');    
    
    let imgs = [];
    return {
        insert(img){
          imgs.push(img);
        },
        delete(index){
          imgs.splice(index, 1);
        },
        render(){
          
        },
        init () {
            submit.onclick = () => {
                modal.classList.add('active');
            }
            modalClose.onclick = () => {
              modal.classList.remove('active');
            }
        }
    }
  })();

  add.init();
}
  let modal = $('.modal');
  let inputFullName = $('.input-full-name');
  let inputPlace = $('.input-place');
  let inputTime = $('.input-time');
  let inputFile = $('.input-file');

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
            let val = new ImageViewer (formValues.fullname,formValues.place,formValues.time);
              llImg.insert(val);
              console.log(formValues);
              modal.classList.remove('active');
              inputFullName.value = '';
              inputPlace.value = '';
              inputTime.value = '';
              // inputFile.value = '';
              // options.onSubmit(formValues);   
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

