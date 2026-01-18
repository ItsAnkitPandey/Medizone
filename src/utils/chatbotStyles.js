/**
 * Initialize and manage chatbot widget styles
 * Handles responsive positioning of the Dialogflow messenger widget
 */

const MOBILE_BREAKPOINT = 769;
const CHECK_INTERVAL = 100;
const MAX_ATTEMPTS = 50; // Stop checking after 5 seconds

export const initializeChatbotStyles = () => {
  let interval;
  let attempts = 0;

  const updateStyle = () => {
    const dfMessenger = document.querySelector('df-messenger');
    if (!dfMessenger) return;

    const shadow = dfMessenger.shadowRoot;
    const widgetIcon = shadow?.getElementById('widgetIcon');
    
    if (!widgetIcon) return;

    // Apply responsive positioning
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      widgetIcon.style.bottom = '0';
    } else {
      widgetIcon.style.bottom = '50px';
    }
  };

  // Check for widget existence periodically
  interval = setInterval(() => {
    attempts++;
    const dfMessenger = document.querySelector('df-messenger');
    const shadow = dfMessenger?.shadowRoot;
    const widgetIcon = shadow?.getElementById('widgetIcon');

    if (widgetIcon) {
      updateStyle();
      clearInterval(interval);
      // Add resize listener once widget is found
      window.addEventListener('resize', updateStyle);
    } else if (attempts >= MAX_ATTEMPTS) {
      // Stop checking after max attempts
      clearInterval(interval);
      console.warn('Chatbot widget not found after maximum attempts');
    }
  }, CHECK_INTERVAL);

  // Return cleanup function
  return () => {
    if (interval) clearInterval(interval);
    window.removeEventListener('resize', updateStyle);
  };
};
