const axios = require("axios");
const fs = require("fs");

const username = "SABESHAN-M";
const token = process.env.GITHUB_TOKEN;

async function fetchRepos() {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
      params: {
        sort: "updated",
        per_page: 6,
      },
    }
  );

  return response.data
    .filter(repo => !repo.fork)
    .slice(0, 4);
}

function generateProjectCards(repos) {
  return repos
    .map(repo => {
      return `
<a href="${repo.html_url}">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}&hide_border=true" />
</a>
      `;
    })
    .join("\n");
}

async function generateREADME() {
  const repos = await fetchRepos();
  const projectCards = generateProjectCards(repos);

  const content = `
# 👋 Sabeshan M

Full Stack Engineer | Cloud Enthusiast

---

## 🚀 Featured Projects

${projectCards}

---

## 📊 GitHub Stats

![Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=github_dark&hide_border=true)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=github_dark&hide_border=true)

---

*Auto-updated via GitHub Actions*
`;

  fs.writeFileSync("README.md", content);
}

generateREADME();
