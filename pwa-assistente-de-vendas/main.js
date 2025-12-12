const INTRO_SLIDES = [
    {
        title: "Bem-vindo(a) ao Assistente de Vendas Inclusivo com IA",
        text: "Uma solução inteligente para identificar medicamentos, garantindo segurança e autonomia para idosos e pessoas com deficiência",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" 
    },
    {
        title: "Identificação por Inteligência Artificial",
        text: "Não confunda mais as caixas. Tire uma foto da embalagem e nossa IA identifica o nome, a dosagem e o laboratório do medicamento para você",
        img: "https://s2-g1.glbimg.com/VfqqrE3M28c0fuPU8-Mi1byu54Y=/0x0:1012x612/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/S/D/2aQAMGTqKHidJChSo0jg/medicamentos-comprados-na-farmacia-particular-.jpg" 
    },
    {
        title: "Leitura em Voz Alta (Audio)",
        text: "Dificuldade com letras pequenas? O aplicativo lê automaticamente as informações e alertas do remédio usando voz natural",
        img: "https://www.deco.proteste.pt/-/media/edideco/images/home/saude/medicamentos/news/2022/folhetos%20medicamentos/dp-bulasmedicamentos.jpg?rev=8daa3ce1-9404-4f91-b489-ca4610b20874&hash=A2AE070FDE867A5064B4CAFA60594AE8"
    },
    {
        title: "Acessibilidade em LIBRAS",
        text: "Pensado para a comunidade surda: conte com um tradutor virtual de LIBRAS para entender todas as informações do produto",
        img: "https://www.faculdadeide.edu.br/files/news/16465789585048-librasparaprofissionaisdesade.jpeg"
    },
    {
        title: "Segurança e Alto Contraste",
        text: "Para começar, certifique-se de estar em um local iluminado. Se precisar, ative o modo Alto Contraste para facilitar a visualização",
        img: "https://www.camara.leg.br/midias/image/2024/06/gettyimages-1311515347-768x432.jpg" 
    }
];

let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
     
     
     const state = {
            view: 'home',
            highContrast: false,
            largeText: false,
            autoRead: false,
            user: 'Visitante',
            voicesLoaded: false,
            phoneNumber: ''
        };

        const MOCK_PRODUCT = {
            name: "Losartana Potássica",
            dosage: "50 miligramas - 30 comprimidos",
            lab: "Eurofarma - Medicamento Genérico",
            price: 4.00,
            aisle: "Corredor 02",
            shelf: "Prateleira B (Altura dos Olhos)",
            section: "Seção de Hipertensão",
            warnings: ["Losartana potássica é um medicamento indicado para o tratamento da hipertensão arterial, proteção renal em pacientes diabéticos tipo 2 com proteinúria, insuficiência cardíaca e redução do risco de AVC em pacientes com hipertrofia ventricular esquerda.", "Também é indicada para proteger os rins de pacientes com diabetes tipo 2 e proteinúria (presença de proteína na urina).", "É utilizada para o tratamento da insuficiência cardíaca, geralmente em combinação com diuréticos e digitálicos, quando o uso de inibidores da ECA não é apropriado.", "Reduz o risco de acidente vascular cerebral (AVC) em pacientes com hipertrofia ventricular esquerda e hipertensão", 
                "Tenha cuidado, leia a bula, a automedicação pode colocar a sua saúde em risco. Só use medicamentos com orientação médica e/ou farmacêutica"
            ],
            image: "losartana.jpg"
        };
        
        const TEXTS = {
            home: "Para identificar o remédio, toque no botão grande no centro da tela para tirar foto. Ou toque no botão inferior para escanear ou digitar o código de barras.",
            
            barcode: "Modo de Código de Barras ativado. Por favor, vire a caixa e aponte a câmera para o código de barras ou QR Code, ou se preferir, digite o código de barras e aperte no botão de pesquisar produto logo em seguida",
            
            analyzing: "Aguarde um momento. Estamos processando a imagem",
            result: `Remédio Identificado: ${MOCK_PRODUCT.name}, ${MOCK_PRODUCT.dosage}. Laboratório: ${MOCK_PRODUCT.lab}. Preço: ${MOCK_PRODUCT.price.toFixed(2).replace('.',',')} reais. Localização: ${MOCK_PRODUCT.aisle}, ${MOCK_PRODUCT.shelf}, ${MOCK_PRODUCT.section}. Atenção: ${MOCK_PRODUCT.warnings.join('. ')}.`
        };

        
    window.onload = () => {
    lucide.createIcons();
    
    const loginScreen = document.getElementById('login-screen');
    const carousel = document.getElementById('intro-carousel');

    
    loginScreen.classList.remove('hidden'); 
    
    
    carousel.classList.add('hidden'); 

    setupSwipeGestures();

   
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('opacity-0');
        setTimeout(() => {
            splash.style.display = 'none';
            startIntro();
        }, 700);
    }, 2500);
};

