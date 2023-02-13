import sinon from "sinon";
import test from "tape";
import { data } from "../output.mjs";
import * as request from "../stubbing-http-requests.mjs";

test("Get github user by username", async (t) => {
  t.plan(3);

  sinon.stub(request, "getGithubUser").returns(data);
  const githubUser = await request.getGithubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});
