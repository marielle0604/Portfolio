document.addEventListener('DOMContentLoaded', () => {
  const projects = window.portfolioProjects || [];
  const certificates = window.portfolioCertificates || [];
  const roleProjectGrid = document.getElementById('roleProjectGrid');
  const certificateGrid = document.getElementById('certificateGrid');
  const modal = document.getElementById('certificateModal');
  const modalTitle = document.getElementById('certificateModalTitle');
  const modalPreview = document.getElementById('certificatePreview');
  const modalOpen = document.getElementById('certificateOpen');
  const nav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const rolesMenuButton = document.getElementById('rolesMenuButton');
  const rolesMenu = document.getElementById('rolesMenu');
  const emptyCertificates = document.querySelector('.empty-certificates');

  function projectCard(project, index) {
    const cover = project.cover
      ? `<img src="${project.cover}" alt="${project.title} project preview" loading="lazy">`
      : `<div class="generated-cover-content"><span class="generated-cover-label">${project.coverLabel}</span><i class="fa-solid ${project.coverIcon}" aria-hidden="true"></i><span class="generated-cover-title">${project.title}</span><div class="generated-cover-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>`;
    return `<article class="project-card">
      <a class="project-card-link" href="project.html?project=${encodeURIComponent(project.id)}" aria-label="View ${project.title} project details">
        <div class="project-image ${project.cover ? '' : `project-image-generated ${project.coverStyle || ''}`}">${cover}<span class="project-count">${String(index + 1).padStart(2, '0')}</span></div>
        <div class="project-card-copy"><div><h3>${project.title}</h3><p>${project.type}${project.date ? ` · ${project.date}` : ''}</p><p class="project-card-summary">${project.summary}</p></div><span class="project-card-arrow" aria-hidden="true"><i class="fa-solid fa-arrow-up-right-from-square"></i></span></div>
      </a>
    </article>`;
  }

  function renderProjects(target, list) {
    target.innerHTML = list.map((project) => projectCard(project, projects.indexOf(project))).join('');
  }

  renderProjects(roleProjectGrid, projects);

  function applyRoleFilter(role) {
    const filtered = role === 'All' ? projects : projects.filter((project) => project.roles.includes(role));
    renderProjects(roleProjectGrid, filtered);
    document.querySelectorAll('.role-filter').forEach((button) => {
      const active = button.dataset.roleFilter === role;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-role-filter]').forEach((button) => {
      if (button.classList.contains('role-filter')) return;
      button.setAttribute('aria-pressed', String(button.dataset.roleFilter === role));
    });
  }

  document.querySelectorAll('[data-role-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      applyRoleFilter(button.dataset.roleFilter);
      rolesMenu.hidden = true;
      rolesMenuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.getElementById('roles').scrollIntoView({ behavior: 'smooth' });
    });
  });

  rolesMenuButton.addEventListener('click', () => {
    const willOpen = rolesMenu.hidden;
    rolesMenu.hidden = !willOpen;
    rolesMenuButton.setAttribute('aria-expanded', String(willOpen));
    document.getElementById('roles').scrollIntoView({ behavior: 'smooth' });
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  emptyCertificates.hidden = certificates.length > 0;
  certificates.forEach((certificate) => {
    const card = document.createElement('article');
    card.className = 'certificate-card';
    card.innerHTML = `<button class="certificate-preview-button" type="button" aria-label="Preview ${certificate.title}"><img src="${certificate.preview}" alt="Preview of ${certificate.title}" loading="lazy"><span class="certificate-card-copy"><span class="certificate-card-title">${certificate.title}</span>${certificate.subject ? `<span class="certificate-card-subject">${certificate.subject}</span>` : ''}<span class="certificate-card-issuer">${certificate.issuer}</span></span></button><a class="button button-primary" href="${certificate.file}" target="_blank" rel="noopener noreferrer">Open certificate <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
    card.querySelector('.certificate-preview-button').addEventListener('click', () => {
      modalTitle.textContent = [certificate.title, certificate.subject, certificate.issuer].filter(Boolean).join(' | ');
      modalPreview.src = certificate.preview;
      modalPreview.alt = `Preview of ${certificate.title}${certificate.subject ? `: ${certificate.subject}` : ''}`;
      modalOpen.href = certificate.file;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modal.querySelector('.modal-close').focus();
    });
    certificateGrid.append(card);
  });

  modal.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = '';
    }
    if (event.key === 'Escape' && !rolesMenu.hidden) {
      rolesMenu.hidden = true;
      rolesMenuButton.setAttribute('aria-expanded', 'false');
    }
  });

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = nav.querySelectorAll(':scope > a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
});