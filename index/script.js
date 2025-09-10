const images = [
    "/assets/yacht1.jpg",
    "/assets/yacht2.jpg",
    "/assets/yacht3.jpg",
    "/assets/luxuryliner1.jpeg",
    "/assets/luxuryliner2.jpeg",
    "/assets/cargo1.webp",
    "/assets/cargo2.jpeg",
    "/assets/cargo3.jpeg",
  ];

  let curr = 0;
  const slide = document.getElementById("slide");

  function rotateImage() {
    curr = (curr + 1) % images.length;
    slide.src = images[curr];
  }

  setInterval(rotateImage, 3000);

document.addEventListener("DOMContentLoaded", function () {
  // buat responsive hamburger
  const menuHamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (menuHamburger) {
    menuHamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const spans = menuHamburger.querySelectorAll("span");
      spans.forEach((span) => span.classList.toggle("active"));
    });
  }

  // buat active links

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navigation-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const linkHref = link.getAttribute("href");

    const currentFile = currentPath.split("/").pop() || "index.html";
    const linkFile = linkHref.split("/").pop();

    if (
      currentFile === linkFile ||
      (currentFile === "" && linkFile === "index.html") ||
      (currentPath.includes("/index/") && linkFile === "index.html") ||
      (currentPath.includes("/gallery/") && linkFile === "gallery.html") ||
      (currentPath.includes("/service-page/") && linkFile === "service.html") ||
      (currentPath.includes("/about-us/") && linkFile === "about-us.html") ||
      (currentPath.includes("/subscription/") &&
        linkFile === "subscription.html")
    ) {
      link.classList.add("active");
    }
  });

  // ini gallery
  const filter = document.querySelectorAll(".filter-btn");
  const shipCard = document.querySelectorAll(".ship-card");

  filter.forEach((btn) =>
    btn.addEventListener("click", function () {
      filter.forEach((b) => b.classList.remove("active"));

      this.classList.add("active");

      const value = this.getAttribute("data-filter");

      shipCard.forEach((card) => {
        if (value === "all" || card.getAttribute("data-type") === value) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    })
  );
  // SEARch bar
  const search = document.getElementById("searchBar");

  search.addEventListener("keyup", function () {
    const searchVal = this.value.toLowerCase();

    shipCard.forEach((card) => {
      const shipName = card.querySelector("h3").textContent.toLowerCase();
      if (shipName.includes(searchVal)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


  // registration
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribeForm");
  const successPanel = document.getElementById("successPanel");
  const returnButton = document.getElementById("returnButton");
  const subscriptionLevelElement = document.getElementById("subscriptionLevel");

  function validateForm() {
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const age = document.getElementById("age");
    const subscriptionType = document.getElementById("subscriptionType");
    const termsChecked = document.getElementById("terms");

    const emailError = document.getElementById("emailError");
    const nameError = document.getElementById("nameError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");
    const ageError = document.getElementById("ageError");
    const subscriptionError = document.getElementById("subscriptionError");
    const termsError = document.getElementById("termsError");

    if (name.value.trim() === "") {
      nameError.textContent = "Please enter your full name";
      isValid = false;
    } else if (name.value.trim().length < 3) {
      nameError.textContent = "Name must be at least 3 characters long";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    if (email.value.trim() === "") {
      emailError.textContent = "Please enter your email address";
      isValid = false;
    } else if (!email.value.includes("@") || !email.value.includes(".") || !email.value.includes(".com")) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    if (password.value === "") {
      passwordError.textContent = "Please create a password";
      isValid = false;
    } else if (password.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    if (confirmPassword.value === "") {
      confirmError.textContent = "Please confirm your password";
      isValid = false;
    } else if (confirmPassword.value !== password.value){
      confirmError.textContent = "Passwords do not match";
      isValid = false;
    } else {
      confirmError.textContent = "";
    }

    if (age.value === "") {
      ageError.textContent = "Please enter your age";
      isValid = false;
    } else if (isNaN(age.value) || parseInt(age.value) < 18 || parseInt(age.value) > 60) {
      ageError.textContent =
        "You must be at least 18 years old and under 60 years old";
      isValid = false;
    } else {
      ageError.textContent = "";
    }

    if (subscriptionType.value === "") {
      subscriptionError.textContent = "Please select a subscription type";
      isValid = false;
    } else {
      subscriptionError.textContent = "";
    }

    if (!termsChecked.checked) {
      termsError.textContent = "You must agree to the Terms and Conditions";
      isValid = false;
    } else {
      termsError.textContent = "";
    }

    return isValid;
  }

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm()) {
        const subscriptionType = document.getElementById("subscriptionType");
        const selectedOption =
          subscriptionType.options[subscriptionType.selectedIndex].text;
        const subscriptionValue = selectedOption.split(" - ")[0];

        if (subscriptionLevelElement) {
          subscriptionLevelElement.textContent = subscriptionValue;
        }

        if (successPanel) {
          successPanel.classList.add("active");
        }
      }
    });
  }

  const formInputs = document.querySelectorAll(
    "#subscribeForm input, #subscribeForm select"
  );
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateForm();
    });
  });

  if (returnButton) {
    returnButton.addEventListener("click", function () {
      successPanel.classList.remove("active");
      subscribeForm.reset();

      setTimeout(function () {
        window.location.href = "/index/index.html";
      }, 300);
    });
  }
});
