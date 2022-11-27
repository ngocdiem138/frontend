const path = require('path');
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/404/)) {
    page.context.layout = "bare";
    createPage(page);
  }

  if (page.path.match(/dashboard/)) {
    page.context.layout = "dashboard";
    createPage(page);
  }

  if (page.path.match(/^\/groups/)) {
    createPage({
      path: '/groups',
      matchPath: '/groups/*',
      component: path.resolve(`src/pages/groups.js`),
    })
  }
};
