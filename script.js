$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var hearts = $(".hearts .heart");
  var bgMusic = $("#bg-music")[0]; // Get the audio element
  var toggleMusicButton = $("#toggle-music");

  // Set the initial button text to "Play Music"
  toggleMusicButton.text("Play Music");

  // Event Listeners for click and touch
  envelope.on("click touchstart", function () {
    toggleEnvelope(); // Open/close envelope on click/touch
  });

  btn_open.on("click touchstart", function () {
    openEnvelope();
  });

  btn_reset.on("click touchstart", function () {
    closeEnvelope();
  });

  // Function to toggle envelope open/close
  function toggleEnvelope() {
    if (envelope.hasClass("open")) {
      closeEnvelope();
    } else {
      openEnvelope();
    }
  }

  // Function to open the envelope
  function openEnvelope() {
    envelope.addClass("open").removeClass("close");
    envelope.attr("aria-expanded", "true"); // Update ARIA state
    triggerHearts(); // Trigger hearts animation
  }

  // Function to close the envelope
  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");
    envelope.attr("aria-expanded", "false"); // Update ARIA state
    stopHearts(); // Stop hearts animation
  }

  // Function to trigger heart animations
  function triggerHearts() {
    hearts.each(function (index) {
      var delay = index * 500; // Delay each heart animation
      $(this)
        .css({ opacity: 0, top: "100%" })
        .delay(delay)
        .animate(
          {
            opacity: 1,
            top: "-600px", // Move hearts upwards
          },
          4000,
          "linear"
        );
    });
  }

  // Function to stop heart animations
  function stopHearts() {
    hearts.stop(true, true).css({ opacity: 0, top: "100%" });
  }

  // Handle music toggle
  toggleMusicButton.on("click touchstart", function () {
    if (bgMusic.paused) {
      bgMusic.play(); // Play music if it's paused
      toggleMusicButton.text("Pause Music"); // Change button text to "Pause Music"
    } else {
      bgMusic.pause(); // Pause music if it's playing
      toggleMusicButton.text("Play Music"); // Change button text to "Play Music"
    }
  });

  // Keyboard accessibility for opening and closing
  $(document).on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { 
      e.preventDefault(); // Prevent page scrolling on spacebar press
      toggleEnvelope(); // Toggle envelope open/close
    }
  });

  // Add ARIA role for better screen reader compatibility
  envelope.attr("role", "button");
  envelope.attr("aria-expanded", "false");
  envelope.attr("tabindex", "0"); // Make envelope focusable

  // Optionally, if you want to add focus styles when focused
  envelope.on("focus", function () {
    envelope.css("outline", "3px solid #ff69b4"); // Style focus outline
  });

  envelope.on("blur", function () {
    envelope.css("outline", "none"); // Remove focus outline when not focused
  });
});
