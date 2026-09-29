document.addEventListener('DOMContentLoaded', () => {
  const detail = document.getElementById('projectDetail');
  const projectId = new URLSearchParams(window.location.search).get('project');
  const project = (window.portfolioProjects || []).find((item) => item.id === projectId);

  if (!project) {
    detail.innerHTML = '<div class="detail-not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>That page is missing.</h1><p>Choose a project from the portfolio to see its details.</p><a class="button button-primary" href="index.html#home">Back to portfolio <i class="fa-solid fa-arrow-right"></i></a></div>';
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
  if (project.date) {
    const date = document.createElement('span');
    date.textContent = project.date;
    tags.append(date);
  }
  if (project.position) {
    const position = document.createElement('span');
    position.textContent = project.position;
    tags.append(position);
  }
  const technologies = document.createElement('div');
  technologies.className = 'detail-technologies';
  if (project.technologies?.length) {
    const technologiesHeading = document.createElement('h2');
    technologiesHeading.textContent = 'Tools and technologies';
    const technologyList = document.createElement('div');
    technologyList.className = 'detail-meta';
    project.technologies.forEach((technology) => {
      const tag = document.createElement('span');
      tag.textContent = technology;
      technologyList.append(tag);
    });
    technologies.append(technologiesHeading, technologyList);
  }
  const contributions = document.createElement('div');
  contributions.className = 'detail-contributions';
  if (project.contributions?.length) {
    const contributionsHeading = document.createElement('h2');
    contributionsHeading.textContent = 'Project contributions';
    const contributionList = document.createElement('ul');
    project.contributions.forEach((contribution) => {
      const item = document.createElement('li');
      item.textContent = contribution;
      contributionList.append(item);
    });
    contributions.append(contributionsHeading, contributionList);
  }
  const externalLinks = project.externalLinks || (project.externalUrl ? [{
    label: project.externalUrl.includes('figma.com') ? 'View Figma prototype' : 'View project on GitHub',
    url: project.externalUrl
  }] : []);
  const externalLinkGroup = document.createElement('div');
  externalLinkGroup.className = 'detail-project-links';
  externalLinks.forEach((link) => {
    const externalLink = document.createElement('a');
    externalLink.className = 'button button-primary detail-project-link';
    externalLink.href = link.url;
    externalLink.target = '_blank';
    externalLink.rel = 'noopener noreferrer';
    externalLink.textContent = link.label;
    externalLinkGroup.append(externalLink);
  });
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
  detail.append(heading, title, tags, description, technologies, contributions);
  if (externalLinkGroup.childElementCount) detail.append(externalLinkGroup);
  if (gallery.childElementCount) detail.append(gallery);
});