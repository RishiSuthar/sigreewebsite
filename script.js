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

	// Testimonials data
	const testimonials = [
		{
			text: '"We came for a birthday dinner and every single dish was on point. The sigree grill stuff especially. Will definitely be back."',
			author: '— Priya M., Google Reviews'
		},
		{
			text: '"Honestly the best Indian food we\'ve had in Auckland. Everything tasted fresh and the lamb chops were incredible."',
			author: '— Daniel R., TripAdvisor'
		},
		{
			text: '"The sigree specials had unreal depth of flavour. Good vibes, good food, and the staff remembered us from last time."',
			author: '— Asha K., Google Reviews'
		}
	];

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

	// Testimonials slider
	const testimonialText = document.getElementById('testimonial-text');
	const testimonialAuthor = document.getElementById('testimonial-author');
	const testimonialDots = document.querySelectorAll('.testimonial-dot');
	let currentTestimonial = 0;
	let testimonialTimer;

	function showTestimonial(index) {
		if (!testimonialText || !testimonialAuthor) return;
		
		currentTestimonial = index;
		testimonialText.textContent = testimonials[index].text;
		testimonialAuthor.textContent = testimonials[index].author;
		
		testimonialDots.forEach(function(dot, i) {
			dot.classList.toggle('active', i === index);
		});
	}

	function nextTestimonial() {
		const next = (currentTestimonial + 1) % testimonials.length;
		showTestimonial(next);
	}

	function startTestimonialTimer() {
		testimonialTimer = setInterval(nextTestimonial, 6000);
	}

	if (testimonialDots.length) {
		testimonialDots.forEach(function(dot) {
			dot.addEventListener('click', function() {
				const index = parseInt(dot.dataset.slide, 10);
				if (!isNaN(index)) {
					clearInterval(testimonialTimer);
					showTestimonial(index);
					startTestimonialTimer();
				}
			});
		});
		
		startTestimonialTimer();
	}

	// Booking form
	const bookingForm = document.getElementById('booking-form');
	const formMessage = document.getElementById('form-message');

	if (bookingForm && formMessage) {
		bookingForm.addEventListener('submit', function(e) {
			e.preventDefault();

			if (!bookingForm.checkValidity()) {
				formMessage.textContent = 'Please complete all required fields.';
				return;
			}

			const name = document.getElementById('name');
			const displayName = name && name.value.trim() ? name.value.trim().split(' ')[0] : 'Guest';
			
			formMessage.textContent = 'Thank you, ' + displayName + '. We will confirm your reservation shortly.';
			bookingForm.reset();
		});
	}

	// Year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
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

})();
