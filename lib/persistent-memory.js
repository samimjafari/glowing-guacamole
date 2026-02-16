const KEY = 'ai-llm-studio-alpha-memory-v1';

const initialState = {
  projects: [],
  chat: [],
  modelMeta: null,
  settings: {
    temperature: 0.7,
    maxTokens: 1024,
    offlineMode: true,
  },
};

export function loadMemory() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(initialState);
    return { ...structuredClone(initialState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(initialState);
  }
}

export function saveMemory(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetMemory() {
  localStorage.removeItem(KEY);
}

export function setModelMeta(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type || 'application/octet-stream',
    lastModified: file.lastModified,
  };
}

export function exportProjects(projects, format = 'json') {
  let content = '';
  let filename = `projects.${format}`;

  if (format === 'json') content = JSON.stringify(projects, null, 2);
  if (format === 'md') {
    filename = 'projects.md';
    content = projects
      .map((p) => `## ${p.name}\n- Language: ${p.lang}\n- Description: ${p.description || '-'}\n`)
      .join('\n');
  }
  if (format === 'txt') {
    filename = 'projects.txt';
    content = projects
      .map((p) => `${p.name} | ${p.lang} | ${p.description || '-'} | ${p.updatedAt || '-'}`)
      .join('\n');
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
