document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a:not([target="_blank"])');
    
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const destination = e.target.href;
        
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
          window.location.href = destination;
        }, 500); // This should match the transition duration in CSS
      });
    });
  });
  
  // Handle the page load
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('fade-out');
  });