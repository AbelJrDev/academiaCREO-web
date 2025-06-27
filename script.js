// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Chatbot Toggle
const chatbotBtn = document.querySelector('.chatbot-btn');
const chatbotBox = document.querySelector('.chatbot-box');
const closeChat = document.querySelector('.close-chat');

chatbotBtn.addEventListener('click', () => {
    chatbotBox.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatbotBox.classList.remove('active');
});

// Chatbot Functionality
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.chat-input button');
const quickQuestions = document.querySelectorAll('.quick-question');

// Bot responses
const botResponses = {
    "hola": "¡Hola! 😊 ¿En qué puedo ayudarte hoy?",
    "horarios": "Nuestros horarios son de lunes a viernes de X:00 PM a X:00 PM y sábado y domingo de X:00 AM a X:00 PM. También ofrecemos horarios personalizados según tu disponibilidad.",
    "precios": "Tenemos diferentes planes: Ciclo de Repaso (S/XXX), Ciclo de Verano (S/XXX) y Ciclo Especial: Ingreso Mundo Mejor (S/XXX). ¿Te gustaría saber más detalles de cada plan?",
    "inscripcion": "Para inscribirte puedes visitar nuestra sede en Jr. 9 de Octubre Mz G2 Lt 15, Miraflores Alto, Chimbote, o enviarnos un WhatsApp al +51 942 961 962. También puedes llenar el formulario de contacto en nuestra página.",
    "pagos": "Aceptamos transferencias bancarias, Yape/Plin y efectivo. ¿Necesitas información sobre algún método en particular?",
    "gracias": "¡De nada! 😊 Si tienes más preguntas, no dudes en consultarme.",
    "default": "Si deseas más información, te recomiendo comunicarte directamente con nosotros por WhatsApp: https://wa.me/942961962 o llamar al (XX) XXX-XXXX."
};

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Bot response function
function botResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenas')) {
        addMessage(botResponses["hola"]);
    } 
    else if (message.includes('horario') || message.includes('horarios') || message.includes('hora')) {
        addMessage(botResponses["horarios"]);
    } 
    else if (message.includes('precio') || message.includes('cuesta') || message.includes('costo') || message.includes('pago')) {
        addMessage(botResponses["precios"]);
    } 
    else if (message.includes('inscrib') || message.includes('matricul') || message.includes('registrar')) {
        addMessage(botResponses["inscripcion"]);
    }
    else if (message.includes('gracias') || message.includes('agradezco')) {
        addMessage(botResponses["gracias"]);
    }
    else {
        addMessage(botResponses["default"]);
    }
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== '') {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate bot typing
        setTimeout(() => {
            botResponse(message);
        }, 1000);
    }
}

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick questions
quickQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const text = question.getAttribute('data-question');
        addMessage(text, true);
        
        setTimeout(() => {
            botResponse(text);
        }, 1000);
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo muy pronto.');
    contactForm.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});
