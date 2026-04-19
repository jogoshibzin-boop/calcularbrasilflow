/* ===================================================================
 * Calcular Flow Brasil - Script Principal
 * Calculadora informativa de pedágios
 * =================================================================== */

// ============= Banco de dados simulado de pedágios =============
// OBS: Valores são APROXIMADOS e baseados em tabelas públicas
// O usuário DEVE verificar valores oficiais nas concessionárias

const TOLL_DATABASE = {
    'sao-paulo-rio': {
        origem: 'São Paulo',
        destino: 'Rio de Janeiro',
        distancia: 430,
        tempo: 5.5,
        pedagios: [
            { nome: 'Praça de Jacareí - Via Dutra', km: 160, valor: 20.80 },
            { nome: 'Praça de Moreira César - Via Dutra', km: 100, valor: 17.50 },
            { nome: 'Praça de Itatiaia - Via Dutra', km: 318, valor: 14.20 },
            { nome: 'Praça de Viúva Graça - Via Dutra', km: 370, valor: 16.90 }
        ]
    },
    'sao-paulo-belo-horizonte': {
        origem: 'São Paulo',
        destino: 'Belo Horizonte',
        distancia: 586,
        tempo: 7.2,
        pedagios: [
            { nome: 'Praça de Jundiaí - Anhanguera', km: 60, valor: 8.40 },
            { nome: 'Praça de Itatiba', km: 90, valor: 4.10 },
            { nome: 'Praça de Limeira - Bandeirantes', km: 152, valor: 13.20 },
            { nome: 'Praça de Oliveira - Fernão Dias', km: 500, valor: 9.80 }
        ]
    },
    'sao-paulo-curitiba': {
        origem: 'São Paulo',
        destino: 'Curitiba',
        distancia: 408,
        tempo: 5.1,
        pedagios: [
            { nome: 'Praça Régis Bittencourt - Taboão', km: 15, valor: 7.30 },
            { nome: 'Praça de Miracatu', km: 176, valor: 13.50 },
            { nome: 'Praça de Registro', km: 217, valor: 13.50 },
            { nome: 'Praça de Barra do Turvo', km: 300, valor: 13.50 }
        ]
    },
    'rio-belo-horizonte': {
        origem: 'Rio de Janeiro',
        destino: 'Belo Horizonte',
        distancia: 440,
        tempo: 6.5,
        pedagios: [
            { nome: 'Praça de Três Rios - BR-040', km: 113, valor: 11.80 },
            { nome: 'Praça de Juiz de Fora', km: 180, valor: 10.60 },
            { nome: 'Praça de Simão Pereira', km: 225, valor: 10.90 },
            { nome: 'Praça de Ressaquinha', km: 380, valor: 10.60 }
        ]
    },
    'curitiba-florianopolis': {
        origem: 'Curitiba',
        destino: 'Florianópolis',
        distancia: 300,
        tempo: 4.0,
        pedagios: [
            { nome: 'Praça de Guaratuba - BR-376', km: 60, valor: 17.20 },
            { nome: 'Praça de Joinville - BR-101', km: 135, valor: 14.80 },
            { nome: 'Praça de Itapema', km: 218, valor: 15.10 }
        ]
    },
    'sao-paulo-brasilia': {
        origem: 'São Paulo',
        destino: 'Brasília',
        distancia: 1020,
        tempo: 12.5,
        pedagios: [
            { nome: 'Praça de Jundiaí', km: 60, valor: 8.40 },
            { nome: 'Praça de Campinas', km: 100, valor: 4.30 },
            { nome: 'Praça de Mogi Mirim', km: 160, valor: 9.50 },
            { nome: 'Praça de Ribeirão Preto', km: 320, valor: 7.80 },
            { nome: 'Praça de Uberaba - MG', km: 700, valor: 10.20 },
            { nome: 'Praça de Uberlândia - MG', km: 820, valor: 11.40 }
        ]
    },
    'porto-alegre-florianopolis': {
        origem: 'Porto Alegre',
        destino: 'Florianópolis',
        distancia: 465,
        tempo: 5.8,
        pedagios: [
            { nome: 'Praça de Osório - BR-290', km: 90, valor: 8.90 },
            { nome: 'Praça de Santo Antônio', km: 170, valor: 9.20 },
            { nome: 'Praça de Araranguá', km: 260, valor: 12.40 },
            { nome: 'Praça de Tubarão', km: 330, valor: 13.10 }
        ]
    },
    'rio-vitoria': {
        origem: 'Rio de Janeiro',
        destino: 'Vitória',
        distancia: 520,
        tempo: 7.0,
        pedagios: [
            { nome: 'Praça de Casimiro de Abreu', km: 120, valor: 15.40 },
            { nome: 'Praça de Rio Bonito', km: 68, valor: 12.80 },
            { nome: 'Praça de Campos', km: 290, valor: 13.60 },
            { nome: 'Praça de Guarapari - ES', km: 460, valor: 9.50 }
        ]
    }
};

