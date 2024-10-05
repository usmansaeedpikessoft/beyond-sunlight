document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('[role="tablist"]');
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  const videos = document.querySelectorAll('.video-container');

  function hideAllTabPanels() {
    tabPanels.forEach(panel => panel.hidden = true);
  }

  function hideAllVideos() {
    videos.forEach(video => {
      video.hidden = true;
      video.querySelector('video').pause();
    });
  }

  function showTab(tab) {
    const targetId = tab.getAttribute('aria-controls');
    const targetVideo = tab.getAttribute('data-video');

    hideAllTabPanels();
    hideAllVideos();

    document.getElementById(targetId).hidden = false;
    document.getElementById(targetVideo).hidden = false;

    tabs.forEach(t => t.setAttribute('aria-selected', false));
    tab.setAttribute('aria-selected', true);
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
  showTab(tabs[0]);
});