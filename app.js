const STORAGE_KEYS = {
  messages: 'ai_llm_studio_messages',
  settings: 'ai_llm_studio_settings',
  projects: 'ai_llm_studio_projects'
};

let state = {
  modelLoaded: false,
  messages: [],
  settings: {
    rememberChats: true,
    temperature: 0.7,
    maxTokens: 512
  },
  projects: []
};

const el = {
  chatWindow: document.getElementById('chatWindow'),
  promptInput: document.getElementById('promptInput'),
  sendBtn: document.getElementById('sendBtn'),
  clearMemoryBtn: document.getElementById('clearMemoryBtn'),
  rememberChats: document.getElementById('rememberChats'),
  temperature: document.getElementById('temperature'),
  maxTokens: document.getElementById('maxTokens'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  projectName: document.getElementById('projectName'),
  projectType: document.getElementById('projectType'),
  addProjectBtn: document.getElementById('addProjectBtn'),
  projectList: document.getElementById('projectList'),
  exportJsonBtn: document.getElementById('exportJsonBtn'),
  exportMdBtn: document.getElementById('exportMdBtn'),
  modelPath: document.getElementById('modelPath'),
  loadModelBtn: document.getElementById('loadModelBtn'),
  modelStatus: document.getElementById('modelStatus'),
  newProjectBtn: document.getElementById('newProjectBtn')
};

function loadState() {
  try {
    const m = localStorage.getItem(STORAGE_KEYS.messages);
    const s = localStorage.getItem(STORAGE_KEYS.settings);
    const p = localStorage.getItem(STORAGE_KEYS.projects);
    if (m) state.messages = JSON.parse(m);
    if (s) state.settings = { ...state.settings, ...JSON.parse(s) };
    if (p) state.projects = JSON.parse(p);
  } catch (error) {
    addSystemMessage(`خطا در خواندن حافظه: ${error.message}`);
  }
}

function persistState() {
  if (state.settings.rememberChats) {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(state.messages));
  }
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(state.projects));
}

function addMessage(role, text) {
  const message = { role, text, ts: Date.now() };
  state.messages.push(message);
  renderMessages();
  persistState();
}

function addSystemMessage(text) {
  const node = document.createElement('div');
  node.className = 'msg system';
  node.textContent = text;
  el.chatWindow.appendChild(node);
  el.chatWindow.scrollTop = el.chatWindow.scrollHeight;
}

function renderMessages() {
  el.chatWindow.innerHTML = '';
  state.messages.forEach((m) => {
    const node = document.createElement('div');
    node.className = `msg ${m.role === 'user' ? 'user' : 'ai'}`;
    node.textContent = m.text;
    el.chatWindow.appendChild(node);
  });
  el.chatWindow.scrollTop = el.chatWindow.scrollHeight;
}

function renderProjects() {
  el.projectList.innerHTML = '';
  state.projects.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${p.name}</strong><div class="tag">${p.type}</div></div>`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'حذف';
    removeBtn.addEventListener('click', () => {
      state.projects.splice(i, 1);
      renderProjects();
      persistState();
    });
    li.appendChild(removeBtn);
    el.projectList.appendChild(li);
  });
}

async function loadWllamaModel() {
  const modelPath = el.modelPath.value.trim();
  if (!modelPath) {
    addSystemMessage('لطفاً مسیر مدل GGUF را وارد کنید.');
    return;
  }

  el.modelStatus.textContent = 'در حال بارگذاری Wllama...';

  try {
    // برای اجرای واقعی آفلاین، فایل‌های Wllama را داخل پروژه قرار دهید.
    // نمونه: ./vendor/wllama/wllama.js
    const module = await import('https://unpkg.com/@wllama/wllama@latest/dist/index.js');
    if (!module) throw new Error('ماژول Wllama در دسترس نیست');

    state.modelLoaded = true;
    el.modelStatus.textContent = `مدل آماده است: ${modelPath}`;
    addSystemMessage('مدل با موفقیت بارگذاری شد (حالت نمونه).');
  } catch (error) {
    state.modelLoaded = false;
    el.modelStatus.textContent = 'بارگذاری مدل ناموفق بود.';
    addSystemMessage(`خطا در بارگذاری Wllama: ${error.message}`);
  }
}

async function infer(prompt) {
  if (!state.modelLoaded) {
    return 'مدل آفلاین هنوز بارگذاری نشده است. لطفاً ابتدا مسیر مدل GGUF را انتخاب کنید.';
  }
  // اینجا به‌جای پاسخ واقعی مدل، پاسخ دمو برمی‌گردانیم.
  return `پاسخ دمو از AI LLM Studio Alpha به پیام شما:\n${prompt}`;
}

function exportFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function wireEvents() {
  el.sendBtn.addEventListener('click', async () => {
    const prompt = el.promptInput.value.trim();
    if (!prompt) return;
    addMessage('user', prompt);
    el.promptInput.value = '';
    const answer = await infer(prompt);
    addMessage('ai', answer);
  });

  el.saveSettingsBtn.addEventListener('click', () => {
    state.settings.rememberChats = el.rememberChats.checked;
    state.settings.temperature = Number(el.temperature.value);
    state.settings.maxTokens = Number(el.maxTokens.value);
    persistState();
    addSystemMessage('تنظیمات ذخیره شد.');
  });

  el.clearMemoryBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.messages);
    localStorage.removeItem(STORAGE_KEYS.settings);
    localStorage.removeItem(STORAGE_KEYS.projects);
    state.messages = [];
    state.projects = [];
    renderMessages();
    renderProjects();
    addSystemMessage('حافظه دائمی پاک شد.');
  });

  el.addProjectBtn.addEventListener('click', () => {
    const name = el.projectName.value.trim();
    const type = el.projectType.value;
    if (!name) {
      addSystemMessage('نام پروژه خالی است.');
      return;
    }
    state.projects.push({ name, type, createdAt: new Date().toISOString() });
    el.projectName.value = '';
    renderProjects();
    persistState();
  });

  el.newProjectBtn.addEventListener('click', () => {
    el.projectName.focus();
    addSystemMessage('نام پروژه را در پنل مدیریت پروژه وارد کنید.');
  });

  el.exportJsonBtn.addEventListener('click', () => {
    const payload = {
      projects: state.projects,
      settings: state.settings,
      exportedAt: new Date().toISOString()
    };
    exportFile('ai-llm-studio-projects.json', JSON.stringify(payload, null, 2), 'application/json');
  });

  el.exportMdBtn.addEventListener('click', () => {
    const lines = ['# AI LLM Studio Projects', ''];
    state.projects.forEach((p, i) => {
      lines.push(`${i + 1}. **${p.name}** - ${p.type} (${p.createdAt})`);
    });
    exportFile('ai-llm-studio-projects.md', lines.join('\n'), 'text/markdown');
  });

  el.loadModelBtn.addEventListener('click', loadWllamaModel);
}

function initUiFromState() {
  el.rememberChats.checked = state.settings.rememberChats;
  el.temperature.value = state.settings.temperature;
  el.maxTokens.value = state.settings.maxTokens;
  renderMessages();
  renderProjects();
}

loadState();
initUiFromState();
wireEvents();
