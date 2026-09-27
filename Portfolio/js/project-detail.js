document.addEventListener('DOMContentLoaded', () => {
  const detail = document.getElementById('projectDetail');
  const projectId = new URLSearchParams(window.location.search).get('project');
  const project = (window.portfolioProjects || []).find((item) => item.id === projectId);

  if (!project) {
    detail.innerHTML = '<div class="detail-not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>That page is missing.</h1><p>Choose a project from the portfolio to see its details.</p><a class="button button-primary" href="index.html#projects">Browse projects <i class="fa-solid fa-arrow-right"></i></a></div>';
    document.title = 'Project not found | Marielle Modesto';
    return;
  }

  document.title = `${project.title} | Marielle Modesto`;
  const heading = document.createElement('p');
  heading.className = 'eyebrow';
  heading.textContent = `PROJECT / ${project.type.toUpperCase()}`;
  const title = document.createElement('h1');
  title.className = 'detail-title';
  title.textContent = project.title;
  const tags = document.createElement('div');
  tags.className = 'detail-meta';
  project.roles.forEach((role) => {
    const tag = document.createElement('span');
    tag.textContent = role;
    tags.append(tag);
  });
  const description = document.createElement('p');
  description.className = 'detail-description';
  description.textContent = project.summary;
  const gallery = document.createElement('div');
  gallery.className = 'detail-gallery';
  project.images.forEach((image) => {
    const figure = document.createElement('figure');
    const preview = document.createElement('img');
    preview.src = image.src;
    preview.alt = `${project.title}: ${image.label}`;
    preview.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.textContent = image.label;
    figure.append(preview, caption);
    gallery.append(figure);
  });
  detail.append(heading, title, tags, description, gallery);
});