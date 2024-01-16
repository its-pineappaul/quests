// script.js
const questListPane = document.getElementById('quest-list-pane');
const questDetailPane = document.getElementById('quest-detail-pane');
const container = document.getElementById('container');

// Fetch quests from the JSON file
fetch('quests.json')
    .then(response => response.json())
    .then(questData => {
        questData.forEach(quest => {
            const questItem = document.createElement('div');
            questItem.classList.add('quest-item');
            questItem.textContent = quest.title;

            const statusSpan = document.createElement('span');
            statusSpan.classList.add('status', quest.status);
            statusSpan.textContent = quest.status.charAt(0).toUpperCase() + quest.status.slice(1);
            questItem.appendChild(statusSpan);

            questItem.onclick = () => showQuestDetails(quest);
            questListPane.appendChild(questItem);
        });
    })
    .catch(error => console.error('Error loading quest data:', error));

function showQuestDetails(quest) {
    let updatesHtml = '';
    if (quest.updates && quest.updates.length > 0) {
        updatesHtml = '<ul>' + quest.updates.map(update => `<li>${update}</li>`).join('') + '</ul>';
    }

    questDetailPane.innerHTML = `
        <div class="quest-detail">
            <div class="quest-title">${quest.title}</div>
            <span class="quest-status ${quest.status}">${quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}</span>
            <p>${quest.details}</p>
            ${updatesHtml}
            <img src="${quest.image}" alt="${quest.title}" style="width: 100%; height: auto;">
        </div>
    `;
    if (window.innerWidth <= 600) {
        container.classList.add('hide-list-pane');
    }
}
