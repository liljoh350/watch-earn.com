document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("login-tab");
  const signupTab = document.getElementById("signup-tab");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // Toggle between Login and Sign Up forms
  loginTab.addEventListener("click", () => {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
  });

  signupTab.addEventListener("click", () => {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
  });

  // Handle Login Form Submission
  loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
          const response = await fetch("http://127.0.0.1:5000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username: email, password }),
          });

          const result = await response.json();
          if (response.ok) {
              alert("Login successful!");
          } else {
              alert(result.error || "Login failed. Please try again.");
          }
      } catch (error) {
          console.error("Login Error:", error);
          alert("An error occurred. Please try again.");
      }
  });

  // Handle Signup Form Submission
  signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      try {
          const response = await fetch("http://127.0.0.1:5000/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });

          const result = await response.json();
          if (response.ok) {
              alert("Sign-up successful!");
          } else {
              alert(result.error || "Sign-up failed. Please try again.");
          }
      } catch (error) {
          console.error("Sign-up Error:", error);
          alert("An error occurred. Please try again.");
      }
  });
});