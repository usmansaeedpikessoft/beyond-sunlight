document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize tabs on a page
  function initializeTabs() {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return; // Exit if there's no tab list on this page

    const tabs = tabList.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function hideAllTabPanels() {
      tabPanels.forEach(panel => panel.hidden = true);
    }

    function showTab(tab) {
      const targetId = tab.getAttribute('aria-controls');
      hideAllTabPanels();

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.hidden = false;

      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');

      // Handle images if they exist
      const targetImage = tab.getAttribute('data-image');
      if (targetImage) {
        document.querySelectorAll('picture').forEach(img => img.hidden = true);
        const img = document.getElementById(targetImage);
        if (img) img.hidden = false;
      }
    }

    tabList.addEventListener('click', e => {
      const clickedTab = e.target.closest('[role="tab"]');
      if (!clickedTab) return;
      showTab(clickedTab);
    });

    tabList.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      const currentTab = document.activeElement;
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(currentTab);

      let newTab;
      if (e.key === 'ArrowLeft') {
        newTab = tabArray[currentIndex - 1] || tabArray[tabArray.length - 1];
      } else {
        newTab = tabArray[currentIndex + 1] || tabArray[0];
      }

      newTab.focus();
      showTab(newTab);
      e.preventDefault();
    });

    // Show the first tab by default
    if (tabs.length > 0) {
      showTab(tabs[0]);
    }
  }

  // Initialize tabs
  initializeTabs();
});