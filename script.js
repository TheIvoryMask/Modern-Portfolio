const blob = document.getElementById('blob');

window.onpointermove = event => {
    const {clientX, clientY} = event; 


    blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, {duration: 3000, fill: 'forwards'});

}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      let iterations = 0;
      
      const interval = setInterval(() => {
        target.innerText = target.innerText.split("")
          .map((letter, index) => {
            if(index < iterations) {
              return target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("");
          
        if (iterations >= target.dataset.value.length) {
          clearInterval(interval);
        }

        iterations += 1 / 2;
      }, 30);
    }
  });
}, {
  threshold: 0.1 
});


const scramble = document.querySelectorAll('.scramble');

scramble.forEach((element) => {
    observer.observe(element);
});

// NAV BAR

const nav = document.querySelector("nav");
let stickyPoint = 0;

function updateStickyPoint() {
    stickyPoint = nav.offsetTop;
}

window.addEventListener("load", updateStickyPoint);
window.addEventListener("resize", updateStickyPoint);

window.addEventListener("scroll", () => {
    if (window.scrollY >= stickyPoint) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});


// CARD STACK

const cards = document.querySelectorAll(".project-card");

let currentIndex = 0;

function updateCards() {

    cards.forEach(card => {
        card.classList.remove("previous", "active", "next", "hidden");
    });

    const active = currentIndex;
    const next = (currentIndex + 1) % cards.length;
    const previous = (currentIndex - 1 + cards.length) % cards.length;

    cards.forEach(card => {
        card.classList.add("hidden");
    });

    cards[previous].classList.remove("hidden");
    cards[previous].classList.add("previous");

    cards[active].classList.remove("hidden");
    cards[active].classList.add("active");

    cards[next].classList.remove("hidden");
    cards[next].classList.add("next");
}

updateCards();


const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
});
