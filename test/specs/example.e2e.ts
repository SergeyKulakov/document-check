describe('ResetPassword page', () => {
  it('back button', async () => {
    await driver.launchApp();
    const containedBtn = await driver.$('[text="Contained"]');
    containedBtn.click();

    const containedBtnIsDisplay = await containedBtn.isDisplayed();
    expect(containedBtnIsDisplay).toBe(true);
  });
});
