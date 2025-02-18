function toggleAccordion(e) {
	let item = e.currentTarget.parentNode;
	let parent = item.parentNode;
	if (item.classList.contains('active')) {
		item.classList.remove('active');
		return;
	}
	for (let el of parent.children) {
		if (el == item) el.classList.add('active');
		else el.classList.remove('active');
	}
}
function toggleTop(e) {
	document.querySelector('header.main').classList.toggle('mobopen');
}
function toggleBottom(e) {
	if (window.matchMedia("(min-width: 1240px)").matches) return;
	e.preventDefault();
	let el = e.currentTarget.parentNode;
	if (el.classList.contains('opened')) {
		el.classList.remove('opened');
		return;
	}
	for (let li of document.querySelectorAll('footer.main .footer-nav > ul > li')) li.classList.remove('opened');
	el.classList.add('opened');
}
function openItem(e) {
	if (window.matchMedia("(min-width: 1240px)").matches) return;
	e.preventDefault();
	e.currentTarget.parentNode.classList.add("itemopen");
	document.querySelector('header.main').classList.add("itemopen");
	document.querySelector('header.main .header-logo span').addEventListener('click', closeItem);
}
function closeItem(e) {
	document.querySelector('header.main').classList.remove("itemopen");
	document.querySelector('header.main li.itemopen').classList.remove("itemopen");
	for (let el of document.querySelectorAll('header.main .header-nav #menu-top-menu > li.menu-item-has-children > a')) el.addEventListener('click', openItem);
}
function initTheme() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(e.currentTarget.getAttribute('href')).scrollIntoView({'behavior':'smooth'});
    });
});
	document.querySelector('header.main .header-toggle').addEventListener('click', toggleTop);
	for (let el of document.querySelectorAll('header.main .header-nav #menu-top-menu > li.menu-item-has-children > a')) el.addEventListener('click', openItem);
//	for (let el of document.querySelectorAll('footer.main .footer-nav > ul > li > a')) el.addEventListener('click', toggleBottom);
	for (let el of document.querySelectorAll('main .accordion .acc-header')) el.addEventListener('click', toggleAccordion);
	if (typeof flsHeroAnimationTimeout != "undefined") {
		flsHeroAnimationTimeout = setTimeout(playHeroAnimation, 7000);
		for (let el of document.querySelectorAll('#preview .hover:not(.active), #preview .hover:not(.removed)')) el.addEventListener('click',fastForward);
		for (let el of document.querySelectorAll('#control .play, #control .pause')) el.addEventListener('click',animateControl);
		document.querySelector('#control svg.left').addEventListener('click', () => {
			document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
			prevSlide();
		});
		document.querySelector('#control svg.right').addEventListener('click', () => {
			document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
			nextSlide();
		});
	}
	if (typeof flsHomeAnimationTimeout != "undefined") {
		flsHomeAnimationTimeout = setTimeout(playHeroAnimation, 7000);
		for (let el of document.querySelectorAll('#control .play, #control .pause')) el.addEventListener('click',animateControl);
		document.querySelector('#control svg.left').addEventListener('click', () => {
			document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
			prevSlide();
		});
		document.querySelector('#control svg.right').addEventListener('click', () => {
			document.querySelector('main section.hero').style.setProperty('--anim-duration', '2s');
			nextSlide();
		});
	}
	if (typeof flsIndAnimationTimeout != "undefined") {
		for (let el of document.querySelectorAll('main .industries .icons div')) el.addEventListener('click',(e) => selectInd(e.currentTarget.dataset.counter));
		flsIndAnimationTimeout = setTimeout(() => {playIndAnimation(1);}, 7000);
		}
	if (typeof flsPageHasInsights != "undefined") {
		console.log("Const is there, adding triggers.")
		for (let el of document.querySelectorAll('main .insights .control svg')) el.addEventListener('click', scrollInsights);
		for (let el of document.querySelectorAll('main .insights .item')) el.addEventListener('click', clickInsight);
		for (let el of document.querySelectorAll('main .insights .item')) el.addEventListener('mouseenter', insightHover);
		insightObserver();
	}
	if (typeof flsPageHasCustomers != "undefined") {
		for (let el of document.querySelectorAll('main .customers .control svg')) el.addEventListener('click', scrollCustomers);
		for (let el of document.querySelectorAll('main .customers .citem')) el.addEventListener('mouseenter', customerHover);
		customerObserver();
	}
	if (typeof flsPageHasVideos != "undefined") {
		for (let el of document.querySelectorAll('main .video figure')) el.addEventListener('click', selectVideo);
	}
	if (typeof flsPageHasCounters != "undefined") {
		counterObserver();
	}
	if (typeof flsHomePage != "undefined") {
		for (let el of document.querySelectorAll('main .video figure')) el.addEventListener('click', selectVideo);
		counterObserver();
		scrollerObserver();
	}
//	let cb = new Date().toLocaleDateString("de-DE");
//	window.initFlsChat("https://flschat.eastus.cloudapp.azure.com/chat.html?cb="+cb);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => initTheme());
} else {
	initTheme();
}
