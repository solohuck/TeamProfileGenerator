const engineer = require("../lib/engineer");

test('getRole() return \"Engineer\"', () => {
    const testVal = "Engineer";
    const e = new engineer("Foo", 1, "testVal@testing.com", "GitHubUser");
    expect(e.getRole()).toBe(testVal);
});

test('set GitHUb account with constructor', () => {
    const testVal = "GitHubUser";
    const e = new engineer("Foo", 1, "testVal@testing.com", testVal);
    expect(e.github).toBe(testVal);
});


test("get the GitHub username with getGithub()", () => {
    const testVal = "GitHubUser";
    const e = new engineer("Foo", 1, "testVal@testing.com", testVal);
    expect(e.getGithub()).toBe(testVal);
});
  