const listItems = document.querySelectorAll(".course-content li");
const videoPlayer = document.getElementById("mainVideo");
const sourceTag = videoPlayer.querySelector("source");
const lectureBox = document.getElementById("lectureText");
const lectureScroll = lectureBox.querySelector(".lecture-scroll");
const vidwrap = document.getElementById("vid-wrap");
const noteee = document.querySelector(".noteee");

listItems.forEach(item => {
  item.addEventListener("click", () => {
    listItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const type = item.getAttribute("data-type");
    const src = item.getAttribute("data-src");

    if (type === "video") {
      // Tắt nội dung lecture
      lectureBox.classList.add("hidden");
      // Hiện video và phát
      videoPlayer.classList.remove("hidden");
      vidwrap.classList.remove("hidden");
      sourceTag.setAttribute("src", src);
      videoPlayer.load();
      videoPlayer.play();
    } else if (type === "lecture") {
      // Tắt video hoàn toàn
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      vidwrap.classList.add("hidden");
      videoPlayer.classList.add("hidden");

      // Ẩn hết nội dung lecture hiện tại
      const lectures = lectureScroll.querySelectorAll(".lecture-content");
      lectures.forEach(l => l.style.display = "none");

      // Hiện đúng nội dung theo id
      const targetLecture = lectureScroll.querySelector(`.lecture-content[data-id="${src}"]`);
      if (targetLecture) {
        lectureBox.classList.remove("hidden");
        targetLecture.style.display = "block";
      }
    }
    const note = item.getAttribute("data-note");
      const notess = noteee.querySelectorAll(".note-content");
      notess.forEach(l => l.style.display = "none");
      const notes = noteee.querySelector(`.note-content[data-id="${note}"]`);
      if(notes){
        noteee.classList.remove("hidden");
        notes.style.display = "block";
      }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const firstItem = listItems[0];
  if (firstItem) {
    firstItem.click(); // Kích hoạt như thể người dùng click
  }
});
const lectures = document.querySelectorAll(".lectures");
const check = document.querySelectorAll(".checkk")
const progressCircle = document.querySelector('.progress');
const progressPopup = document.getElementById("progress-popup");
const progressBtn = document.getElementById("progress-button");
const radius = 15;
const circumference = 2 * Math.PI * radius;
const total = lectures.length;
var done = 0;
function updateProgress() {
  done = document.querySelectorAll(".checkk.done").length;
  progressCircle.style.strokeDasharray = `${circumference}`;
  const offset = circumference - done / total * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

check.forEach((lec) => {
  lec.addEventListener("click", () => {
    lec.classList.toggle("done");
    const icon = lec.querySelector("i");
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");
    updateProgress();
    progressPopup.textContent = `${done} of ${total} complete.`;
  });
});

progressBtn.addEventListener("click", () => {
  progressPopup.textContent = `${done} of ${total} complete.`;
  progressPopup.style.display =
    progressPopup.style.display === "block" ? "none" : "block";
});

const ratingBtn = document.getElementById("rating-button");
const ratingPopup = document.getElementById("rating-popup");
const stars = document.querySelectorAll("#stars i");
const saveRating = document.getElementById("save-rating");
const thankyouMsg = document.getElementById("rating-thankyou");

let selectedRating = 0;
let hoveredRating = 0;

ratingBtn.addEventListener("click", () => {
  ratingPopup.classList.toggle("hidden");
});

function updateStars(tempRating = selectedRating) {
  stars.forEach((star, i) => {
    if (i < tempRating) {
      star.classList.remove("fa-regular");
      star.classList.add("fa-solid");
      star.style.color = "#ffa033";
    } else {
      star.classList.add("fa-regular");
      star.classList.remove("fa-solid");
      star.style.color = "#ccc";
    }
  });

  const commentBox = document.getElementById("rating-comment");
  const saveBtn = document.getElementById("save-rating");

  const enable = tempRating > 0;
  commentBox.disabled = !enable;
  saveBtn.disabled = !enable;
}

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    updateStars();
  });

  star.addEventListener("mouseover", () => {
    hoveredRating = index + 1;
    updateStars(hoveredRating);
  });

  star.addEventListener("mouseleave", () => {
    updateStars();
  });
});

saveRating.addEventListener("click", () => {
  ratingPopup.classList.add("hidden");
  ratingBtn.style.display = "none";
  thankyouMsg.classList.remove("hidden");
});
document.addEventListener("click", function (event) {
  const isClickInside = ratingPopup.contains(event.target) || ratingBtn.contains(event.target);
  if (!isClickInside) {
    ratingPopup.classList.add("hidden");
  }
});