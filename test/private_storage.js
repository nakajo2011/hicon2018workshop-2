import lkTestHelpers from 'lk-test-helpers'

const {
  shouldFail
} = lkTestHelpers(web3)
const PrivateStorage = artifacts.require('PrivateStorage')

contract('PrivateStorage', (accounts) => {
  it("should assert true", async () => {
    const private_storage = await PrivateStorage.new();
    assert.isOk(private_storage);
  })
  it("set and get test", async () => {
    const private_storage = await PrivateStorage.new();
    await private_storage.set(3)
    const actual = await private_storage.get()
    assert.equal(3, actual)
  })
  it("fail test. set is only owner command.", async () => {
    const private_storage = await PrivateStorage.new()
    try {
      await private_storage.set(3, {from: accounts[1]})
      assert.fail("it must be fail.")
    } catch (e) {
      // not recommend. it has a little dangerous.
      // if you change line:22 to same as line:14, then test is fail. is it ensure?
      // TODO: step1 modify to using shouldFail.reverting. e.g) await shouldFail.reverting(someMethod())
      assert.isOk(e)
    }
  })

  it("fail test. out of gas.", async () => {
    const private_storage = await PrivateStorage.new()
    try {
      await private_storage.heavyCostSet(100, {gas: 1000000})
      assert.fail("it must be fail.")
    } catch (e) {
      // TODO: step2 this is dengerous too. please modify to correctly.
      assert.isOk(e)
    }
  })
})