function setupSwipeGestures() {
    const carousel = document.getElementById('intro-carousel');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
}

function handleSwipe() {
    const swipeThreshold = 50; 
    if (touchEndX < touchStartX - swipeThreshold) {
        nextIntro(); // Swipe Esquerda
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevIntro(); // Swipe Direita
    }
}

function startIntro() {
    const carousel = document.getElementById('intro-carousel');
    
    carousel.classList.remove('hidden');
    carousel.classList.add('flex');
    
    const dotsContainer = document.getElementById('intro-dots');
    dotsContainer.innerHTML = INTRO_SLIDES.map((_, i) => 
        `<div id="dot-${i}" class="h-2 rounded-full transition-all duration-500 ease-out bg-slate-300 w-2 opacity-50"></div>`
    ).join('');

    void carousel.offsetWidth; 
    
    carousel.classList.remove('opacity-0');

    renderSlide(0);
}

function renderSlide(index) {
    const slide = INTRO_SLIDES[index];
    const isLastSlide = index === INTRO_SLIDES.length - 1;
    const isFirstSlide = index === 0;

    document.getElementById('intro-title').innerText = slide.title;
    document.getElementById('intro-text').innerText = slide.text;
    
    
    const imgElement = document.getElementById('intro-img');
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = slide.img;
        imgElement.onload = () => imgElement.style.opacity = '0.9';
    }, 150);

    INTRO_SLIDES.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            if (i === index) {
                dot.className = "h-2 rounded-full transition-all duration-500 ease-out bg-teal-500 w-8 opacity-100 shadow-md scale-105";
            } else {
                dot.className = "h-2 rounded-full transition-all duration-500 ease-out bg-slate-300 w-2 opacity-50";
            }
        }
    });

    const navGroup = document.getElementById('nav-group');
    const startGroup = document.getElementById('start-group');
    const btnPrev = document.getElementById('btn-prev');

    if (isLastSlide) {
        
        navGroup.classList.add('opacity-0', 'pointer-events-none');
        startGroup.classList.remove('opacity-0', 'pointer-events-none');
    } else {
       
        navGroup.classList.remove('opacity-0', 'pointer-events-none');
        startGroup.classList.add('opacity-0', 'pointer-events-none');

        
        if (isFirstSlide) {
            btnPrev.innerHTML = 'Pular';
            btnPrev.classList.replace('text-teal-700', 'text-slate-400');
        } else {
            btnPrev.innerHTML = `<i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar`;
            btnPrev.classList.replace('text-slate-400', 'text-teal-700');
        }
    }
    lucide.createIcons();
}

function handlePrevAction() {
    if (currentSlideIndex === 0) {
        skipIntro();
    } else {
        prevIntro();
    }
}

function nextIntro() {
    if (currentSlideIndex < INTRO_SLIDES.length - 1) {
        currentSlideIndex++;
        renderSlide(currentSlideIndex);
    }
}

function prevIntro() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide(currentSlideIndex);
    }
}

function skipIntro() {
    finishIntro();
}