// Multiplicadores por categoria de veículo
const VEHICLE_MULTIPLIERS = {
    'carro': 1,
    'moto': 0.5,
    'caminhao': 2,
    'onibus': 2
};

// Consumo médio por tipo de veículo (km/litro)
const VEHICLE_CONSUMPTION = {
    'carro': 11,
    'moto': 28,
    'caminhao': 4,
    'onibus': 3.5
};

// Preço médio combustível (referência 2026)
const FUEL_PRICE = 6.15;

// ============= Helpers =============
function formatMoney(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function formatTime(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}min`;
}

function normalize(str) {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

function findRoute(origem, destino) {
    const key = `${normalize(origem)}-${normalize(destino)}`;
    const reverseKey = `${normalize(destino)}-${normalize(origem)}`;
    return TOLL_DATABASE[key] || TOLL_DATABASE[reverseKey] || null;
}

// ============= Calculadora =============
let selectedVehicle = 'carro';

function initCalculator() {
    const form = document.getElementById('calc-form');
    if (!form) return;

    // Vehicle selection
    document.querySelectorAll('.vehicle-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.vehicle-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedVehicle = opt.dataset.vehicle;
        });
    });

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateRoute();
    });
}

function calculateRoute() {
    const origem = document.getElementById('origem').value.trim();
    const destino = document.getElementById('destino').value.trim();
    const resultCard = document.getElementById('result-card');

    if (!origem || !destino) {
        alert('Por favor, preencha origem e destino.');
        return;
    }

    const route = findRoute(origem, destino);

    if (!route) {
        resultCard.classList.add('show');
        resultCard.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--color-warning); margin: 0 auto 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h3>Rota não encontrada em nossa base</h3>
                <p style="color: var(--color-text-muted); margin-top: 12px;">
                    Não encontramos dados para a rota <strong>${origem} → ${destino}</strong> em nossa base de demonstração.
                </p>
                <p style="color: var(--color-text-muted); margin-top: 8px; font-size: 0.9rem;">
                    Tente rotas populares como: São Paulo → Rio de Janeiro, São Paulo → Curitiba, Rio → Belo Horizonte.
                </p>
            </div>
        `;
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const multiplier = VEHICLE_MULTIPLIERS[selectedVehicle];
    const consumption = VEHICLE_CONSUMPTION[selectedVehicle];
    const totalTolls = route.pedagios.reduce((sum, p) => sum + p.valor * multiplier, 0);
    const fuelCost = (route.distancia / consumption) * FUEL_PRICE;
    const totalCost = totalTolls + fuelCost;

    const tollListHtml = route.pedagios.map(p => `
        <li>
            <div class="toll-name">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--color-primary);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>${p.nome}</span>
            </div>
            <span class="toll-price">${formatMoney(p.valor * multiplier)}</span>
        </li>
    `).join('');

    resultCard.innerHTML = `
        <div class="result-header">
            <h3>${route.origem} → ${route.destino}</h3>
            <span style="background: rgba(16, 185, 129, 0.1); color: var(--color-success); padding: 4px 12px; border-radius: 999px; font-size: 0.82rem; font-weight: 600;">
                ${route.pedagios.length} praças de pedágio
            </span>
        </div>

        <div class="result-summary">
            <div class="result-stat">
                <div class="result-stat-label">Distância</div>
                <div class="result-stat-value">${route.distancia} km</div>
            </div>
            <div class="result-stat">
                <div class="result-stat-label">Tempo estimado</div>
                <div class="result-stat-value">${formatTime(route.tempo)}</div>
            </div>
            <div class="result-stat">
                <div class="result-stat-label">Total em pedágios</div>
                <div class="result-stat-value primary">${formatMoney(totalTolls)}</div>
            </div>
            <div class="result-stat">
                <div class="result-stat-label">Combustível estimado</div>
                <div class="result-stat-value">${formatMoney(fuelCost)}</div>
            </div>
        </div>

        <h4 style="font-size: 1rem; margin-bottom: 12px; color: var(--color-text);">Detalhamento das praças:</h4>
        <ul class="toll-list">
            ${tollListHtml}
        </ul>

        <div class="result-disclaimer">
            <strong>⚠ Valores aproximados:</strong> Os valores exibidos são estimativas informativas baseadas em tabelas públicas e podem não refletir o valor atual vigente. Para valores oficiais e atualizados, consulte diretamente a concessionária responsável pela rodovia ou o site da <a href="https://www.gov.br/antt/" target="_blank" rel="nofollow noopener">ANTT</a>. Consumo de combustível calculado com base em média do veículo selecionado e preço médio nacional.
        </div>
    `;

    resultCard.classList.add('show');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============= FAQ =============
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

// ============= Cookie Banner + Termos Modal =============
const CONSENT_KEY = 'grb_consent';

function hasConsent() {
    try {
        return document.cookie.split(';').some(c => c.trim().startsWith(CONSENT_KEY + '='));
    } catch (e) {
        return false;
    }
}

function setConsent(value) {
    const days = 180;
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${CONSENT_KEY}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function initConsentFlow() {
    const modal = document.getElementById('terms-modal');
    const banner = document.getElementById('cookie-banner');
    const checkbox = document.getElementById('terms-checkbox');
    const acceptBtn = document.getElementById('terms-accept-btn');
    const rejectBtn = document.getElementById('terms-reject-btn');

    if (!modal && !banner) return;

    if (!hasConsent()) {
        // Primeiro acesso: abre modal de termos
        setTimeout(() => {
            if (modal) modal.classList.add('show');
        }, 800);
    }

    if (checkbox && acceptBtn) {
        checkbox.addEventListener('change', () => {
            acceptBtn.disabled = !checkbox.checked;
        });
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            setConsent('accepted');
            if (modal) modal.classList.remove('show');
            if (banner) {
                setTimeout(() => banner.classList.add('show'), 400);
                setTimeout(() => banner.classList.remove('show'), 6000);
            }
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            // Se rejeitar, ainda permite navegar mas registra rejeição
            setConsent('rejected');
            if (modal) modal.classList.remove('show');
        });
    }

    // Banner cookie actions
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            setConsent('accepted');
            banner.classList.remove('show');
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            setConsent('rejected');
            banner.classList.remove('show');
        });
    }
}

// ============= Mobile Menu =============
function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// ============= Contact Form =============
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('form-message');
        if (msg) {
            msg.classList.add('success');
            msg.textContent = '✓ Mensagem recebida! Retornaremos em até 48 horas úteis no e-mail informado.';
        }
        form.reset();
        setTimeout(() => {
            if (msg) msg.classList.remove('success');
        }, 8000);
    });
}

// ============= Init =============
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initFAQ();
    initConsentFlow();
    initMenu();
    initContactForm();
});
