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
			text: '"This is not simply a meal—it\'s an experience. The attention to detail, from the first greeting to the final course, is remarkable."',
			author: '— Priya M., Google Reviews'
		},
		{
			text: '"Best Indian dining evening we\'ve had in Auckland. Every course was polished, authentic, and beautifully executed."',
			author: '— Daniel R., TripAdvisor'
		},
		{
			text: '"The sigree specials had unbelievable depth of flavour. The ambience and service matched the quality of the food perfectly."',
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

})();
