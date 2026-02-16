import {
  loadMemory,
  saveMemory,
  resetMemory,
  exportProjects,
  setModelMeta,
} from './lib/persistent-memory.js';
import { createOfflineEngine } from './lib/wllama-adapter.js';

const state = loadMemory();
const engine = createOfflineEngine();

const el = {
  projectForm: document.getElementById('projectForm'),
  projectName: document.getElementById('projectName'),
  projectLang: document.getElementById('projectLang'),
  projectDesc: document.getElementById('projectDesc'),
  projectList: document.getElementById('projectList'),
  chatWindow: document.getElementById('chatWindow'),
  chatForm: document.getElementById('chatForm'),
  chatInput: document.getElementById('chatInput'),
  temperature: document.getElementById('temperature'),
  maxTokens: document.getElementById('maxTokens'),
  offlineMode: document.getElementById('offlineMode'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  clearMemoryBtn: document.getElementById('clearMemoryBtn'),
  modelInput: document.getElementById('modelInput'),
  modelStatus: document.getElementById('modelStatus'),
};

function renderProjects() {
  el.projectList.innerHTML = '';
  state.projects.forEach((p, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.name}</strong>
      <small>${p.lang}</small>
      <small>${p.description || ''}</small>
      <div class="row gap">
        <button class="btn" data-edit="${index}">ویرایش</button>
        <button class="btn danger" data-del="${index}">حذف</button>
      </div>`;
    el.projectList.append(li);
  });
}

function renderChat() {
  el.chatWindow.innerHTML = '';
  state.chat.forEach((m) => {
    const div = document.createElement('div');
    div.className = `msg ${m.role}`;
    div.textContent = m.content;
    el.chatWindow.append(div);
  });
  el.chatWindow.scrollTop = el.chatWindow.scrollHeight;
}

function renderSettings() {
  el.temperature.value = state.settings.temperature;
  el.maxTokens.value = state.settings.maxTokens;
  el.offlineMode.checked = state.settings.offlineMode;
  el.modelStatus.textContent = state.modelMeta?.name
    ? `مدل: ${state.modelMeta.name}\nحجم: ${state.modelMeta.size} بایت`
    : 'مدل انتخاب نشده است.';
}

el.projectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = {
    name: el.projectName.value.trim(),
    lang: el.projectLang.value,
    description: el.projectDesc.value.trim(),
    updatedAt: new Date().toISOString(),
  };
  const existingIndex = state.projects.findIndex((p) => p.name === item.name);
  if (existingIndex >= 0) state.projects[existingIndex] = item;
  else state.projects.unshift(item);

  saveMemory(state);
  renderProjects();
  el.projectForm.reset();
});

el.projectList.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const editIndex = target.dataset.edit;
  const delIndex = target.dataset.del;

  if (editIndex !== undefined) {
    const p = state.projects[Number(editIndex)];
    el.projectName.value = p.name;
    el.projectLang.value = p.lang;
    el.projectDesc.value = p.description;
  }

  if (delIndex !== undefined) {
    state.projects.splice(Number(delIndex), 1);
    saveMemory(state);
    renderProjects();
  }
});

document.querySelectorAll('[data-export]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const format = btn.getAttribute('data-export');
    exportProjects(state.projects, format);
  });
});

el.chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const content = el.chatInput.value.trim();
  if (!content) return;

  state.chat.push({ role: 'user', content, at: Date.now() });
  renderChat();
  el.chatInput.value = '';

  const reply = await engine.generate(content, state.settings);
  state.chat.push({ role: 'assistant', content: reply, at: Date.now() });
  saveMemory(state);
  renderChat();
});

el.saveSettingsBtn.addEventListener('click', () => {
  state.settings.temperature = Number(el.temperature.value || 0.7);
  state.settings.maxTokens = Number(el.maxTokens.value || 1024);
  state.settings.offlineMode = !!el.offlineMode.checked;
  saveMemory(state);
});

el.clearMemoryBtn.addEventListener('click', () => {
  resetMemory();
  location.reload();
});

el.modelInput.addEventListener('change', async () => {
  const file = el.modelInput.files?.[0];
  if (!file) return;
  state.modelMeta = setModelMeta(file);
  saveMemory(state);
  renderSettings();
  await engine.loadModel(file);
});

renderProjects();
renderChat();
renderSettings();
