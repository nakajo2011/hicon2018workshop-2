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
    await shouldFail.reverting(private_storage.set(3, {from: accounts[1]}))
  })

  it("fail test. out of gas.", async () => {
    const private_storage = await PrivateStorage.new()
    await shouldFail.outOfGas(private_storage.heavyCostSet(100, {gas: 1000000}))
  })
})