function finishIntro() {
    const carousel = document.getElementById('intro-carousel');
    const loginScreen = document.getElementById('login-screen');

    carousel.classList.add('scale-down-fade');

    requestAnimationFrame(() => {
        loginScreen.classList.remove('login-hidden-bottom');
        loginScreen.classList.add('login-visible');
    });

    setTimeout(() => {
        carousel.classList.add('hidden');
        carousel.classList.remove('flex');
    }, 400);
}

        // --- INICIALIZAÇÃO DE VOZ ---
        window.speechSynthesis.onvoiceschanged = () => { state.voicesLoaded = true; };

        // --- SISTEMA DE LOGS ---
        function log(msg, type='INFO') {
            const time = new Date().toLocaleTimeString().split(' ')[0];
            let colorClass = 'text-green-400';
            if (type === 'AWS') colorClass = 'text-orange-400';
            if (type === 'SEC') colorClass = 'text-purple-400';
            
            const line = `<div class="mb-1 animate-fade-in"><span class="text-slate-500">[${time}]</span> <span class="${colorClass} font-bold">[${type}]</span> ${msg}</div>`;
            const container = document.getElementById('system-logs');
            container.insertAdjacentHTML('beforeend', line);
            container.scrollTop = container.scrollHeight;
        }

        // --- LÓGICA DE LOGIN ---
        function directLogin(method) {
            log(`Iniciando autenticação federada via ${method}...`, "SEC");
            finishLogin("Paulo Wanderson Viga");
        }

        // --- FUNÇÃO NOVA: Redesenha a tela inicial de Login ---
