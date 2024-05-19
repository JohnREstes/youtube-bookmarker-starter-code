(() => {
    let currentContact = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, contactId, value } = obj;  

        if (type === "NEW") {
            currentContact = contactId;
            console.log(`Current Contact ID: ${currentContact}`);
            setTimeout(newContactLoaded, 4000);
        }
    });

    const newContactLoaded = () => {
        const contactDropdownExist = document.getElementsByClassName("contact-dropdown")[0];

        if(!contactDropdownExist){
            console.log("dropdown")
            createDropdownAndButton();
        };
    }
    // Function to create and append the dropdown and submit button
    function createDropdownAndButton() {
        // Create a container div to hold the dropdown and button
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '10px'; 
        container.classList.add('contact-dropdown');
    
        // Create a dropdown select element
        const select = document.createElement('select');
        select.style.marginLeft = '10px';
        
        // Create options for the dropdown
        const options = ['First Contact', 'Second Contact', 'Third Contact'];
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText.toLowerCase().replace(' ', '_');
            option.text = optionText;
            select.appendChild(option);
        });
    
        // Create a submit button
        const button = document.createElement('button');
        button.textContent = 'Submit';
        button.classList.add('slds-button', 'slds-button_brand'); // Add Salesforce styling if needed

        // Add event listener to the button
        button.addEventListener('click', () => {
            const selectedOption = select.value;
            console.log(`Selected option: ${selectedOption}`);
            contactCandidate();
        });
    
        // Append the dropdown and button to the container
        container.appendChild(select);
        container.appendChild(button);
    
        // Find the first parent with the class 'slds-grid slds-page-header__detail-row'
        const parentElement = document.querySelector('.slds-grid.slds-page-header__detail-row');
        
        // Append the container to the parent element
        if (parentElement) {
            parentElement.appendChild(container);
        } else {
            console.error('Parent element with class "slds-grid slds-page-header__detail-row" not found.');
        }
        console.log('')
    }

    function contactCandidate(){
        // Get the link element by its attributes
        const emailLink = document.querySelector('a[data-tab-name="SendEmail"][class="tabHeader"]');
        const aElement = document.querySelector('a[lwc-1pphsnbjek5]');
        // Step 1: Find the element you want to click
        //const elementToClick = document.querySelector('/* CSS selector for the element to click */');


        if (emailLink) {
            // Simulate a click on the link
            emailLink.click();
            
        } else {
            console.log('Link not found');
        }
        if (aElement) {
            // Step 2: Create and dispatch a click event on the element
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            aElement.dispatchEvent(clickEvent);
        } else {
            console.error('Element to click not found.');
        }
    }
    window.addEventListener('load', () => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
          iframe.addEventListener('load', () => {
            chrome.runtime.sendMessage({ message: 'iframeLoaded' });
          });
        });
      });      
      
      
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}
