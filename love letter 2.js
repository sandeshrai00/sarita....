$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  // Event Listeners for click and touch
  envelope.on("click touchstart", function () {
    open();
  });
  btn_open.on("click touchstart", function () {
    open();
  });
  btn_reset.on("click touchstart", function () {
    close();
  });

  // Add ARIA for accessibility
  function open() {
    envelope.addClass("open").removeClass("close");
    envelope.attr("aria-expanded", "true"); // Update ARIA state
  }

  function close() {
    envelope.addClass("close").removeClass("open");
    envelope.attr("aria-expanded", "false"); // Update ARIA state
  }
});
