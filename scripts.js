//ppara las encriptaciones y desencriptaciones de los mensajes
const d = document

//donde se ingresar el valor a encriptar
const $textArea = d.querySelector("#textarea-text")
const $btnEncrypt = d.querySelector("#btn-encrypt")
const $btnDecrypt = d.querySelector("#btn-decrypt")

// reultado para coipia y pegar
const $emptyContainer = d.querySelector("#empty")
const $successContainer = d.querySelector("#success")
const $textareaSuccess = d.querySelector("#textarea-success")
const $btnCopy = d.querySelector("#btn-copy")


// encriptar
$btnEncrypt.addEventListener("click", (e) => {

	if($textArea.value) {
		let userText = $textArea.value.toLowerCase().trim()
		let encryptedText = encryptText(userText)
		successOutput(encryptedText)
		scrolling()
	} else { emptyOutput() }
})

// desencriptar
$btnDecrypt.addEventListener("click", () => {

	if($textArea.value) {
		let encryptedText = $textArea.value.toLowerCase().trim()
		let decryptedText = decryptText(encryptedText)
		successOutput(decryptedText)
		scrolling()
	} else { emptyOutput() }
})

// copia
$btnCopy.addEventListener("click", () => {

	navigator.clipboard.writeText($textareaSuccess.value).then(
		() => {
			const $tooltip = d.querySelector("#tooltip-box")
			$tooltip.classList.remove("tooltip-hiden")
			animateTooltip($tooltip, 48, 64)
			const removeTooltip = setTimeout(() => { $tooltip.classList.add("tooltip-hiden") }, 2000)
		},
		() => { alert("Upsss, algo salió mal, no se ha podido copiar el texto") }
	)

	
})

// encriptar 2
const encryptText = (text) => {

	const textArr = text.split(" ")
  let encryptedWord = ""
	let encryptedFullText = ""
  const encryptedArr = []

  textArr.forEach((word) => {
    for(let i = 0; i < word.length; i++) {
      word[i] === "a" || word[i] === "á"
        ? encryptedWord += "ai"
        : word[i] === "e" || word[i] === "é"
          ? encryptedWord += "enter"
          : word[i] === "i" || word[i] === "í"
            ? encryptedWord += "imes"
            : word[i] === "o" || word[i] === "ó"
              ? encryptedWord += "ober"
              : word[i] === "u" || word[i] === "ú"
                ? encryptedWord += "ufat"
                : encryptedWord += word[i]
    }
    encryptedArr.push(encryptedWord)
    encryptedWord = ""
  })

  encryptedFullText = encryptedArr.join(" ")
  return encryptedFullText
}

//desecncriptar
const decryptText = (text) => {

	let decryptedText = text.replaceAll("ai", "a").replaceAll("enter", "e").replaceAll("imes", "i").replaceAll("ober", "o").replaceAll("ufat", "u")

	return decryptedText
}

// mensaje ecriptado
const successOutput = (outputText) => {
	$textareaSuccess.value = outputText
	$textareaSuccess.innerHTML = outputText
	$emptyContainer.classList.remove("is-visible")
	$successContainer.classList.add("is-visible")
}

const emptyOutput = () => {
	$successContainer.classList.remove("is-visible")
	$emptyContainer.classList.add("is-visible")
}

const animateTooltip = (el, initPX, endPX) => {
	el.style.transform = `TranslateY(-${endPX}px)`
	const translateDown = el.animate([
		{transform: `TranslateY(-${initPX}px)`},
		{transform: `TranslateY(-${endPX}px)`},
	],{
		easing: "ease-in-out",
		iterations: 1,
		duration: 300
	})
	return translateDown.finished
}

const scrolling = () => {

	let userNavigator = navigator.userAgent

	if(userNavigator.match(/Android/i) || userNavigator.match(/webOS/i) || userNavigator.match(/iPhone/i) || userNavigator.match(/iPad/i) || userNavigator.match(/iPod/i) || userNavigator.match(/BlackBerry/i) || userNavigator.match(/Windows Phone/i)) {
		const $outputFrame = d.querySelector("#output-frame")
		let coords = $outputFrame.getBoundingClientRect()
		window.scrollTo({
			top: coords.top,
			behavior: "smooth"
		})
	}
}
