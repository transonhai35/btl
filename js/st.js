let onClickHeart= document.querySelector('.bar-heart');

let isClicked = true;
// function clickHeart() {
//   if(isClicked){
//     isClicked = false;
//     onClickHeart.classList.remove('red-color');
//   }else{
//     isClicked = true;
//     onClickHeart.classList.add('red-color');
//   }
// }

let onClickToolBars = document.querySelector('tool-bars');
let onClickBarsIcon = document.querySelector('.bars-icon');
let onClickDownIcon = document.querySelector('.down-icon');
let displayNavBarTool = document.querySelector('.navbar-tool');

function clickTool() {
  if(isClicked){
    isClicked = false;
    onClickDownIcon.classList.add('on-mob-tab');
    onClickBarsIcon.classList.remove('on-mob-tab');
    displayNavBarTool.classList.add('on-mob-tab');
  }else{
    isClicked = true;
    onClickDownIcon.classList.remove('on-mob-tab');
    onClickBarsIcon.classList.add('on-mob-tab');
    displayNavBarTool.classList.remove('on-mob-tab');
  }
}

let submitOnClick = () => {
  modal.classList.add('active');
  inputFullName.value = '';
  inputPlace.value = '';
  inputTime.value = '';
  inputImg.value = '';
}

let FnLlOnClick = () => {
  
}


//   arrStImg = [
//     {
//     first: 1,
//     second:6,
//     third: [123,2345,5678]
//     },
//     {
//       first: 3,
//       second:4,
//       third: [353,235,538]
//     },
//     {
//       first: 2,
//       second:8,
//       third: [353,235,538]  
//     },
//   ]

// // Tạo hàm so sánh
// let hamSoSanh = (a, b) => a.second - b.second;

// // Sắp xếp mảng
// let quicksort = arrStImg.sort(hamSoSanh);

// // In ra mảng đã sắp xếp
// console.log(arrStImg);


  // function imgItemConsole(imgItem){
  //   for(let i =0; i<imgItem.third.length; i++){
  //     console.log(imgItem.third[i]); 
  //   }
  // }

  // arrStImg.map(imgItemConsole);



  //khai báo biến slideIndex đại diện cho slide hiện tại
  
  let slideIndex;
  // KHai bào hàm hiển thị slide
  function showSlides() {
      var i;
      var slides = document.getElementsByClassName("img-start");
      for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "");  
      }
 
      slides[slideIndex].className += " active"; 
      //chuyển đến slide tiếp theo
      slideIndex++;
      //nếu đang ở slide cuối cùng thì chuyển về slide đầu
      if (slideIndex > slides.length - 1) {
        slideIndex = 0
      }    
      //tự động chuyển đổi slide sau 5s
      setTimeout(showSlides, 2000);
  }
  //mặc định hiển thị slide đầu tiên 
  showSlides(slideIndex = 0);
 
 
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }



// let arrMostViewed = document.querySelectorAll('.most-viewed');
// let print = () => {
//   for(let i= 0; i<arrMostViewed.length; i++) {
//     console.log(arrMostViewed[i]);

//   }
// };
// print();


let onClickViewList = document.querySelector('.viewed-list');
// let onClickClose = document.querySelector('.viewed-close');
let onClickMostView = () => {
  console.log("mostview")
        onClickViewList.classList.add('active');
    }
 let onClickClose = () => {
      onClickViewList.classList.remove('active');
      console.log(onClickViewList);
      // console.log(1);
    }

let arr = [
  {
    name : 123,
    view : 100
  },
  {
    name: 345,
    view: 99
  }
  
]



