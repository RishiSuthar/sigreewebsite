/**
 * Sigree Indian Cuisine — Website Scripts
 * Clean, minimal JavaScript for essential functionality
 */

(function() {
	'use strict';

	// Elements
	const header = document.querySelector('.site-header');
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('.nav a');

	// Header scroll effect
	function handleScroll() {
		if (!header) return;
		header.classList.toggle('scrolled', window.scrollY > 50);
	}

	window.addEventListener('scroll', handleScroll, { passive: true });
	handleScroll();

	// Mobile navigation
	if (navToggle && nav) {
		navToggle.addEventListener('click', function() {
			const isOpen = nav.classList.toggle('open');
			navToggle.classList.toggle('active', isOpen);
			navToggle.setAttribute('aria-expanded', isOpen);
			document.body.style.overflow = isOpen ? 'hidden' : '';
		});

		navLinks.forEach(function(link) {
			link.addEventListener('click', function() {
				nav.classList.remove('open');
				navToggle.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
				document.body.style.overflow = '';
			});
		});
	}

	// Active navigation highlighting
	const sections = document.querySelectorAll('main section[id]');
	
	function highlightNav() {
		const scrollPos = window.scrollY + 200;
		
		sections.forEach(function(section) {
			const top = section.offsetTop;
			const height = section.offsetHeight;
			const id = section.getAttribute('id');
			
			if (scrollPos >= top && scrollPos < top + height) {
				navLinks.forEach(function(link) {
					link.classList.toggle('active', link.getAttribute('href') === '#' + id);
				});
			}
		});
	}

	window.addEventListener('scroll', highlightNav, { passive: true });

	// Year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	// Hero video playlist
	const heroVideo = document.getElementById('hero-video');
	const heroVideoSources = ['assets/vid1.MP4', 'assets/vid2.MP4'];
	let heroVideoIndex = 0;

	if (heroVideo) {
		heroVideo.addEventListener('ended', function() {
			heroVideoIndex = (heroVideoIndex + 1) % heroVideoSources.length;
			heroVideo.src = heroVideoSources[heroVideoIndex];
			heroVideo.load();
			heroVideo.play().catch(function() {
				// autoplay may be blocked on some browsers; no user action required.
			});
		});
	}

	// Scroll reveal — IntersectionObserver
	var revealElements = document.querySelectorAll('[data-reveal], [data-reveal-child]');
	if (revealElements.length && 'IntersectionObserver' in window) {
		var revealObserver = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					revealObserver.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.08,
			rootMargin: '0px 0px -60px 0px'
		});

		revealElements.forEach(function(el) {
			revealObserver.observe(el);
		});
	}

	// Modals — Esc closes, keyboard focus stays inside while open and returns afterwards
	let activeModal = null;
	let focusBeforeModal = null;

	function openModal(modal, close) {
		focusBeforeModal = document.activeElement;
		activeModal = { el: modal, close: close };
		modal.classList.add('open');
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		const first = modal.querySelector('button, a[href]');
		if (first) first.focus();
	}

	function closeModal(modal) {
		if (!activeModal || activeModal.el !== modal) return;
		modal.classList.remove('open');
		modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		activeModal = null;
		if (focusBeforeModal && focusBeforeModal.focus) focusBeforeModal.focus();
	}

	document.addEventListener('keydown', function(e) {
		if (!activeModal) return;
		if (e.key === 'Escape') {
			activeModal.close();
			return;
		}
		if (e.key === 'Tab') {
			const items = activeModal.el.querySelectorAll('button, a[href]');
			if (!items.length) return;
			const first = items[0];
			const last = items[items.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			} else if (!activeModal.el.contains(document.activeElement)) {
				e.preventDefault();
				first.focus();
			}
		}
	});

	// Ad Modal — shown once per browser session
	const adModal = document.getElementById('ad-modal');
	const adModalClose = document.getElementById('ad-modal-close');
	const adModalOverlay = document.getElementById('ad-modal-overlay');
	const adNextBtn = document.getElementById('ad-next-btn');

	if (adModal) {
		const closeAdModal = function() { closeModal(adModal); };
		let adSeen = false;
		try {
			adSeen = sessionStorage.getItem('sigree-ad-seen') === '1';
		} catch (e) {
			// storage blocked (private mode etc.) — just show the ad
		}

		if (!adSeen) {
			setTimeout(function() {
				openModal(adModal, closeAdModal);
				try {
					sessionStorage.setItem('sigree-ad-seen', '1');
				} catch (e) {}
			}, 800);
		}

		if (adModalClose) adModalClose.addEventListener('click', closeAdModal);
		if (adModalOverlay) adModalOverlay.addEventListener('click', closeAdModal);
		if (adNextBtn) adNextBtn.addEventListener('click', closeAdModal);
	}

	// EatSafe Certificate Modal
	const certModal = document.getElementById('cert-modal');

	window.openCertModal = function() {
		if (certModal) openModal(certModal, window.closeCertModal);
	};

	window.closeCertModal = function() {
		if (certModal) closeModal(certModal);
	};

})();
