
const shuffleArray = (array) => {
    const shuffledanswers = [...array]; // Create a copy of the array
    for (let i = shuffledanswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledanswers[i], shuffledanswers[j]] = [shuffledanswers[j], shuffledanswers[i]]; // Swap elements
    }
    return shuffledanswers; // Update the state with the shuffled array
};








export {shuffleArray}