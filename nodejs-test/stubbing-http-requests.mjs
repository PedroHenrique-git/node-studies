import axios from "axios";
//import { writeFile } from "fs/promises";
//import { join } from "path";

export async function getGithubUser(username) {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  //await writeFile(join(".", "output.json"), JSON.stringify(data));
  return data;
}
