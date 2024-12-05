import { Octokit } from "octokit";

const apiKey = '';

// Gerar conexão com a ferramenta octokit
export const octokit = new Octokit({
    auth:apiKey
})