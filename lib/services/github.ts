export async function getGitHubSummary(userId: string) {
  return {
    username: "",
    repoCount: 0,
    recent: [] as string[]
  }
}

