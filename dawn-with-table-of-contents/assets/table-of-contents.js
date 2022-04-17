const articleBodyItemProp = 'articleBody';
const tableOfContentsItemProp = 'tableOfContents';

const getArticleBody = () => {
  return document.querySelector(`[itemprop="${articleBodyItemProp}"]`);
};

const getHeadings = () => {
  const articleBody = getArticleBody();
  if (!articleBody) return null;

  return articleBody.querySelectorAll(['h2', 'h3']);
};

const existsTableOfContents = () => {
  return !!document.querySelector(`[itemprop="${tableOfContentsItemProp}"]`);
};

const generateAnchor = (id) => {
  const anchor = document.createElement('a');
  anchor.style.display = 'block';
  anchor.style.width = '100%';
  anchor.style.padding = 0;
  anchor.style.margin = 0;
  anchor.style.lineHeight = '21px';
  anchor.style.fontSize = '14px';
  anchor.style.color = '#6f7372';
  const content = document.createTextNode(id);
  anchor.appendChild(content);
  anchor.setAttribute('href', `#${id}`);
  return anchor;
};

const generateListItem = (id, index, isNest = false) => {
  const listItem = document.createElement('li');
  listItem.style.padding = '8px 0';
  listItem.style.margin = 0;
  listItem.style.listStyleType = 'none';
  if (isNest) {
    listItem.style.paddingLeft = '24px';
  }
  const anchor = generateAnchor(id);
  listItem.appendChild(anchor);
  return listItem;
};

const generateList = (headings) => {
  if (!headings) return;

  const list = document.createElement('ul');
  list.style.padding = 0;
  list.style.margin = '16px 0 0';
  list.style.listStyle = 'none';
  Array.prototype.forEach.call(headings, (heading, index) => {
    const listItem = generateListItem(
      heading.id,
      index,
      heading.tagName === 'H3'
    );
    list.appendChild(listItem);
  });
  return list;
};

const generateTitle = () => {
  const title = document.createElement('h2');
  title.style.fontSize = '14px';
  title.style.fontWeight = '700';
  title.style.margin = 0;
  title.style.color = 'rgb(111, 115, 114)';
  title.style.lineHeight = 1.5;
  title.style.letterSpacing = '0.04em';
  const content = document.createTextNode('目次');
  title.appendChild(content);
  return title;
};

const generateTableOfContents = (headings) => {
  if (!headings) return;

  const tableOfContents = document.createElement('nav');
  tableOfContents.setAttribute('itemprop', tableOfContentsItemProp);
  tableOfContents.style.padding = '16px';
  tableOfContents.style.margin = '36px 0';
  tableOfContents.style.backgroundColor = '#f7f9f9';
  const title = generateTitle();
  tableOfContents.appendChild(title);
  const list = generateList(headings);
  tableOfContents.appendChild(list);
  return tableOfContents;
};

const addIdToHeading = () => {
  const headings = getHeadings();
  if (!headings) return;

  Array.prototype.forEach.call(headings, (heading) => {
    heading.id = heading.textContent;
  });
};

const addTableOfContents = () => {
  const articleBody = getArticleBody();
  const headings = getHeadings();
  if (!articleBody || !headings) return;

  const tableOfContents = generateTableOfContents(headings);
  const firstHeading = headings[0];
  if (!tableOfContents || !firstHeading) return;
  if (existsTableOfContents()) return;

  articleBody.insertBefore(tableOfContents, firstHeading);
};

addIdToHeading();
addTableOfContents();
