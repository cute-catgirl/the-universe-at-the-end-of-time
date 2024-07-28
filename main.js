const story = {
    "start": "It's the end of [[time]]",
    "time": "time, which, despite [everyone]'s best efforts, could not be stopped.",
    "everyone": "Billions of [humans] had lived on our home [planet].",
    "planet": "Earth, we called it, orbited [[a bright star]], filling the sky with unimaginable light.",
    "a bright star": "the [Sun]",
    "Sun": "A big ball of plasma - the center of our [solar system].",
    "solar system": "It had consisted of [[8 planets]].",
    "8 planets": "8 planets - [Mercury], [Venus], [Earth], [Mars], [Jupiter], [Saturn], [Uranus], and [Neptune]",
    "Mercury": "A rocky planet closest to the Sun, and the smallest in the system.",
    "Venus": "Shrouded in thick clouds of sulfuric acid, Venus was hotter even than Mercury.",
    "Earth": "The planet we called home. It had vast [oceans], diverse ecosystems, and a single [Moon|moon].",
    "Mars": "Dubbed the 'Red Planet', Mars had the tallest volcano and the deepest canyon.",
    "Jupiter": "Made of gas and the largest planet in the system, Jupiter had over 70 moons.",
    "Saturn": "Famous for its rings, it was the second-largest planet.",
    "Uranus": "Tilted on its side, Uranus had faint rings and an icy atmosphere.",
    "Neptune": "The farthest planet from the sun. It had strong winds and a deep blue color.",
    "Moon": "Earth's only natural satellite, and the first interstellar landmark we explored.",
    "humans": "While not the only species living on [Earth], we were, in many ways, the most [intelligent].",
    "oceans": "Bodies of water covering large parts of the planet, they were filled with all sorts of strange [creatures].",
    "creatures": "Fish of all shapes and sizes lived near the surface, while [[alien]] horrors lived deeper down.",
    "intelligent": "Intelligence, of course, is a human construct, observing how things [interact] in a [universe] without [meaning].",
    "meaning": "Meaning too is a human construct.",
    "universe": "The vast, mysterious [[place]] in which we lived.",
    "place": "place (if it could even be called that)",
    "alien": "unfamiliar",
    "interact": "Everything was ultimately just [tiny particles] interacting in ways we never fully understood.",
    "tiny particles": "Atoms, as we called them, were the building blocks of the [universe]."
};

const root = document.getElementById("root");

function parseText(text) {
    // Regex for double square brackets with optional custom text
    const doubleBracketRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
    // Regex for single square brackets with optional custom text
    const singleBracketRegex = /\[(.*?)(?:\|(.*?))?\]/g;

    // Replacing double square brackets with inline links
    text = text.replace(doubleBracketRegex, (match, p1, p2) => {
        const key = p1.trim();
        const displayText = p2 ? p2.trim() : key;
        if (story[key]) {
            return `<a href="javascript:void(0)" class="inline-link" data-key="${key}">${displayText}</a>`;
        } else {
            return displayText;
        }
    });

    // Replacing single square brackets with links
    text = text.replace(singleBracketRegex, (match, p1, p2) => {
        const key = p1.trim();
        const displayText = p2 ? p2.trim() : key;
        if (story[key]) {
            return `<a href="javascript:void(0)" class="expand-link" data-key="${key}">${displayText}</a>`;
        } else {
            return displayText;
        }
    });

    return text;
}

function addNode(key, parent) {
    let divToAdd = document.createElement("div");
    divToAdd.className = 'story-node';
    let textNode = document.createElement("p");
    textNode.innerHTML = parseText(story[key]);
    divToAdd.appendChild(textNode);
    parent.appendChild(divToAdd);
}

function inlineLink(key, element) {
    // Create a new span with the parsed content
    let newContent = document.createElement('span');
    newContent.innerHTML = parseText(story[key]);
    
    // Replace the link with the new content
    element.parentNode.replaceChild(newContent, element);
}

function expandLink(key, element) {
    // Convert the link to a span
    let span = document.createElement('span');
    span.className = 'clicked-link';
    span.textContent = element.textContent;
    element.parentNode.replaceChild(span, element);

    // Find the nearest parent div
    let parentDiv = span.closest('.story-node');
    if (!parentDiv) parentDiv = root;

    // Create a new div for the expanded content
    let newDiv = document.createElement('div');
    newDiv.className = 'story-node';
    newDiv.innerHTML = `<p><span class="passage-name">${key}</span>: ${parseText(story[key])}</p>`;

    // Insert the new div after the paragraph containing the clicked link
    span.closest('p').after(newDiv);
}

// Add this event listener after your other code
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('inline-link')) {
        inlineLink(event.target.dataset.key, event.target);
    } else if (event.target.classList.contains('expand-link')) {
        expandLink(event.target.dataset.key, event.target);
    }
});

// Initialize the story
addNode("start", root);