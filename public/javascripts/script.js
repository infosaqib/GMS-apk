//Tab Content effect
document.addEventListener('DOMContentLoaded', function () {
  let tabs = document.querySelectorAll('.tab');
  let contents = document.querySelectorAll('.tab-content');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      let targetId = tab.id.replace('Tab', 'Content');

      // Hide all content divs
      contents.forEach(function (content) {
        content.classList.add('hidden');
      });

      // Remove active class from all tabs
      tabs.forEach(function (tab) {
        tab.classList.remove('bg-white', 'text-blue-500');
      });

      // Show the target content
      document.getElementById(targetId).classList.remove('hidden');

      // Add active class to the clicked tab
      tab.classList.add('bg-white', 'text-blue-500');
    });
  });
});