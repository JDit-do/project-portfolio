"use strict";
(() => {
  // src/lib/scripts/error-filter.ts
  (function() {
    if (typeof window === "undefined") return;
    const originalError = console.error;
    console.error = function(...args) {
      const errorMessage = args.join(" ");
      if (errorMessage.includes("MetaMask") || errorMessage.includes("Failed to connect to MetaMask") || errorMessage.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") || errorMessage.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")) {
        return;
      }
      originalError.apply(console, args);
    };
    window.addEventListener("error", function(event) {
      const errorMessage = event.message || "";
      if (errorMessage.includes("MetaMask") || errorMessage.includes("Failed to connect to MetaMask") || errorMessage.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")) {
        event.preventDefault();
        return false;
      }
    });
    window.addEventListener("unhandledrejection", function(event) {
      const errorMessage = String(event.reason || "");
      if (errorMessage.includes("MetaMask") || errorMessage.includes("Failed to connect to MetaMask") || errorMessage.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")) {
        event.preventDefault();
      }
    });
  })();
})();