function renderLoginOptions() {
    const container = document.getElementById('login-content-box');
    container.innerHTML = `
        <div id="login-step-initial" class="animate-fade-in">
            <div class="mx-auto bg-teal-50 p-4 rounded-full w-24 h-24 flex items-center justify-center border-4 border-teal-100 aws-trigger relative mb-6 cursor-help">
                <i data-lucide="shield-check" class="w-12 h-12 text-teal-700"></i>
            </div>
            <div>
                <h2 class="text-2xl font-bold text-slate-900">Acesso Seguro</h2>
                <p class="text-slate-500 text-sm mt-1">Entre para acessar o assistente</p>
            </div>
            
            <div class="space-y-3 mt-6">
                <button onclick="directLogin('Google')" class="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 flex items-center justify-center gap-3 transition active:scale-95">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="G">
                    Entrar com Google
                </button>
                
                <button onclick="directLogin('Facebook')" class="w-full py-4 bg-[#1877F2] text-white rounded-2xl font-bold hover:opacity-90 flex items-center justify-center gap-3 transition active:scale-95">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.94474914,22 L9.94474914,13.1657526 L7,13.1657526 L7,9.73256866 L9.94474914,9.73256866 L9.94474914,7.16575262 C9.94474914,4.27373936 11.6773323,2.66575262 14.2972566,2.66575262 16.8648827,2.88975262 16.8648827,2.88975262 L16.8648827,5.72775262 L15.4186998,5.72775262 C13.9979998,5.72775262 13.5547491,6.60975262 13.5547491,7.51475262 L13.5547491,9.73256866 L16.7327491,9.73256866 L16.2247491,13.1657526 L13.5547491,13.1657526 L13.5547491,22 L9.94474914,22 Z"></path></svg>
                    Entrar com Facebook
                </button>

                <button onclick="startPhoneFlow()" class="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 flex items-center justify-center gap-3 transition active:scale-95 aws-trigger relative group">
                    <i data-lucide="phone" class="w-5 h-5"></i>
                    Entrar com Celular
                </button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

    function renderLoginOptions() {
        const container = document.getElementById('login-content-box');
        container.innerHTML = `
            <div id="login-step-initial" class="animate-fade-in">
                <div class="mx-auto bg-teal-50 p-4 rounded-full w-24 h-24 flex items-center justify-center border-4 border-teal-100 aws-trigger relative mb-6 cursor-help">
                    <i data-lucide="shield-check" class="w-12 h-12 text-teal-700"></i>
                    <div class="aws-tooltip tooltip-bottom">
                        <strong>AWS WAF (Segurança):</strong><br>Firewall na borda que bloqueia ataques maliciosos e bots antes de chegarem ao sistema
                    </div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-900">Acesso Seguro</h2>
                    <p class="text-slate-500 text-sm mt-1">Entre para acessar o assistente</p>
                </div>
                
                <div class="space-y-3 mt-6">
                    <button onclick="directLogin('Google')" class="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 flex items-center justify-center gap-3 transition aws-trigger relative group">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="G">
                        Entrar com Google
                        <div class="aws-tooltip tooltip-right">
                            <strong>Amazon Cognito:</strong><br>Gerencia identidades federadas (Google/Facebook) com segurança e tokens temporários
                        </div>
                    </button>
                    
                    <button onclick="directLogin('Facebook')" class="w-full py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:opacity-90 flex items-center justify-center gap-3 transition">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.94474914,22 L9.94474914,13.1657526 L7,13.1657526 L7,9.73256866 L9.94474914,9.73256866 L9.94474914,7.16575262 C9.94474914,4.27373936 11.6773323,2.66575262 14.2972566,2.66575262 16.8648827,2.66575262 16.8648827,2.88975262 16.8648827,5.72775262 L15.4186998,5.72775262 C13.9979998,5.72775262 13.5547491,6.60975262 13.5547491,7.51475262 L13.5547491,9.73256866 L16.7327491,9.73256866 L16.2247491,13.1657526 L13.5547491,13.1657526 L13.5547491,22 L9.94474914,22 Z"></path></svg>
                        Entrar com Facebook
                    </button>

                    <button onclick="startPhoneFlow()" class="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-3 transition aws-trigger relative group">
                        <i data-lucide="phone" class="w-5 h-5"></i>
                        Entrar com Celular
                        <div class="aws-tooltip tooltip-right">
                            <strong>Amazon SNS (Segurança):</strong><br>Envia códigos SMS seguros para autenticação
                        </div>
                    </button>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

        function startPhoneFlow() {
            const container = document.getElementById('login-content-box');
            container.innerHTML = `
                <div class="animate-fade-in">
                    <div class="mx-auto bg-green-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                        <i data-lucide="smartphone" class="w-10 h-10 text-green-600"></i>
                    </div>
                    <h2 class="text-xl font-bold text-slate-800">Qual seu número?</h2>
                    <p class="text-slate-500 text-xs mb-6">Enviaremos um código SMS seguro</p>
                    <input type="tel" id="input-phone" placeholder="(XX) 99999-9999" class="w-full p-4 border-2 border-slate-300 rounded-xl text-center text-xl font-bold mb-4 focus:border-green-500 focus:outline-none">
                    <button onclick="submitPhone()" class="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg">Enviar Código</button>
                    <button onclick="renderLoginOptions()" class="mt-4 text-slate-400 text-xs underline">Voltar</button>
                </div>
            `;
            lucide.createIcons();
        }

        function submitPhone() {
            const phone = document.getElementById('input-phone').value;
            if(phone.length < 8) { alert("Digite um número válido"); return; }
            state.phoneNumber = phone;
            log(`Cognito: Recebido solicitação para ${phone}`, "SEC");
            log(`Amazon SNS: Enviando SMS com OTP para ${phone}...`, "AWS");
            
            const container = document.getElementById('login-content-box');
            container.innerHTML = `
                <div class="animate-fade-in">
                    <div class="mx-auto bg-purple-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 border-2 border-purple-100">
                        <i data-lucide="message-square-code" class="w-10 h-10 text-purple-600"></i>
                    </div>
                    <h2 class="text-xl font-bold text-slate-800">Digite o Código</h2>
                    <p class="text-slate-500 text-xs mb-6">Enviado para ${state.phoneNumber}</p>
                    <div class="flex justify-center gap-2 mb-6">
                        <input type="text" id="otp-code" placeholder="0 0 0 0 0 0" maxlength="6" class="w-4/5 p-4 border-2 border-slate-300 rounded-xl text-center text-2xl tracking-[0.5em] font-bold focus:border-purple-500 focus:outline-none bg-slate-50">
                    </div>
                    <button onclick="submitCode()" class="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg aws-trigger relative group">
                        Confirmar Acesso
                        <div class="aws-tooltip tooltip-top"><strong>AWS IAM (Segurança):</strong><br>Gera credenciais de menor privilégio para a sessão do usuário</div>
                    </button>
                </div>
            `;
            lucide.createIcons();
        }

        function submitCode() {
            const code = document.getElementById('otp-code').value;
            if(code.length < 3) { alert("Código inválido"); return; }
            log(`Cognito: Código OTP validado com sucesso`, "SEC");
            log(`IAM: Gerando credenciais temporárias para usuário.`, "SEC");
            finishLogin("Paulo Wanderson Viga");
        }

        function finishLogin(userName) {
            state.user = userName; 
            document.getElementById('user-name-display').innerText = `Olá, ${state.user}`;

            const vlibrasContainer = document.getElementById('vlibras-container');
            if (vlibrasContainer) {
                 vlibrasContainer.classList.remove('hidden');
            }

            const loginScreen = document.getElementById('login-screen');

            loginScreen.classList.add('opacity-0', 'pointer-events-none');

            setTimeout(() => {
                loginScreen.remove();
                document.getElementById('app-container').classList.remove('hidden');
                setTimeout(() => document.getElementById('app-container').classList.remove('opacity-0'), 100);
                renderView('home');
                log("Sistema: Interface carregada", "INFO");
            }, 500);
        }

        // --- RENDERIZAÇÃO DO APP ---
        function renderView(viewName) {
            state.view = viewName;
            const container = document.getElementById('main-content');
            
            if (viewName === 'home') {
                container.innerHTML = `
                    <div class="text-center space-y-6 animate-fade-in py-2">
                        <div class="space-y-2">
                            <h2 class="text-3xl font-bold text-slate-800">Identificar Remédio</h2>
                            <p class="text-slate-600 text-lg">Tire uma foto da caixa para ter informações do medicamento</p>
                        </div>
                        
                        <button onclick="document.getElementById('file-input').click()" class="w-full py-14 bg-teal-700 text-white rounded-3xl shadow-xl hover:bg-teal-800 transition transform active:scale-95 flex flex-col items-center gap-3 border-4 border-teal-500 aws-trigger relative group">
                            <i data-lucide="camera" class="w-16 h-16"></i>
                            <span class="text-3xl font-bold">Tirar Foto</span>
                        </button>
                        
                        <div class="relative group">
                            <div class="absolute inset-0 bg-slate-200 rounded-xl transform translate-y-1"></div>
                            <button onclick="renderView('barcode')" class="relative w-full py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 flex items-center justify-center gap-3 aws-trigger relative group">
                                <i data-lucide="scan-barcode" class="w-6 h-6"></i>
                                Código de Barras
                                <div class="aws-tooltip tooltip-bottom">
                                    <strong>Confiabilidade (Fallback):</strong><br>Se a IA falhar, usamos o ID do produto para buscar direto no DynamoDB
                                </div>
                            </button>
                        </div>

                        <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 text-left flex gap-3 shadow-sm mt-4 aws-trigger relative group cursor-help">
                            <i data-lucide="lightbulb" class="text-blue-700 shrink-0 mt-1"></i>
                            <div class="text-sm text-blue-900">
                                <strong>Dica:</strong> Fotos focadas do medicamento reduzem o custo de processamento
                            </div>
                            <div class="aws-tooltip tooltip-top">
                                <strong>Custo:</strong><br>O modelo "Pay-per-use" do Lambda e Rekognition cobra apenas por chamadas bem-sucedidas
                            </div>
                        </div>
                    </div>
                `;
                if(state.autoRead) speakText(TEXTS.home);
            }
            // --- NOVA IDEIA: CÓDIGO DE BARRAS ---
            else if (viewName === 'barcode') {
                container.innerHTML = `
                    <div class="space-y-6 animate-fade-in pt-4">
                        <button onclick="renderView('home')" class="text-slate-500 flex items-center gap-2 font-bold hover:text-slate-700"><i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar</button>
                        <div class="text-center space-y-4">
                            <div class="mx-auto w-24 h-24 bg-slate-100 rounded-lg border-4 border-slate-300 flex items-center justify-center"><i data-lucide="scan-line" class="w-12 h-12 text-slate-400"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Código de Barras</h2>
                            
                            <p class="text-slate-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm leading-relaxed">
                                <strong>Instrução:</strong> Vire a caixa e escaneie o código de barras ou QR Code ou se preferir digite o código de barras
                            </p>
                            
                            <input type="number" placeholder="789..." class="w-full p-4 text-center text-2xl font-bold border-2 border-slate-300 rounded-xl focus:border-teal-500 outline-none">
                            
                            <button onclick="submitBarcode()" class="w-full py-4 bg-teal-700 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-teal-800 aws-trigger relative group">
                                Pesquisar Produto
                                <div class="aws-tooltip tooltip-top"><strong>AWS Lambda + DynamoDB:</strong><br>Consulta direta ao banco de dados pelo ID (Sem IA).</div>
                            </button>
                        </div>
                    </div>`;
                if(state.autoRead) speakText(TEXTS.barcode);
            }
            else if (viewName === 'analyzing') {
                container.innerHTML = `
                    <div class="h-[50vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                        <div class="relative aws-trigger group">
                            <div class="w-32 h-32 rounded-full border-8 border-slate-200 border-t-teal-600 animate-spin"></div>
                            <i data-lucide="brain-circuit" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600 w-10 h-10 animate-pulse"></i>
                            <div class="aws-tooltip tooltip-bottom">
                                <strong>AWS Lambda + S3:</strong><br>A imagem é salva no S3, disparando uma função Lambda que processa a IA.
                            </div>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">Processando...</h2>
                            <p class="text-slate-500 mt-2 font-mono text-xs">AWS Rekognition analisando imagem...</p>
                        </div>
                    </div>
                `;
                if(state.autoRead) speakText(TEXTS.analyzing);
            }
            else if (viewName === 'result') {
                container.innerHTML = `
                    <div class="space-y-6 animate-slide-up pb-10">
                        <button onclick="renderView('home')" class="bg-slate-200 text-slate-800 py-3 px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-300 transition w-full shadow-sm">
                            <i data-lucide="arrow-left" class="w-5 h-5"></i> Nova Consulta
                        </button>
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                            <div class="bg-green-600 text-white text-center py-2 font-bold flex items-center justify-center gap-2 text-lg">
                                <i data-lucide="check-circle-2" class="w-6 h-6"></i> Identificado
                            </div>
                            <div class="h-56 bg-slate-50 flex items-center justify-center p-4 border-b">
                                <img src="${MOCK_PRODUCT.image}" class="h-full object-contain mix-blend-multiply" alt="Remédio">
                            </div>
                            <div class="p-6 space-y-6">
                                <div>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${MOCK_PRODUCT.lab}</p>
                                    <h2 class="text-3xl font-extrabold text-slate-900 leading-tight">${MOCK_PRODUCT.name}</h2>
                                    <p class="text-xl text-slate-600 font-medium">${MOCK_PRODUCT.dosage}</p>
                                </div>

                                <div class="mt-3 bg-red-50 border-l-4 border-red-600 p-3 rounded-r-lg flex items-start gap-3 shadow-sm animate-fade-in">
                                        <i data-lucide="file-warning" class="w-6 h-6 text-red-600 shrink-0 mt-0.5"></i>
                                        <div>
                                            <h4 class="text-xs font-bold text-red-700 uppercase tracking-wide">Restrição de Venda</h4>
                                            <p class="text-sm md:text-base text-red-900 font-bold uppercase leading-tight">Venda sob prescrição médica</p>
                                            <p class="text-[10px] text-red-800 mt-1 italic">Só pode ser vendido com retenção da receita</p>
                                        </div>
                                </div>


                                <div class="bg-teal-50 border-2 border-teal-100 rounded-xl p-4 text-center aws-trigger relative group">
                                    <p class="text-xs font-bold text-teal-600 uppercase mb-1">Preço Médio</p>
                                    <span class="text-5xl font-extrabold text-teal-800">R$ ${MOCK_PRODUCT.price.toFixed(2).replace('.',',')}</span>
                                    <div class="aws-tooltip tooltip-top">
                                        <strong>Amazon DynamoDB (Performance):</strong><br>Banco de dados NoSQL que retorna o preço em milissegundos
                                    </div>
                                </div>
                                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex flex-col gap-2">
                                    <div class="flex items-center gap-2 text-blue-800 font-bold uppercase text-xs">
                                        <i data-lucide="map-pin" class="w-4 h-4"></i> Localização na Loja
                                    </div>
                                    <div class="pl-6 space-y-1">
                                        <p class="text-lg font-bold text-blue-900">${MOCK_PRODUCT.aisle}</p>
                                        <p class="text-sm text-blue-700">${MOCK_PRODUCT.shelf}</p>
                                        <p class="text-xs text-blue-600 italic">${MOCK_PRODUCT.section}</p>
                                    </div>
                                </div>

                                <div class="flex gap-2">
                                    <button onclick="speakText('${TEXTS.result}')" class="flex-grow py-5 bg-teal-700 text-white rounded-xl font-bold text-xl shadow-md hover:bg-teal-800 active:scale-95 flex items-center justify-center gap-3 border-b-4 border-teal-900 active:border-b-0 active:translate-y-1 aws-trigger relative group">
                                        <i data-lucide="volume-2" class="w-8 h-8"></i> Ouvir Tudo
                                        <div class="aws-tooltip tooltip-top">
                                            <strong>Amazon Polly (Accessibility):</strong><br>Converte o texto técnico da bula em voz natural e fluida
                                        </div>
                                    </button>
                                    
                                    <button onclick="stopSpeech()" class="w-20 bg-red-100 text-red-700 rounded-xl font-bold shadow-md hover:bg-red-200 flex items-center justify-center border-b-4 border-red-200 active:border-b-0 active:translate-y-1 group relative">
                                        <i data-lucide="square" class="w-8 h-8 fill-current"></i>
                                        <div class="absolute -top-10 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition">Parar Voz</div>
                                    </button>
                                </div>

                                <div class="bg-orange-50 border-l-8 border-orange-400 p-4 rounded-r-xl">
                                    <h3 class="font-bold text-orange-800 flex gap-2 text-lg items-center mb-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i> Atenção:</h3>
                                    <ul class="list-disc pl-5 text-orange-900 font-medium space-y-1">${MOCK_PRODUCT.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                if(state.autoRead) speakText(TEXTS.result);
            }
            lucide.createIcons();
        }

        function handleFile(e) {
            if (e.target.files.length > 0) {
                renderView('analyzing');
                setTimeout(() => log("Upload S3: Enviando imagem criptografada...", "AWS"), 500);
                setTimeout(() => log("Rekognition: Analisando rótulo...", "AWS"), 1500);
                setTimeout(() => { renderView('result'); }, 3000);
            }
        }
        
        // --- FUNÇÃO DE SUBMISSÃO DO CÓDIGO DE BARRAS ---
        function submitBarcode() {
            log("DynamoDB: Buscando produto pelo ID/EAN...", "AWS");
            renderView('result');
        }

        // --- ACESSIBILIDADE E TTS ---
        function speakText(text) {
            window.speechSynthesis.cancel(); 
            setTimeout(() => {
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'pt-BR';
                u.rate = 1.0;
                const voices = window.speechSynthesis.getVoices();
                const ptVoice = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR' || v.name.includes('Google português'));
                if (ptVoice) u.voice = ptVoice;
                window.speechSynthesis.speak(u);
                log("Polly: Sintetizando áudio...", "AWS");
            }, 300);
        }

        // NOVA FUNÇÃO: Parar Áudio
        function stopSpeech() {
            window.speechSynthesis.cancel();
            log("Polly: Áudio interrompido pelo usuário", "INFO");
        }

        function toggleLargeText() {
            state.largeText = !state.largeText;
            document.documentElement.classList.toggle('text-large');
            const btn = document.getElementById('btn-font');
            if(state.largeText) { btn.innerText = "DIMINUIR LETRA"; btn.classList.add('bg-teal-100', 'border-teal-400'); }
            else { btn.innerText = "AUMENTAR LETRA"; btn.classList.remove('bg-teal-100', 'border-teal-400'); }
        }
        function toggleContrast() {
            state.highContrast = !state.highContrast;
            document.body.classList.toggle('high-contrast');
            const btn = document.getElementById('btn-contrast');
            if(state.highContrast) { btn.innerText = "COR PADRÃO"; }
            else { btn.innerText = "ALTO CONTRASTE"; }
        }
        function toggleAutoRead() {
            state.autoRead = !state.autoRead;
            const status = document.getElementById('status-autoread');
            const btn = document.getElementById('btn-autoread');
            if(state.autoRead) {
                status.innerText = "CLIQUE PARA DESATIVAR";
                status.className = "text-[9px] text-red-500 font-extrabold";
                btn.classList.add('bg-green-50', 'border-green-400');
                log("Acessibilidade: Leitor Automático ativado.", "INFO");
                speakText(TEXTS[state.view]);
            } else {
                status.innerText = "CLIQUE PARA ATIVAR";
                status.className = "text-[9px] text-green-600 font-extrabold";
                btn.classList.remove('bg-green-50', 'border-green-400');
                window.speechSynthesis.cancel();
            }
        }

        lucide.createIcons();
        window.addEventListener('beforeunload', () => {
            window.speechSynthesis.cancel();
        });