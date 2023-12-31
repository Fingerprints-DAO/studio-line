/**
 * IMPORTANT: THIS CONTRACT IS A COPY FROM ERC712 CONTRACT TO RUN IT LOCALLY
 * DO NOT DEPLOY THIS CONTRACT IN MAINNET, IF YOU WANT THE ORIGINAL CODE
 * CHECK IT HERE: https://github.com/harmvandendorpel/Mock721-token-contract
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

contract Mock721 is ERC721, ERC2981, Ownable, Pausable {
  uint16 public currentTokenId = 0;
  uint16 public tokenIdMax;
  string public baseURIValue;
  address public payoutAddress;
  address public minterContractAddress;

  uint96 public constant royaltyFee = 850; // 8.5%

  constructor(
    address _payoutAddress,
    address _minterContractAddress,
    uint16 _tokenIdMax,
    string memory _baseURIValue
  ) ERC721('Mock721', 'Mock721') {
    _setDefaultRoyalty(_payoutAddress, royaltyFee);
    payoutAddress = _payoutAddress;
    minterContractAddress = _minterContractAddress;
    tokenIdMax = _tokenIdMax;
    baseURIValue = _baseURIValue;
  }

  function owner() public view virtual override(Ownable) returns (address) {
    return Ownable.owner();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function pause() external onlyOwner {
    _pause();
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view virtual override(ERC2981, ERC721) returns (bool) {
    return
      interfaceId == type(IERC721).interfaceId ||
      interfaceId == type(IERC2981).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function endMint() external onlyOwner {
    tokenIdMax = currentTokenId;
  }

  function mint(address recipient) external whenNotPaused {
    require(
      msg.sender == minterContractAddress || msg.sender == owner(),
      'Only minter contract and owner can mint'
    );
    require(currentTokenId < tokenIdMax, 'Max. supply reached');
    return _safeMint(recipient, ++currentTokenId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    _requireMinted(tokenId);

    string memory baseURI = _baseURI();

    return
      bytes(baseURI).length > 0
        ? string(abi.encodePacked(baseURI, Strings.toString(tokenId)))
        : '';
  }

  function setPayoutAddress(
    address payable newPayoutAddress
  ) external onlyOwner {
    require(address(0) != newPayoutAddress, 'Invalid address');
    payoutAddress = newPayoutAddress;
    _setDefaultRoyalty(payoutAddress, royaltyFee);
  }

  function setMinterAddress(address newMinter) external onlyOwner {
    require(address(0) != newMinter, 'Invalid address');
    minterContractAddress = newMinter;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURIValue;
  }

  function setBaseURI(string memory newBaseURI) external onlyOwner {
    baseURIValue = newBaseURI;
  }

  function totalSupply() public view returns (uint256) {
    return currentTokenId;
  }

  function nextTokenId() public view returns (uint256) {
    return currentTokenId + 1;
  }

  function maxSupply() public view returns (uint256) {
    return tokenIdMax;
  }
}
