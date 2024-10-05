document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('.tab-list');
  const tabs = tabList.querySelectorAll('button');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  const images = document.querySelectorAll('picture');

  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('button');
    if (!clickedTab) return;
    
    const targetId = clickedTab.getAttribute('aria-controls');
    const targetImage = clickedTab.getAttribute('data-image');

    // Update selected state
    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', tab === clickedTab);
      tab.setAttribute('tabindex', tab === clickedTab ? '0' : '-1');
    });

    // Show selected tab panel
    tabPanels.forEach(panel => {
      panel.hidden = panel.id !== targetId;
    });

    // Show selected image
    images.forEach(img => {
      img.hidden = img.id !== targetImage;
    });
  });

  // Keyboard navigation
  tabList.addEventListener('keydown', (e) => {
    const currentTab = document.activeElement;
    let newTab;

    switch (e.key) {
      case 'ArrowLeft':
        newTab = currentTab.previousElementSibling || tabs[tabs.length - 1];
        break;
      case 'ArrowRight':
        newTab = currentTab.nextElementSibling || tabs[0];
        break;
      default:
        return;
    }

    newTab.click();
    newTab.focus();
    e.preventDefault();
  });
});