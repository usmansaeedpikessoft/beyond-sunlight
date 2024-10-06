document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    
    if (bgMusic) {
      // Function to play music
      const playMusic = () => {
        bgMusic.play().catch(error => {
          console.log('Failed to play music:', error);
        });
      };

      // Attempt to play music immediately
      playMusic();

      // If autoplay is prevented, add a click listener to the whole document
      document.addEventListener('click', playMusic, { once: true });

      // Stop music when navigating away from the page
      window.addEventListener('beforeunload', () => {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      });
    }
  });