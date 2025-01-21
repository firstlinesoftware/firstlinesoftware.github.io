const flsPageHasVideos = true;
function selectVideo(e) {
	document.querySelector('main .video figure.active').classList.remove('active');
	e.currentTarget.classList.add('active');
	let vid = e.currentTarget.dataset.video;
	document.querySelector('main .video iframe').src = 'https://www.youtube.com/embed/'+vid+'?controls=1&amp;showinfo=true&amp;start=0&amp;rel=0&amp;enablejsapi=1&amp;widgetid=1';
}