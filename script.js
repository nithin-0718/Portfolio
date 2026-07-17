/* ==========================================================================
   DEVELOPER PORTFOLIO SCRIPTS (script.js)
   Target: Vankudothu Nithin - AI & Full-Stack Developer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typing Animation for Hero ---
    const typingTextElement = document.getElementById('typing-text');
    const roles = ["AI Web Applications", "RAG Systems", "Full-Stack Solutions", "Intelligent Agents"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of typing
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // pause before typing next
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typingTextElement) {
        type();
    }


    // --- 2. Mobile Nav Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
            
            // Toggle hamburger animation state
            const bars = mobileToggle.querySelectorAll('.bar');
            if (mobileToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('open');
                    const bars = mobileToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }


    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in, .project-card, .skill-category-card, .timeline-item, .cert-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once triggered
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // Initial setup for cards to reuse the animation class
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        revealObserver.observe(el);
    });


    // --- 4. Simulated RAG Terminal Chatbot ---
    const terminalScreen = document.getElementById('terminal-screen');
    const userInput = document.getElementById('terminal-user-input');
    const sendBtn = document.getElementById('terminal-send-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    // Predefined RAG Knowledge Base
    const knowledgeBase = {
        help: {
            text: "Available commands in this RAG assistant: <br>• <strong>summary</strong> - Professional background summary <br>• <strong>opsmind</strong> - Details about the OpsMind AI project <br>• <strong>extensio</strong> - Details about the Extensio.ai project <br>• <strong>education</strong> - University and degrees timeline <br>• <strong>certifications</strong> - Earned industry certifications <br>• <strong>skills</strong> - Core programming & framework expertise <br>• <strong>contact</strong> - Nithin's email and phone details <br>• <strong>clear</strong> - Clear this console screen",
            source: "RAG System Guide"
        },
        summary: {
            text: "Vankudothu Nithin is a Computer Science undergraduate specializing in Full-Stack Development, Retrieval-Augmented Generation (RAG), and LLM engineering. He is passionate about constructing scalable, intelligent web systems powered by modern models (e.g., Gemini API, LangGraph) and secure backends.",
            source: "Resume Sec. 1: Summary"
        },
        opsmind: {
            text: "<strong>OpsMind AI -- SOP Agent:</strong> A full-stack RAG web platform. <br>• Built with React.js, Express, Node.js, TypeScript, and MongoDB. <br>• Integrated Google Gemini API for high-fidelity vector embeddings. <br>• Employs a sentence-aligned PDF chunking pipeline ensuring 100% retrieval accuracy. <br>• Streaming chat responses delivered live via SSE.",
            source: "Projects Sec. 1: OpsMind"
        },
        extensio: {
            text: "<strong>Extensio.ai -- AI Chrome Extension Generator:</strong> <br>• Web platform that translates natural language prompts into complete, ready-to-install Chrome Extensions (Manifest V3 support). <br>• Integrates OpenRouter API for code generation and verification. <br>• Enables Docker containerization and single-click ZIP export distributions.",
            source: "Projects Sec. 3: Extensio"
        },
        education: {
            text: "<strong>Education Background:</strong> <br>1. <strong>B.Tech in Computer Science and Engineering</strong> (2024 -- 2027)<br>   Gokaraju Rangaraju Institute of Engineering and Technology | CGPA: 8.13 <br>2. <strong>Diploma in Computer Science and Engineering</strong> (2021 -- 2024)<br>   Samskruti College of Engineering and Technology | CGPA: 9.52",
            source: "Education Section"
        },
        certifications: {
            text: "<strong>Certifications:</strong> <br>• Cloud Computing Fundamentals (IBM)<br>• ServiceNow Administration & Agentic AI Virtual Internship (ServiceNow University)<br>• Introduction to Modern AI (Cisco Networking Academy)<br>• Data Science for Engineers (NPTEL)",
            source: "Achievements Sec. 5"
        },
        skills: {
            text: "<strong>Technical Capabilities:</strong> <br>• Languages: C, C++, Java, Python, JavaScript, TypeScript, PHP <br>• Web/Backend: HTML/CSS, React, Node.js, Express, Spring Boot, REST APIs <br>• Machine Learning: NumPy, Pandas, Scikit-learn, TensorFlow, K-Means Clustering, PCA <br>• Generative AI: RAG pipelines, LLMs, LangGraph, Gemini API <br>• Infrastructure: Git/GitHub, Docker, Firebase, MySQL, PostgreSQL, MongoDB",
            source: "Skills Section"
        },
        contact: {
            text: "<strong>Contact details for Vankudothu Nithin:</strong> <br>• Phone: +91 9347368846 <br>• Email: naik41452@gmail.com <br>• LinkedIn: linkedin.com/in/nithin-naik-416103354 <br>• GitHub: github.com/nithin-0718",
            source: "Contact Details"
        }
    };

    // Keep terminal scrolled to bottom
    function scrollToBottom() {
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    // Simulate word-by-word streaming response
    function streamText(containerElement, text, citationSource) {
        const words = text.split(' ');
        let wordIdx = 0;
        containerElement.innerHTML = ""; // Clear loader placeholder
        
        const streamInterval = setInterval(() => {
            if (wordIdx < words.length) {
                containerElement.innerHTML += (wordIdx === 0 ? "" : " ") + words[wordIdx];
                wordIdx++;
                scrollToBottom();
            } else {
                clearInterval(streamInterval);
                // Append citation badge
                if (citationSource) {
                    containerElement.innerHTML += ` <span class="citation"><i class="fa-solid fa-file-invoice"></i> ${citationSource}</span>`;
                }
                scrollToBottom();
            }
        }, 35); // 35ms per word (feels realistic and smooth)
    }

    // Process a user query
    function processQuery(queryText) {
        const cleanQuery = queryText.toLowerCase().trim();
        
        if (!cleanQuery) return;

        // 1. Output the user line
        const userLine = document.createElement('div');
        userLine.className = 'terminal-line user-query';
        userLine.textContent = queryText;
        terminalScreen.appendChild(userLine);
        scrollToBottom();

        // Check for 'clear'
        if (cleanQuery === 'clear') {
            setTimeout(() => {
                terminalScreen.innerHTML = `
                    <div class="terminal-line system-output">
                        <span>Console cleared. Re-initialized local knowledge base...</span>
                    </div>
                `;
            }, 100);
            userInput.value = '';
            return;
        }

        // 2. Output the system loading state
        const loadingLine = document.createElement('div');
        loadingLine.className = 'terminal-line system-output';
        loadingLine.innerHTML = `<span class="terminal-status"><i class="fa-solid fa-spinner fa-spin"></i> Retrieving embeddings & querying knowledge base...</span>`;
        terminalScreen.appendChild(loadingLine);
        scrollToBottom();

        // 3. Match query against keywords
        let matchedKey = null;
        for (const key in knowledgeBase) {
            if (cleanQuery.includes(key) || key.includes(cleanQuery)) {
                matchedKey = key;
                break;
            }
        }

        setTimeout(() => {
            // Remove loading state
            loadingLine.remove();

            // Create AI response container
            const aiLine = document.createElement('div');
            aiLine.className = 'terminal-line ai-reply';
            terminalScreen.appendChild(aiLine);
            scrollToBottom();

            if (matchedKey) {
                const responseData = knowledgeBase[matchedKey];
                streamText(aiLine, responseData.text, responseData.source);
            } else {
                // Fallback / Unknown Command
                streamText(aiLine, "Your query did not return high-confidence vectors in the localized knowledge base. Type 'help' to see indexing boundaries.", "System RAG router");
            }
        }, 1200); // Simulate retrieval network latency
    }

    // Click handler for prompt chips
    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const queryValue = chip.getAttribute('data-query');
            processQuery(queryValue);
        });
    });

    // Enter press or click send
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = userInput.value;
                processQuery(text);
                userInput.value = '';
            }
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const text = userInput.value;
            processQuery(text);
            userInput.value = '';
        });
    }


    // --- 5. Contact Form Submissions ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const statusMsg = document.getElementById('form-status');

    if (contactForm && statusMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form data
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Simple visual state update
            statusMsg.textContent = "Connecting to mail server...";
            statusMsg.className = "form-status-msg";
            
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalButtonHTML = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

            setTimeout(() => {
                statusMsg.textContent = `Success! Thank you ${name}. Message received. (Simulated direct routing)`;
                statusMsg.className = "form-status-msg success";
                
                // Reset form fields
                contactForm.reset();
                
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML;
            }, 1500);
        });
    }
});
