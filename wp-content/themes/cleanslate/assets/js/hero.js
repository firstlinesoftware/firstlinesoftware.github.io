let flsHeroAnimationActive = false;
let flsHeroAnimationTimeout = null;
function playHeroAnimation() {
	document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
	nextSlide();
	flsHeroAnimationTimeout = setTimeout(playHeroAnimation, 7000);
}
function animateControl() {
	for (let i of document.querySelectorAll('#control div')) i.classList.toggle('active');
	if (document.querySelector('#control div.pause').classList.contains('active')) {
		document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
		nextSlide();
		flsHeroAnimationTimeout = setTimeout(playHeroAnimation, 7000);
		}
	else clearTimeout(flsHeroAnimationTimeout);
}
function prevSlide() {
	if (flsHeroAnimationActive) return;
	flsHeroAnimationActive = true;
	const currEl = document.querySelector('.slide.hero-curr');
	const currLabel = document.querySelector('#control span.current');
	const currPreview = document.querySelector('#preview .hover.active')
	let nextEl = null;
	let testEl = currEl.previousElementSibling;
	if (testEl && testEl.matches('.slide')) nextEl = testEl;
	if (!nextEl) {
		testEl = document.querySelectorAll('section.hero .slide')[document.querySelectorAll('section.hero .slide').length - 1];
		if (testEl && testEl !== currEl) nextEl = testEl;
	}
	if (!nextEl) return;
	let nextLabel = null;
	let testLabel = currLabel.previousElementSibling;
	if (testLabel && testLabel.tagName.toLowerCase() == 'span') nextLabel = testLabel;
	if (!nextLabel) {
		testLabel = document.querySelector('#control span:last-of-type');
		if (testLabel && testLabel !== currLabel) nextLabel = testLabel;
	}
	const nextPreview = document.querySelector('#preview').lastElementChild;
	let temp = nextPreview.cloneNode(true);
	temp.classList.add('removed','backw');
	currPreview.before(temp);
	currEl.classList.remove('hero-curr');
	nextEl.classList.add('hero-curr');
	currPreview.classList.replace('active', 'prev');
	currPreview.classList.add('backw');
	currPreview.classList.remove('init');
	temp.classList.replace('removed','active');
	temp.addEventListener("animationend", e => {
		nextPreview.remove();
		for (let el of document.querySelectorAll('.prev.backw')) el.classList.remove('prev','backw');
		if (document.querySelector('#control div.pause').classList.contains('active')) {
			clearTimeout(flsHeroAnimationTimeout);
			flsHeroAnimationTimeout = setTimeout(playHeroAnimation, 7000);
			}
		for (let el of document.querySelectorAll('#preview .hover')) el.removeEventListener('click', fastForward);
		for (let el of document.querySelectorAll('#preview .hover:not(.active), #preview .hover:not(.removed)')) el.addEventListener('click',fastForward);
		flsHeroAnimationActive = false;
	});
	currLabel.classList.remove('current');
	nextLabel.classList.add('current');
}
function nextSlide() {
	if (flsHeroAnimationActive) return;
	flsHeroAnimationActive = true;
	const currEl = document.querySelector('.slide.hero-curr');
	const currLabel = document.querySelector('#control span.current');
	const currPreview = document.querySelector('#preview .hover.active')
	let nextEl = null;
	let testEl = currEl.nextElementSibling;
	if (testEl && testEl.matches('.slide')) nextEl = testEl;
	if (!nextEl) {
		testEl = document.querySelector('section.hero').firstElementChild;
		if (testEl && testEl !== currEl) nextEl = testEl;
	}
	if (!nextEl) return;
	let nextLabel = null;
	let testLabel = currLabel.nextElementSibling;
	if (testLabel && testLabel.tagName.toLowerCase() == 'span') nextLabel = testLabel;
	if (!nextLabel) {
		testLabel = document.querySelector('#control').firstElementChild;
		if (testLabel && testLabel !== currLabel) nextLabel = testLabel;
	}
	const nextPreview = currPreview.nextElementSibling;
	nextPreview.classList.add('forw');
	currEl.classList.remove('hero-curr');
	currPreview.addEventListener("animationend", e => {
		let temp = currPreview.cloneNode(true);
		currPreview.remove();
		temp.classList.remove('removed','backw','forw');
		document.querySelector('#preview .hover:last-of-type').after(temp);
		if (document.querySelector('#control div.pause').classList.contains('active')) {
			clearTimeout(flsHeroAnimationTimeout);
			flsHeroAnimationTimeout = setTimeout(playHeroAnimation, 7000);
			}
		for (let el of document.querySelectorAll('#preview .hover')) el.removeEventListener('click', fastForward);
		for (let el of document.querySelectorAll('#preview .hover:not(.active), #preview .hover:not(.removed)')) el.addEventListener('click',fastForward);
		flsHeroAnimationActive = false;
	});
	currLabel.classList.remove('current');
	currPreview.classList.replace('active','removed');
	currPreview.classList.add('forw');
	currPreview.classList.remove('init');
	nextEl.classList.add('hero-curr');
	nextPreview.classList.add('active');
	nextLabel.classList.add('current');
}
function fastForward(e) {
//	document.querySelector('main section.hero').style.setProperty('--anim-duration', '0.1s');
	let ffor = setInterval(() => {
		nextSlide();
		if (e.target.classList.contains('active')) {
			clearInterval(ffor);
		}
	}, 100);
}