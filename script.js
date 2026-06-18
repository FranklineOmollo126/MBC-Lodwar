//  HERO SLIDER
        (function() {
            const slides = document.querySelectorAll('.slide');
            const dotsContainer = document.getElementById('sliderDots');
            let currentIndex = 0;
            let intervalId = null;
            const intervalTime = 3000;

            // Create dots
            slides.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.dataset.index = idx;
                if (idx === 0) dot.classList.add('active-dot');
                dotsContainer.appendChild(dot);
            });
                const dots = dotsContainer.querySelectorAll('span');

            function goToSlide(index) {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;

                slides.forEach(s => s.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active-dot'));

                slides[index].classList.add('active');
                dots[index].classList.add('active-dot');
                currentIndex = index;
            }
                 function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            function startSlider() {
                if (intervalId) clearInterval(intervalId);
                intervalId = setInterval(nextSlide, intervalTime);
            }
         function stopSlider() {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
                // Dot clicks
            dots.forEach((dot) => {
                dot.addEventListener('click', function() {
                    const idx = parseInt(this.dataset.index, 10);
                    stopSlider();
                    goToSlide(idx);
                    startSlider();
                });
            });

            // Pause on hover/touch
            const sliderContainer = document.getElementById('heroSlider');
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
            sliderContainer.addEventListener('touchstart', stopSlider, { passive: true });
            sliderContainer.addEventListener('touchend', startSlider, { passive: true });

            // Init
            goToSlide(0);
            startSlider();

            console.log('✅ Image slider running – switches every 3 seconds.');
        })();











                
