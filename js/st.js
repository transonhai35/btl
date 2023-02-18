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

  let onClickViewList = document.querySelector('.container-most-viewed');
  let onClickMostView = () => {
          onClickViewList.classList.add('active');
      }
   let onClickClose = () => {
        onClickViewList.classList.remove('active');
      }


