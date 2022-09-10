const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const Base_Fee = ethers.utils.parseEther("0.25")
const Gas_Price_Link = 1e9 // 1 000 000 000

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [Base_Fee, Gas_Price_Link]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [args],
        })
        log("Mocks Deployed!")
        log("******************************************")
    }
}

module.exports.tags = ["all", "mocks"]
