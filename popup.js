document.addEventListener('DOMContentLoaded', function() {
    const contactSelect = document.getElementById('contactSelect');
    const smsContentField = document.getElementById('smsContent');
    const emailContentField = document.getElementById('emailContent');
    const removeOldTaskCheckbox = document.getElementById('removeOldTask');
    const createNewTaskCheckbox = document.getElementById('createNewTask');
    const promptForPhoneCallCheckbox = document.getElementById('promptForPhoneCall');
    const overlay = document.getElementById('overlay');

    // Function to prepopulate form fields based on selected contact
    function prepopulateFields(selectedContact) {
        // Retrieve data from chrome.storage
        chrome.storage.sync.get(selectedContact, function(data) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            // Update form fields with retrieved data
            smsContentField.value = data[selectedContact]?.smsContent || '';
            emailContentField.value = data[selectedContact]?.emailContent || '';
            removeOldTaskCheckbox.checked = data[selectedContact]?.removeOldTask || false;
            createNewTaskCheckbox.checked = data[selectedContact]?.createNewTask || false;
            promptForPhoneCallCheckbox.checked = data[selectedContact]?.promptForPhoneCall || false;

            // Hide/show checkboxes and labels based on selected contact
            switch (selectedContact) {
                case 'first':
                    removeOldTaskCheckbox.parentElement.classList.add('hidden');
                    createNewTaskCheckbox.parentElement.classList.remove('hidden');
                    break;
                case 'second':
                    removeOldTaskCheckbox.parentElement.classList.remove('hidden');
                    createNewTaskCheckbox.parentElement.classList.remove('hidden');
                    break;
                case 'third':
                    removeOldTaskCheckbox.parentElement.classList.remove('hidden');
                    createNewTaskCheckbox.parentElement.classList.add('hidden');
                    break;
                default:
                    break;
            }
        });
    }

    // Prepopulate fields when the page loads
    prepopulateFields(contactSelect.value);

    // Add event listener to the dropdown to update fields when the selection changes
    contactSelect.addEventListener('change', function() {
        prepopulateFields(contactSelect.value);
    });

    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the selected contact from the dropdown
        const selectedContact = contactSelect.value;

        // Get the content of SMS
        const smsContent = smsContentField.value;

        // Get the content of Email
        const emailContent = emailContentField.value;

        // Get the state of checkboxes
        const removeOldTask = removeOldTaskCheckbox.checked;
        const createNewTask = createNewTaskCheckbox.checked;
        const promptForPhoneCall = promptForPhoneCallCheckbox.checked;

        // Create an object to store the data based on the selected contact
        let data = {};
        switch (selectedContact) {
            case 'first':
                data = {
                    smsContent: smsContent,
                    emailContent: emailContent,
                    removeOldTask: removeOldTask,
                    createNewTask: createNewTask,
                    promptForPhoneCall: promptForPhoneCall
                };
                break;
            case 'second':
                data = {
                    smsContent: smsContent,
                    emailContent: emailContent,
                    removeOldTask: removeOldTask,
                    createNewTask: createNewTask,
                    promptForPhoneCall: promptForPhoneCall
                };
                break;
            case 'third':
                data = {
                    smsContent: smsContent,
                    emailContent: emailContent,
                    createNewTask: createNewTask,
                    promptForPhoneCall: promptForPhoneCall
                };
                break;
            default:
                break;
        }

        // Save the data to chrome.storage
        chrome.storage.sync.set({ [selectedContact]: data }, function() {
            console.log(`Data saved for ${selectedContact} to chrome.storage`);

            // Show the overlay
            overlay.style.display = 'block';

            // Hide the overlay after 1 second
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 1000);
        });
    });
});
