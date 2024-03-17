// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol"; // Import the ERC20 interface

contract WishlistSupport {

    // Address of cUSD --> Celo minipay cUSD
    address public constant tokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1; 

    // Event to emit when a payment is made
    event WishlistSponsored(address indexed _to, uint256 _amount);

    // Function to send tokens to a specified address to cover thei expenses
    function sponsorWishlist(address _to, uint256 _amount) external {
        require(_to != address(0), "Invalid address");
        
        // Cast token address to ERC20 interface
        IERC20 cUSD = IERC20(tokenAddress);
        
        // Transfer tokens from contract address to the specified address
        cUSD.transfer(_to, _amount);

        // Emit the event for the transaction
        emit WishlistSponsored(_to, _amount);
    }
    
    // Function to reject incoming ether transfers
    receive() external payable {
        revert("Ether transfers not allowed");
    }

    // Fallback function to receive Ether when the function signature does not match any other function
    fallback() external payable {}
}

