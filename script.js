class QuantumSecureGateway {
  constructor() {
    this.emailWrap = document.getElementById("email-wrap");
    this.usernameWrap = document.getElementById("username-wrap");
    this.passWrap = document.getElementById("pass-wrap");
    this.emailInp = document.getElementById("email");
    this.usernameInp = document.getElementById("username");
    this.passInp = document.getElementById("password");
    this.stabilizeBtn = document.getElementById("stabilize-btn");
    this.stopShitBtn = document.getElementById("stop-shit-btn");
    this.loginBtn = document.getElementById("login-btn");
    this.statusBox = document.getElementById("status-box");
    this.formUI = document.getElementById("form-ui");
    this.statusText = document.getElementById("status-text");
    this.jokeAudio = document.getElementById("joke-audio");
    this.alertOverlay = document.getElementById("custom-alert");
    this.alertMessage = document.getElementById("alert-message");
    this.alertClose = document.getElementById("alert-close");

    this.phase = 1;
    this.sabotageInterval = null;
    this.fieldWrappers = [this.usernameWrap, this.emailWrap, this.passWrap];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupPhaseTransition();
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.stabilizeBtn.addEventListener("click", () => this.stabilizeSystem());
    this.stopShitBtn.addEventListener("click", () => this.stopSabotage());
    this.loginBtn.addEventListener("click", () => this.handleLogin());
    this.alertClose.addEventListener("click", () => this.closeAlert());

    this.emailInp.addEventListener("focus", () => this.handleEmailFocus());
    this.passInp.addEventListener("focus", () => this.handlePasswordFocus());
    this.usernameInp.addEventListener("focus", () =>
      this.handleUsernameFocus(),
    );
  }

  handleMouseMove(e) {
    if (this.phase !== 1) return;

    this.fieldWrappers.forEach((wrap) => {
      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < 200) {
        const randomX = (Math.random() - 0.5) * 320;
        const randomY = (Math.random() - 0.5) * 220;
        wrap.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${(Math.random() - 0.5) * 8}deg)`;
        wrap.style.opacity = 0.7 + Math.random() * 0.3;
      }
    });
  }

  stabilizeSystem() {
    this.phase = 2;
    this.stabilizeBtn.style.display = "none";
    this.stopShitBtn.style.display = "block";

    this.fieldWrappers.forEach((wrap) => {
      wrap.style.transform = "translate(0, 0) rotate(0deg)";
      wrap.style.opacity = 1;
    });

    this.emailInp.disabled = false;
    this.usernameInp.disabled = false;
    this.passInp.disabled = false;
  }

  startDeleting(target) {
    clearInterval(this.sabotageInterval);
    this.sabotageInterval = setInterval(() => {
      if (target.value.length > 0) {
        target.value = target.value.substring(0, target.value.length - 1);
      } else {
        clearInterval(this.sabotageInterval);
      }
    }, 80);
  }

  handleEmailFocus() {
    if (this.phase === 2) {
      this.startDeleting(this.passInp);
      this.startDeleting(this.usernameInp);
    }
  }

  handlePasswordFocus() {
    if (this.phase === 2) {
      this.startDeleting(this.emailInp);
      this.startDeleting(this.usernameInp);
    }
  }

  handleUsernameFocus() {
    if (this.phase === 2) {
      this.startDeleting(this.emailInp);
      this.startDeleting(this.passInp);
    }
  }

  stopSabotage() {
    this.phase = 3;
    clearInterval(this.sabotageInterval);
    this.stopShitBtn.style.display = "none";
    this.loginBtn.textContent = "FINALLY LOGIN";
  }

  showAlert(message) {
    this.alertMessage.textContent = message;
    this.alertOverlay.style.display = "flex";
  }

  closeAlert() {
    this.alertOverlay.style.display = "none";
  }

  handleLogin() {
    if (this.phase < 3) {
      this.showAlert("⚠️ Please stabilize the system first!");
      return;
    }

    if (
      !this.emailInp.value ||
      !this.usernameInp.value ||
      !this.passInp.value
    ) {
      this.showAlert("❌ Access Denied: All quantum fields are required!");
      return;
    }

    this.formUI.style.display = "none";
    this.statusBox.style.display = "block";

    this.runLoginSequence();
  }

  runLoginSequence() {
    const messages = [
      "🔐 Verifying quantum encryption keys with NSA...",
      "Contacting Elon for SpaceX satellite clearance...",
      'Asking ChatGPT if your password is "vibe-checked"...',
      "👽 Syncing with Galactic Senate servers...",
      "Checking with the CEO of the Internet...",
      "⚡ Running deep-fry authentication filters...",
      "🎭 Validating April Fools credentials...",
      "Almost there... loading your premium access...",
    ];

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      this.statusText.textContent = messages[msgIndex];
      msgIndex++;

      if (msgIndex >= messages.length) {
        clearInterval(msgInterval);
        setTimeout(() => this.revealPunchline(), 1500);
      }
    }, 1200);
  }

  revealPunchline() {
    try {
      this.jokeAudio.play();
    } catch (e) {}

    this.statusBox.innerHTML = `
            <div class="punchline-container">
                <h1 style="font-size: 4rem; margin-bottom: 1rem;">🤡</h1>
                <h2 style="color: #ff006e; font-family: 'Orbitron', sans-serif; font-weight: bold; letter-spacing: 2px;">APRIL FOOLS!</h2>
                <p style="color: #666; font-size: 1.1rem; margin: 1rem 0;">
                    Your password was <strong>"123456"</strong>, wasn't it? 😄
                </p>
                <p style="color: #0066ff; font-size: 0.9rem; margin: 1.5rem 0;">
                    Built by Ahmer Shah | Premium Security™
                </p>
                <button onclick="location.reload()" class="premium-btn" style="margin-top: 1.5rem; font-size: 0.95rem;">Play Again</button>
            </div>
        `;
  }

  setupPhaseTransition() {
    setTimeout(() => {
      if (this.phase === 1) {
        this.stabilizeBtn.style.display = "block";
      }
    }, 4000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new QuantumSecureGateway();
});
