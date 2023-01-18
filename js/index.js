const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



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
    insert(data){
      var node = new LinkNode(data);
      var currNode;
      if (this.head == null)
        this.head = node;
      else {
        currNode = this.head;
          while (currNode.next) {
            currNode = currNode.next;
          }
        currNode.next = node;
      }
        this.size++;
      }

      insertAt(index, data) {
        let node = new LinkNode(data);
        let i = 0;
        let currNode, prevNode;
        currNode = this.head;
            
        if (index == 0) {
          node.next = this.head;
          this.head = node;
        }else {
          currNode = this.head
          while (i < index) {
            prevNode = currNode;
            currNode = currNode.next;
            i++;
          }
            prevNode.next = currNode;
            currNode.next = next;
        }
        this.size++;
      }

      deleteFrom(index){
        let currNode, prevNode, i = 0;
        currNode = this.head;
        prevNode = currNode;
        if(index == 0) {
          this.head = currNode;
        }else{
          while(i<index){
            i++
            prevNode = currNode;
            currNode = currNode.next;
          }
          prevNode.next = currNode.next;
        }
        this.size--;
      }

      deletedata(data) {
        let currNode = this.head;
        let prevNode = null;
        while(currNode != null){
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

      indexOf(data){
        var count = 0;
        var currNode = this.head;
        while (currNode != null) {
        if (currNode.data === data)
            return count;
        count++;
        currNode = currNode.next;
        }
        return -1;
      }
      printList(){
        var curr = this.head;
        var str = "";
        while (curr) {
          str += curr.element + " ";
          curr = curr.next;
        }
        console.log(str);
      }
      
    }
  let llImg = new LinkedList(new LinkNode(new ImageViewer()));
  let val = new ImageViewer(1,2,3);
  let val1 = new ImageViewer(2,4,3);
  let val2 = new ImageViewer(6,4,8);
  llImg.insert(val);
  llImg.insert(val1);
  llImg.insert(val2);
  llImg.printList();
  console.log(llImg);
  let add = (() => {
    let submit = $('.submit');
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

