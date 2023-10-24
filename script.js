const images = [
	{ src: "1.jpg", gend: "not" },
	{ src: "2.jpg", gend: "gay" },
	{ src: "3.png", gend: "not" },
	{ src: "4.jpg", gend: "gay" },
	{ src: "5.jpg", gend: "gay" }
];

const question = document.getElementById("question");
const image = document.getElementById("image");
const gayBtn = document.getElementById("gay-btn");
const notGayBtn = document.getElementById("not-btn");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const tweetBtn = document.getElementById("tweet-button");

let currentImageIndex = 0;
let correctCount = 0;

function showQuestion() {
	question.innerHTML = "これはゲイ会？";
}

function showImage() {
  // 画像が表示されている場合は削除する
  const currentImage = document.querySelector("#image-container img");
  if (currentImage) {
    currentImage.remove();
  }

  // 新しい画像を表示する
  const img = document.createElement("img");
  img.src = "img/" + images[currentImageIndex].src;
  img.alt = "写真";
  document.getElementById("image-container").appendChild(img);
}

function showResult() {
  gayBtn.style.display = "none";
  notGayBtn.style.display = "none";
  question.innerHTML = "";
	document.querySelector("#image-container img").remove();
	result.innerHTML = `${currentImageIndex}問中${correctCount}問正解です。`;
  tweetBtn.style.display = "block";
  tweetBtn.onclick = function() {
    const url = "https://jkinhelsinki.github.io/GayOrNot/"; // 共有するURLを設定する
    const text = `ゲイ会 OR NOTで${currentImageIndex}問中${correctCount}問正解しました！`; // 共有するテキストを設定する
    const hashtags = "ゲイ会OrNot"; // 共有するハッシュタグを設定する
    window.open(`https://twitter.com/share?url=${url}&text=${text}&hashtags=${hashtags}`, '_blank');
	}
}

function reset() { // 残滓
  gayBtn.disabled = false;
  notGayBtn.disabled = false;
  result.innerHTML = "";
  nextBtn.style.display = "none";
	tweetBtn.style.display = "none";
	creditsshown.style.display = "none";
  currentImageIndex = 0;
  correctCount = 0;
  showQuestion();
  showImage(images[currentImageIndex]);
}

function checkAnswer(gend) {
	if (gend === images[currentImageIndex].gend) {
		result.innerHTML = "正解！";
		correctCount++;
	} else {
		result.innerHTML = "不正解！";
	}
	currentImageIndex++;
	if (currentImageIndex < images.length) {
		showImage(images[currentImageIndex]);
	} else {
		showResult();
	}
}

gayBtn.addEventListener("click", function() {
  checkAnswer("gay");
});

notGayBtn.addEventListener("click", function() {
  checkAnswer("not");
});

showQuestion();
showImage();
