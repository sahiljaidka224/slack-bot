import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getRecentActivity(): Promise<string> {
  const { data } = await octokit.activity.listEventsForAuthenticatedUser({
    per_page: 10,
  });

  const activity = data.map((event) => {
    const repoName = event.repo.name;
    const eventType = event.type;
    const actor = event.actor.login;
    const createdAt = event.created_at;
    return `${actor} ${eventType} on ${repoName} at ${createdAt}`;
  });

  return activity.join("\n");
}

getRecentActivity()
  .then((activity) => console.log(activity))
  .catch((err) => console.error(err));
