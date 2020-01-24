/*
|--------------------------------------------------
|                 Main Configuration
|---------------------------------------------------
|
| Main configuration of the Inbenta application.
|
*/
var inbentaEnv = '';

switch (window.location.host) {
  case 'gympass-staging.com':
  case 'www.gympass-staging.com':
  case 'cross.gympass-staging.com':
  case 'inbenta.gympass.com':
    inbentaEnv = 'preproduction';
    break;
  case 'gympass.com':
  case 'help.gympass.com':
  case 'www.gympass.com':
    inbentaEnv = 'production';
    break;
  default:
    inbentaEnv = 'development';
}

// Inbenta routes - Relative paths where the CSS and JS are hosted
var inbChatbotPaths = {
  css: './inbenta-core.css',
  js: './inbenta-core.js'
}

// Inbenta application configuration
var inbChatbotApp = {
  sdkIntegration: {
    version: '1.39.0',
    integrity: 'sha384-4bvGhEKgDor4DLVY/4FTtNZVKtwX/gjfmyKLUw85nTZYohnmhe8d7lvX1xnfjFyK'
  },
  sdkAuth: {
    inbentaKey: 'BZJqPj8v7oAml6pa3RqV5L3rF9+MvkpN2OH/+k41EHM=',
    domainKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3ltcGFzc19jaGF0Ym90X3B0IiwiZG9tYWluX2tleV9pZCI6IkJaTlF5ZTQ3VkRQanM4M1ZUUWJKX0E6OiJ9.ByHLLNLKl9g8Vrg5AWQos6yz6ItV2AuZ7Ly5hlt31fNOsV4kh4hwhDyXcbhDMDZK57ewg8VN0WqYAY_4FGPqjg'
    // secretKey: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3ltcGFzc19jaGF0Ym90X3B0Iiwic2FsdCI6IkJaSnFQajgxYUdkYlwvdzYxRFpWRzh3PT0ifQ.KtBznoJxhw2oBJn-3JFMhUloxLy9b9oQTCn7StQYC3Ew_beLyhuf7N5FJWMewaKcDAjefC6zQE2K_resOfYlLg
  },
  // Inbenta Chatbot SDK configuration <https://developers.inbenta.io/>
  sdkConfig: {
    // Chatbot application specific ID
    chatbotId: 'gympass_chatbot_zendesk',
    source: 'Chatbot SDK',
    // Environments => "production" / "preproduction" / "production"
    environment: inbentaEnv,
    // Display loading animation
    showLoader: false,
    // Display character counter
    inputCharacterCounter: true,
    // Default limit for character counter
    inputCharacterCounterMax: 256,
    // Set limit for error retries to 3 (Default is 6)
    forms: {
      errorRetries: 2,
      allowUserToAbandonForm: true
    },
    launcher: {
      title: 'Chat'
    },
    lang: 'pt',
    labels: {
      pt: {
        'yes': 'Sim',
        'no': 'Não',
        'generic-error-message': 'O formato de sua resposta não é válido',
        'enter-question': 'Escreva aqui sua mensagem...',
        'interface-title': 'Gympass',
        'guest-name': 'Você',
        'see-more': 'Mais info',
        'help-question': 'Precisa de ajuda?',
        'thanks': 'Obrigado!',
        'rate-content': 'Consegui te ajudar?',
        'form-message': 'Por favor nos diga o porquê',
        'submit': 'Enviar',
        'alert-title': 'OOOOPS...!',
        'alert-message': 'Algo errado ocorreu, por favor clique no botão Atualizar.',
        'alert-button': 'Tente novamete',
        'agent-joined': '{agentName} entrou no chat',
        'agent-left': '{agentName} saiu chat',
        'wait-for-agent': 'Aguardando agente ...',
        'no-agents': 'Não há agente disponíveis',
        'chat-closed': 'Chat fechado',
        'chat-ticket': '{ticketId}',
        'download': 'Download',
        'escalate-chat': 'Gostaria de falar com um agente?',
        'close-chat': 'Você deseja encerrar este chat? <div class="confirmation-box__subtitle">Você irá perder todo o histórico da conversa. Não esqueça de responder a pesquisa de satisfação ao final do atendimento</div>'
      }
    },
    sanitizerOptions: {
      allowedTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
        "iframe",
        "span",
        "u"
      ],
      allowedAttributes: {
        a: ["href","name","target", "title"],
        span:["style","class"],
        iframe: ["src", "width", "height", "frameborder", "marginwidth", "marginheight", "scrolling", "style", "allowfullscreen"],
        img: ["src"],
        div: ["class", "style"]
      }
    },

    // Add close button by default
    closeButton: {
      visible: true
    },
    ratingPosition: 'mixed',
    ratingOptions: [
      {
        id: 6,
        label: 'Sim',
        comment: false,
        response: 'Obrigado! Por favor, não esqueça de encerrar o chat e preencher nossa pesquisa de satisfação!'
      },
      {
        id: 7,
        label: 'Não',
        comment: false,
        response: 'Obrigado. Se preferir, me faça outra pergunta ou digite "atendimento" para falar com um humano.'
      }
    ]

  },
  // Inbenta Hyperchat Adapter configuration <https://developers.inbenta.io/>
  hyperchatConfig: {},
  // Inbenta application custom configuration
  appConfig: {
    zopim: {
      preForm: true,
      getUserInfo: true,
      sendTranscript: true,
      // zendeskAccountKey: 'UPrw2ExQrYHZRNhcgEOiH48rJvlJSLQzIn5gHS57',
      zendeskAccountKey: 'iOFMWgrBUSFScaezQCAFxuPMHx5dETnsGgB3gqNe',
      lang: 'pt-br',
      escalationMessage: 'Aguarde enquanto transfiro para um atendente'
    }
  }
}

/*
|--------------------------------------------------
|                   Starting SDK
|---------------------------------------------------
|
| >> WARNING!
|
| Load & trigger JS & CSS core. Please, be carefull if
| you want to modify this section.
|
*/

// Attach configuration to the window
window.inbChatbotAppSdk = inbChatbotApp;

// Create CSS core file
var inbScriptCSS = document.createElement('link');
inbScriptCSS.rel = 'stylesheet';
inbScriptCSS.type = 'text/css';
inbScriptCSS.href = inbChatbotPaths.css;
document.head.appendChild(inbScriptCSS);

// Create JS core file
var inbScriptJS = document.createElement('script');
inbScriptJS.src = inbChatbotPaths.js;
document.head.appendChild(inbScriptJS);
