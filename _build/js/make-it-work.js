// apply flicker animation to certain elements on the page
const flickerAnimation = _ => {
  // get all animated elements from the page in an array
  const animatedElements = [...document.querySelectorAll('[data-js-flicker]')]

  // quit function is there are no flicker elements on the page
  if (!animatedElements.length) return false

  // helper function to wrap random letters in a <span>
  const wrapRandomCharacters = (string, iterations = 1) => {
    const letters = string.split('')
    const excludedCharacters = [' ', '-', ',', ';', ':', '(', ')']
    const excludedIndexes = []

    // run the number of letters to wrap
    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length)
      const selectedLetter = letters[randomIndex]

      // check to see if we don't hit any excluded characters
      // or hit the same letters
      if (!excludedIndexes.includes(randomIndex) && !excludedCharacters.includes(selectedLetter)) {
        letters[randomIndex] = `<span class="flicker">${selectedLetter}</span>`
        excludedIndexes.push(randomIndex)
      }
    }
    return letters.join('')
  }

  // replace the plain text content in each element
  animatedElements.forEach((element) => {
    const text = element.textContent.trim()
    const count = element.dataset.jsFlicker ? parseInt(element.dataset.jsFlicker) : undefined
    element.innerHTML = wrapRandomCharacters(text, count)
  })
}

flickerAnimation()

// change colors
const colors = [...document.querySelectorAll('button')]
const signs = [...document.querySelectorAll('[class$="sign"]')]

colors.forEach(color => {
  // add click event on each button
  color.addEventListener('click', event => {
    // get the currently clicked button
    const target = event.target
    // get the current color of the current button
    const currentColor = target.getAttribute(['data-color'])

    // loop through all neon signs and hide them, except the corresponding color
    signs.forEach(sign => {
      sign.setAttribute('hidden', true)

      if (sign.getAttribute(['data-color']) === currentColor) {
        sign.removeAttribute('hidden', false)
      }
    })
  })
})
