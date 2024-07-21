let myVar;

function myFunction() {
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
    $('#loader').animate({ opacity: 0 }, 500, function () {
        $(this).hide();
    });
    $('#myDiv').css('opacity', '0').show().animate({ opacity: 1 }, 500);
}
(function ($) {
    $(document).ready(function () {
        new WOW().init();

        // Initially hide the navbar
        $('.navbar').hide();
        $('.back-to-top').hide();

        // Show the navbar when scrolling down 300 pixels
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.navbar').fadeIn('slow').css('display', 'flex');
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.navbar').fadeOut('slow').css('display', 'none');
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });

        // Move to another page on the navbar
        $(".navbar-nav a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                var hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 45
                }, 1000, 'easeInOutExpo', function () {
                    window.location.hash = hash;
                });

                // Change active class
                $('.navbar-nav .active').removeClass('active');
                $(this).addClass('active');
            }
        });

        // Show video youtube
        let $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });

        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', '');
        });

        // Typed text effect
        const $typedTextOutput = $('.typed-text-output');
        const typedText = $('.typed-text').text();
        const words = typedText.split(', ');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                $typedTextOutput.text(currentWord.substring(0, charIndex - 1));
                charIndex--;
            } else {
                $typedTextOutput.text(currentWord.substring(0, charIndex + 1));
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 50);
            } else {
                setTimeout(type, isDeleting ? 30 : 150);
            }
        }

        type();

        // Counter up
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });

        // Skill progress bar animation
        setTimeout(function () {
            $('.skill').waypoint(function () {
                $('.progress .progress-bar').each(function () {
                    $(this).css("width", $(this).attr("aria-valuenow") + '%');
                });
            }, { offset: '80%' });
        }, 3000);

        // Testimonial carousel
        $('.testimonial-carousel').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 5000
        });

        var $hiddenElements = $('.hidden');
    var $portfolioContainer = $('.portfolio-container');

    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('show');
                observer.unobserve(entry.target);

                // Nếu là portfolioContainer thì khởi tạo Isotope
                if ($(entry.target).is($portfolioContainer)) {
                    $portfolioContainer.isotope({
                        itemSelector: '.portfolio-item',
                        layoutMode: 'fitRows'
                    });
                }
            }
        });
    }, observerOptions);

    $hiddenElements.each(function() {
        observer.observe(this);
    });
        // Filter items on click
        $('#portfolio-flters li').on('click', function() {
            $('#portfolio-flters li').removeClass('active');
            $(this).addClass('active');
    
            var filterValue = $(this).attr('data-filter');
            $portfolioContainer.isotope({ filter: filterValue });
        });
    });

})(jQuery);